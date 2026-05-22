import React, { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  Award,
  BarChart3,
  BookOpen,
  Brain,
  Check,
  ChevronLeft,
  ChevronRight,
  ClipboardList,
  Download,
  Flag,
  GraduationCap,
  Layers3,
  Moon,
  Play,
  RotateCcw,
  Search,
  Sparkles,
  Upload,
  X
} from 'lucide-react';
import { gh300Questions } from './data/gh300Questions';
import './styles.css';

const partSizes = [50, 48, 46, 50, 49, 46, 38];
const partStarts = partSizes.reduce((acc, size, index) => {
  acc.push(index === 0 ? 0 : acc[index - 1] + partSizes[index - 1]);
  return acc;
}, []);

const certifications = [
  {
    id: 'gh-300',
    name: 'GitHub Copilot',
    exam: 'GH-300',
    provider: 'GitHub',
    level: 'Professional',
    questions: gh300Questions.length,
    status: 'Ready',
    color: 'brand'
  },
  {
    id: 'az-900',
    name: 'Azure Fundamentals',
    exam: 'AZ-900',
    provider: 'Microsoft',
    level: 'Fundamentals',
    questions: 0,
    status: 'Coming next',
    color: 'violet'
  },
  {
    id: 'aws-clf',
    name: 'AWS Cloud Practitioner',
    exam: 'CLF-C02',
    provider: 'AWS',
    level: 'Foundational',
    questions: 0,
    status: 'Template',
    color: 'coral'
  }
];

const partTitles = [
  'Copilot fundamentals',
  'Plans, setup, administration',
  'Prompt engineering',
  'Developer workflows',
  'Responsible AI and security',
  'Enterprise features',
  'Exam review set'
];

const storageKeys = {
  history: 'certforge-gh300-history',
  progress: 'certforge-gh300-progress',
  flagged: 'certforge-gh300-flagged',
  weak: 'certforge-gh300-weak'
};

function readJson(key, fallback) {
  try {
    return JSON.parse(localStorage.getItem(key)) ?? fallback;
  } catch {
    return fallback;
  }
}

function shuffle(input) {
  const items = [...input];
  for (let i = items.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [items[i], items[j]] = [items[j], items[i]];
  }
  return items;
}

function sameAnswer(a, b) {
  if (a.length !== b.length) return false;
  const left = [...a].sort((x, y) => x - y);
  const right = [...b].sort((x, y) => x - y);
  return left.every((value, index) => value === right[index]);
}

function percent(value, total) {
  if (!total) return 0;
  return Math.round((value / total) * 100);
}

