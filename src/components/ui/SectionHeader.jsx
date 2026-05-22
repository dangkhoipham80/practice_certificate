export function SectionHeader({ kicker, title, description }) {
  return (
    <div className="mb-1">
      <p className="section-kicker">{kicker}</p>
      <h2 className="mt-2 text-2xl font-extrabold tracking-tight sm:text-3xl">{title}</h2>
      {description && <p className="mt-2 max-w-3xl text-sm leading-7 text-muted dark:text-slate-400">{description}</p>}
    </div>
  );
}
