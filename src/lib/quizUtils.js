import { readJson } from './storage';
import { storageKeys } from '../config/gh300Exam';

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

export function getInProgressQuiz(activeSession) {
  if (activeSession && !activeSession.finished) return activeSession;
  const saved = readJson(storageKeys.savedQuiz, null);
  if (saved?.indices?.length && !saved.finished) return saved;
  return null;
}