function App() {
  const [route, setRoute] = useState('dashboard');
  const [dark, setDark] = useState(() => localStorage.getItem('certforge-theme') === 'dark');
  const [history, setHistory] = useState(() => readJson(storageKeys.history, []));
  const [flagged, setFlagged] = useState(() => readJson(storageKeys.flagged, []));
  const [weak, setWeak] = useState(() => readJson(storageKeys.weak, {}));
  const [session, setSession] = useState(null);
  const [flash, setFlash] = useState(null);
  const [search, setSearch] = useState('');

  const stats = useMemo(() => {
    const attempts = history.length;
    const avg = attempts ? Math.round(history.reduce((sum, row) => sum + row.score, 0) / attempts) : 0;
    const answered = history.reduce((sum, row) => sum + row.total, 0);
    const best = history.reduce((top, row) => Math.max(top, row.score), 0);
    return { attempts, avg, answered, best };
  }, [history]);

  function persistTheme(nextDark) {
    setDark(nextDark);
    localStorage.setItem('certforge-theme', nextDark ? 'dark' : 'light');
  }

  function saveHistory(next) {
    setHistory(next);
    localStorage.setItem(storageKeys.history, JSON.stringify(next));
  }

  function saveFlagged(next) {
    setFlagged(next);
    localStorage.setItem(storageKeys.flagged, JSON.stringify(next));
  }

  function saveWeak(next) {
    setWeak(next);
    localStorage.setItem(storageKeys.weak, JSON.stringify(next));
  }

  function createPool(mode, partIndex = null) {
    if (partIndex !== null) {
      const start = partStarts[partIndex];
      return Array.from({ length: partSizes[partIndex] }, (_, index) => start + index);
    }
    if (mode === 'flagged') return flagged;
    if (mode === 'weak') return Object.keys(weak).map(Number);
    if (mode === 'multi') return gh300Questions.map((_, index) => index).filter((index) => gh300Questions[index].multiple);
    return gh300Questions.map((_, index) => index);
  }

  function startQuiz({ mode = 'random', count = 20, partIndex = null, label }) {
    const base = createPool(mode, partIndex);
    if (!base.length) return;
    const indices = shuffle(base).slice(0, count === 'all' ? base.length : Math.min(count, base.length));
    setSession({
      label: label ?? `${mode === 'random' ? 'Random' : mode} · ${indices.length}`,
      indices,
      current: 0,
      answers: indices.map(() => []),
      checked: indices.map(() => false),
      finished: false
    });
    setRoute('gh-300');
  }

  function toggleChoice(choiceIndex) {
    setSession((current) => {
      if (!current || current.checked[current.current]) return current;
      const question = gh300Questions[current.indices[current.current]];
      const answers = current.answers.map((answer) => [...answer]);
      const selected = answers[current.current];
      if (question.multiple) {
        answers[current.current] = selected.includes(choiceIndex)
          ? selected.filter((item) => item !== choiceIndex)
          : [...selected, choiceIndex];
      } else {
        answers[current.current] = [choiceIndex];
      }
      return { ...current, answers };
    });
  }

  function checkCurrent() {
    setSession((current) => {
      if (!current || !current.answers[current.current].length) return current;
      const checked = [...current.checked];
      checked[current.current] = true;
      return { ...current, checked };
    });
  }

  function moveQuestion(delta) {
    setSession((current) => {
      if (!current) return current;
      return { ...current, current: Math.max(0, Math.min(current.indices.length - 1, current.current + delta)) };
    });
  }

  function finishQuiz() {
    if (!session) return;
    const correct = session.indices.reduce((sum, questionIndex, index) => {
      return sum + (sameAnswer(session.answers[index], gh300Questions[questionIndex].correct) ? 1 : 0);
    }, 0);
    const missed = { ...weak };
    session.indices.forEach((questionIndex, index) => {
      if (sameAnswer(session.answers[index], gh300Questions[questionIndex].correct)) {
        if (missed[questionIndex]) missed[questionIndex] -= 1;
        if (missed[questionIndex] <= 0) delete missed[questionIndex];
      } else {
        missed[questionIndex] = (missed[questionIndex] ?? 0) + 1;
      }
    });
    saveWeak(missed);
    saveHistory([
      ...history,
      {
        id: crypto.randomUUID(),
        label: session.label,
        total: session.indices.length,
        correct,
        score: percent(correct, session.indices.length),
        date: new Date().toISOString()
      }
    ].slice(-80));
    setSession({ ...session, finished: true });
  }

  function toggleFlag(questionIndex) {
    const next = flagged.includes(questionIndex)
      ? flagged.filter((item) => item !== questionIndex)
      : [...flagged, questionIndex];
    saveFlagged(next);
  }

  function startFlash(mode = 'all') {
    const pool = mode === 'weak' ? Object.keys(weak).map(Number) : mode === 'flagged' ? flagged : gh300Questions.map((_, i) => i);
    if (!pool.length) return;
    setFlash({ pool: shuffle(pool).slice(0, 40), current: 0, flipped: false, known: 0, review: 0 });
    setRoute('flashcards');
  }

  function exportData() {
    const payload = {
      version: 1,
      exportedAt: new Date().toISOString(),
      history,
      flagged,
      weak
    };
    const url = URL.createObjectURL(new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' }));
    const link = document.createElement('a');
    link.href = url;
    link.download = `certforge-progress-${new Date().toISOString().slice(0, 10)}.json`;
    link.click();
    URL.revokeObjectURL(url);
  }

  function importData(event) {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const payload = JSON.parse(reader.result);
      saveHistory(payload.history ?? []);
      saveFlagged(payload.flagged ?? []);
      saveWeak(payload.weak ?? {});
    };
    reader.readAsText(file);
    event.target.value = '';
  }

  const currentQuestion = session ? gh300Questions[session.indices[session.current]] : null;
  const shellClass = dark ? 'dark' : '';

  return (
    <div className={shellClass}>
      <div className="min-h-screen bg-canvas text-ink transition dark:bg-[#111827] dark:text-slate-100">
        <aside className="fixed inset-y-0 left-0 z-20 hidden w-64 border-r border-line bg-white px-4 py-5 dark:border-slate-700 dark:bg-slate-900 lg:block">
          <button className="mb-8 flex items-center gap-3" onClick={() => setRoute('dashboard')}>
            <span className="grid h-10 w-10 place-items-center rounded-lg bg-ink text-white dark:bg-brand-500">
              <GraduationCap size={22} />
            </span>
            <span className="text-left">
              <span className="block text-sm font-bold">CertForge</span>
              <span className="text-xs text-muted dark:text-slate-400">Practice workspace</span>
            </span>
          </button>
          <NavButton active={route === 'dashboard'} icon={BarChart3} label="Dashboard" onClick={() => setRoute('dashboard')} />
          <NavButton active={route === 'catalog'} icon={Layers3} label="Cert catalog" onClick={() => setRoute('catalog')} />
          <NavButton active={route === 'gh-300'} icon={ClipboardList} label="GH-300 practice" onClick={() => setRoute('gh-300')} />
          <NavButton active={route === 'flashcards'} icon={Brain} label="Flashcards" onClick={() => startFlash()} />
          <NavButton active={route === 'library'} icon={BookOpen} label="Question library" onClick={() => setRoute('library')} />
        </aside>

        <main className="lg:pl-64">
          <header className="sticky top-0 z-10 border-b border-line bg-white/90 px-4 py-3 backdrop-blur dark:border-slate-700 dark:bg-slate-900/90 sm:px-6">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-600 dark:text-brand-100">Modern FE cert hub</p>
                <h1 className="text-lg font-bold sm:text-2xl">Train once, scale to every certification</h1>
              </div>
              <div className="flex items-center gap-2">
                <button className="icon-button" onClick={() => persistTheme(!dark)} title="Toggle theme">
                  {dark ? <Sparkles size={18} /> : <Moon size={18} />}
                </button>
                <button className="icon-button" onClick={exportData} title="Export progress">
                  <Download size={18} />
                </button>
                <label className="icon-button cursor-pointer" title="Import progress">
                  <Upload size={18} />
                  <input className="hidden" type="file" accept="application/json" onChange={importData} />
                </label>
              </div>
            </div>
            <nav className="mt-3 flex gap-2 overflow-x-auto lg:hidden">
              {[
                ['dashboard', 'Dashboard'],
                ['catalog', 'Catalog'],
                ['gh-300', 'GH-300'],
                ['flashcards', 'Cards'],
                ['library', 'Library']
              ].map(([id, label]) => (
                <button key={id} className={`mobile-tab ${route === id ? 'mobile-tab-active' : ''}`} onClick={() => (id === 'flashcards' ? startFlash() : setRoute(id))}>
                  {label}
                </button>
              ))}
            </nav>
          </header>

          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
            {route === 'dashboard' && <Dashboard stats={stats} history={history} startQuiz={startQuiz} startFlash={startFlash} />}
            {route === 'catalog' && <Catalog startQuiz={startQuiz} />}
            {route === 'gh-300' && (
              <Practice
                currentQuestion={currentQuestion}
                flagged={flagged}
                session={session}
                startQuiz={startQuiz}
                checkCurrent={checkCurrent}
                toggleChoice={toggleChoice}
                toggleFlag={toggleFlag}
                moveQuestion={moveQuestion}
                finishQuiz={finishQuiz}
                setSession={setSession}
              />
            )}
            {route === 'flashcards' && <Flashcards flash={flash} setFlash={setFlash} startFlash={startFlash} flagged={flagged} weak={weak} />}
            {route === 'library' && <Library search={search} setSearch={setSearch} flagged={flagged} toggleFlag={toggleFlag} />}
          </div>
        </main>
      </div>
    </div>
  );
}

