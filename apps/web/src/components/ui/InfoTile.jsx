export function InfoTile({ label, value }) {
  return (
    <div className="rounded-xl border border-line/70 bg-subtle/80 p-3.5 dark:border-gh-border dark:bg-gh-subtle/60">
      <p className="text-[11px] font-bold uppercase tracking-wider text-muted dark:text-slate-500">{label}</p>
      <p className="mt-1 font-bold">{value}</p>
    </div>
  );
}
