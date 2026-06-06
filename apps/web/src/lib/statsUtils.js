export function computeDayStreak(history) {
  if (!history.length) return 0;
  const days = new Set(history.map((row) => row.date.slice(0, 10)));
  let streak = 0;
  const cursor = new Date();
  while (days.has(cursor.toISOString().slice(0, 10))) {
    streak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }
  return streak;
}

export function computePartStats(sectionIndex, partProgress, sections) {
  const size = sections[sectionIndex]?.questionIndices.length ?? 0;
  const rows = partProgress[sectionIndex];
  if (!rows) {
    return { size, correct: 0, wrong: 0, unanswered: size, attempted: 0, pct: 0, hasProgress: false };
  }
  const correct = rows.filter((value) => value === 'correct').length;
  const wrong = rows.filter((value) => value === 'wrong').length;
  const attempted = correct + wrong;
  const unanswered = size - attempted;
  return {
    size,
    correct,
    wrong,
    unanswered,
    attempted,
    pct: size ? Math.round((correct / size) * 100) : 0,
    hasProgress: true,
  };
}

export function computeBankProgress(partProgress, sections, totalQuestions) {
  let correct = 0;
  let wrong = 0;
  sections.forEach((section, sectionIndex) => {
    const rows = partProgress[sectionIndex];
    if (!rows) return;
    rows.forEach((value) => {
      if (value === 'correct') correct += 1;
      if (value === 'wrong') wrong += 1;
    });
  });
  const attempted = correct + wrong;
  const unanswered = totalQuestions - attempted;
  const pct = attempted ? Math.round((correct / totalQuestions) * 100) : 0;
  const masteryPct = Math.round((correct / totalQuestions) * 100);
  return { total: totalQuestions, correct, wrong, attempted, unanswered, pct, masteryPct };
}

export function getQuestionGlobalIndex(sectionIndex, localIndex, sections) {
  return sections[sectionIndex].questionIndices[localIndex];
}
