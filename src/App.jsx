import { Learn } from './Learn';
import { useCertForge } from './hooks/useCertForge';
import { Sidebar } from './components/layout/Sidebar';
import { MainHeader } from './components/layout/MainHeader';
import { ResumeQuizDialog } from './components/layout/ResumeQuizDialog';
import { Dashboard } from './components/dashboard/Dashboard';
import { Catalog } from './components/catalog/Catalog';
import { Practice } from './components/practice/Practice';
import { Flashcards } from './components/flashcards/Flashcards';
import { Library } from './components/library/Library';

export function App() {
  const app = useCertForge();
  const shellClass = app.dark ? 'dark' : '';

  return (
    <div className={shellClass}>
      <div className="app-shell">
        <Sidebar
          route={app.route}
          setRoute={app.setRoute}
          onQuickStart={() => app.requestStartQuiz({ count: 20, label: 'GH-300 - Random 20' })}
        />

        <main className="relative z-[1] lg:pl-[272px]">
          <MainHeader
            pageTitle={app.pageTitle}
            route={app.route}
            setRoute={app.setRoute}
            dark={app.dark}
            persistTheme={app.persistTheme}
            exportData={app.exportData}
            importData={app.importData}
          />

          <div className="page-content">
            {app.route === 'dashboard' && (
              <Dashboard
                stats={app.stats}
                history={app.history}
                flagged={app.flagged}
                weak={app.weak}
                partProgress={app.partProgress}
                hasSavedQuiz={app.hasSavedQuiz}
                startQuiz={app.requestStartQuiz}
                resumeQuiz={app.resumeQuiz}
                onNavigate={app.setRoute}
              />
            )}
            {app.route === 'catalog' && <Catalog startQuiz={app.requestStartQuiz} />}
            {app.route === 'gh-300' && (
              <Practice
                currentQuestion={app.currentQuestion}
                flagged={app.flagged}
                session={app.session}
                partProgress={app.partProgress}
                saveHint={app.saveHint}
                startQuiz={app.requestStartQuiz}
                checkCurrent={app.checkCurrent}
                revealCurrent={app.revealCurrent}
                retryCurrent={app.retryCurrent}
                toggleChoice={app.toggleChoice}
                toggleFlag={app.toggleFlag}
                moveQuestion={app.moveQuestion}
                submitQuiz={app.submitQuiz}
                retakeQuiz={app.retakeQuiz}
                retryWrongFromSummary={app.retryWrongFromSummary}
                saveQuizProgress={app.saveQuizProgress}
                exitQuiz={app.exitQuiz}
                reviewFlaggedInSession={app.reviewFlaggedInSession}
                copyQuizResults={app.copyQuizResults}
                setSession={app.setSession}
              />
            )}
            {app.route === 'learn' && <Learn />}
            {app.route === 'flashcards' && (
              <Flashcards
                flash={app.flash}
                setFlash={app.setFlash}
                launchFlash={app.launchFlash}
                flagged={app.flagged}
                weak={app.weak}
                markFlashKnown={app.markFlashKnown}
                markFlashUnknown={app.markFlashUnknown}
              />
            )}
            {app.route === 'library' && (
              <Library search={app.search} setSearch={app.setSearch} flagged={app.flagged} toggleFlag={app.toggleFlag} />
            )}
          </div>
        </main>

        {app.pendingStart && (
          <ResumeQuizDialog
            inProgress={app.pendingStart.inProgress}
            nextLabel={app.pendingStart.options.label ?? 'Quiz mới'}
            onContinue={app.continueInProgressQuiz}
            onStartFresh={app.confirmStartFresh}
            onCancel={() => app.setPendingStart(null)}
          />
        )}
      </div>
    </div>
  );
}
