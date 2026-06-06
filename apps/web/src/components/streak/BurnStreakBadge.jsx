import { Flame } from 'lucide-react';

export function BurnStreakBadge({ streak, compact = false, className = '' }) {
  const burning = streak > 0;

  return (
    <span
      className={`burn-streak-badge ${burning ? 'burn-streak-badge--active' : 'burn-streak-badge--cold'} ${compact ? 'burn-streak-badge--compact' : ''} ${className}`}
      title={burning ? `${streak} day streak — keep it burning!` : 'Practice today to start your streak'}
    >
      <Flame size={compact ? 14 : 16} className={burning ? 'burn-streak-flame' : 'opacity-50'} />
      <span className="burn-streak-count tabular-nums">{streak}</span>
      {!compact && <span className="burn-streak-label">{streak === 1 ? 'day' : 'days'}</span>}
    </span>
  );
}
