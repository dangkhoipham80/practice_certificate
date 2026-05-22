import { Link } from 'react-router-dom';
import { Award, BarChart3, BookOpen, Brain, ClipboardList, GraduationCap, Layers3, Play } from 'lucide-react';
import { APP_ROUTES } from '../../config/routes';
import { gh300Questions } from '../../data/gh300Questions';
import { NavButton } from '../ui/NavButton';

const paths = Object.fromEntries(APP_ROUTES.map((r) => [r.id, r.path]));

export function Sidebar({ onQuickStart }) {
  return (
    <aside className="sidebar">
      <Link className="sidebar-brand" to={paths.dashboard}>
        <span className="sidebar-logo">
          <Award size={22} />
        </span>
        <span>
          <span className="block text-base font-extrabold tracking-tight">CertForge</span>
          <span className="text-xs text-muted dark:text-slate-400">Certification workspace</span>
        </span>
      </Link>
      <div className="sidebar-section">Workspace</div>
      <nav className="flex-1 space-y-0.5">
        <NavButton to={paths.dashboard} end icon={BarChart3} label="Dashboard" />
        <NavButton to={paths.catalog} icon={Layers3} label="Cert catalog" />
        <NavButton to={paths['gh-300']} icon={ClipboardList} label="GH-300 practice" />
        <NavButton to={paths.learn} icon={GraduationCap} label="Learn" />
        <NavButton to={paths.flashcards} icon={Brain} label="Flashcards" />
        <NavButton to={paths.library} icon={BookOpen} label="Question library" />
      </nav>
      <div className="mt-auto rounded-2xl border border-line/70 bg-subtle/60 p-4 dark:border-gh-border dark:bg-gh-subtle/40">
        <p className="text-xs font-bold text-ink dark:text-slate-200">GH-300 ready</p>
        <p className="mt-1 text-xs text-muted dark:text-slate-400">{gh300Questions.length} questions in bank</p>
        <button className="primary-button mt-3 w-full" onClick={onQuickStart}>
          <Play size={16} />
          Quick start
        </button>
      </div>
    </aside>
  );
}
