import { Check, ChevronLeft, X } from 'lucide-react';
import { gh300Questions } from '../../data/gh300Questions';
import { storageKeys } from '../../config/gh300Exam';
import { readJson } from '../../lib/storage';
import { percent } from '../../lib/quizUtils';
import { FlashcardSetup } from './FlashcardSetup';

export function Flashcards({ flash, setFlash, launchFlash, flagged, weak, markFlashKnown, markFlashUnknown }) {
  const fcKnown = readJson(storageKeys.fcKnown, []);
  const fcUnknown = readJson(storageKeys.fcUnknown, []);

  if (!flash) {
    return <FlashcardSetup launchFlash={launchFlash} flagged={flagged} weak={weak} fcKnown={fcKnown} fcUnknown={fcUnknown} />;
  }

  const question = gh300Questions[flash.pool[flash.current]];
  const questionIndex = flash.pool[flash.current];

  function advanceCard(mark) {
    if (mark === 'known') markFlashKnown(questionIndex);
    else markFlashUnknown(questionIndex);
    if (flash.current < flash.pool.length - 1) {
      setFlash({
        ...flash,
        current: flash.current + 1,
        flipped: false,
        known: flash.known + (mark === 'known' ? 1 : 0),
        review: flash.review + (mark === 'unknown' ? 1 : 0)
      });
    } else {
      window.alert(`Done! Known: ${flash.known + (mark === 'known' ? 1 : 0)} · Review: ${flash.review + (mark === 'unknown' ? 1 : 0)}`);
      setFlash(null);
    }
  }

  const cardProgress = percent(flash.current + 1, flash.pool.length);

  return (
    <section className="mx-auto max-w-2xl animate-slide-up">
      <div className="mb-5 flex items-center justify-between gap-4">
        <div>
          <p className="section-kicker">Flashcards</p>
          <h2 className="text-xl font-extrabold">
            Card {flash.current + 1} <span className="font-medium text-muted dark:text-slate-400">/ {flash.pool.length}</span>
          </h2>
        </div>
        <button className="icon-button" onClick={() => setFlash(null)} title="Close">
          <X size={18} />
        </button>
      </div>
      <div className="progress-bar mb-5">
        <div className="progress-bar-fill" style={{ width: `${cardProgress}%` }} />
      </div>
      <button className={`flashcard ${flash.flipped ? 'flashcard-flipped' : ''}`} onClick={() => setFlash({ ...flash, flipped: !flash.flipped })}>
        {!flash.flipped ? (
          <>
            <p className="section-kicker">Question — tap to reveal</p>
            <p className="mt-5 text-xl font-semibold leading-8 sm:text-2xl">{question.text}</p>
            <p className="mt-8 text-xs font-medium text-muted dark:text-slate-500">Click anywhere on the card to flip</p>
          </>
        ) : (
          <>
            <p className="section-kicker !text-success-600 dark:!text-success-300">Correct answer</p>
            <div className="mt-5 space-y-3">
              {question.correct.map((index) => (
                <div
                  className="rounded-xl border border-success-200 bg-success-50 px-4 py-3 text-sm font-medium text-success-700 dark:border-success-500/30 dark:bg-success-500/10 dark:text-success-100"
                  key={index}
                >
                  <span className="mr-2 font-extrabold">{String.fromCharCode(65 + index)}.</span>
                  {question.choices[index]}
                </div>
              ))}
            </div>
          </>
        )}
      </button>
      <div className="mt-5 flex flex-wrap gap-3">
        <button className="secondary-button" onClick={() => setFlash({ ...flash, current: Math.max(0, flash.current - 1), flipped: false })}>
          <ChevronLeft size={16} />
          Previous
        </button>
        <button className="primary-button flex-1 sm:flex-none" onClick={() => advanceCard('known')}>
          <Check size={16} />
          I know this
        </button>
        <button className="danger-button" onClick={() => advanceCard('unknown')}>
          Review again
        </button>
      </div>
      {(flash.known > 0 || flash.review > 0) && (
        <p className="mt-4 text-center text-xs text-muted dark:text-slate-500">
          Known: {flash.known} · Review again: {flash.review}
        </p>
      )}
    </section>
  );
}