function NavButton({ active, icon: Icon, label, onClick }) {
  return (
    <button className={`nav-button ${active ? 'nav-button-active' : ''}`} onClick={onClick}>
      <Icon size={18} />
      {label}
    </button>
  );
}

function Dashboard({ stats, history, startQuiz, startFlash }) {
  return (
    <section className="space-y-6">
      <div className="grid gap-4 md:grid-cols-4">
        <Metric label="Attempts" value={stats.attempts} icon={Award} />
        <Metric label="Average score" value={`${stats.avg}%`} icon={BarChart3} />
        <Metric label="Questions answered" value={stats.answered} icon={ClipboardList} />
        <Metric label="Best score" value={`${stats.best}%`} icon={Sparkles} />
      </div>
      <div className="grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="panel p-5 sm:p-6">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="section-kicker">Featured path</p>
              <h2 className="text-2xl font-bold">GH-300 GitHub Copilot certification</h2>
              <p className="mt-2 max-w-2xl text-sm text-muted dark:text-slate-400">
                337 migrated questions, practice modes, flashcards, weak-area review, flags, and progress export are ready.
              </p>
            </div>
            <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-bold text-brand-700 dark:bg-brand-500/20 dark:text-brand-100">Production ready</span>
          </div>
          <div className="grid gap-3 sm:grid-cols-4">
            <ActionButton icon={Play} label="Random 20" onClick={() => startQuiz({ count: 20, label: 'GH-300 · Random 20' })} />
            <ActionButton icon={Brain} label="Weak areas" onClick={() => startQuiz({ mode: 'weak', count: 'all', label: 'GH-300 · Weak areas' })} />
            <ActionButton icon={Flag} label="Flagged" onClick={() => startQuiz({ mode: 'flagged', count: 'all', label: 'GH-300 · Flagged' })} />
            <ActionButton icon={BookOpen} label="Flashcards" onClick={() => startFlash('all')} />
          </div>
        </div>
        <HistoryPanel history={history} />
      </div>
      <PartGrid startQuiz={startQuiz} />
    </section>
  );
}

