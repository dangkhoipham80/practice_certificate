import { Award, BarChart3, BookOpen, Brain, ClipboardList, GraduationCap, Layers3, Play } from 'lucide-react';
import { gh300Questions } from '../../data/gh300Questions';
import { NavButton } from '../ui/NavButton';

export function Sidebar({ route, setRoute, onQuickStart }) {
  return (
    <aside className="sidebar">
      <button className="sidebar-brand" onClick={() => setRoute('dashboard')}>
        <span className="sidebar-logo">
          <Award size={22} />
        </span>
        <span>
          <span className="block text-base font-extrabold tracking-tight">CertForge</span>
          <span className="text-xs text-muted dark:text-slate-400">Certification workspace</span>
        </span>
      </button>
      <div className="sidebar-section">Workspace</div>
      <nav className="flex-1 space-y-0.5">
        <NavButton active={route === 'dashboard'} icon={BarChart3} label="Dashboard" onClick={() => setRoute('dashboard')} />
        <NavButton active={route === 'catalog'} icon={Layers3} label="Cert catalog" onClick={() => setRoute('catalog')} />
        <NavButton active={route === 'gh-300'} icon={ClipboardList} label="GH-300 practice" onClick={() => setRoute('gh-300')} />
        <NavButton active={route === 'learn'} icon={GraduationCap} label="Learn" onClick={() => setRoute('learn')} />
        <NavButton active={route === 'flashcards'} icon={Brain} label="Flashcards" onClick={() => setRoute('flashcards')} />
        <NavButton active={route === 'library'} icon={BookOpen} label="Question library" onClick={() => setRoute('library')} />
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
