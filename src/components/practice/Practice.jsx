import { PracticeSetup } from './PracticeSetup';
import { InteractiveReviewSession } from './InteractiveReviewSession';
import { QuizResults } from './QuizResults';
import { ReviewResults } from './ReviewResults';
import { QuizSession } from './QuizSession';

export function Practice({
  cert,
  currentQuestion,
  flagged,
  session,
  partProgress,
  saveHint,
  startQuiz,
  checkCurrent,
  revealCurrent,
  retryCurrent,
  toggleChoice,
  toggleFlag,
  moveQuestion,
  submitQuiz,
  retakeQuiz,
  retryWrongFromSummary,
  saveQuizProgress,
  exitQuiz,
  finishReview,
  retakeReview,
  reviewFlaggedInSession,
  copyQuizResults,
  setSession
}) {
  if (!session) {
    return <PracticeSetup cert={cert} startQuiz={startQuiz} partProgress={partProgress} />;
  }

  if (session.finished) {
    if (session.reviewMode) {
      return <ReviewResults session={session} exitQuiz={exitQuiz} retakeReview={retakeReview} />;
    }
    return (
      <QuizResults
        cert={cert}
        session={session}
        exitQuiz={exitQuiz}
        retryWrongFromSummary={retryWrongFromSummary}
        copyQuizResults={copyQuizResults}
        retakeQuiz={retakeQuiz}
      />
    );
  }

  if (session.reviewMode) {
    return (
      <InteractiveReviewSession
        cert={cert}
        session={session}
        flagged={flagged}
        toggleFlag={toggleFlag}
        moveQuestion={moveQuestion}
        finishReview={finishReview}
        exitQuiz={exitQuiz}
        setSession={setSession}
      />
    );
  }

  return (
    <QuizSession
      cert={cert}
      session={session}
      currentQuestion={currentQuestion}
      flagged={flagged}
      saveHint={saveHint}
      checkCurrent={checkCurrent}
      revealCurrent={revealCurrent}
      retryCurrent={retryCurrent}
      toggleChoice={toggleChoice}
      toggleFlag={toggleFlag}
      moveQuestion={moveQuestion}
      submitQuiz={submitQuiz}
      saveQuizProgress={saveQuizProgress}
      exitQuiz={exitQuiz}
      reviewFlaggedInSession={reviewFlaggedInSession}
      setSession={setSession}
    />
  );
}
