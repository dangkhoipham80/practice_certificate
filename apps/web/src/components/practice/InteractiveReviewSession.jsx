import { ChevronLeft, ChevronRight, Flag, Layers3 } from 'lucide-react';
import { formatTimer, percent } from '../../lib/quizUtils';
import { QUESTION_KIND_LABELS, resolveQuestionKind } from '../../utils/ai102InteractiveKind';
import { QuestionText } from '../shared/QuestionText';
import { QuestionMap } from './QuestionMap';

const KIND_BADGE_CLASS = {
  hotspot: 'bg-sky-100 text-sky-800 dark:bg-sky-500/15 dark:text-sky-200',
  'drag-drop': 'bg-violet-100 text-violet-800 dark:bg-violet-500/15 dark:text-violet-200',
  simulation: 'bg-amber-100 text-amber-800 dark:bg-amber-500/15 dark:text-amber-200',
  other: 'bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-200',
};

export function InteractiveReviewSession({ cert, session, flagged, toggleFlag, moveQuestion, finishReview, exitQuiz, setSession }) {
  const questionIndex = session.indices[session.current];
  const currentQuestion = cert.questions[questionIndex];
  const kind = resolveQuestionKind(currentQuestion);
  const isFlagged = flagged.includes(questionIndex);
  const progress = percent(session.current + 1, session.indices.length);

  return (
    <section className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_300px]">
      <div className="exam-panel">
        <div className="border-b border-line bg-subtle px-5 py-4 dark:border-gh-border dark:bg-gh-subtle sm:px-6">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="section-kicker">{session.label}</p>
              <h2 className="mt-1 text-xl font-bold">
                Review {session.current + 1} / {session.indices.length}
              </h2>
              <div className="mt-2 flex flex-wrap items-center gap-2 text-xs">
                <span className={`rounded-full px-2.5 py-0.5 font-bold ${KIND_BADGE_CLASS[kind] ?? KIND_BADGE_CLASS.other}`}>
                  {QUESTION_KIND_LABELS[kind] ?? kind}
                </span>
                <span className="text-muted dark:text-slate-400">Bank Q{questionIndex + 1}</span>
                <span className="font-mono text-muted dark:text-slate-500">{formatTimer(session.timerSec)}</span>
              </div>
            </div>
            <button
              className={`icon-button ${isFlagged ? 'text-danger-600 dark:text-danger-300' : ''}`}
              onClick={() => toggleFlag(questionIndex)}
              title="Flag question"
              type="button"
            >
              <Flag size={18} fill={isFlagged ? 'currentColor' : 'none'} />
            </button>
          </div>
          <div className="progress-bar mt-4">
            <div className="progress-bar-fill" style={{ width: `${progress}%` }} />
          </div>
        </div>

        <div className="px-5 py-5 sm:px-6">
          <div className="mb-4 flex items-start gap-2 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-xs font-medium text-amber-800 dark:border-amber-500/40 dark:bg-amber-500/10 dark:text-amber-200">
            <Layers3 className="mt-0.5 shrink-0" size={16} />
            <span>
              Interactive question — không tự chấm được. Xem đề, hình và giải thích (nếu có) để ôn trước khi thi.
            </span>
          </div>
          <QuestionText
            text={currentQuestion.text}
            images={currentQuestion.images}
            className="mb-4 max-w-4xl text-lg font-semibold text-ink dark:text-slate-100 sm:text-xl"
          />
          {currentQuestion.explanation && (
            <div className="rounded-xl border border-line/80 bg-subtle/60 p-4 dark:border-gh-border dark:bg-gh-subtle/60">
              <p className="text-xs font-bold uppercase text-muted dark:text-slate-400">Explanation / discussion</p>
              <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-ink dark:text-slate-200">
                {currentQuestion.explanation}
              </p>
            </div>
          )}
        </div>

        <div className="sticky bottom-0 flex flex-wrap gap-2 border-t border-line bg-white/95 px-5 py-3 backdrop-blur dark:border-gh-border dark:bg-gh-panel/95 sm:px-6">
          <button className="secondary-button" disabled={session.current === 0} onClick={() => moveQuestion(-1)} type="button">
            <ChevronLeft size={16} />
            Prev
          </button>
          <button
            className="secondary-button"
            disabled={session.current === session.indices.length - 1}
            onClick={() => moveQuestion(1)}
            type="button"
          >
            Next
            <ChevronRight size={16} />
          </button>
          <button className="primary-button" onClick={finishReview} type="button">
            Finish review
          </button>
          <button className="ghost-button" onClick={exitQuiz} type="button">
            Exit
          </button>
        </div>
      </div>
      <QuestionMap cert={cert} session={session} flagged={flagged} setSession={setSession} />
    </section>
  );
}
