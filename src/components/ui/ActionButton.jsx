export function ActionButton({ icon: Icon, label, meta, onClick }) {
  return (
    <button className="action-button" onClick={onClick}>
      <span className="metric-icon">
        <Icon size={18} />
      </span>
      <span className="min-w-0">
        <span className="block font-semibold">{label}</span>
        {meta && <span className="block truncate text-xs text-muted dark:text-slate-400">{meta}</span>}
      </span>
    </button>
  );
}
