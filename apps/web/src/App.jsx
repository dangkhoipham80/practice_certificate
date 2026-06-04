import { Navigate, Route, Routes, Link } from 'react-router-dom';
import { Learn } from './Learn';
import { Ai102Labs } from './components/learn/Ai102Labs';
import { useCertForge } from './hooks/useCertForge';
import { CertProvider } from './context/CertContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { QuestionTypesProvider } from './context/QuestionTypesContext';
import { AuthPage, RoleBadge } from './components/auth/AuthPage';
import { isCertReady } from './config/certRegistry';
import { Sidebar } from './components/layout/Sidebar';
import { MainHeader } from './components/layout/MainHeader';
import { ResumeQuizDialog } from './components/layout/ResumeQuizDialog';
import { Dashboard } from './components/dashboard/Dashboard';
import { Home } from './components/home/Home';
import { Catalog } from './components/catalog/Catalog';
import { Practice } from './components/practice/Practice';
import { Flashcards } from './components/flashcards/Flashcards';
import { Library } from './components/library/Library';

function CertWorkspace({ app }) {
  if (!isCertReady(app.cert)) {
    return (
      <section className="panel empty-state p-10 text-center animate-slide-up">
        <p className="text-lg font-bold">{app.cert.exam} is not ready yet</p>
        <p className="mt-2 text-sm text-muted dark:text-slate-400">{app.cert.description}</p>
        <Link className="primary-button mt-6 inline-flex" to="/catalog">
          Back to catalog
        </Link>
      </section>
    );
  }

  return (
    <Dashboard
      cert={app.cert}
      quizQuestions={app.quizQuestions}
      stats={app.stats}
      history={app.history}
      flagged={app.flagged}
      weak={app.weak}
      partProgress={app.partProgress}
      hasSavedQuiz={app.hasSavedQuiz}
      startQuiz={app.requestStartQuiz}
      resumeQuiz={app.resumeQuiz}
      onNavigate={app.navigateTo}
    />
  );
}

function LibraryRoute({ app, auth }) {
  return (
    <Library
      cert={app.cert}
      search={app.search}
      setSearch={app.setSearch}
      flagged={app.flagged}
      toggleFlag={app.toggleFlag}
      isAdmin={auth.isAdmin}
    />
  );
}

function AppShell() {
  const app = useCertForge();
  const auth = useAuth();
  const shellClass = app.dark ? 'dark' : '';

  return (
    <div className={shellClass}>
      <div className="app-shell">
        <Sidebar
          onQuickStart={() => app.requestStartQuiz({ count: 20, label: `${app.cert.exam} · Random 20` })}
        />

        <main className="relative z-[1] lg:pl-[272px]">
          <MainHeader
            pageTitle={app.pageTitle}
            cert={app.cert}
            dark={app.dark}
            persistTheme={app.persistTheme}
            user={auth.user}
            authLoading={auth.loading}
            onLogout={auth.logout}
          />

          <div className="page-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/catalog" element={<Catalog startQuiz={app.requestStartQuiz} />} />
              <Route path="/practice" element={<Navigate to="/c/gh-300/practice" replace />} />
              <Route
                path="/c/:certId"
                element={
                  <CertWorkspace app={app} />
                }
              />
              <Route
                path="/c/:certId/practice"
                element={
                  <Practice
                    cert={app.cert}
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
                    setDragDropFilled={app.setDragDropFilled}
                    toggleFlag={app.toggleFlag}
                    moveQuestion={app.moveQuestion}
                    submitQuiz={app.submitQuiz}
                    retakeQuiz={app.retakeQuiz}
                    retryWrongFromSummary={app.retryWrongFromSummary}
                    saveQuizProgress={app.saveQuizProgress}
                    exitQuiz={app.exitQuiz}
                    finishReview={app.finishReview}
                    retakeReview={app.retakeReview}
                    reviewFlaggedInSession={app.reviewFlaggedInSession}
                    copyQuizResults={app.copyQuizResults}
                    setSession={app.setSession}
                  />
                }
              />
              <Route path="/c/:certId/learn" element={<Learn cert={app.cert} startQuiz={app.startQuiz} />} />
              <Route
                path="/c/:certId/labs"
                element={app.cert.features.labs ? <Ai102Labs cert={app.cert} /> : <Navigate to={`/c/${app.cert.id}`} replace />}
              />
              <Route
                path="/c/:certId/flashcards"
                element={
                  <Flashcards
                    cert={app.cert}
                    flash={app.flash}
                    setFlash={app.setFlash}
                    launchFlash={app.launchFlash}
                    flagged={app.flagged}
                    weak={app.weak}
                    markFlashKnown={app.markFlashKnown}
                    markFlashUnknown={app.markFlashUnknown}
                  />
                }
              />
              <Route path="/c/:certId/library" element={<LibraryRoute app={app} auth={auth} />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
        </main>

        {app.pendingStart && (
          <ResumeQuizDialog
            inProgress={app.pendingStart.inProgress}
            nextLabel={app.pendingStart.options.label ?? 'New quiz'}
            onContinue={app.continueInProgressQuiz}
            onStartFresh={app.confirmStartFresh}
            onCancel={() => app.setPendingStart(null)}
          />
        )}
      </div>
    </div>
  );
}

export function App() {
  return (
    <AuthProvider>
      <QuestionTypesProvider>
        <CertProvider>
          <Routes>
            <Route path="/login" element={<AuthPage mode="login" />} />
            <Route path="/register" element={<AuthPage mode="register" />} />
            <Route path="/*" element={<AppShell />} />
          </Routes>
        </CertProvider>
      </QuestionTypesProvider>
    </AuthProvider>
  );
}
