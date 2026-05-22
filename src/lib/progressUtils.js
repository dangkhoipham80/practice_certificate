import { gh300Questions } from '../data/gh300Questions';
import { partSizes, partStarts } from '../config/gh300Exam';
import { sameAnswer } from './quizUtils';

export function getPartIndex(questionIndex) {
  for (let part = partStarts.length - 1; part >= 0; part -= 1) {
    if (questionIndex >= partStarts[part]) return part;
  }
  return 0;
}

export function getWrongIndices(partProgress) {
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

export function getUnansweredIndices(partProgress) {
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

export function updatePartProgressFromSession(partProgress, session) {
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
