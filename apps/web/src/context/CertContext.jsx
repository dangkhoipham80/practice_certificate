import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { ACTIVE_CERT_KEY, DEFAULT_CERT_ID, getCert, isCertReady } from '../config/certRegistry';
import { fetchCertQuestions } from '../lib/certQuestions';

const CertContext = createContext(null);

export function CertProvider({ children }) {
  const { certId: routeCertId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [activeCertId, setActiveCertIdState] = useState(() => {
    const saved = localStorage.getItem(ACTIVE_CERT_KEY);
    return saved && getCert(saved) ? saved : DEFAULT_CERT_ID;
  });
  /** Per-cert question banks loaded from API (overrides bundled JS when set). */
  const [questionsByCert, setQuestionsByCert] = useState({});
  const [questionsSourceByCert, setQuestionsSourceByCert] = useState({});
  const [questionsLoadingCertId, setQuestionsLoadingCertId] = useState(null);

  useEffect(() => {
    if (!routeCertId) return;
    const cert = getCert(routeCertId);
    if (cert.id !== activeCertId) {
      setActiveCertIdState(cert.id);
      localStorage.setItem(ACTIVE_CERT_KEY, cert.id);
    }
  }, [routeCertId, activeCertId]);

  const loadQuestions = useCallback(async (certId) => {
    setQuestionsLoadingCertId(certId);
    try {
      const { questions, source } = await fetchCertQuestions(certId);
      setQuestionsByCert((prev) => ({ ...prev, [certId]: questions }));
      setQuestionsSourceByCert((prev) => ({ ...prev, [certId]: source }));
    } finally {
      setQuestionsLoadingCertId((current) => (current === certId ? null : current));
    }
  }, []);

  useEffect(() => {
    loadQuestions(activeCertId);
  }, [activeCertId, loadQuestions]);

  const activeCert = useMemo(() => {
    const base = getCert(activeCertId);
    const questions = questionsByCert[activeCertId] ?? base.questions;
    return { ...base, questions };
  }, [activeCertId, questionsByCert]);

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
    reloadCertQuestions: loadQuestions,
    questionsLoading: questionsLoadingCertId === activeCertId,
    questionsSource: questionsSourceByCert[activeCertId] ?? 'bundle',
  };

  return <CertContext.Provider value={value}>{children}</CertContext.Provider>;
}

export function useCertContext() {
  const context = useContext(CertContext);
  if (!context) throw new Error('useCertContext must be used within CertProvider');
  return context;
}
