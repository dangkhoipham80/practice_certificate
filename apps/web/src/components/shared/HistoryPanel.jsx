import { ClipboardList } from 'lucide-react';

export function HistoryPanel({ history }) {
  return (
    <div className="panel p-5 xl:sticky xl:top-28">
      <div className="mb-5 flex items-center justify-between">
        <h3 className="font-extrabold tracking-tight">Recent attempts</h3>
        <span className="rounded-full bg-subtle px-2.5 py-0.5 text-xs font-bold text-muted dark:bg-gh-subtle dark:text-slate-400">{history.length}</span>
      </div>
      {!history.length && (
        <div className="empty-state py-8">
          <ClipboardList size={28} className="mb-2 text-muted/40" />
          <p className="text-sm font-semibold">No attempts yet</p>
          <p className="mt-1 text-xs text-muted">Start a quiz to track progress</p>
        </div>
      )}
      <div className="space-y-2">
        {history.slice(-6).reverse().map((row) => (
          <div className="history-item" key={row.id}>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-bold">{row.label}</p>
              <p className="text-xs text-muted dark:text-slate-400">
                {new Date(row.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
              </p>
            </div>
            <span className={`score-pill ${row.score >= 70 ? 'score-pill-pass' : 'score-pill-fail'}`}>{row.score}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}
