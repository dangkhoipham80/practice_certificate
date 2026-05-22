import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  ArrowRight,
  Award,
  BarChart3,
  BookOpen,
  Brain,
  Check,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  ClipboardList,
  Copy,
  Download,
  Eye,
  Flag,
  Layers3,
  Moon,
  Play,
  RotateCcw,
  Save,
  Search,
  Sparkles,
  Sun,
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
    status: 'Ready'
  },
  {
    id: 'az-900',
    name: 'Azure Fundamentals',
    exam: 'AZ-900',
    provider: 'Microsoft',
    level: 'Fundamentals',
    questions: 0,
    status: 'Coming next'
  },
  {
    id: 'aws-clf',
    name: 'AWS Cloud Practitioner',
    exam: 'CLF-C02',
    provider: 'AWS',
    level: 'Foundational',
    questions: 0,
    status: 'Template'
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
  savedQuiz: 'certforge-gh300-progress',
  flagged: 'certforge-gh300-flagged',
  weak: 'certforge-gh300-weak',
  partProgress: 'certforge-gh300-part-progress',
  fcKnown: 'certforge-gh300-fc-known',
  fcUnknown: 'certforge-gh300-fc-unknown'
};

const GRID_PAGE_SIZE = 50;

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

function getPartIndex(questionIndex) {
  for (let part = partStarts.length - 1; part >= 0; part -= 1) {
    if (questionIndex >= partStarts[part]) return part;
  }
  return 0;
}

function formatTimer(seconds = 0) {
  const mins = String(Math.floor(seconds / 60)).padStart(2, '0');
  const secs = String(seconds % 60).padStart(2, '0');
  return `${mins}:${secs}`;
}

function applyWeakDelta(weakMap, questionIndex, isCorrect) {
  const next = { ...weakMap };
  if (isCorrect) {
    if (next[questionIndex]) {
      next[questionIndex] -= 1;
      if (next[questionIndex] <= 0) delete next[questionIndex];
    }
  } else {
    next[questionIndex] = (next[questionIndex] ?? 0) + 1;
  }
  return next;
}

function getWrongIndices(partProgress) {
  const wrong = [];
  partSizes.forEach((size, partIndex) => {
    const rows = partProgress[partIndex];
    if (!rows) return;
    rows.forEach((value, localIndex) => {
      if (value === 'wrong') wrong.push(partStarts[partIndex] + localIndex);
    });
  });
  return wrong;
}

function getUnansweredIndices(partProgress) {
  const unanswered = [];
  partSizes.forEach((size, partIndex) => {
    const rows = partProgress[partIndex];
    if (!rows) {
      for (let i = 0; i < size; i += 1) unanswered.push(partStarts[partIndex] + i);
      return;
    }
    rows.forEach((value, localIndex) => {
      if (value === null || value === undefined) unanswered.push(partStarts[partIndex] + localIndex);
    });
  });
  return unanswered;
}

function updatePartProgressFromSession(partProgress, session) {
  const next = { ...partProgress };
  session.indices.forEach((questionIndex, slot) => {
    if (!session.answers[slot].length) return;
    const partIndex = getPartIndex(questionIndex);
    const localIndex = questionIndex - partStarts[partIndex];
    if (!next[partIndex]) next[partIndex] = new Array(partSizes[partIndex]).fill(null);
    const ok = sameAnswer(session.answers[slot], gh300Questions[questionIndex].correct);
    next[partIndex] = [...next[partIndex]];
    next[partIndex][localIndex] = ok ? 'correct' : 'wrong';
  });
  return next;
}

