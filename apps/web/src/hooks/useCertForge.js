import { useEffect, useMemo, useState } from 'react';
import { useAppNavigation } from './useAppNavigation';
import { useCertContext } from '../context/CertContext';
import { getQuizQuestions } from '../config/certRegistry';
import { readJson, removeKey, writeJson } from '../lib/storage';
import { getDragDropCorrectFilled, isDragDropQuizReady } from '../lib/dragDropUiFormat';
import {
  applyWeakDelta,
  formatTimer,
  getInProgressQuiz,
  gradeAnswer,
  isAnswerComplete,
  isDragDropQuizQuestion,
  percent,
  shuffle
} from '../lib/quizUtils';
import {
  getUnansweredIndices,
  getWrongIndices,
  updatePartProgressFromSession
} from '../lib/progressUtils';
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
    () =>
      questions
        .map((q, index) => {
          if (q.quizEligible === false) return null;
          if (q.choices?.length) return index;
          if (isDragDropQuizReady(q.uiConfig)) return index;
          return null;
        })
        .filter((index) => index !== null),
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

  function startQuiz({ mode = 'random', count = 20, partIndex = null, label, shufflePool = true, customIndices = null, reviewMode = false }) {
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
      answers: indices.map((idx) => (isDragDropQuizQuestion(questions[idx]) ? {} : [])),
      checked: indices.map(() => false),
      finished: false,
      timerSec: 0,
      reviewMode,
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
    const ok = gradeAnswer(current.answers[slot], questions[questionIndex]);
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

  function setDragDropFilled(filled) {
    setSession((current) => {
      if (!current || current.checked[current.current]) return current;
      const answers = current.answers.map((answer, i) =>
        i === current.current ? { ...filled } : Array.isArray(answer) ? [...answer] : { ...answer }
      );
      return { ...current, answers };
    });
  }

  function checkCurrent() {
    setSession((current) => {
      const question = questions[current.indices[current.current]];
      if (!current || current.checked[current.current] || !isAnswerComplete(current.answers[current.current], question)) {
        return current;
      }
      resolveCurrentAttempt(current);
      const checked = [...current.checked];
      checked[current.current] = true;
      return { ...current, checked };
    });
  }

  function revealCurrent() {
    setSession((current) => {
      if (!current || current.checked[current.current]) return current;
      const slot = current.current;
      const question = questions[current.indices[slot]];
      const answers = current.answers.map((answer, i) => {
        if (i !== slot) return Array.isArray(answer) ? [...answer] : { ...answer };
        if (isDragDropQuizQuestion(question)) return getDragDropCorrectFilled(question.uiConfig);
        return [...question.correct];
      });
      const next = { ...current, answers };
      resolveCurrentAttempt(next);
      const checked = [...current.checked];
      checked[slot] = true;
      return { ...next, checked };
    });
  }

  function retryCurrent() {
    setSession((current) => {
      if (!current || !current.checked[current.current]) return current;
      const answers = current.answers.map((answer) => [...answer]);
      const checked = [...current.checked];
      const question = questions[current.indices[current.current]];
      answers[current.current] = isDragDropQuizQuestion(question) ? {} : [];
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

  function finishReview() {
    if (!session?.reviewMode) return;
    const flaggedCount = session.indices.filter((questionIndex) => flagged.includes(questionIndex)).length;
    removeKey(storageKeys.savedQuiz);
    setSaveHint('');
    setSession({ ...session, finished: true, flaggedCount });
  }

  function retakeReview() {
    if (!session?.reviewMode) return;
    setSession({
      ...session,
      current: 0,
      finished: false,
      flaggedCount: undefined,
      timerSec: 0,
    });
  }

  function submitQuiz() {
    if (!session) return;
    const wrongSlots = [];
    let correct = 0;
    session.indices.forEach((questionIndex, slot) => {
      const ok = gradeAnswer(session.answers[slot], questions[questionIndex]);
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
      answers: session.indices.map((idx) => (isDragDropQuizQuestion(questions[idx]) ? {} : [])),
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
      answers: indices.map((idx) => (isDragDropQuizQuestion(questions[idx]) ? {} : [])),
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
    setDragDropFilled,
    moveQuestion,
    submitQuiz,
    retakeQuiz,
    retryWrongFromSummary,
    saveQuizProgress,
    resumeQuiz,
    exitQuiz,
    finishReview,
    retakeReview,
    reviewFlaggedInSession,
    copyQuizResults,
    toggleFlag,
    launchFlash,
    startFlash,
    markFlashKnown,
    markFlashUnknown
  };
}
