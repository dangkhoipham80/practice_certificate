import { Link } from 'react-router-dom';
import { Award, BarChart3, BookOpen, Brain, ClipboardList, FlaskConical, GraduationCap, Layers3, Play } from 'lucide-react';
import { pathFromRouteId } from '../../config/routes';
import { isCertReady } from '../../config/certRegistry';
import { useCertContext } from '../../context/CertContext';
import { NavButton } from '../ui/NavButton';

export function Sidebar({ onQuickStart }) {
  const { activeCert, activeCertId } = useCertContext();
  const ready = isCertReady(activeCert);
  const certBase = pathFromRouteId('cert-dashboard', activeCertId);

  return (
    <aside className="sidebar">
      <Link className="sidebar-brand" to="/">
        <span className="sidebar-logo">
          <Award size={22} />
        </span>
        <span>
          <span className="block text-base font-extrabold tracking-tight">CertForge</span>
          <span className="text-xs text-muted dark:text-slate-400">Certification workspace</span>
        </span>
      </Link>
      <div className="sidebar-section">Global</div>
      <nav className="flex-1 space-y-0.5">
        <NavButton to="/" end icon={BarChart3} label="Home" />
        <NavButton to="/catalog" icon={Layers3} label="Cert catalog" />
      </nav>
      <div className="sidebar-section">{activeCert.exam} workspace</div>
      <nav className="space-y-0.5">
        <NavButton to={certBase} end icon={BarChart3} label="Dashboard" />
        <NavButton to={pathFromRouteId('practice', activeCertId)} icon={ClipboardList} label="Practice" />
        {activeCert.features.learn && (
          <NavButton to={pathFromRouteId('learn', activeCertId)} icon={GraduationCap} label="Learn" />
        )}
        {activeCert.features.labs && (
          <NavButton to={pathFromRouteId('labs', activeCertId)} icon={FlaskConical} label="Labs" />
        )}
        <NavButton to={pathFromRouteId('flashcards', activeCertId)} icon={Brain} label="Flashcards" />
        <NavButton to={pathFromRouteId('library', activeCertId)} icon={BookOpen} label="Question library" />
      </nav>
      <div className="mt-auto rounded-2xl border border-line/70 bg-subtle/60 p-4 dark:border-gh-border dark:bg-gh-subtle/40">
        <p className="text-xs font-bold text-ink dark:text-slate-200">{activeCert.exam} {ready ? 'ready' : activeCert.status}</p>
        <p className="mt-1 text-xs text-muted dark:text-slate-400">
          {activeCert.questions.length} questions · {activeCert.questions.filter((q) => q.quizEligible !== false).length} quiz
        </p>
        <button className="primary-button mt-3 w-full" disabled={!ready} onClick={onQuickStart}>
          <Play size={16} />
          Quick start
        </button>
      </div>
    </aside>
  );
}