function getInProgressQuiz(activeSession) {
  if (activeSession && !activeSession.finished) return activeSession;
  const saved = readJson(storageKeys.savedQuiz, null);
  if (saved?.indices?.length && !saved.finished) return saved;
  return null;
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
  const [partProgress, setPartProgress] = useState(() => readJson(storageKeys.partProgress, {}));
  const [saveHint, setSaveHint] = useState('');
  const [pendingStart, setPendingStart] = useState(null);
  const hasSavedQuiz = useMemo(() => !!getInProgressQuiz(session), [session, saveHint]);

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

  function savePartProgress(next) {
    setPartProgress(next);
    localStorage.setItem(storageKeys.partProgress, JSON.stringify(next));
  }

  function createPool(mode, partIndex = null) {
    if (partIndex !== null) {
      const start = partStarts[partIndex];
      return Array.from({ length: partSizes[partIndex] }, (_, index) => start + index);
    }
    if (mode === 'flagged') return flagged.filter((index) => index < gh300Questions.length);
    if (mode === 'weak') return Object.keys(weak).map(Number);
    if (mode === 'wrong') return getWrongIndices(partProgress);
    if (mode === 'unanswered') return getUnansweredIndices(partProgress);
    if (mode === 'multi') return gh300Questions.map((_, index) => index).filter((index) => gh300Questions[index].multiple);
    return gh300Questions.map((_, index) => index);
  }

  function startQuiz({ mode = 'random', count = 20, partIndex = null, label, shufflePool = true, customIndices = null }) {
    const base = customIndices ?? createPool(mode, partIndex);
    if (!base.length) {
      if (mode === 'wrong') window.alert('Chưa có câu sai nào! Hãy hoàn thành quiz trước.');
      if (mode === 'unanswered') window.alert('Tất cả câu hỏi đã được trả lời!');
      if (mode === 'flagged') window.alert('No flagged questions yet. Use the flag button during a quiz.');
      return;
    }
    const ordered = customIndices ? [...customIndices] : shufflePool ? shuffle(base) : [...base];
    const indices = ordered.slice(0, count === 'all' ? ordered.length : Math.min(count, ordered.length));
    localStorage.removeItem(storageKeys.savedQuiz);
    setSaveHint('');
    setSession({
      label: label ?? `${mode === 'random' ? 'Random' : mode} - ${indices.length}`,
      indices,
      current: 0,
      answers: indices.map(() => []),
      checked: indices.map(() => false),
      finished: false,
      timerSec: 0
    });
    setRoute('gh-300');
  }

  function requestStartQuiz(options) {
    const inProgress = getInProgressQuiz(session);
    if (inProgress) {
      setPendingStart({ options, inProgress });
      return;
    }
    startQuiz(options);
  }

  function continueInProgressQuiz() {
    const inProgress = pendingStart?.inProgress ?? getInProgressQuiz(session);
    setPendingStart(null);
    if (!inProgress) return;
    if (session && !session.finished) {
      setRoute('gh-300');
      return;
    }
    setSession({ ...inProgress, finished: false, wrongSlots: undefined });
    setRoute('gh-300');
  }

  function confirmStartFresh() {
    if (!pendingStart) return;
    const options = pendingStart.options;
    setPendingStart(null);
    startQuiz(options);
  }

  function resolveCurrentAttempt(current) {
    const slot = current.current;
    const questionIndex = current.indices[slot];
    const ok = sameAnswer(current.answers[slot], gh300Questions[questionIndex].correct);
    setWeak((prev) => {
      const next = applyWeakDelta(prev, questionIndex, ok);
      localStorage.setItem(storageKeys.weak, JSON.stringify(next));
      return next;
    });
    return ok;
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
      if (!current || current.checked[current.current] || !current.answers[current.current].length) return current;
      resolveCurrentAttempt(current);
      const checked = [...current.checked];
      checked[current.current] = true;
      return { ...current, checked };
    });
  }

  function revealCurrent() {
    setSession((current) => {
      if (!current || current.checked[current.current]) return current;
      resolveCurrentAttempt(current);
      const checked = [...current.checked];
      checked[current.current] = true;
      return { ...current, checked };
    });
  }

  function retryCurrent() {
    setSession((current) => {
      if (!current || !current.checked[current.current]) return current;
      const answers = current.answers.map((answer) => [...answer]);
      const checked = [...current.checked];
      answers[current.current] = [];
      checked[current.current] = false;
      return { ...current, answers, checked };
    });
  }

  function moveQuestion(delta) {
    setSession((current) => {
      if (!current) return current;
      return { ...current, current: Math.max(0, Math.min(current.indices.length - 1, current.current + delta)) };
    });
  }

  function submitQuiz() {
    if (!session) return;
    const wrongSlots = [];
    let correct = 0;
    session.indices.forEach((questionIndex, slot) => {
      const ok = sameAnswer(session.answers[slot], gh300Questions[questionIndex].correct);
      if (ok) correct += 1;
      else wrongSlots.push(slot);
    });
    savePartProgress(updatePartProgressFromSession(partProgress, session));
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
    localStorage.removeItem(storageKeys.savedQuiz);
    setSaveHint('');
    setSession({ ...session, finished: true, wrongSlots });
  }

  function retakeQuiz() {
    if (!session) return;
    setSession({
      ...session,
      current: 0,
      answers: session.indices.map(() => []),
      checked: session.indices.map(() => false),
      finished: false,
      wrongSlots: undefined,
      timerSec: 0
    });
  }

  function retryWrongFromSummary() {
    if (!session?.wrongSlots?.length) return;
    const indices = session.wrongSlots.map((slot) => session.indices[slot]);
    setSession({
      label: `Retry Wrong · ${indices.length}`,
      indices,
      current: 0,
      answers: indices.map(() => []),
      checked: indices.map(() => false),
      finished: false,
      timerSec: 0
    });
  }

  function saveQuizProgress() {
    if (!session || session.finished) return;
    localStorage.setItem(storageKeys.savedQuiz, JSON.stringify(session));
    setSaveHint('saved');
    window.setTimeout(() => setSaveHint(''), 1500);
  }

  function resumeQuiz() {
    setPendingStart(null);
    continueInProgressQuiz();
  }

  function exitQuiz() {
    localStorage.removeItem(storageKeys.savedQuiz);
    setSaveHint('');
    setSession(null);
  }

  function reviewFlaggedInSession() {
    if (!session) return;
    const slot = session.indices.findIndex((questionIndex) => flagged.includes(questionIndex));
    if (slot < 0) {
      window.alert('No flagged questions in this session.');
      return;
    }
    setSession({ ...session, current: slot });
  }

  function copyQuizResults() {
    if (!session?.finished) return;
    const correct = session.indices.length - (session.wrongSlots?.length ?? 0);
    const text = [
      '📋 GH-300 Quiz Results',
      '━━━━━━━━━━━━━━━━━━━━━',
      `Quiz: ${session.label}`,
      `Score: ${percent(correct, session.indices.length)}% (${correct}/${session.indices.length})`,
      `Wrong: ${session.wrongSlots?.length ?? 0}`,
      `Time: ${formatTimer(session.timerSec)}`,
      `Date: ${new Date().toLocaleString()}`
    ].join('\n');
    navigator.clipboard.writeText(text);
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
      weak,
      partProgress
    };
    const url = URL.createObjectURL(new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' }));
    const link = document.createElement('a');
    link.href = url;
    link.download = `certforge-progress-${new Date().toISOString().slice(0, 10)}.json`;
    link.click();
    URL.revokeObjectURL(url);
  }

  useEffect(() => {
    if (!session || session.finished) return;
    localStorage.setItem(storageKeys.savedQuiz, JSON.stringify(session));
  }, [session]);

  useEffect(() => {
    if (!session || session.finished) return undefined;
    const timer = window.setInterval(() => {
      setSession((current) => (current && !current.finished ? { ...current, timerSec: (current.timerSec ?? 0) + 1 } : current));
    }, 1000);
    return () => window.clearInterval(timer);
  }, [session?.finished, session?.label]);

  useEffect(() => {
    function onKeyDown(event) {
      if (event.target.tagName === 'INPUT' || event.target.tagName === 'TEXTAREA') return;
      if (route !== 'gh-300' || !session || session.finished) return;
      if (event.key === 'ArrowRight' || event.key === 'n') moveQuestion(1);
      if (event.key === 'ArrowLeft' || event.key === 'p') moveQuestion(-1);
      if ((event.key === 'Enter' || event.key === 'c') && !event.ctrlKey && !event.metaKey) checkCurrent();
    }
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [route, session]);

  function importData(event) {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const payload = JSON.parse(reader.result);
      saveHistory(payload.history ?? []);
      saveFlagged(payload.flagged ?? []);
      saveWeak(payload.weak ?? {});
      if (payload.partProgress) savePartProgress(payload.partProgress);
    };
    reader.readAsText(file);
    event.target.value = '';
  }

  const currentQuestion = session ? gh300Questions[session.indices[session.current]] : null;
  const shellClass = dark ? 'dark' : '';
  const pageTitle = {
    dashboard: 'GH-300 workspace',
    catalog: 'Certification catalog',
    'gh-300': session ? session.label : 'GH-300 practice',
    flashcards: flash ? 'Flashcard deck' : 'Flashcards',
    library: 'Question library'
  }[route];

  return (
    <div className={shellClass}>
      <div className="app-shell">
        <aside className="sidebar">
          <button className="sidebar-brand" onClick={() => setRoute('dashboard')}>
            <span className="sidebar-logo">
              <Award size={22} />
            </span>
            <span>
              <span className="block text-base font-extrabold tracking-tight">CertForge</span>
              <span className="text-xs text-muted dark:text-slate-400">Certification workspace</span>
            </span>
          </button>
          <div className="sidebar-section">Workspace</div>
          <nav className="flex-1 space-y-0.5">
            <NavButton active={route === 'dashboard'} icon={BarChart3} label="Dashboard" onClick={() => setRoute('dashboard')} />
            <NavButton active={route === 'catalog'} icon={Layers3} label="Cert catalog" onClick={() => setRoute('catalog')} />
            <NavButton active={route === 'gh-300'} icon={ClipboardList} label="GH-300 practice" onClick={() => setRoute('gh-300')} />
            <NavButton active={route === 'flashcards'} icon={Brain} label="Flashcards" onClick={() => startFlash()} />
            <NavButton active={route === 'library'} icon={BookOpen} label="Question library" onClick={() => setRoute('library')} />
          </nav>
          <div className="mt-auto rounded-2xl border border-line/70 bg-subtle/60 p-4 dark:border-gh-border dark:bg-gh-subtle/40">
            <p className="text-xs font-bold text-ink dark:text-slate-200">GH-300 ready</p>
            <p className="mt-1 text-xs text-muted dark:text-slate-400">{gh300Questions.length} questions in bank</p>
            <button className="primary-button mt-3 w-full" onClick={() => requestStartQuiz({ count: 20, label: 'GH-300 - Random 20' })}>
              <Play size={16} />
              Quick start
            </button>
          </div>
        </aside>

        <main className="relative z-[1] lg:pl-[272px]">
          <header className="main-header">
            <div className="grid items-center gap-3 lg:grid-cols-[1fr_minmax(280px,420px)_auto]">
              <div className="min-w-0">
                <p className="section-kicker !text-[10px]">CertForge</p>
                <h1 className="truncate text-xl font-extrabold tracking-tight">{pageTitle}</h1>
              </div>
              <button className="command-bar hidden lg:flex" onClick={() => setRoute('library')}>
                <Search size={16} className="shrink-0 text-accent-500" />
                <span className="min-w-0 flex-1 truncate text-left">Search questions, answers, exam concepts</span>
                <kbd>/</kbd>
              </button>
              <div className="flex items-center gap-2">
                <button className="icon-button" onClick={() => persistTheme(!dark)} title="Toggle theme">
                  {dark ? <Sun size={18} /> : <Moon size={18} />}
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
            <nav className="mt-3 flex gap-2 overflow-x-auto pb-0.5 lg:hidden">
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

          <div className="page-content">
            {route === 'dashboard' && (
              <Dashboard
                stats={stats}
                history={history}
                flagged={flagged}
                weak={weak}
                partProgress={partProgress}
                hasSavedQuiz={hasSavedQuiz}
                startQuiz={requestStartQuiz}
                startFlash={startFlash}
                resumeQuiz={resumeQuiz}
              />
            )}
            {route === 'catalog' && <Catalog startQuiz={requestStartQuiz} />}
            {route === 'gh-300' && (
              <Practice
                currentQuestion={currentQuestion}
                flagged={flagged}
                session={session}
                partProgress={partProgress}
                saveHint={saveHint}
                startQuiz={requestStartQuiz}
                checkCurrent={checkCurrent}
                revealCurrent={revealCurrent}
                retryCurrent={retryCurrent}
                toggleChoice={toggleChoice}
                toggleFlag={toggleFlag}
                moveQuestion={moveQuestion}
                submitQuiz={submitQuiz}
                retakeQuiz={retakeQuiz}
                retryWrongFromSummary={retryWrongFromSummary}
                saveQuizProgress={saveQuizProgress}
                exitQuiz={exitQuiz}
                reviewFlaggedInSession={reviewFlaggedInSession}
                copyQuizResults={copyQuizResults}
                setSession={setSession}
              />
            )}
            {route === 'flashcards' && <Flashcards flash={flash} setFlash={setFlash} startFlash={startFlash} flagged={flagged} weak={weak} />}
            {route === 'library' && <Library search={search} setSearch={setSearch} flagged={flagged} toggleFlag={toggleFlag} />}
          </div>
        </main>

        {pendingStart && (
          <ResumeQuizDialog
            inProgress={pendingStart.inProgress}
            nextLabel={pendingStart.options.label ?? 'Quiz mới'}
            onContinue={continueInProgressQuiz}
            onStartFresh={confirmStartFresh}
            onCancel={() => setPendingStart(null)}
          />
        )}
      </div>
    </div>
  );
}