function Metric({ label, value, icon: Icon }) {
  return (
    <div className="panel flex items-center gap-4 p-4">
      <span className="grid h-11 w-11 place-items-center rounded-lg bg-brand-50 text-brand-600 dark:bg-brand-500/20 dark:text-brand-100">
        <Icon size={20} />
      </span>
      <div>
        <p className="text-2xl font-bold">{value}</p>
        <p className="text-xs text-muted dark:text-slate-400">{label}</p>
      </div>
    </div>
  );
}

function Catalog({ startQuiz }) {
  return (
    <section className="space-y-4">
      <div>
        <p className="section-kicker">Certification catalog</p>
        <h2 className="text-2xl font-bold">A frontend-first cert platform</h2>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {certifications.map((cert) => (
          <article className="panel p-5" key={cert.id}>
            <div className="mb-5 flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-bold text-muted dark:text-slate-400">{cert.provider}</p>
                <h3 className="mt-1 text-xl font-bold">{cert.exam}</h3>
                <p className="text-sm">{cert.name}</p>
              </div>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold dark:bg-slate-800">{cert.status}</span>
            </div>
            <div className="mb-5 grid grid-cols-2 gap-3 text-sm">
              <div className="rounded-lg bg-canvas p-3 dark:bg-slate-800">
                <p className="text-xs text-muted dark:text-slate-400">Level</p>
                <p className="font-semibold">{cert.level}</p>
              </div>
              <div className="rounded-lg bg-canvas p-3 dark:bg-slate-800">
                <p className="text-xs text-muted dark:text-slate-400">Questions</p>
                <p className="font-semibold">{cert.questions || 'Seed data'}</p>
              </div>
            </div>
            <button className="primary-button w-full" disabled={cert.id !== 'gh-300'} onClick={() => startQuiz({ count: 20, label: 'GH-300 · Random 20' })}>
              <Play size={16} />
              {cert.id === 'gh-300' ? 'Start practice' : 'Add question set'}
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}

function Practice({ currentQuestion, flagged, session, startQuiz, checkCurrent, toggleChoice, toggleFlag, moveQuestion, finishQuiz, setSession }) {
  if (!session) {
    return (
      <section className="space-y-5">
        <div>
          <p className="section-kicker">GH-300 practice</p>
          <h2 className="text-2xl font-bold">Choose a practice mode</h2>
        </div>
        <div className="grid gap-3 sm:grid-cols-4">
          {[10, 20, 50, 100].map((count) => (
            <ActionButton key={count} icon={Play} label={`Random ${count}`} onClick={() => startQuiz({ count, label: `GH-300 · Random ${count}` })} />
          ))}
          <ActionButton icon={ClipboardList} label="Full bank" onClick={() => startQuiz({ count: 'all', label: 'GH-300 · Full bank' })} />
          <ActionButton icon={Layers3} label="Multi-answer" onClick={() => startQuiz({ mode: 'multi', count: 'all', label: 'GH-300 · Multi-answer' })} />
          <ActionButton icon={Brain} label="Weak areas" onClick={() => startQuiz({ mode: 'weak', count: 'all', label: 'GH-300 · Weak areas' })} />
          <ActionButton icon={Flag} label="Flagged" onClick={() => startQuiz({ mode: 'flagged', count: 'all', label: 'GH-300 · Flagged' })} />
        </div>
        <PartGrid startQuiz={startQuiz} />
      </section>
    );
  }

  if (session.finished) {
    const correct = session.indices.filter((questionIndex, index) => sameAnswer(session.answers[index], gh300Questions[questionIndex].correct)).length;
    return (
      <section className="panel mx-auto max-w-3xl p-6 text-center">
        <p className="section-kicker">Completed</p>
        <h2 className="mt-2 text-3xl font-bold">{percent(correct, session.indices.length)}%</h2>
        <p className="mt-2 text-muted dark:text-slate-400">{correct} correct out of {session.indices.length}</p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <button className="primary-button" onClick={() => setSession(null)}>
            <RotateCcw size={16} />
            New session
          </button>
        </div>
      </section>
    );
  }

  const questionIndex = session.indices[session.current];
  const selected = session.answers[session.current];
  const checked = session.checked[session.current];
  const isFlagged = flagged.includes(questionIndex);

  return (
    <section className="grid gap-5 xl:grid-cols-[1fr_320px]">
      <div className="panel p-5 sm:p-6">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="section-kicker">{session.label}</p>
            <h2 className="text-xl font-bold">Question {session.current + 1} of {session.indices.length}</h2>
          </div>
          <button className={`icon-button ${isFlagged ? 'text-coral-600' : ''}`} onClick={() => toggleFlag(questionIndex)} title="Flag question">
            <Flag size={18} fill={isFlagged ? 'currentColor' : 'none'} />
          </button>
        </div>
        <div className="mb-5 h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
          <div className="h-full rounded-full bg-brand-500" style={{ width: `${percent(session.current + 1, session.indices.length)}%` }} />
        </div>
        <p className="mb-5 text-lg font-semibold leading-relaxed">{currentQuestion.text}</p>
        <div className="space-y-3">
          {currentQuestion.choices.map((choice, index) => {
            const chosen = selected.includes(index);
            const correct = currentQuestion.correct.includes(index);
            const stateClass = checked && correct ? 'answer-correct' : checked && chosen && !correct ? 'answer-wrong' : chosen ? 'answer-selected' : '';
            return (
              <button key={choice} className={`answer ${stateClass}`} onClick={() => toggleChoice(index)}>
                <span className="answer-letter">{String.fromCharCode(65 + index)}</span>
                <span>{choice}</span>
              </button>
            );
          })}
        </div>
        {checked && (
          <div className="mt-5 rounded-lg bg-brand-50 p-4 text-sm text-brand-700 dark:bg-brand-500/15 dark:text-brand-100">
            Correct answer: {currentQuestion.correct.map((item) => String.fromCharCode(65 + item)).join(', ')}
          </div>
        )}
        <div className="mt-6 flex flex-wrap gap-3">
          <button className="secondary-button" onClick={() => moveQuestion(-1)} disabled={session.current === 0}>
            <ChevronLeft size={16} />
            Previous
          </button>
          <button className="primary-button" onClick={checkCurrent} disabled={!selected.length || checked}>
            <Check size={16} />
            Check
          </button>
          <button className="secondary-button" onClick={() => moveQuestion(1)} disabled={session.current === session.indices.length - 1}>
            Next
            <ChevronRight size={16} />
          </button>
          <button className="danger-button ml-auto" onClick={finishQuiz}>
            Finish quiz
          </button>
        </div>
      </div>
      <QuestionMap session={session} setSession={setSession} />
    </section>
  );
}

function QuestionMap({ session, setSession }) {
  return (
    <aside className="panel h-fit p-4">
      <h3 className="mb-3 text-sm font-bold">Session map</h3>
      <div className="grid grid-cols-8 gap-2">
        {session.indices.map((questionIndex, index) => {
          const done = session.checked[index];
          const ok = done && sameAnswer(session.answers[index], gh300Questions[questionIndex].correct);
          return (
            <button
              key={`${questionIndex}-${index}`}
              className={`grid h-8 place-items-center rounded-md border text-xs font-bold ${session.current === index ? 'border-brand-500 bg-brand-50 text-brand-700 dark:bg-brand-500/20 dark:text-brand-100' : done ? (ok ? 'border-brand-200 bg-brand-50 text-brand-700 dark:border-brand-500/30 dark:bg-brand-500/15' : 'border-coral-500 bg-coral-50 text-coral-600') : 'border-line bg-white dark:border-slate-700 dark:bg-slate-800'}`}
              onClick={() => setSession({ ...session, current: index })}
            >
              {index + 1}
            </button>
          );
        })}
      </div>
    </aside>
  );
}

function Flashcards({ flash, setFlash, startFlash, flagged, weak }) {
  if (!flash) {
    return (
      <section className="space-y-5">
        <div>
          <p className="section-kicker">Flashcards</p>
          <h2 className="text-2xl font-bold">Review questions as cards</h2>
        </div>
        <div className="grid gap-3 sm:grid-cols-3">
          <ActionButton icon={BookOpen} label="All cards" onClick={() => startFlash('all')} />
          <ActionButton icon={Brain} label={`Weak (${Object.keys(weak).length})`} onClick={() => startFlash('weak')} />
          <ActionButton icon={Flag} label={`Flagged (${flagged.length})`} onClick={() => startFlash('flagged')} />
        </div>
      </section>
    );
  }
  const question = gh300Questions[flash.pool[flash.current]];
  return (
    <section className="mx-auto max-w-3xl">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="section-kicker">Flashcards</p>
          <h2 className="text-xl font-bold">{flash.current + 1} of {flash.pool.length}</h2>
        </div>
        <button className="icon-button" onClick={() => setFlash(null)} title="Close">
          <X size={18} />
        </button>
      </div>
      <button className="panel min-h-[360px] w-full p-6 text-left" onClick={() => setFlash({ ...flash, flipped: !flash.flipped })}>
        {!flash.flipped ? (
          <>
            <p className="section-kicker">Question</p>
            <p className="mt-4 text-xl font-semibold leading-relaxed">{question.text}</p>
          </>
        ) : (
          <>
            <p className="section-kicker">Answer</p>
            <div className="mt-4 space-y-3">
              {question.correct.map((index) => (
                <div className="rounded-lg border border-brand-100 bg-brand-50 p-3 text-brand-700 dark:border-brand-500/30 dark:bg-brand-500/15 dark:text-brand-100" key={index}>
                  {String.fromCharCode(65 + index)}. {question.choices[index]}
                </div>
              ))}
            </div>
          </>
        )}
      </button>
      <div className="mt-4 flex flex-wrap gap-3">
        <button className="secondary-button" onClick={() => setFlash({ ...flash, current: Math.max(0, flash.current - 1), flipped: false })}>
          <ChevronLeft size={16} />
          Previous
        </button>
        <button className="primary-button" onClick={() => setFlash({ ...flash, current: Math.min(flash.pool.length - 1, flash.current + 1), flipped: false, known: flash.known + 1 })}>
          <Check size={16} />
          I know this
        </button>
        <button className="danger-button" onClick={() => setFlash({ ...flash, current: Math.min(flash.pool.length - 1, flash.current + 1), flipped: false, review: flash.review + 1 })}>
          Review again
        </button>
      </div>
    </section>
  );
}

function Library({ search, setSearch, flagged, toggleFlag }) {
  const filtered = gh300Questions
    .map((question, index) => ({ ...question, index }))
    .filter((question) => !search.trim() || `${question.text} ${question.choices.join(' ')}`.toLowerCase().includes(search.toLowerCase()));
  return (
    <section className="space-y-4">
      <div>
        <p className="section-kicker">Question library</p>
        <h2 className="text-2xl font-bold">Browse GH-300 bank</h2>
      </div>
      <div className="panel flex items-center gap-3 p-3">
        <Search className="text-muted" size={18} />
        <input className="w-full bg-transparent text-sm outline-none" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search questions, choices, or concepts" />
      </div>
      <div className="grid gap-3">
        {filtered.slice(0, 80).map((question) => (
          <article className="panel p-4" key={question.index}>
            <div className="mb-2 flex items-start justify-between gap-3">
              <p className="text-sm font-semibold">Q{question.index + 1}. {question.text}</p>
              <button className={`icon-button shrink-0 ${flagged.includes(question.index) ? 'text-coral-600' : ''}`} onClick={() => toggleFlag(question.index)} title="Flag">
                <Flag size={16} fill={flagged.includes(question.index) ? 'currentColor' : 'none'} />
              </button>
            </div>
            <p className="text-xs text-muted dark:text-slate-400">
              {question.multiple ? 'Multiple answer' : 'Single answer'} · Correct: {question.correct.map((item) => String.fromCharCode(65 + item)).join(', ')}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}

function PartGrid({ startQuiz }) {
  return (
    <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
      {partSizes.map((size, index) => (
        <button className="panel p-4 text-left transition hover:-translate-y-0.5 hover:shadow-soft" key={partTitles[index]} onClick={() => startQuiz({ partIndex: index, count: 'all', label: `GH-300 · Part ${index + 1}` })}>
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-muted dark:text-slate-400">Part {index + 1}</p>
          <h3 className="mt-2 font-bold">{partTitles[index]}</h3>
          <p className="mt-2 text-sm text-muted dark:text-slate-400">{size} questions</p>
        </button>
      ))}
    </div>
  );
}

function HistoryPanel({ history }) {
  return (
    <div className="panel p-5">
      <h3 className="mb-4 font-bold">Recent attempts</h3>
      {!history.length && <p className="text-sm text-muted dark:text-slate-400">No attempts yet.</p>}
      <div className="space-y-3">
        {history.slice(-6).reverse().map((row) => (
          <div className="flex items-center justify-between border-b border-line pb-3 last:border-0 dark:border-slate-700" key={row.id}>
            <div>
              <p className="text-sm font-semibold">{row.label}</p>
              <p className="text-xs text-muted dark:text-slate-400">{new Date(row.date).toLocaleDateString()}</p>
            </div>
            <span className={`font-bold ${row.score >= 70 ? 'text-brand-600 dark:text-brand-100' : 'text-coral-600'}`}>{row.score}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ActionButton({ icon: Icon, label, onClick }) {
  return (
    <button className="panel flex items-center gap-3 p-4 text-left transition hover:-translate-y-0.5 hover:shadow-soft" onClick={onClick}>
      <span className="grid h-10 w-10 place-items-center rounded-lg bg-brand-50 text-brand-600 dark:bg-brand-500/20 dark:text-brand-100">
        <Icon size={18} />
      </span>
      <span className="font-semibold">{label}</span>
    </button>
  );
}

createRoot(document.getElementById('root')).render(<App />);
