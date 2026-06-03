export const QUESTION_KINDS = ['mc', 'hotspot', 'drag-drop', 'simulation', 'other'];

export const QUESTION_KIND_LABELS = {
  mc: 'Multiple choice',
  hotspot: 'Hotspot',
  'drag-drop': 'Drag & drop',
  simulation: 'Simulation',
  other: 'Other',
};

export function classifyInteractiveKind(text = '') {
  const trimmed = text.trim();
  if (/^HOTSPOT/i.test(trimmed)) return 'hotspot';
  if (/^DRAG DROP/i.test(trimmed)) return 'drag-drop';
  if (/^SIMULATION/i.test(trimmed)) return 'simulation';
  return 'other';
}

export function resolveQuestionKind(question) {
  if (question.questionKind) return question.questionKind;
  if (question.quizEligible !== false && question.choices?.length) return 'mc';
  return classifyInteractiveKind(question.text);
}

export function getQuestionKindStats(questions) {
  const stats = Object.fromEntries(QUESTION_KINDS.map((kind) => [kind, 0]));
  for (const question of questions) {
    const kind = resolveQuestionKind(question);
    stats[kind] = (stats[kind] ?? 0) + 1;
  }
  return stats;
}

export function getIndicesForQuestionKind(questions, kind) {
  return questions.reduce((indices, question, index) => {
    if (resolveQuestionKind(question) === kind) indices.push(index);
    return indices;
  }, []);
}

export function getInteractiveIndices(questions) {
  return questions.reduce((indices, question, index) => {
    if (question.quizEligible === false) indices.push(index);
    return indices;
  }, []);
}