function ResumeQuizDialog({ inProgress, nextLabel, onContinue, onStartFresh, onCancel }) {
  const answered = inProgress.checked?.filter(Boolean).length ?? 0;
  return (
    <div className="modal-overlay" role="dialog" aria-modal="true" aria-labelledby="resume-quiz-title">
      <button className="modal-backdrop" type="button" aria-label="Đóng" onClick={onCancel} />
      <div className="modal-card panel max-w-md p-6 animate-slide-up">
        <p className="section-kicker">Quiz đang dở</p>
        <h2 id="resume-quiz-title" className="mt-2 text-xl font-extrabold tracking-tight">
          Tiếp tục hay làm mới?
        </h2>
        <p className="mt-3 text-sm leading-6 text-muted dark:text-slate-400">
          Bạn có phiên <span className="font-semibold text-ink dark:text-slate-200">{inProgress.label}</span> chưa hoàn thành
          (câu {(inProgress.current ?? 0) + 1}/{inProgress.indices.length}
          {answered > 0 ? `, đã check ${answered}` : ''}).
        </p>
        <p className="mt-2 text-sm text-muted dark:text-slate-400">
          Chọn <span className="font-semibold">Làm tiếp</span> để quay lại phiên cũ, hoặc <span className="font-semibold">Làm mới</span> để bắt đầu {nextLabel}.
        </p>
        <div className="mt-6 flex flex-col gap-2 sm:flex-row">
          <button className="primary-button flex-1" onClick={onContinue}>
            <Play size={16} />
            Làm tiếp
          </button>
          <button className="secondary-button flex-1" onClick={onStartFresh}>
            <RotateCcw size={16} />
            Làm mới từ đầu
          </button>
          <button className="ghost-button sm:flex-none" onClick={onCancel}>
            Hủy
          </button>
        </div>
      </div>
    </div>
  );
}

function NavButton({ active, icon: Icon, label, onClick }) {
  return (
    <button className={`nav-button ${active ? 'nav-button-active' : ''}`} onClick={onClick}>
      <Icon size={18} />
      <span>{label}</span>
    </button>
  );
}

