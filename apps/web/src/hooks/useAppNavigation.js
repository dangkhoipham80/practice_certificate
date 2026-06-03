import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { certIdFromPath, pathFromRouteId, routeIdFromPath } from '../config/routes';
import { useCertContext } from '../context/CertContext';

export function useAppNavigation() {
  const location = useLocation();
  const navigate = useNavigate();
  const { certId: routeCertId } = useParams();
  const { activeCertId } = useCertContext();
  const route = routeIdFromPath(location.pathname);
  const certId = routeCertId ?? certIdFromPath(location.pathname) ?? activeCertId;

  function navigateTo(routeId, options = {}) {
    const targetCertId = options.certId ?? certId;
    const path = pathFromRouteId(routeId, targetCertId);
    if (location.pathname !== path) navigate(path);
  }

  return { route, pathname: location.pathname, navigate, navigateTo, certId };
}
