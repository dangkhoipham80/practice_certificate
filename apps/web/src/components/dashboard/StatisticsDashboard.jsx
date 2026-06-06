import { BarChart3, CalendarDays, ClipboardList, Flame, Target } from 'lucide-react';
import { computeDayStreak } from '../../lib/statsUtils';
import { BurnStreakBadge } from '../streak/BurnStreakBadge';
import { SectionHeader } from '../ui/SectionHeader';

export function StatisticsDashboard({ history, stats, cert, streak: streakOverride }) {
  const streak = streakOverride ?? computeDayStreak(history);
  const recent = history.slice(-10);
  const trend = recent.length ? recent : [];

  return (
    <div className="panel p-5 sm:p-6">
      <SectionHeader kicker="Analytics" title="Statistics dashboard" description={`Quiz trends, daily streak, and recent attempts for ${cert.exam}.`} />

      <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatTile label="Quizzes taken" value={stats.attempts} tone="accent" icon={ClipboardList} />
        <StatTile label="Avg score" value={`${stats.avg}%`} tone="success" icon={Target} />
        {streak > 0 ? (
          <div className="stat-tile stat-tile-purple flex flex-col items-center justify-center gap-2 ring-1 ring-orange-300/60 dark:ring-orange-500/30">
            <BurnStreakBadge streak={streak} />
            <div className="text-[10px] font-semibold opacity-80">Day streak</div>
          </div>
        ) : (
          <StatTile label="Day streak" value={streak} tone="purple" icon={Flame} />
        )}
        <StatTile label="Questions answered" value={stats.answered} tone="warning" icon={BarChart3} />
      </div>

      <div className="mt-6">
        <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-muted">Score trend (last 10 quizzes)</p>
        {!trend.length ? (
          <p className="text-xs italic text-muted dark:text-slate-500">No data yet — finish a quiz to see your trend.</p>
        ) : (
          <div className="flex h-20 items-end gap-1.5">
            {trend.map((row) => {
              const pass = row.score >= 70;
              return (
                <div className="flex min-w-0 flex-1 flex-col items-center gap-1" key={row.id}>
                  <div
                    className={`w-full min-h-[4px] rounded-t transition-all ${pass ? 'bg-success-500' : 'bg-danger-500'}`}
                    style={{ height: `${Math.max(row.score * 0.6, 4)}px` }}
                    title={`${row.label}: ${row.score}%`}
                  />
                  <span className="text-[9px] font-semibold tabular-nums text-muted dark:text-slate-500">{row.score}%</span>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div className="mt-6">
        <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-muted">Recent history</p>
        {!history.length ? (
          <p className="text-xs italic text-muted dark:text-slate-500">No quiz history yet.</p>
        ) : (
          <div className="max-h-44 space-y-0 overflow-y-auto">
            {[...history].reverse().slice(0, 10).map((row) => (
              <div className="flex items-center justify-between gap-3 border-b border-line/60 py-2 last:border-0 dark:border-gh-border" key={row.id}>
                <div className="min-w-0">
                  <p className="truncate text-xs font-bold">{row.label}</p>
                  <p className="flex items-center gap-1 text-[10px] text-muted dark:text-slate-500">
                    <CalendarDays size={10} />
                    {new Date(row.date).toLocaleDateString()}
                  </p>
                </div>
                <span className={`shrink-0 text-xs font-extrabold tabular-nums ${row.score >= 70 ? 'text-success-600 dark:text-success-400' : 'text-danger-600 dark:text-danger-400'}`}>
                  {row.score}% ({row.correct}/{row.total})
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function StatTile({ label, value, tone, icon: Icon }) {
  const toneClass =
    tone === 'success'
      ? 'stat-tile-success'
      : tone === 'purple'
        ? 'stat-tile-purple'
        : tone === 'warning'
          ? 'stat-tile-warning'
          : 'stat-tile-accent';
  return (
    <div className={`stat-tile ${toneClass}`}>
      <Icon size={16} className="mb-2 opacity-70" />
      <div className="text-xl font-extrabold tabular-nums">{value}</div>
      <div className="text-[10px] font-semibold opacity-80">{label}</div>
    </div>
  );
}
