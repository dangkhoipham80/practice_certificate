/** Route ids (internal) ↔ browser paths */
export const APP_ROUTES = [
  { id: 'dashboard', path: '/', title: 'GH-300 workspace' },
  { id: 'catalog', path: '/catalog', title: 'Certification catalog' },
  { id: 'gh-300', path: '/practice', title: 'GH-300 practice' },
  { id: 'learn', path: '/learn', title: 'Knowledge base' },
  { id: 'flashcards', path: '/flashcards', title: 'Flashcards' },
  { id: 'library', path: '/library', title: 'Question library' }
];

const pathById = Object.fromEntries(APP_ROUTES.map((r) => [r.id, r.path]));
const idByPath = Object.fromEntries(APP_ROUTES.map((r) => [r.path, r.id]));

export function pathFromRouteId(routeId) {
  return pathById[routeId] ?? '/';
}

export function routeIdFromPath(pathname) {
  return idByPath[pathname] ?? 'dashboard';
}

export function getRouteMeta(routeId) {
  return APP_ROUTES.find((r) => r.id === routeId);
}
