import { useLocation, useNavigate } from 'react-router-dom';
import { pathFromRouteId, routeIdFromPath } from '../config/routes';

export function useAppNavigation() {
  const location = useLocation();
  const navigate = useNavigate();
  const route = routeIdFromPath(location.pathname);

  function navigateTo(routeId) {
    const path = pathFromRouteId(routeId);
    if (location.pathname !== path) navigate(path);
  }

  return { route, pathname: location.pathname, navigate, navigateTo };
}
