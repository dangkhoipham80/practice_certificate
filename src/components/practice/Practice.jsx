import { PracticeSetup } from './PracticeSetup';
import { QuizResults } from './QuizResults';
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
  reviewFlaggedInSession,
  copyQuizResults,
  setSession
}) {
  if (!session) {
    return <PracticeSetup cert={cert} startQuiz={startQuiz} partProgress={partProgress} />;
  }

  if (session.finished) {
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
