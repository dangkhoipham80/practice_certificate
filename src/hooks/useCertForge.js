import { useEffect, useMemo, useState } from 'react';
import { useAppNavigation } from './useAppNavigation';
import { useCertContext } from '../context/CertContext';
import { getQuizQuestions } from '../config/certRegistry';
import { readJson, removeKey, writeJson } from '../lib/storage';
import {
  applyWeakDelta,
  formatTimer,
  getInProgressQuiz,
  percent,
  sameAnswer,
  shuffle
} from '../lib/quizUtils';
import {
  getUnansweredIndices,
  getWrongIndices,
  updatePartProgressFromSession
} from '../lib/progressUtils';
import { buildExportPayload, normalizeHistory, parseImportPayload } from '../lib/importExport';

function loadCertState(storageKeys) {
  return {
    history: readJson(storageKeys.history, []),
    flagged: readJson(storageKeys.flagged, []),
    weak: readJson(storageKeys.weak, {}),
    partProgress: readJson(storageKeys.partProgress, {}),
  };
}

export function useCertForge() {
  const { route, navigateTo, certId } = useAppNavigation();
  const { activeCert, activeCertId } = useCertContext();
  const cert = activeCert;
  const { questions, partSizes, partStarts, storageKeys } = cert;
  const quizQuestions = useMemo(() => getQuizQuestions(cert), [cert]);
  const quizQuestionIndices = useMemo(
    () => questions.map((q, index) => (q.quizEligible !== false && q.choices?.length ? index : null)).filter((index) => index !== null),
    [questions]
  );
  const quizIndexSet = useMemo(() => new Set(quizQuestionIndices), [quizQuestionIndices]);

  const [dark, setDark] = useState(() => localStorage.getItem('certforge-theme') === 'dark');
  const [history, setHistory] = useState(() => loadCertState(storageKeys).history);
  const [flagged, setFlagged] = useState(() => loadCertState(storageKeys).flagged);
  const [weak, setWeak] = useState(() => loadCertState(storageKeys).weak);
  const [partProgress, setPartProgress] = useState(() => loadCertState(storageKeys).partProgress);
  const [session, setSession] = useState(null);
  const [flash, setFlash] = useState(null);
  const [search, setSearch] = useState('');
  const [saveHint, setSaveHint] = useState('');
  const [syncHint, setSyncHint] = useState(null);
  const [pendingStart, setPendingStart] = useState(null);

  useEffect(() => {
    const next = loadCertState(storageKeys);
    setHistory(next.history);
    setFlagged(next.flagged);
    setWeak(next.weak);
    setPartProgress(next.partProgress);
    setSession(null);
    setFlash(null);
    setPendingStart(null);
    setSaveHint('');
  }, [activeCertId]);

  function showSyncHint(type, message) {
    setSyncHint({ type, message });
    window.setTimeout(() => setSyncHint(null), 4500);
  }

  const hasSavedQuiz = useMemo(
    () => !!getInProgressQuiz(session, storageKeys.savedQuiz),
    [session, saveHint, storageKeys.savedQuiz]
  );

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
    writeJson(storageKeys.history, next);
  }

  function saveFlagged(next) {
    setFlagged(next);
    writeJson(storageKeys.flagged, next);
  }

  function saveWeak(next) {
    setWeak(next);
    writeJson(storageKeys.weak, next);
  }

  function savePartProgress(next) {
    setPartProgress(next);
    writeJson(storageKeys.partProgress, next);
  }

  function createPool(mode, partIndex = null) {
    if (partIndex !== null) {
      const start = partStarts[partIndex];
      return Array.from({ length: partSizes[partIndex] }, (_, index) => start + index).filter((index) => quizIndexSet.has(index));
    }
    if (mode === 'flagged') return flagged.filter((index) => quizIndexSet.has(index));
    if (mode === 'weak') return Object.keys(weak).map(Number).filter((index) => quizIndexSet.has(index));
    if (mode === 'wrong') return getWrongIndices(partProgress, partSizes, partStarts).filter((index) => quizIndexSet.has(index));
    if (mode === 'unanswered') return getUnansweredIndices(partProgress, partSizes, partStarts).filter((index) => quizIndexSet.has(index));
    if (mode === 'multi') return [...quizIndexSet].filter((index) => questions[index].multiple);
    return [...quizIndexSet];
  }

  function startQuiz({ mode = 'random', count = 20, partIndex = null, label, shufflePool = true, customIndices = null }) {
    const base = customIndices ?? createPool(mode, partIndex);
    if (!base.length) {
      if (mode === 'wrong') window.alert('No wrong answers yet! Complete a quiz first.');
      if (mode === 'unanswered') window.alert('All questions have been answered!');
      if (mode === 'flagged') window.alert('No flagged questions yet. Use the flag button during a quiz.');
      return;
    }
    const ordered = customIndices ? [...customIndices] : shufflePool ? shuffle(base) : [...base];
    const indices = ordered.slice(0, count === 'all' ? ordered.length : Math.min(count, ordered.length));
    removeKey(storageKeys.savedQuiz);
    setSaveHint('');
    setSession({
      certId: activeCertId,
      label: label ?? `${cert.exam} · ${mode === 'random' ? 'Random' : mode} - ${indices.length}`,
      indices,
      current: 0,
      answers: indices.map(() => []),
      checked: indices.map(() => false),
      finished: false,
      timerSec: 0
    });
    navigateTo('practice', { certId: activeCertId });
  }

  function requestStartQuiz(options) {
    const inProgress = getInProgressQuiz(session, storageKeys.savedQuiz);
    if (inProgress) {
      setPendingStart({ options, inProgress });
      return;
    }
    startQuiz(options);
  }

  function continueInProgressQuiz() {
    const inProgress = pendingStart?.inProgress ?? getInProgressQuiz(session, storageKeys.savedQuiz);
    setPendingStart(null);
    if (!inProgress) return;
    const resumeCertId = inProgress.certId ?? activeCertId;
    if (session && !session.finished) {
      navigateTo('practice', { certId: resumeCertId });
      return;
    }
    setSession({ ...inProgress, finished: false, wrongSlots: undefined });
    navigateTo('practice', { certId: resumeCertId });
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
    const ok = sameAnswer(current.answers[slot], questions[questionIndex].correct);
    setWeak((prev) => {
      const next = applyWeakDelta(prev, questionIndex, ok);
      writeJson(storageKeys.weak, next);
      return next;
    });
    return ok;
  }

  function toggleChoice(choiceIndex) {
    setSession((current) => {
      if (!current || current.checked[current.current]) return current;
      const question = questions[current.indices[current.current]];
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
      const ok = sameAnswer(session.answers[slot], questions[questionIndex].correct);
      if (ok) correct += 1;
      else wrongSlots.push(slot);
    });
    savePartProgress(updatePartProgressFromSession(partProgress, session, questions, partStarts, partSizes));
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
    removeKey(storageKeys.savedQuiz);
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
      certId: activeCertId,
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
    writeJson(storageKeys.savedQuiz, session);
    setSaveHint('saved');
    window.setTimeout(() => setSaveHint(''), 1500);
  }

  function resumeQuiz() {
    setPendingStart(null);
    continueInProgressQuiz();
  }

  function exitQuiz() {
    removeKey(storageKeys.savedQuiz);
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
      `📋 ${cert.exam} Quiz Results`,
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

  function launchFlash({ mode = 'all', count = 0, parts = partSizes.map((_, index) => index), source = 'all', order = 'random', label } = {}) {
    const fcUnknown = readJson(storageKeys.fcUnknown, []);
    let pool = [];
    parts.forEach((partIndex) => {
      const start = partStarts[partIndex];
      for (let i = 0; i < partSizes[partIndex]; i += 1) pool.push(start + i);
    });
    pool = pool.filter((index) => quizIndexSet.has(index));

    if (mode === 'flagged') pool = pool.filter((index) => flagged.includes(index));
    else if (mode === 'weak') pool = pool.filter((index) => weak[index]);
    if (source === 'weak') pool = pool.filter((index) => weak[index]);
    if (source === 'unknown') pool = pool.filter((index) => fcUnknown.includes(index));

    if (!pool.length) {
      if (mode === 'flagged' || source === 'unknown') window.alert('No cards match this filter.');
      else window.alert('No cards in the selected parts.');
      return;
    }

    const ordered = order === 'random' ? shuffle(pool) : [...pool];
    const limit = count > 0 ? Math.min(count, ordered.length) : ordered.length;
    const finalPool = ordered.slice(0, limit);

    setFlash({
      label: label ?? `Flashcards · ${finalPool.length}`,
      pool: finalPool,
      current: 0,
      flipped: false,
      known: 0,
      review: 0
    });
    navigateTo('flashcards', { certId: activeCertId });
  }

  function startFlash(mode = 'all') {
    if (mode === 'weak') launchFlash({ mode: 'weak', count: 0, label: `Weak areas · ${Object.keys(weak).length}` });
    else if (mode === 'flagged') launchFlash({ mode: 'flagged', count: 0, label: `Flagged · ${flagged.length}` });
    else launchFlash({ count: 0, label: `All cards · ${quizQuestions.length}` });
  }

  function markFlashKnown(questionIndex) {
    const known = readJson(storageKeys.fcKnown, []);
    const unknown = readJson(storageKeys.fcUnknown, []);
    if (!known.includes(questionIndex)) known.push(questionIndex);
    const idx = unknown.indexOf(questionIndex);
    if (idx > -1) unknown.splice(idx, 1);
    writeJson(storageKeys.fcKnown, known);
    writeJson(storageKeys.fcUnknown, unknown);
  }

  function markFlashUnknown(questionIndex) {
    const known = readJson(storageKeys.fcKnown, []);
    const unknown = readJson(storageKeys.fcUnknown, []);
    if (!unknown.includes(questionIndex)) unknown.push(questionIndex);
    const idx = known.indexOf(questionIndex);
    if (idx > -1) known.splice(idx, 1);
    writeJson(storageKeys.fcKnown, known);
    writeJson(storageKeys.fcUnknown, unknown);
    setWeak((prev) => {
      const next = { ...prev, [questionIndex]: (prev[questionIndex] ?? 0) + 1 };
      writeJson(storageKeys.weak, next);
      return next;
    });
  }

  function exportData() {
    const filename = `certforge-${activeCertId}-progress-${new Date().toISOString().slice(0, 10)}.json`;
    const payload = buildExportPayload({
      certId: activeCertId,
      exam: cert.exam,
      storageKeys,
      history,
      flagged,
      weak,
      partProgress,
      fcKnown: readJson(storageKeys.fcKnown, []),
      fcUnknown: readJson(storageKeys.fcUnknown, [])
    });
    const url = URL.createObjectURL(new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' }));
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
    showSyncHint('success', `Export successful — ${filename} has been downloaded.`);
  }

  function importData(event) {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const { format, data, count } = parseImportPayload(reader.result);
        const imported = [];
        if (data.history !== undefined) {
          saveHistory(normalizeHistory(data.history));
          imported.push('quiz history');
        }
        if (data.flagged !== undefined) {
          saveFlagged(data.flagged);
          imported.push('flagged');
        }
        if (data.weak !== undefined) {
          saveWeak(data.weak);
          imported.push('weak areas');
        }
        if (data.partProgress !== undefined) {
          savePartProgress(data.partProgress);
          imported.push('per-part progress');
        }
        if (data.fcKnown !== undefined) {
          writeJson(storageKeys.fcKnown, data.fcKnown);
          imported.push('flashcard known');
        }
        if (data.fcUnknown !== undefined) {
          writeJson(storageKeys.fcUnknown, data.fcUnknown);
          imported.push('flashcard review');
        }
        if (data.theme) persistTheme(data.theme === 'dark');
        if (!imported.length) throw new Error('No supported data found.');
        const formatLabel = format === 'gh300-pro' ? 'GH-300 Pro' : 'CertForge';
        showSyncHint('success', `Import successful (${formatLabel}) — ${imported.join(', ')}. ${count} items in file.`);
      } catch (error) {
        showSyncHint('error', error?.message === 'Invalid file format.' || error?.message?.includes('JSON') ? 'Invalid file — use a .json file exported from CertForge or GH-300 Pro.' : `Import failed: ${error?.message ?? 'Unknown error'}`);
      }
    };
    reader.onerror = () => showSyncHint('error', 'Could not read the file — try selecting it again.');
    reader.readAsText(file);
    event.target.value = '';
  }

  function clearAllData() {
    const confirmed = window.confirm(
      `Clear all ${cert.exam} progress?\n\nThis includes: quiz history, per-part progress, flagged, weak areas, flashcards, and saved in-progress quiz.\n\nThis cannot be undone. Light/dark theme is kept.`
    );
    if (!confirmed) return;
    Object.values(storageKeys).forEach(removeKey);
    setHistory([]);
    setFlagged([]);
    setWeak({});
    setPartProgress({});
    setSession(null);
    setFlash(null);
    setPendingStart(null);
    setSaveHint('');
    showSyncHint('success', `All ${cert.exam} progress data has been cleared.`);
  }

  useEffect(() => {
    if (!session || session.finished) return;
    writeJson(storageKeys.savedQuiz, session);
  }, [session, storageKeys.savedQuiz]);

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
      if (route !== 'practice' || !session || session.finished) return;
      if (event.key === 'ArrowRight' || event.key === 'n') moveQuestion(1);
      if (event.key === 'ArrowLeft' || event.key === 'p') moveQuestion(-1);
      if ((event.key === 'Enter' || event.key === 'c') && !event.ctrlKey && !event.metaKey) checkCurrent();
    }
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [route, session]);

  const currentQuestion = session ? questions[session.indices[session.current]] : null;

  const pageTitle = {
    home: 'CertForge home',
    catalog: 'Certification catalog',
    'cert-dashboard': `${cert.exam} workspace`,
    practice: session ? session.label : `${cert.exam} practice`,
    flashcards: flash ? flash.label ?? 'Flashcard deck' : 'Flashcards',
    learn: `${cert.exam} knowledge base`,
    labs: `${cert.exam} labs`,
    library: `${cert.exam} question library`
  }[route];

  return {
    route,
    navigateTo,
    certId: activeCertId,
    cert,
    quizQuestions,
    dark,
    persistTheme,
    history,
    flagged,
    weak,
    session,
    setSession,
    flash,
    setFlash,
    search,
    setSearch,
    partProgress,
    saveHint,
    syncHint,
    pendingStart,
    setPendingStart,
    hasSavedQuiz,
    stats,
    currentQuestion,
    pageTitle,
    requestStartQuiz,
    continueInProgressQuiz,
    confirmStartFresh,
    checkCurrent,
    revealCurrent,
    retryCurrent,
    toggleChoice,
    moveQuestion,
    submitQuiz,
    retakeQuiz,
    retryWrongFromSummary,
    saveQuizProgress,
    resumeQuiz,
    exitQuiz,
    reviewFlaggedInSession,
    copyQuizResults,
    toggleFlag,
    launchFlash,
    startFlash,
    markFlashKnown,
    markFlashUnknown,
    exportData,
    importData,
    clearAllData
  };
}
