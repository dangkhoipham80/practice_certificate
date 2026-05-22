import { Download, Moon, Search, Sun, Upload } from 'lucide-react';

const MOBILE_TABS = [
  ['dashboard', 'Dashboard'],
  ['catalog', 'Catalog'],
  ['gh-300', 'GH-300'],
  ['learn', 'Learn'],
  ['flashcards', 'Cards'],
  ['library', 'Library']
];

export function MainHeader({ pageTitle, route, setRoute, dark, persistTheme, exportData, importData }) {
  return (
    <header className="main-header">
      <div className="grid items-center gap-3 lg:grid-cols-[1fr_minmax(280px,420px)_auto]">
        <div className="min-w-0">
          <p className="section-kicker !text-[10px]">CertForge</p>
          <h1 className="truncate text-xl font-extrabold tracking-tight">{pageTitle}</h1>
        </div>
        <button className="command-bar hidden lg:flex" onClick={() => setRoute('library')}>
          <Search size={16} className="shrink-0 text-accent-500" />
          <span className="min-w-0 flex-1 truncate text-left">Search questions, answers, exam concepts</span>
          <kbd>/</kbd>
        </button>
        <div className="flex items-center gap-2">
          <button className="icon-button" onClick={() => persistTheme(!dark)} title="Toggle theme">
            {dark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button className="icon-button" onClick={exportData} title="Export progress">
            <Download size={18} />
          </button>
          <label className="icon-button cursor-pointer" title="Import progress">
            <Upload size={18} />
            <input className="hidden" type="file" accept="application/json" onChange={importData} />
          </label>
        </div>
      </div>
      <nav className="mt-3 flex gap-2 overflow-x-auto pb-0.5 lg:hidden">
        {MOBILE_TABS.map(([id, label]) => (
          <button key={id} className={`mobile-tab ${route === id ? 'mobile-tab-active' : ''}`} onClick={() => setRoute(id)}>
            {label}
          </button>
        ))}
      </nav>
    </header>
  );
}
