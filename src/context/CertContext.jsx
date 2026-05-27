import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { ACTIVE_CERT_KEY, DEFAULT_CERT_ID, getCert, isCertReady } from '../config/certRegistry';

const CertContext = createContext(null);

export function CertProvider({ children }) {
  const { certId: routeCertId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [activeCertId, setActiveCertIdState] = useState(() => {
    const saved = localStorage.getItem(ACTIVE_CERT_KEY);
    return saved && getCert(saved) ? saved : DEFAULT_CERT_ID;
  });

  useEffect(() => {
    if (!routeCertId) return;
    const cert = getCert(routeCertId);
    if (cert.id !== activeCertId) {
      setActiveCertIdState(cert.id);
      localStorage.setItem(ACTIVE_CERT_KEY, cert.id);
    }
  }, [routeCertId, activeCertId]);

  const activeCert = useMemo(() => getCert(activeCertId), [activeCertId]);

  function setActiveCert(certId, options = {}) {
    const cert = getCert(certId);
    if (!isCertReady(cert) && options.requireReady) return false;
    setActiveCertIdState(cert.id);
    localStorage.setItem(ACTIVE_CERT_KEY, cert.id);
    if (options.navigateTo) {
      navigate(options.navigateTo);
    }
    return true;
  }

  function openCertWorkspace(certId) {
    const cert = getCert(certId);
    if (!isCertReady(cert)) return false;
    setActiveCert(certId);
    navigate(`/c/${certId}`);
    return true;
  }

  const value = {
    activeCertId,
    activeCert,
    setActiveCert,
    openCertWorkspace,
    isCertRoute: location.pathname.startsWith('/c/'),
  };

  return <CertContext.Provider value={value}>{children}</CertContext.Provider>;
}

export function useCertContext() {
  const context = useContext(CertContext);
  if (!context) throw new Error('useCertContext must be used within CertProvider');
  return context;
}
