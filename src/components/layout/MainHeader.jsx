import { NavLink } from 'react-router-dom';
import { Download, Moon, Search, Sun, Trash2, Upload } from 'lucide-react';
import { pathFromRouteId } from '../../config/routes';

export function MainHeader({ pageTitle, cert, dark, persistTheme, exportData, importData, clearAllData, syncHint }) {
  const libraryPath = pathFromRouteId('library', cert.id);
  const mobileTabs = [
    { path: '/', label: 'Home', end: true },
    { path: '/catalog', label: 'Catalog', end: false },
    { path: pathFromRouteId('cert-dashboard', cert.id), label: cert.exam, end: true },
    { path: pathFromRouteId('practice', cert.id), label: 'Practice', end: false },
    { path: pathFromRouteId('flashcards', cert.id), label: 'Cards', end: false },
    { path: libraryPath, label: 'Library', end: false },
  ];

  return (
    <header className="main-header">
      {syncHint && (
        <div className={`sync-toast sync-toast-header ${syncHint.type === 'success' ? 'sync-toast-success' : 'sync-toast-error'}`} role="status">
          {syncHint.message}
        </div>
      )}
      <div className="grid items-center gap-3 lg:grid-cols-[1fr_minmax(280px,420px)_auto]">
        <div className="min-w-0">
          <p className="section-kicker !text-[10px]">{cert.exam} · {cert.provider}</p>
          <h1 className="truncate text-xl font-extrabold tracking-tight">{pageTitle}</h1>
        </div>
        <NavLink className="command-bar hidden lg:flex" to={libraryPath}>
          <Search size={16} className="shrink-0 text-accent-500" />
          <span className="min-w-0 flex-1 truncate text-left">Search {cert.exam} questions and concepts</span>
          <kbd>/</kbd>
        </NavLink>
        <div className="flex items-center gap-2">
          <button className="icon-button" onClick={() => persistTheme(!dark)} title="Toggle theme" type="button">
            {dark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button className="icon-button" onClick={exportData} title="Export progress" type="button">
            <Download size={18} />
          </button>
          <label className="icon-button cursor-pointer" title="Import progress">
            <Upload size={18} />
            <input className="hidden" type="file" accept="application/json" onChange={importData} />
          </label>
          <button className="icon-button text-danger-600 hover:border-danger-300 hover:bg-danger-50 dark:text-danger-400 dark:hover:border-danger-500/50 dark:hover:bg-danger-500/10" onClick={clearAllData} title="Clear cert progress" type="button">
            <Trash2 size={18} />
          </button>
        </div>
      </div>
      <nav className="mt-3 flex gap-2 overflow-x-auto pb-0.5 lg:hidden">
        {mobileTabs.map(({ path, label, end }) => (
          <NavLink key={path} to={path} end={end} className={({ isActive }) => `mobile-tab ${isActive ? 'mobile-tab-active' : ''}`}>
            {label}
          </NavLink>
        ))}
      </nav>
    </header>
  );
}
