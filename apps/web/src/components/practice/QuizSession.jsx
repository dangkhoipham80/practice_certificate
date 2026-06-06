import {
  Check,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Eye,
  Flag,
  RotateCcw,
  Save
} from 'lucide-react';
import { useExamSections } from '../../hooks/useExamSections';
import { getSectionBadgeLabel } from '../../lib/examSections';
import { getPartIndex } from '../../lib/progressUtils';
import {
  formatQuizCorrect,
  formatTimer,
  gradeAnswer,
  isAnswerComplete,
  isDragDropQuizQuestion,
  isHotAreaQuizQuestion,
  percent
} from '../../lib/quizUtils';
import { DragDropQuestion } from '../library/questionTypes/DragDropQuestion';
import { HotAreaQuestion } from '../library/questionTypes/HotAreaQuestion';
import { QuestionText } from '../shared/QuestionText';
import { QuestionMap } from './QuestionMap';

export function QuizSession({
  cert,
  session,
  currentQuestion,
  flagged,
  saveHint,
  checkCurrent,
  revealCurrent,
  retryCurrent,
  toggleChoice,
  setDragDropFilled,
  toggleFlag,
  moveQuestion,
  submitQuiz,
  saveQuizProgress,
  exitQuiz,
  reviewFlaggedInSession,
  setSession
}) {
  const { sections } = useExamSections(cert);
  const questionIndex = session.indices[session.current];
  const selected = session.answers[session.current];
  const checked = session.checked[session.current];
  const isDragDrop = isDragDropQuizQuestion(currentQuestion);
  const isHotArea = isHotAreaQuizQuestion(currentQuestion);
  const isCorrect = checked && gradeAnswer(selected, currentQuestion);
  const isFlagged = flagged.includes(questionIndex);
  const progress = percent(session.current + 1, session.indices.length);
  const partIndex = getPartIndex(questionIndex, sections);
  const canCheck = isAnswerComplete(selected, currentQuestion);

  return (
    <section className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_300px]">
      <div className="exam-panel">
        <div className="border-b border-line bg-subtle px-5 py-4 dark:border-gh-border dark:bg-gh-subtle sm:px-6">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="section-kicker">{session.label}</p>
              <h2 className="mt-1 text-xl font-bold">
                Question {session.current + 1} / {session.indices.length}
              </h2>
              <div className="mt-2 flex flex-wrap items-center gap-2 text-xs">
                <span className="rounded-full bg-accent-50 px-2.5 py-0.5 font-bold text-accent-700 dark:bg-accent-500/15 dark:text-accent-300">
                  {getSectionBadgeLabel(cert, partIndex)}
                </span>
                <span
                  className={`rounded-full px-2.5 py-0.5 font-bold ${
                    isDragDrop
                      ? 'bg-violet-100 text-violet-700 dark:bg-violet-500/15 dark:text-violet-300'
                      : isHotArea
                        ? 'bg-orange-100 text-orange-700 dark:bg-orange-500/15 dark:text-orange-300'
                        : currentQuestion.multiple
                          ? 'bg-purple-100 text-purple-700 dark:bg-purple-500/15 dark:text-purple-300'
                          : 'bg-subtle text-muted dark:bg-gh-subtle'
                  }`}
                >
                  {isDragDrop ? 'Drag & drop' : isHotArea ? 'Hotspot' : currentQuestion.multiple ? 'Multiple' : 'Single'}
                </span>
                <span className="text-muted dark:text-slate-400">Bank Q{questionIndex + 1}</span>
                <span className="font-mono text-muted dark:text-slate-500">{formatTimer(session.timerSec)}</span>
              </div>
            </div>
            <button className={`icon-button ${isFlagged ? 'text-danger-600 dark:text-danger-300' : ''}`} onClick={() => toggleFlag(questionIndex)} title="Flag question">
              <Flag size={18} fill={isFlagged ? 'currentColor' : 'none'} />
            </button>
          </div>
          <div className="progress-bar mt-4">
            <div className="progress-bar-fill" style={{ width: `${progress}%` }} />
          </div>
        </div>

        <div className="px-5 py-5 sm:px-6">
          <QuestionText
            text={currentQuestion.text}
            images={currentQuestion.images}
            className="mb-4 max-w-4xl text-lg font-semibold text-ink dark:text-slate-100 sm:text-xl"
          />
          {currentQuestion.warn && (
            <div className="mb-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-xs font-medium text-amber-800 dark:border-amber-500/40 dark:bg-amber-500/10 dark:text-amber-200">
              {currentQuestion.warn}
            </div>
          )}
          {isDragDrop ? (
            <DragDropQuestion
              uiConfig={currentQuestion.uiConfig}
              filled={selected}
              onFilledChange={setDragDropFilled}
              readOnly={checked}
            />
          ) : isHotArea ? (
            <HotAreaQuestion
              uiConfig={currentQuestion.uiConfig}
              filled={selected}
              onFilledChange={setDragDropFilled}
              readOnly={checked}
            />
          ) : (
            <div className="space-y-3">
              {currentQuestion.choices.map((choice, index) => {
                const chosen = selected.includes(index);
                const correct = currentQuestion.correct.includes(index);
                const stateClass = checked && correct ? 'answer-correct' : checked && chosen && !correct ? 'answer-wrong' : chosen ? 'answer-selected' : '';
                return (
                  <button
                    key={choice}
                    type="button"
                    className={`answer ${stateClass} ${checked ? 'answer-locked' : ''}`}
                    onClick={() => toggleChoice(index)}
                    aria-disabled={checked}
                  >
                    <span className="answer-letter">{String.fromCharCode(65 + index)}</span>
                    <span className="leading-6">{choice}</span>
                  </button>
                );
              })}
            </div>
          )}
          {checked && (
            <div
              className={`mt-5 flex items-start gap-3 rounded-xl border p-4 text-sm ${
                isCorrect
                  ? 'border-success-200 bg-success-50 text-success-700 dark:border-success-500/30 dark:bg-success-500/10 dark:text-success-100'
                  : 'border-danger-200 bg-danger-50 text-danger-700 dark:border-danger-500/30 dark:bg-danger-500/10 dark:text-danger-100'
              }`}
            >
              <CheckCircle2 className="mt-0.5 shrink-0" size={17} />
              <span>
                {isCorrect ? '✓ Correct!' : '✗ Incorrect'} — Answer: {formatQuizCorrect(currentQuestion)}
                {currentQuestion.explanation && (
                  <span className="mt-2 block text-xs font-normal opacity-90">{currentQuestion.explanation.slice(0, 500)}</span>
                )}
              </span>
            </div>
          )}
        </div>

        <div className="sticky bottom-0 flex flex-wrap gap-2 border-t border-line bg-white/95 px-5 py-3 backdrop-blur dark:border-gh-border dark:bg-gh-panel/95 sm:px-6">
          <button className="secondary-button" onClick={() => moveQuestion(-1)} disabled={session.current === 0}>
            <ChevronLeft size={16} />
            Prev
          </button>
          <button className="primary-button" onClick={checkCurrent} disabled={!canCheck || checked}>
            <Check size={16} />
            Check
          </button>
          {checked && !isCorrect && (
            <button className="secondary-button !border-amber-300 !bg-amber-50 !text-amber-800 dark:!border-amber-500/50 dark:!bg-amber-500/15 dark:!text-amber-200" onClick={retryCurrent}>
              <RotateCcw size={16} />
              Try again
            </button>
          )}
          <button className="secondary-button" onClick={revealCurrent} disabled={checked}>
            <Eye size={16} />
            Reveal
          </button>
          <button className="secondary-button" onClick={() => moveQuestion(1)} disabled={session.current === session.indices.length - 1}>
            Next
            <ChevronRight size={16} />
          </button>
          <button className="primary-button !bg-success-600 !border-success-600 hover:!bg-success-700 dark:!bg-success-500" onClick={submitQuiz}>
            Submit all
          </button>
          <button className="ghost-button" onClick={saveQuizProgress} title="Save progress">
            <Save size={16} />
            {saveHint === 'saved' ? 'Saved!' : 'Save'}
          </button>
          <button className="ghost-button" onClick={reviewFlaggedInSession}>
            <Flag size={16} />
            Flagged
          </button>
          <button className="ghost-button" onClick={exitQuiz}>
            Exit
          </button>
        </div>
      </div>
      <QuestionMap cert={cert} session={session} flagged={flagged} setSession={setSession} />
    </section>
  );
}
