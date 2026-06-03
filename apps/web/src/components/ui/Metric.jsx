export function Metric({ label, value, icon: Icon, highlight = false, variant }) {
  const iconClass =
    variant === 'success' ? 'metric-icon metric-icon-success' : variant === 'warning' ? 'metric-icon metric-icon-warning' : 'metric-icon';
  return (
    <div className={`panel p-5 ${highlight ? 'ring-1 ring-accent-200/60 dark:ring-accent-500/25' : ''}`}>
      <div className="flex items-center gap-4">
        <span className={iconClass}>
          <Icon size={20} />
        </span>
        <div>
          <p className="text-2xl font-extrabold tabular-nums tracking-tight">{value}</p>
          <p className="text-xs font-semibold text-muted dark:text-slate-400">{label}</p>
        </div>
      </div>
    </div>
  );
}
