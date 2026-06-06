import { getSectionIndexForQuestion } from './examSections';
import { sameAnswer } from './quizUtils';

export function getPartIndex(questionIndex, sections) {
  return getSectionIndexForQuestion(questionIndex, sections)?.sectionIndex ?? 0;
}

export function getWrongIndices(partProgress, sections) {
  const wrong = [];
  sections.forEach((section, sectionIndex) => {
    const rows = partProgress[sectionIndex];
    if (!rows) return;
    rows.forEach((value, localIndex) => {
      if (value === 'wrong') wrong.push(section.questionIndices[localIndex]);
    });
  });
  return wrong;
}

export function getUnansweredIndices(partProgress, sections) {
  const unanswered = [];
  sections.forEach((section, sectionIndex) => {
    const rows = partProgress[sectionIndex];
    if (!rows) {
      unanswered.push(...section.questionIndices);
      return;
    }
    rows.forEach((value, localIndex) => {
      if (value === null || value === undefined) unanswered.push(section.questionIndices[localIndex]);
    });
  });
  return unanswered;
}

export function updatePartProgressFromSession(partProgress, session, questions, sections) {
  const next = { ...partProgress };
  session.indices.forEach((questionIndex, slot) => {
    if (!session.answers[slot].length) return;
    const mapping = getSectionIndexForQuestion(questionIndex, sections);
    if (!mapping) return;
    const { sectionIndex, localIndex } = mapping;
    const size = sections[sectionIndex].questionIndices.length;
    if (!next[sectionIndex]) next[sectionIndex] = new Array(size).fill(null);
    const ok = sameAnswer(session.answers[slot], questions[questionIndex].correct);
    next[sectionIndex] = [...next[sectionIndex]];
    next[sectionIndex][localIndex] = ok ? 'correct' : 'wrong';
  });
  return next;
}