function Dashboard({ stats, history, flagged, weak, partProgress, hasSavedQuiz, startQuiz, startFlash, resumeQuiz }) {
  const weakCount = Object.keys(weak).length;
  const wrongCount = getWrongIndices(partProgress).length;
  const newCount = getUnansweredIndices(partProgress).length;

  return (
    <section className="animate-slide-up space-y-6">
      <div className="hero-card">
        <div className="hero-card-accent" />
        <div className="hero-card-accent-2" />
        <div className="relative p-6 sm:p-8">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="max-w-2xl">
              <p className="section-kicker">Active certification</p>
              <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">GH-300 GitHub Copilot</h2>
              <p className="mt-3 text-sm leading-7 text-muted dark:text-slate-400">
                Work through the question bank, isolate weak topics, and keep your review loop tight with focused drills.
              </p>
            </div>
            <span className="status-badge status-ready">{gh300Questions.length} questions ready</span>
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            {hasSavedQuiz && (
              <button className="primary-button" onClick={resumeQuiz}>
                <Play size={16} />
                Resume quiz
              </button>
            )}
            <button className="secondary-button" onClick={() => startQuiz({ mode: 'wrong', count: 20, label: 'Random Wrong' })}>
              Random wrong
            </button>
            <button className="secondary-button" onClick={() => startQuiz({ mode: 'unanswered', count: 20, label: 'Random New' })}>
              Random new
            </button>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-[1.25fr_1fr_1fr_1fr]">
            <button className="start-card sm:col-span-2 lg:col-span-1" onClick={() => startQuiz({ count: 20, label: 'GH-300 - Random 20' })}>
              <span className="start-card-icon">
                <Play size={22} fill="currentColor" />
              </span>
              <span className="min-w-0">
                <span className="block text-base font-extrabold">Start random 20</span>
                <span className="block text-sm text-muted dark:text-slate-400">Best default for daily practice</span>
              </span>
              <ArrowRight className="ml-auto text-accent-500" size={20} />
            </button>
            <ActionButton icon={Brain} label="Weak areas" meta={`${weakCount} tracked`} onClick={() => startQuiz({ mode: 'weak', count: 'all', label: 'GH-300 - Weak areas' })} />
            <ActionButton icon={Flag} label="Flagged" meta={`${flagged.length} saved`} onClick={() => startQuiz({ mode: 'flagged', count: 'all', label: 'GH-300 - Flagged' })} />
            <ActionButton icon={RotateCcw} label="Random wrong" meta={`${wrongCount} from parts`} onClick={() => startQuiz({ mode: 'wrong', count: 20, label: 'Random Wrong' })} />
          </div>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <ActionButton icon={Play} label="Random 10" meta="Quick drill" onClick={() => startQuiz({ count: 10, label: 'Random · 10' })} />
        <ActionButton icon={Play} label="Random 50" meta="Long session" onClick={() => startQuiz({ count: 50, label: 'Random · 50' })} />
        <ActionButton icon={Play} label="Random 100" meta="Marathon" onClick={() => startQuiz({ count: 100, label: 'Random · 100' })} />
        <ActionButton icon={ClipboardList} label="Full exam" meta={`${gh300Questions.length} questions`} onClick={() => startQuiz({ count: 'all', label: 'Full Exam · 337' })} />
        <ActionButton icon={Layers3} label="Multi only" meta="Multiple-answer pool" onClick={() => startQuiz({ mode: 'multi', count: 50, label: 'Multi-Select' })} />
        <ActionButton icon={Search} label="Random new" meta={`${newCount} unanswered`} onClick={() => startQuiz({ mode: 'unanswered', count: 20, label: 'Random New' })} />
        <ActionButton icon={BookOpen} label="Flashcards" meta="40 card deck" onClick={() => startFlash('all')} />
      </div>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <Metric label="Attempts" value={stats.attempts} icon={Award} highlight />
        <Metric label="Average" value={`${stats.avg}%`} icon={BarChart3} />
        <Metric label="Best score" value={`${stats.best}%`} icon={Sparkles} variant="success" />
        <Metric label="Answered" value={stats.answered} icon={ClipboardList} variant="warning" />
      </div>

      <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_360px]">
        <div>
          <div className="mb-4 flex items-end justify-between gap-3">
            <SectionHeader kicker="Exam parts" title="Focused sets" description="Compact drills mapped to the GH-300 bank." />
            <button className="secondary-button hidden sm:inline-flex" onClick={() => startFlash('all')}>
              <BookOpen size={16} />
              Flashcards
            </button>
          </div>
          <PartGrid startQuiz={startQuiz} partProgress={partProgress} compact />
        </div>
        <HistoryPanel history={history} />
      </div>
    </section>
  );
}

function Metric({ label, value, icon: Icon, highlight = false, variant }) {
  const iconClass =
    variant === 'success' ? 'metric-icon metric-icon-success' : variant === 'warning' ? 'metric-icon metric-icon-warning' : 'metric-icon';
  return (
    <div className={`panel p-5 ${highlight ? 'ring-1 ring-accent-200/60 dark:ring-accent-500/25' : ''}`}>
      <div className="flex items-center gap-4">
        <span className={iconClass}>
          <Icon size={20} />
        </span>
        <div>
          <p className="text-2xl font-extrabold tabular-nums tracking-tight">{value}</p>
          <p className="text-xs font-semibold text-muted dark:text-slate-400">{label}</p>
        </div>
      </div>
    </div>
  );
}

