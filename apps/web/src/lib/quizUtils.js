import { readJson } from './storage';
import {
  dragDropFilledComplete,
  getDragDropCorrectFilled,
  gradeDragDropFilled,
  isDragDropQuizReady,
} from './dragDropUiFormat.js';
import {
  getHotAreaCorrectFilled,
  gradeHotAreaFilled,
  hotAreaFilledComplete,
  isHotAreaQuizReady,
} from './hotAreaUiFormat.js';

export function shuffle(input) {
  const items = [...input];
  for (let i = items.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [items[i], items[j]] = [items[j], items[i]];
  }
  return items;
}

export function sameAnswer(a, b) {
  if (a.length !== b.length) return false;
  const left = [...a].sort((x, y) => x - y);
  const right = [...b].sort((x, y) => x - y);
  return left.every((value, index) => value === right[index]);
}

export function isDragDropQuizQuestion(question) {
  return (
    question?.quizEligible !== false &&
    !(question?.choices?.length > 0) &&
    isDragDropQuizReady(question?.uiConfig)
  );
}

export function isHotAreaQuizQuestion(question) {
  return (
    question?.quizEligible !== false &&
    !(question?.choices?.length > 0) &&
    isHotAreaQuizReady(question?.uiConfig)
  );
}

export function isInteractiveQuizQuestion(question) {
  return isDragDropQuizQuestion(question) || isHotAreaQuizQuestion(question);
}

export function isAnswerComplete(answer, question) {
  if (isDragDropQuizQuestion(question)) {
    return dragDropFilledComplete(answer, question.uiConfig);
  }
  if (isHotAreaQuizQuestion(question)) {
    return hotAreaFilledComplete(answer, question.uiConfig);
  }
  return Array.isArray(answer) && answer.length > 0;
}

export function gradeAnswer(answer, question) {
  if (isDragDropQuizQuestion(question)) {
    return gradeDragDropFilled(answer, question.uiConfig);
  }
  if (isHotAreaQuizQuestion(question)) {
    return gradeHotAreaFilled(answer, question.uiConfig);
  }
  return sameAnswer(answer, question.correct ?? []);
}

export function formatQuizAnswer(answer, question) {
  if (isDragDropQuizQuestion(question)) {
    const ui = question.uiConfig ?? {};
    const zones = ui.answer_area?.drop_zones ?? ui.drop_zones ?? [];
    return zones
      .map((z) => `${z.id}: ${answer[z.id] ?? '—'}`)
      .filter(Boolean)
      .join(' · ');
  }
  if (isHotAreaQuizQuestion(question)) {
    const zones = question.uiConfig?.answer_area?.hotspots ?? question.uiConfig?.hotspots ?? [];
    return zones
      .map((z) => `${z.id}: ${answer[z.id] ?? '—'}`)
      .filter(Boolean)
      .join(' · ');
  }
  const choices = question.choices ?? [];
  return (answer ?? []).map((i) => choices[i] ?? String.fromCharCode(65 + i)).join('; ');
}

export function formatQuizCorrect(question) {
  if (isDragDropQuizQuestion(question)) {
    const filled = getDragDropCorrectFilled(question.uiConfig);
    const zones = question.uiConfig?.answer_area?.drop_zones ?? question.uiConfig?.drop_zones ?? [];
    return zones.map((z) => `${z.id}: ${filled[z.id] ?? '—'}`).join(' · ');
  }
  if (isHotAreaQuizQuestion(question)) {
    const filled = getHotAreaCorrectFilled(question.uiConfig);
    const zones = question.uiConfig?.answer_area?.hotspots ?? question.uiConfig?.hotspots ?? [];
    return zones.map((z) => `${z.id}: ${filled[z.id] ?? '—'}`).join(' · ');
  }
  return (question.correct ?? [])
    .map((item) => String.fromCharCode(65 + item))
    .join(', ');
}

export function percent(value, total) {
  if (!total) return 0;
  return Math.round((value / total) * 100);
}

export function formatTimer(seconds = 0) {
  const mins = String(Math.floor(seconds / 60)).padStart(2, '0');
  const secs = String(seconds % 60).padStart(2, '0');
  return `${mins}:${secs}`;
}

export function applyWeakDelta(weakMap, questionIndex, isCorrect) {
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

export function getInProgressQuiz(activeSession, savedQuizKey) {
  if (activeSession && !activeSession.finished) return activeSession;
  const saved = readJson(savedQuizKey, null);
  if (saved?.indices?.length && !saved.finished) return saved;
  return null;
}
