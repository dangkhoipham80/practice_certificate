import { Copy, RotateCcw } from 'lucide-react';
import { formatQuizAnswer, formatQuizCorrect, formatTimer, percent } from '../../lib/quizUtils';
import { QuestionText } from '../shared/QuestionText';
import { InfoTile } from '../ui/InfoTile';

export function QuizResults({ cert, session, exitQuiz, retryWrongFromSummary, copyQuizResults, retakeQuiz }) {
  const { questions } = cert;
  const wrongSlots = session.wrongSlots ?? [];
  const correct = session.indices.length - wrongSlots.length;
  const score = percent(correct, session.indices.length);
  const passed = score >= 70;

  return (
    <section className="panel mx-auto max-w-3xl overflow-hidden animate-slide-up">
      <div className="border-b border-line/70 px-6 py-8 text-center dark:border-gh-border">
        <p className="section-kicker justify-center">Results</p>
        <p className="mt-2 text-sm text-muted dark:text-slate-400">{session.label}</p>
        <div className="score-ring mx-auto mt-6" style={{ '--score': score }}>
          <div className="score-ring-inner">
            <div>
              <p className="text-4xl font-extrabold tabular-nums tracking-tight">{score}%</p>
              <p className="text-xs font-semibold text-muted dark:text-slate-400">Score</p>
            </div>
          </div>
        </div>
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <InfoTile label="Total" value={session.indices.length} />
          <InfoTile label="Correct" value={correct} />
          <InfoTile label="Wrong" value={wrongSlots.length} />
          <InfoTile label="Time" value={formatTimer(session.timerSec)} />
        </div>
        <p className={`mt-5 text-lg font-bold ${passed ? 'text-success-600 dark:text-success-300' : 'text-danger-600 dark:text-danger-300'}`}>
          {passed ? 'Great work — keep it up!' : 'Review wrong answers below'}
        </p>
      </div>
      {wrongSlots.length > 0 && (
        <div className="max-h-[50vh] space-y-3 overflow-y-auto border-b border-line/70 px-5 py-5 dark:border-gh-border">
          <p className="text-xs font-bold text-danger-600 dark:text-danger-300">Review ({wrongSlots.length})</p>
          {wrongSlots.slice(0, 60).map((slot) => {
            const questionIndex = session.indices[slot];
            const question = questions[questionIndex];
            const userAnswer = formatQuizAnswer(session.answers[slot], question) || '(No answer)';
            const correctAnswer = formatQuizCorrect(question);
            return (
              <div className="rounded-xl border border-danger-200/80 bg-danger-50/40 p-4 dark:border-danger-500/30 dark:bg-danger-500/5" key={slot}>
                <QuestionText text={question.text} images={question.images} className="text-sm font-semibold" />
                <p className="mt-2 text-xs text-danger-700 dark:text-danger-200">Your answer: {userAnswer}</p>
                <p className="mt-1 text-xs text-success-700 dark:text-success-200">Correct: {correctAnswer}</p>
              </div>
            );
          })}
        </div>
      )}
      {!wrongSlots.length && (
        <div className="empty-state mx-5 my-5 border-none bg-transparent">
          <p className="text-2xl">🎉</p>
          <p className="font-bold text-success-600 dark:text-success-300">Perfect score!</p>
        </div>
      )}
      <div className="flex flex-wrap gap-3 bg-subtle/40 p-5 dark:bg-gh-subtle/30">
        <button className="secondary-button" onClick={exitQuiz} type="button">
          New quiz
        </button>
        {wrongSlots.length > 0 && (
          <button className="danger-button" onClick={retryWrongFromSummary} type="button">
            <RotateCcw size={16} />
            Retry wrong
          </button>
        )}
        <button className="secondary-button" onClick={copyQuizResults} type="button">
          <Copy size={16} />
          Copy results
        </button>
        <button className="primary-button" onClick={retakeQuiz} type="button">
          <RotateCcw size={16} />
          Retake
        </button>
      </div>
    </section>
  );
}