function Catalog({ startQuiz }) {
  return (
    <section className="animate-slide-up space-y-6">
      <SectionHeader kicker="Certification catalog" title="Training paths" description="GH-300 is available now. Additional certification sets are staged as placeholders." />
      <div className="grid gap-5 md:grid-cols-3">
        {certifications.map((cert) => {
          const ready = cert.id === 'gh-300';
          return (
            <article className={`panel p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-card-hover ${ready ? 'cert-card-ready' : 'opacity-90'}`} key={cert.id}>
              <div className="mb-6 flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-muted dark:text-slate-500">{cert.provider}</p>
                  <h3 className="mt-2 text-2xl font-extrabold tracking-tight">{cert.exam}</h3>
                  <p className="mt-1 text-sm text-muted dark:text-slate-400">{cert.name}</p>
                </div>
                <span className={`status-badge ${ready ? 'status-ready' : 'status-muted'}`}>{cert.status}</span>
              </div>
              <div className="mb-6 grid grid-cols-2 gap-3 text-sm">
                <InfoTile label="Level" value={cert.level} />
                <InfoTile label="Questions" value={cert.questions || 'Seed data'} />
              </div>
              <button className="primary-button w-full" disabled={!ready} onClick={() => startQuiz({ count: 20, label: 'GH-300 - Random 20' })}>
                <Play size={16} />
                {ready ? 'Start practice' : 'Not available'}
              </button>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function Practice({
  currentQuestion,
  flagged,
  session,
  partProgress,
  saveHint,
  startQuiz,
  checkCurrent,
  revealCurrent,
  retryCurrent,
  toggleChoice,
  toggleFlag,
  moveQuestion,
  submitQuiz,
  retakeQuiz,
  retryWrongFromSummary,
  saveQuizProgress,
  exitQuiz,
  reviewFlaggedInSession,
  copyQuizResults,
  setSession
}) {
  if (!session) {
    return (
      <section className="space-y-6">
        <SectionHeader kicker="GH-300 practice" title="Choose a session" description="Random drills, wrong/new pools, custom filters, or practice by exam part — with Check, Reveal, and Try Again." />
        <QuizCustomSetup startQuiz={startQuiz} partProgress={partProgress} />
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {[10, 20, 50, 100].map((count) => (
            <ActionButton key={count} icon={Play} label={`Random ${count}`} meta="Mixed question bank" onClick={() => startQuiz({ count, label: `Random · ${count}` })} />
          ))}
          <ActionButton icon={ClipboardList} label="Full bank" meta={`${gh300Questions.length} questions`} onClick={() => startQuiz({ count: 'all', label: `Full Exam · ${gh300Questions.length}` })} />
          <ActionButton icon={Layers3} label="Multi-answer" meta="Multiple choice only" onClick={() => startQuiz({ mode: 'multi', count: 50, label: 'Multi-Select' })} />
          <ActionButton icon={RotateCcw} label="Random wrong" meta="From part progress" onClick={() => startQuiz({ mode: 'wrong', count: 20, label: 'Random Wrong' })} />
          <ActionButton icon={Search} label="Random new" meta="Unanswered only" onClick={() => startQuiz({ mode: 'unanswered', count: 20, label: 'Random New' })} />
          <ActionButton icon={Brain} label="Weak areas" meta="Spaced repetition" onClick={() => startQuiz({ mode: 'weak', count: 'all', label: 'Weak Areas' })} />
          <ActionButton icon={Flag} label="Flagged" meta="Saved for review" onClick={() => startQuiz({ mode: 'flagged', count: 'all', label: 'Flagged' })} />
        </div>
        <div>
          <SectionHeader kicker="Exam parts" title="Focused practice" description="Sequential part runs — progress tracked per question." />
          <PartGrid startQuiz={startQuiz} partProgress={partProgress} />
        </div>
      </section>
    );
  }

  if (session.finished) {
    const wrongSlots = session.wrongSlots ?? [];
    const correct = session.indices.length - wrongSlots.length;
    const score = percent(correct, session.indices.length);
    const passed = score >= 70;
    return (
      <section className="panel mx-auto max-w-3xl overflow-hidden animate-slide-up">
        <div className="border-b border-line/70 px-6 py-8 text-center dark:border-gh-border">
          <p className="section-kicker justify-center">Results</p>
          <p className="mt-2 text-sm text-muted dark:text-slate-400">{session.label}</p>
          <div className="score-ring mx-auto mt-6" style={{ '--score': score }}>
            <div className="score-ring-inner">
              <div>
                <p className="text-4xl font-extrabold tabular-nums tracking-tight">{score}%</p>
                <p className="text-xs font-semibold text-muted dark:text-slate-400">Score</p>
              </div>
            </div>
          </div>
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <InfoTile label="Total" value={session.indices.length} />
            <InfoTile label="Correct" value={correct} />
            <InfoTile label="Wrong" value={wrongSlots.length} />
            <InfoTile label="Time" value={formatTimer(session.timerSec)} />
          </div>
          <p className={`mt-5 text-lg font-bold ${passed ? 'text-success-600 dark:text-success-300' : 'text-danger-600 dark:text-danger-300'}`}>
            {passed ? 'Great work — keep it up!' : 'Review wrong answers below'}
          </p>
        </div>
        {wrongSlots.length > 0 && (
          <div className="max-h-[50vh] space-y-3 overflow-y-auto border-b border-line/70 px-5 py-5 dark:border-gh-border">
            <p className="text-xs font-bold text-danger-600 dark:text-danger-300">Review ({wrongSlots.length})</p>
            {wrongSlots.slice(0, 60).map((slot) => {
              const questionIndex = session.indices[slot];
              const question = gh300Questions[questionIndex];
              const userAnswer = session.answers[slot].length
                ? session.answers[slot].map((item) => question.choices[item]).join('; ')
                : '(No answer)';
              const correctAnswer = question.correct.map((item) => question.choices[item]).join('; ');
              return (
                <div className="rounded-xl border border-danger-200/80 bg-danger-50/40 p-4 dark:border-danger-500/30 dark:bg-danger-500/5" key={slot}>
                  <p className="text-sm font-semibold leading-6">{question.text}</p>
                  <p className="mt-2 text-xs text-danger-700 dark:text-danger-200">Your answer: {userAnswer}</p>
                  <p className="mt-1 text-xs text-success-700 dark:text-success-200">Correct: {correctAnswer}</p>
                </div>
              );
            })}
          </div>
        )}
        {!wrongSlots.length && (
          <div className="empty-state mx-5 my-5 border-none bg-transparent">
            <p className="text-2xl">🎉</p>
            <p className="font-bold text-success-600 dark:text-success-300">Perfect score!</p>
          </div>
        )}
        <div className="flex flex-wrap gap-3 bg-subtle/40 p-5 dark:bg-gh-subtle/30">
          <button className="secondary-button" onClick={exitQuiz}>
            New quiz
          </button>
          {wrongSlots.length > 0 && (
            <button className="danger-button" onClick={retryWrongFromSummary}>
              <RotateCcw size={16} />
              Retry wrong
            </button>
          )}
          <button className="secondary-button" onClick={copyQuizResults}>
            <Copy size={16} />
            Copy results
          </button>
          <button className="primary-button" onClick={retakeQuiz}>
            <RotateCcw size={16} />
            Retake
          </button>
        </div>
      </section>
    );
  }

  const questionIndex = session.indices[session.current];
  const selected = session.answers[session.current];
  const checked = session.checked[session.current];
  const isCorrect = checked && sameAnswer(selected, currentQuestion.correct);
  const isFlagged = flagged.includes(questionIndex);
  const progress = percent(session.current + 1, session.indices.length);
  const partIndex = getPartIndex(questionIndex);

  return (
    <section className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_300px]">
      <div className="exam-panel">
        <div className="border-b border-line bg-subtle px-5 py-4 dark:border-gh-border dark:bg-gh-subtle sm:px-6">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="section-kicker">{session.label}</p>
              <h2 className="mt-1 text-xl font-bold">
                Question {session.current + 1} / {session.indices.length}
              </h2>
              <div className="mt-2 flex flex-wrap items-center gap-2 text-xs">
                <span className="rounded-full bg-accent-50 px-2.5 py-0.5 font-bold text-accent-700 dark:bg-accent-500/15 dark:text-accent-300">
                  P{String(partIndex + 1).padStart(2, '0')}
                </span>
                <span className={`rounded-full px-2.5 py-0.5 font-bold ${currentQuestion.multiple ? 'bg-purple-100 text-purple-700 dark:bg-purple-500/15 dark:text-purple-300' : 'bg-subtle text-muted dark:bg-gh-subtle'}`}>
                  {currentQuestion.multiple ? 'Multiple' : 'Single'}
                </span>
                <span className="text-muted dark:text-slate-400">Bank Q{questionIndex + 1}</span>
                <span className="font-mono text-muted dark:text-slate-500">{formatTimer(session.timerSec)}</span>
              </div>
            </div>
            <button className={`icon-button ${isFlagged ? 'text-danger-600 dark:text-danger-300' : ''}`} onClick={() => toggleFlag(questionIndex)} title="Flag question">
              <Flag size={18} fill={isFlagged ? 'currentColor' : 'none'} />
            </button>
          </div>
          <div className="progress-bar mt-4">
            <div className="progress-bar-fill" style={{ width: `${progress}%` }} />
          </div>
        </div>

        <div className="px-5 py-5 sm:px-6">
          <p className="mb-4 max-w-4xl text-lg font-semibold leading-8 text-ink dark:text-slate-100 sm:text-xl">{currentQuestion.text}</p>
          {currentQuestion.warn && (
            <div className="mb-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-xs font-medium text-amber-800 dark:border-amber-500/40 dark:bg-amber-500/10 dark:text-amber-200">
              {currentQuestion.warn}
            </div>
          )}
          <div className="space-y-3">
            {currentQuestion.choices.map((choice, index) => {
              const chosen = selected.includes(index);
              const correct = currentQuestion.correct.includes(index);
              const stateClass = checked && correct ? 'answer-correct' : checked && chosen && !correct ? 'answer-wrong' : chosen ? 'answer-selected' : '';
              return (
                <button key={choice} className={`answer ${stateClass}`} onClick={() => toggleChoice(index)} disabled={checked}>
                  <span className="answer-letter">{String.fromCharCode(65 + index)}</span>
                  <span className="leading-6">{choice}</span>
                </button>
              );
            })}
          </div>
          {checked && (
            <div
              className={`mt-5 flex items-start gap-3 rounded-xl border p-4 text-sm ${
                isCorrect
                  ? 'border-success-200 bg-success-50 text-success-700 dark:border-success-500/30 dark:bg-success-500/10 dark:text-success-100'
                  : 'border-danger-200 bg-danger-50 text-danger-700 dark:border-danger-500/30 dark:bg-danger-500/10 dark:text-danger-100'
              }`}
            >
              <CheckCircle2 className="mt-0.5 shrink-0" size={17} />
              <span>{isCorrect ? '✓ Correct!' : '✗ Incorrect'} — Answer: {currentQuestion.correct.map((item) => String.fromCharCode(65 + item)).join(', ')}</span>
            </div>
          )}
        </div>

        <div className="sticky bottom-0 flex flex-wrap gap-2 border-t border-line bg-white/95 px-5 py-3 backdrop-blur dark:border-gh-border dark:bg-gh-panel/95 sm:px-6">
          <button className="secondary-button" onClick={() => moveQuestion(-1)} disabled={session.current === 0}>
            <ChevronLeft size={16} />
            Prev
          </button>
          <button className="primary-button" onClick={checkCurrent} disabled={!selected.length || checked}>
            <Check size={16} />
            Check
          </button>
          {checked && !isCorrect && (
            <button className="secondary-button !border-amber-300 !bg-amber-50 !text-amber-800 dark:!border-amber-500/50 dark:!bg-amber-500/15 dark:!text-amber-200" onClick={retryCurrent}>
              <RotateCcw size={16} />
              Try again
            </button>
          )}
          <button className="secondary-button" onClick={revealCurrent} disabled={checked}>
            <Eye size={16} />
            Reveal
          </button>
          <button className="secondary-button" onClick={() => moveQuestion(1)} disabled={session.current === session.indices.length - 1}>
            Next
            <ChevronRight size={16} />
          </button>
          <button className="primary-button !bg-success-600 !border-success-600 hover:!bg-success-700 dark:!bg-success-500" onClick={submitQuiz}>
            Submit all
          </button>
          <button className="ghost-button" onClick={saveQuizProgress} title="Save progress">
            <Save size={16} />
            {saveHint === 'saved' ? 'Saved!' : 'Save'}
          </button>
          <button className="ghost-button" onClick={reviewFlaggedInSession}>
            <Flag size={16} />
            Flagged
          </button>
          <button className="ghost-button" onClick={exitQuiz}>
            Exit
          </button>
        </div>
      </div>
      <QuestionMap session={session} flagged={flagged} setSession={setSession} />
    </section>
  );
}

function QuizCustomSetup({ startQuiz, partProgress }) {
  const [parts, setParts] = useState(() => partSizes.map((_, index) => index));
  const [questionType, setQuestionType] = useState('all');
  const [source, setSource] = useState('all');
  const [order, setOrder] = useState('random');
  const [count, setCount] = useState('20');

  function togglePart(index) {
    setParts((current) => (current.includes(index) ? current.filter((item) => item !== index) : [...current, index].sort((a, b) => a - b)));
  }

  function launchCustomFixed() {
    let pool = [];
    parts.forEach((partIndex) => {
      const start = partStarts[partIndex];
      for (let i = 0; i < partSizes[partIndex]; i += 1) {
        const questionIndex = start + i;
        const question = gh300Questions[questionIndex];
        if (questionType === 'multiple' && !question.multiple) continue;
        if (questionType === 'single' && question.multiple) continue;
        pool.push(questionIndex);
      }
    });
    if (!pool.length) return window.alert('No questions match.');
    if (source === 'wrong') {
      pool = pool.filter((index) => getWrongIndices(partProgress).includes(index));
      if (!pool.length) return window.alert('Không có câu sai nào trong phạm vi đã chọn!');
    }
    if (source === 'unanswered') {
      pool = pool.filter((index) => getUnansweredIndices(partProgress).includes(index));
      if (!pool.length) return window.alert('Tất cả câu trong phạm vi đã được trả lời!');
    }
    const ordered = order === 'random' ? shuffle(pool) : [...pool];
    const parsed = count.trim() ? Math.min(Number(count) || ordered.length, ordered.length) : ordered.length;
    const srcLabel = source === 'wrong' ? ' (Wrong)' : source === 'unanswered' ? ' (New)' : '';
    startQuiz({
      mode: 'custom',
      count: parsed,
      label: `${order === 'random' ? 'Random' : 'Sequential'}${srcLabel} · ${parsed}`,
      shufflePool: false,
      customIndices: ordered.slice(0, parsed)
    });
  }

  return (
    <div className="panel space-y-4 p-5">
      <SectionHeader kicker="Custom quiz" title="Build your session" description="Filter by part, question type, and wrong/unanswered pools like GH-300 Pro." />
      <div className="flex flex-wrap gap-2">
        {partSizes.map((size, index) => (
          <label className={`filter-chip cursor-pointer ${parts.includes(index) ? 'filter-chip-active' : ''}`} key={index}>
            <input className="hidden" type="checkbox" checked={parts.includes(index)} onChange={() => togglePart(index)} />
            P{String(index + 1).padStart(2, '0')} ({size})
          </label>
        ))}
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <p className="mb-2 text-xs font-bold uppercase text-muted">Question type</p>
          <div className="flex flex-wrap gap-2">
            {[
              ['all', 'All'],
              ['single', 'Single'],
              ['multiple', 'Multiple']
            ].map(([id, label]) => (
              <button key={id} className={`filter-chip ${questionType === id ? 'filter-chip-active' : ''}`} onClick={() => setQuestionType(id)}>
                {label}
              </button>
            ))}
          </div>
        </div>
        <div>
          <p className="mb-2 text-xs font-bold uppercase text-muted">Source</p>
          <div className="flex flex-wrap gap-2">
            {[
              ['all', 'All'],
              ['wrong', 'Wrong only'],
              ['unanswered', 'Unanswered']
            ].map(([id, label]) => (
              <button key={id} className={`filter-chip ${source === id ? 'filter-chip-active' : ''}`} onClick={() => setSource(id)}>
                {label}
              </button>
            ))}
          </div>
        </div>
        <div>
          <p className="mb-2 text-xs font-bold uppercase text-muted">Order & count</p>
          <div className="flex flex-wrap gap-2">
            {[
              ['random', 'Random'],
              ['seq', 'Sequential']
            ].map(([id, label]) => (
              <button key={id} className={`filter-chip ${order === id ? 'filter-chip-active' : ''}`} onClick={() => setOrder(id)}>
                {label}
              </button>
            ))}
          </div>
          <input
            className="mt-2 w-full rounded-xl border border-line/80 bg-white px-3 py-2 text-sm dark:border-gh-border dark:bg-gh-subtle"
            value={count}
            onChange={(event) => setCount(event.target.value)}
            placeholder="Question count (blank = all)"
          />
        </div>
      </div>
      <button className="primary-button" onClick={launchCustomFixed}>
        <Play size={16} />
        Launch custom quiz
      </button>
    </div>
  );
}

function QuestionMap({ session, flagged, setSession }) {
  const [gridPage, setGridPage] = useState(() => Math.floor(session.current / GRID_PAGE_SIZE));
  const answered = session.checked.filter(Boolean).length;
  const total = session.indices.length;
  const pages = Math.ceil(total / GRID_PAGE_SIZE);
  const start = gridPage * GRID_PAGE_SIZE;
  const end = Math.min(start + GRID_PAGE_SIZE, total);

  useEffect(() => {
    setGridPage(Math.floor(session.current / GRID_PAGE_SIZE));
  }, [session.current]);

  return (
    <aside className="panel h-fit p-4 xl:sticky xl:top-24">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-bold">Session map</h3>
        <span className="text-xs text-muted dark:text-slate-400">{answered}/{total} checked</span>
      </div>
      <div className="progress-bar mb-3">
        <div className="progress-bar-fill" style={{ width: `${percent(answered, total)}%` }} />
      </div>
      <div className="mb-3 grid grid-cols-2 gap-1 text-[10px] text-muted dark:text-slate-400">
        <span>⬜ Idle</span>
        <span className="text-accent-600">🟦 Selected</span>
        <span className="text-success-600">🟩 Correct</span>
        <span className="text-danger-600">🟥 Wrong</span>
      </div>
      <div className="grid grid-cols-8 gap-1.5">
        {session.indices.slice(start, end).map((questionIndex, offset) => {
          const index = start + offset;
          const done = session.checked[index];
          const picked = session.answers[index].length > 0;
          const ok = done && sameAnswer(session.answers[index], gh300Questions[questionIndex].correct);
          let state = 'map-idle';
          if (session.current === index) state = 'map-current';
          else if (done) state = ok ? 'map-correct' : 'map-wrong';
          else if (picked) state = 'map-selected';
          return (
            <button key={`${questionIndex}-${index}`} className={`map-cell ${state}`} onClick={() => setSession({ ...session, current: index })}>
              {index + 1}
              {flagged.includes(questionIndex) ? '🚩' : ''}
            </button>
          );
        })}
      </div>
      {pages > 1 && (
        <div className="mt-3 flex items-center justify-between text-[10px]">
          <button className="secondary-button !min-h-8 px-2 py-1" disabled={gridPage === 0} onClick={() => setGridPage((page) => page - 1)}>
            ←
          </button>
          <span className="text-muted">
            {start + 1}–{end} / {total}
          </span>
          <button className="secondary-button !min-h-8 px-2 py-1" disabled={gridPage >= pages - 1} onClick={() => setGridPage((page) => page + 1)}>
            →
          </button>
        </div>
      )}
    </aside>
  );
}

function Flashcards({ flash, setFlash, startFlash, flagged, weak }) {
  if (!flash) {
    return (
      <section className="animate-slide-up space-y-6">
        <SectionHeader kicker="Flashcards" title="Review questions as cards" description="Tap the card to flip and reveal the correct answer, then mark your confidence." />
        <div className="grid gap-4 sm:grid-cols-3">
          <ActionButton icon={BookOpen} label="All cards" meta="40 card deck" onClick={() => startFlash('all')} />
          <ActionButton icon={Brain} label={`Weak (${Object.keys(weak).length})`} meta="Missed questions" onClick={() => startFlash('weak')} />
          <ActionButton icon={Flag} label={`Flagged (${flagged.length})`} meta="Saved questions" onClick={() => startFlash('flagged')} />
        </div>
      </section>
    );
  }
  const question = gh300Questions[flash.pool[flash.current]];
  const cardProgress = percent(flash.current + 1, flash.pool.length);
  return (
    <section className="mx-auto max-w-2xl animate-slide-up">
      <div className="mb-5 flex items-center justify-between gap-4">
        <div>
          <p className="section-kicker">Flashcards</p>
          <h2 className="text-xl font-extrabold">
            Card {flash.current + 1} <span className="font-medium text-muted dark:text-slate-400">/ {flash.pool.length}</span>
          </h2>
        </div>
        <button className="icon-button" onClick={() => setFlash(null)} title="Close">
          <X size={18} />
        </button>
      </div>
      <div className="progress-bar mb-5">
        <div className="progress-bar-fill" style={{ width: `${cardProgress}%` }} />
      </div>
      <button
        className={`flashcard ${flash.flipped ? 'flashcard-flipped' : ''}`}
        onClick={() => setFlash({ ...flash, flipped: !flash.flipped })}
      >
        {!flash.flipped ? (
          <>
            <p className="section-kicker">Question — tap to reveal</p>
            <p className="mt-5 text-xl font-semibold leading-8 sm:text-2xl">{question.text}</p>
            <p className="mt-8 text-xs font-medium text-muted dark:text-slate-500">Click anywhere on the card to flip</p>
          </>
        ) : (
          <>
            <p className="section-kicker !text-success-600 dark:!text-success-300">Correct answer</p>
            <div className="mt-5 space-y-3">
              {question.correct.map((index) => (
                <div className="rounded-xl border border-success-200 bg-success-50 px-4 py-3 text-sm font-medium text-success-700 dark:border-success-500/30 dark:bg-success-500/10 dark:text-success-100" key={index}>
                  <span className="mr-2 font-extrabold">{String.fromCharCode(65 + index)}.</span>
                  {question.choices[index]}
                </div>
              ))}
            </div>
          </>
        )}
      </button>
      <div className="mt-5 flex flex-wrap gap-3">
        <button className="secondary-button" onClick={() => setFlash({ ...flash, current: Math.max(0, flash.current - 1), flipped: false })}>
          <ChevronLeft size={16} />
          Previous
        </button>
        <button className="primary-button flex-1 sm:flex-none" onClick={() => setFlash({ ...flash, current: Math.min(flash.pool.length - 1, flash.current + 1), flipped: false, known: flash.known + 1 })}>
          <Check size={16} />
          I know this
        </button>
        <button className="danger-button" onClick={() => setFlash({ ...flash, current: Math.min(flash.pool.length - 1, flash.current + 1), flipped: false, review: flash.review + 1 })}>
          Review again
        </button>
      </div>
      {(flash.known > 0 || flash.review > 0) && (
        <p className="mt-4 text-center text-xs text-muted dark:text-slate-500">
          Known: {flash.known} · Review again: {flash.review}
        </p>
      )}
    </section>
  );
}

function Library({ search, setSearch, flagged, toggleFlag }) {
  const [filter, setFilter] = useState('all');
  const filtered = gh300Questions
    .map((question, index) => ({ ...question, index }))
    .filter((question) => {
      if (filter === 'flagged' && !flagged.includes(question.index)) return false;
      if (filter === 'multi' && !question.multiple) return false;
      if (filter === 'single' && question.multiple) return false;
      return !search.trim() || `${question.text} ${question.choices.join(' ')}`.toLowerCase().includes(search.toLowerCase());
    });

  return (
    <section className="space-y-4">
      <SectionHeader kicker="Question library" title="Browse GH-300 bank" description={`${filtered.length} matching questions. Showing the first 80 for fast scanning.`} />
      <div className="panel sticky top-[88px] z-[5] space-y-4 p-4 shadow-card">
        <div className="flex items-center gap-3 rounded-xl border border-line/70 bg-subtle/50 px-4 py-2.5 dark:border-gh-border dark:bg-gh-subtle/50">
          <Search className="shrink-0 text-accent-500" size={18} />
          <input className="w-full bg-transparent text-sm outline-none placeholder:text-muted/70 dark:placeholder:text-slate-500" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search questions, choices, or concepts" />
        </div>
        <div className="flex flex-wrap gap-2">
          {[
            ['all', 'All'],
            ['flagged', `Flagged (${flagged.length})`],
            ['multi', 'Multi-answer'],
            ['single', 'Single-answer']
          ].map(([id, label]) => (
            <button key={id} className={`filter-chip ${filter === id ? 'filter-chip-active' : ''}`} onClick={() => setFilter(id)}>
              {label}
            </button>
          ))}
        </div>
      </div>
      <div className="grid gap-3">
        {filtered.slice(0, 80).map((question) => (
          <article className="question-row" key={question.index}>
            <div className="mb-3 flex items-start justify-between gap-3">
              <div className="flex min-w-0 gap-3">
                <span className="question-number">{question.index + 1}</span>
                <p className="text-sm font-semibold leading-6">{question.text}</p>
              </div>
              <button className={`icon-button h-9 w-9 shrink-0 ${flagged.includes(question.index) ? 'text-danger-600 dark:text-danger-300' : ''}`} onClick={() => toggleFlag(question.index)} title="Flag">
                <Flag size={16} fill={flagged.includes(question.index) ? 'currentColor' : 'none'} />
              </button>
            </div>
            <p className="ml-10 text-xs text-muted dark:text-slate-400">
              {question.multiple ? 'Multiple answer' : 'Single answer'} · Correct: {question.correct.map((item) => String.fromCharCode(65 + item)).join(', ')}
            </p>
          </article>
        ))}
        {!filtered.length && (
          <div className="empty-state">
            <Search size={32} className="mb-3 text-muted/50" />
            <p className="text-sm font-semibold text-ink dark:text-slate-200">No questions match</p>
            <p className="mt-1 text-sm text-muted dark:text-slate-400">Try a different search or filter.</p>
          </div>
        )}
      </div>
    </section>
  );
}

function PartGrid({ startQuiz, partProgress = {}, compact = false }) {
  return (
    <div className={compact ? 'panel divide-y divide-line overflow-hidden dark:divide-gh-border' : 'grid gap-3 md:grid-cols-2 xl:grid-cols-4'}>
      {partSizes.map((size, index) => {
        const rows = partProgress[index];
        const done = rows ? rows.filter((value) => value === 'correct').length : 0;
        const pct = rows ? percent(done, size) : 0;
        return (
        <button className={compact ? 'part-row' : 'panel group p-4 text-left transition hover:-translate-y-0.5 hover:border-accent-300 hover:shadow-soft dark:hover:border-accent-500/60'} key={partTitles[index]} onClick={() => startQuiz({ partIndex: index, count: 'all', label: `Part ${String(index + 1).padStart(2, '0')} · ${size}`, shufflePool: false })}>
          {compact ? (
            <>
              <span className="part-number">{index + 1}</span>
              <span className="min-w-0 flex-1">
                <span className="block truncate font-bold">{partTitles[index]}</span>
                <span className="text-xs text-muted dark:text-slate-400">{size} questions{rows ? ` · ${pct}%` : ''}</span>
              </span>
              <ArrowRight className="text-accent-500 opacity-60 transition group-hover:opacity-100" size={18} />
            </>
          ) : (
            <>
              <div className="mb-3 flex items-center justify-between">
                <p className="text-xs font-bold uppercase tracking-[0.12em] text-muted dark:text-slate-400">Part {index + 1}</p>
                <span className="rounded-md bg-subtle px-2 py-1 text-xs font-semibold text-muted dark:bg-gh-subtle dark:text-slate-400">{rows ? `${pct}%` : size}</span>
              </div>
              <h3 className="font-bold group-hover:text-accent-600 dark:group-hover:text-accent-300">{partTitles[index]}</h3>
              <p className="mt-2 text-sm text-muted dark:text-slate-400">{size} questions</p>
            </>
          )}
        </button>
        );
      })}
    </div>
  );
}

function HistoryPanel({ history }) {
  return (
    <div className="panel p-5 xl:sticky xl:top-28">
      <div className="mb-5 flex items-center justify-between">
        <h3 className="font-extrabold tracking-tight">Recent attempts</h3>
        <span className="rounded-full bg-subtle px-2.5 py-0.5 text-xs font-bold text-muted dark:bg-gh-subtle dark:text-slate-400">{history.length}</span>
      </div>
      {!history.length && (
        <div className="empty-state py-8">
          <ClipboardList size={28} className="mb-2 text-muted/40" />
          <p className="text-sm font-semibold">No attempts yet</p>
          <p className="mt-1 text-xs text-muted">Start a quiz to track progress</p>
        </div>
      )}
      <div className="space-y-2">
        {history.slice(-6).reverse().map((row) => (
          <div className="history-item" key={row.id}>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-bold">{row.label}</p>
              <p className="text-xs text-muted dark:text-slate-400">{new Date(row.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</p>
            </div>
            <span className={`score-pill ${row.score >= 70 ? 'score-pill-pass' : 'score-pill-fail'}`}>{row.score}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ActionButton({ icon: Icon, label, meta, onClick }) {
  return (
    <button className="action-button" onClick={onClick}>
      <span className="metric-icon">
        <Icon size={18} />
      </span>
      <span className="min-w-0">
        <span className="block font-semibold">{label}</span>
        {meta && <span className="block truncate text-xs text-muted dark:text-slate-400">{meta}</span>}
      </span>
    </button>
  );
}

function SectionHeader({ kicker, title, description }) {
  return (
    <div className="mb-1">
      <p className="section-kicker">{kicker}</p>
      <h2 className="mt-2 text-2xl font-extrabold tracking-tight sm:text-3xl">{title}</h2>
      {description && <p className="mt-2 max-w-3xl text-sm leading-7 text-muted dark:text-slate-400">{description}</p>}
    </div>
  );
}

function InfoTile({ label, value }) {
  return (
    <div className="rounded-xl border border-line/70 bg-subtle/80 p-3.5 dark:border-gh-border dark:bg-gh-subtle/60">
      <p className="text-[11px] font-bold uppercase tracking-wider text-muted dark:text-slate-500">{label}</p>
      <p className="mt-1 font-bold">{value}</p>
    </div>
  );
}

createRoot(document.getElementById('root')).render(<App />);
