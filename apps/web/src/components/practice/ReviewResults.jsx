import { InfoTile } from '../ui/InfoTile';

export function ReviewResults({ session, exitQuiz, retakeReview }) {
  return (
    <section className="panel mx-auto max-w-3xl overflow-hidden animate-slide-up">
      <div className="border-b border-line/70 px-6 py-8 text-center dark:border-gh-border">
        <p className="section-kicker justify-center">Review complete</p>
        <p className="mt-2 text-sm text-muted dark:text-slate-400">{session.label}</p>
        <p className="mt-6 text-3xl font-extrabold tracking-tight">✓</p>
        <p className="mt-2 text-lg font-bold text-ink dark:text-slate-100">Đã xem hết session interactive</p>
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
          <InfoTile label="Reviewed" value={session.indices.length} />
          <InfoTile label="Flagged in session" value={session.flaggedCount ?? 0} />
          <InfoTile label="Mode" value="Library review" />
        </div>
        <p className="mt-5 text-sm text-muted dark:text-slate-400">
          Các câu này không có trong quiz pool vì app chưa hỗ trợ chấm Hotspot / Drag & drop / Simulation.
        </p>
      </div>
      <div className="flex flex-wrap justify-center gap-2 px-6 py-5">
        <button className="primary-button" onClick={retakeReview} type="button">
          Review lại
        </button>
        <button className="secondary-button" onClick={exitQuiz} type="button">
          Back to practice
        </button>
      </div>
    </section>
  );
}
