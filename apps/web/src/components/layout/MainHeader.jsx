import { Link, NavLink } from 'react-router-dom';
import { LogIn, LogOut, Moon, Search, Sun } from 'lucide-react';
import { pathFromRouteId } from '../../config/routes';
import { RoleBadge } from '../auth/AuthPage';
import { BurnStreakBadge } from '../streak/BurnStreakBadge';

export function MainHeader({
  pageTitle,
  cert,
  dark,
  persistTheme,
  user,
  authLoading,
  burnStreak,
  onLogout,
}) {
  const libraryPath = pathFromRouteId('library', cert.id);
  const mobileTabs = [
    { path: '/', label: 'Home', end: true },
    { path: '/catalog', label: 'Catalog', end: false },
    { path: pathFromRouteId('cert-dashboard', cert.id), label: cert.exam, end: true },
    { path: pathFromRouteId('practice', cert.id), label: 'Practice', end: false },
    ...(cert.features.learn ? [{ path: pathFromRouteId('learn', cert.id), label: 'Learn', end: false }] : []),
    ...(cert.features.labs ? [{ path: pathFromRouteId('labs', cert.id), label: 'Labs', end: false }] : []),
    { path: pathFromRouteId('flashcards', cert.id), label: 'Cards', end: false },
    { path: libraryPath, label: 'Library', end: false },
  ];

  return (
    <header className="main-header">
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
          {!authLoading && user && (
            <BurnStreakBadge streak={burnStreak ?? 0} compact className="sm:order-none" />
          )}
          {!authLoading &&
            (user ? (
              <div className="hidden items-center gap-2 sm:flex">
                <span className="max-w-[140px] truncate text-xs font-medium text-muted dark:text-slate-400" title={user.email}>
                  {user.displayName || user.email}
                </span>
                <RoleBadge role={user.role} />
                <button className="icon-button" onClick={onLogout} title="Sign out" type="button">
                  <LogOut size={18} />
                </button>
              </div>
            ) : (
              <Link className="icon-button hidden sm:inline-flex" to="/login" title="Sign in">
                <LogIn size={18} />
              </Link>
            ))}
          <button className="icon-button" onClick={() => persistTheme(!dark)} title="Toggle theme" type="button">
            {dark ? <Sun size={18} /> : <Moon size={18} />}
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
