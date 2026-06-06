export function getBurnStreak(streaks) {
  if (!streaks || typeof streaks !== 'object') return 0;
  const values = Object.values(streaks);
  if (!values.length) return 0;
  return Math.max(0, ...values);
}

export function getActiveStreakCerts(streaks) {
  if (!streaks) return [];
  return Object.entries(streaks)
    .filter(([, count]) => count > 0)
    .sort((a, b) => b[1] - a[1]);
}
