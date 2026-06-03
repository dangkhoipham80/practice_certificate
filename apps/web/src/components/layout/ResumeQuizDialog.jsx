import { Play, RotateCcw } from 'lucide-react';

export function ResumeQuizDialog({ inProgress, nextLabel, onContinue, onStartFresh, onCancel }) {
  const answered = inProgress.checked?.filter(Boolean).length ?? 0;
  return (
    <div className="modal-overlay" role="dialog" aria-modal="true" aria-labelledby="resume-quiz-title">
      <button className="modal-backdrop" type="button" aria-label="Close" onClick={onCancel} />
      <div className="modal-card panel max-w-md p-6 animate-slide-up">
        <p className="section-kicker">Quiz in progress</p>
        <h2 id="resume-quiz-title" className="mt-2 text-xl font-extrabold tracking-tight">
          Continue or start fresh?
        </h2>
        <p className="mt-3 text-sm leading-6 text-muted dark:text-slate-400">
          You have an unfinished <span className="font-semibold text-ink dark:text-slate-200">{inProgress.label}</span> session
          (question {(inProgress.current ?? 0) + 1}/{inProgress.indices.length}
          {answered > 0 ? `, ${answered} checked` : ''}).
        </p>
        <p className="mt-2 text-sm text-muted dark:text-slate-400">
          Choose <span className="font-semibold">Continue</span> to resume the saved session, or <span className="font-semibold">Start fresh</span> to begin {nextLabel}.
        </p>
        <div className="mt-6 flex flex-col gap-2 sm:flex-row">
          <button className="primary-button flex-1" onClick={onContinue}>
            <Play size={16} />
            Continue
          </button>
          <button className="secondary-button flex-1" onClick={onStartFresh}>
            <RotateCcw size={16} />
            Start fresh
          </button>
          <button className="ghost-button sm:flex-none" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
