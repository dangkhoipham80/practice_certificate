/** Route ids (internal) ↔ browser paths */
export const APP_ROUTES = [
  { id: 'home', path: '/', title: 'CertForge home' },
  { id: 'catalog', path: '/catalog', title: 'Certification catalog' },
  { id: 'cert-dashboard', path: '/c/:certId', title: 'Cert workspace' },
  { id: 'practice', path: '/c/:certId/practice', title: 'Practice' },
  { id: 'learn', path: '/c/:certId/learn', title: 'Knowledge base' },
  { id: 'labs', path: '/c/:certId/labs', title: 'Labs' },
  { id: 'flashcards', path: '/c/:certId/flashcards', title: 'Flashcards' },
  { id: 'library', path: '/c/:certId/library', title: 'Question library' },
];

const LEGACY_PATHS = {
  '/practice': { routeId: 'practice', certId: 'gh-300' },
};

export function pathFromRouteId(routeId, certId = 'gh-300') {
  const route = APP_ROUTES.find((item) => item.id === routeId);
  if (!route) return '/';
  if (route.path.includes(':certId')) {
    return route.path.replace(':certId', certId);
  }
  return route.path;
}

export function routeIdFromPath(pathname) {
  if (pathname === '/') return 'home';
  if (pathname === '/catalog') return 'catalog';

  const certMatch = pathname.match(/^\/c\/([^/]+)(?:\/(.+))?$/);
  if (!certMatch) return 'home';

  const section = certMatch[2] ?? '';
  if (!section) return 'cert-dashboard';
  if (section === 'practice') return 'practice';
  if (section === 'learn') return 'learn';
  if (section === 'labs') return 'labs';
  if (section === 'flashcards') return 'flashcards';
  if (section === 'library') return 'library';
  return 'cert-dashboard';
}

export function certIdFromPath(pathname) {
  const legacy = LEGACY_PATHS[pathname];
  if (legacy) return legacy.certId;
  const certMatch = pathname.match(/^\/c\/([^/]+)/);
  return certMatch?.[1] ?? null;
}

export function getRouteMeta(routeId) {
  return APP_ROUTES.find((route) => route.id === routeId);
}
