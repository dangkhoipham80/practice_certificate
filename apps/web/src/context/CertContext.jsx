import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { certsApi } from '../api/client';
import { buildStorageKeys } from '../config/examConfig';
import { certIdFromPath } from '../config/routes';
import { fetchCertQuestions } from '../lib/certQuestions';

const CertContext = createContext(null);
const ACTIVE_CERT_KEY = 'certforge-active-cert';

function normalizeCertification(cert) {
  return {
    id: cert.id,
    name: cert.name.trim(),
    exam: cert.examCode,
    provider: cert.provider,
    level: cert.level,
    description: cert.description,
    status: cert.status,
    questionCount: cert.questionCount,
    quizEligibleCount: cert.quizEligibleCount,
    GRID_PAGE_SIZE: cert.gridPageSize,
    sectionMode: cert.sectionMode,
    sectionLabel: cert.sectionLabel,
    sectionBadgePrefix: cert.sectionBadgePrefix,
    features: {
      learn: cert.learnEnabled,
      labs: cert.labsEnabled,
    },
    learnContentType: cert.learnContentType,
    labsContentType: cert.labsContentType,
    storageKeys: buildStorageKeys(cert.id),
  };
}

function loadingCertification(certId = '') {
  return {
    id: certId,
    name: '',
    exam: 'Loading',
    provider: '',
    level: '',
    description: '',
    status: 'Loading',
    questionCount: 0,
    quizEligibleCount: 0,
    questions: [],
    partSizes: [],
    partStarts: [],
    partTitles: [],
    topics: [],
    domains: [],
    GRID_PAGE_SIZE: 50,
    sectionMode: 'parts',
    sectionLabel: 'part',
    sectionBadgePrefix: 'P',
    features: { learn: false, labs: false },
    learnContentType: 'none',
    labsContentType: 'none',
    storageKeys: buildStorageKeys(certId || 'loading'),
  };
}

export function CertProvider({ children }) {
  const location = useLocation();
  const navigate = useNavigate();
  const routeCertId = certIdFromPath(location.pathname);
  const [activeCertId, setActiveCertIdState] = useState(
    () => routeCertId || localStorage.getItem(ACTIVE_CERT_KEY) || ''
  );
  const [certifications, setCertifications] = useState([]);
  const [catalogLoading, setCatalogLoading] = useState(true);
  const [catalogError, setCatalogError] = useState('');
  const [questionsByCert, setQuestionsByCert] = useState({});
  const [layoutByCert, setLayoutByCert] = useState({});
  const [questionsSourceByCert, setQuestionsSourceByCert] = useState({});
  const [questionsLoadingCertId, setQuestionsLoadingCertId] = useState(null);

  const refreshCertifications = useCallback(async () => {
    setCatalogLoading(true);
    setCatalogError('');
    try {
      const rows = await certsApi.list();
      const normalized = (rows ?? []).map(normalizeCertification);
      setCertifications(normalized);
      setActiveCertIdState((current) => {
        const requested = certIdFromPath(location.pathname);
        const next =
          (requested && normalized.some((cert) => cert.id === requested) && requested) ||
          (current && normalized.some((cert) => cert.id === current) && current) ||
          normalized[0]?.id ||
          '';
        if (next) localStorage.setItem(ACTIVE_CERT_KEY, next);
        return next;
      });
      return normalized;
    } catch (error) {
      setCatalogError(error.message || 'Could not load certifications');
      return [];
    } finally {
      setCatalogLoading(false);
    }
  }, [location.pathname]);

  useEffect(() => {
    refreshCertifications();
  }, [refreshCertifications]);

  useEffect(() => {
    if (!routeCertId || !certifications.some((cert) => cert.id === routeCertId)) return;
    setActiveCertIdState(routeCertId);
    localStorage.setItem(ACTIVE_CERT_KEY, routeCertId);
  }, [routeCertId, certifications]);

  const loadWorkspace = useCallback(async (certId) => {
    if (!certId) return;
    setQuestionsLoadingCertId(certId);
    try {
      const [layout, questionData] = await Promise.all([
        certsApi.layout(certId),
        fetchCertQuestions(certId),
      ]);
      setLayoutByCert((prev) => ({ ...prev, [certId]: layout }));
      setQuestionsByCert((prev) => ({ ...prev, [certId]: questionData.questions }));
      setQuestionsSourceByCert((prev) => ({ ...prev, [certId]: questionData.source }));
    } catch {
      setQuestionsByCert((prev) => ({ ...prev, [certId]: [] }));
      setQuestionsSourceByCert((prev) => ({ ...prev, [certId]: 'error' }));
    } finally {
      setQuestionsLoadingCertId((current) => (current === certId ? null : current));
    }
  }, []);

  useEffect(() => {
    if (activeCertId && certifications.some((cert) => cert.id === activeCertId)) {
      loadWorkspace(activeCertId);
    }
  }, [activeCertId, certifications, loadWorkspace]);

  const activeCert = useMemo(() => {
    const base = certifications.find((cert) => cert.id === activeCertId);
    if (!base) return loadingCertification(activeCertId);
    const layout = layoutByCert[activeCertId] ?? {};
    return {
      ...base,
      questions: questionsByCert[activeCertId] ?? [],
      partSizes: layout.partSizes ?? [],
      partStarts: layout.partStarts ?? [],
      partTitles: layout.partTitles ?? [],
      topics: layout.topics ?? [],
      domains: layout.domains ?? [],
      GRID_PAGE_SIZE: layout.gridPageSize ?? base.GRID_PAGE_SIZE,
    };
  }, [activeCertId, certifications, layoutByCert, questionsByCert]);

  function setActiveCert(certId, options = {}) {
    if (!certifications.some((cert) => cert.id === certId)) return false;
    setActiveCertIdState(certId);
    localStorage.setItem(ACTIVE_CERT_KEY, certId);
    if (options.navigateTo) navigate(options.navigateTo);
    return true;
  }

  function openCertWorkspace(certId) {
    if (!setActiveCert(certId)) return false;
    navigate(`/c/${certId}`);
    return true;
  }

  const value = {
    activeCertId,
    activeCert,
    certifications,
    catalogLoading,
    catalogError,
    refreshCertifications,
    setActiveCert,
    openCertWorkspace,
    isCertRoute: location.pathname.startsWith('/c/'),
    reloadCertQuestions: loadWorkspace,
    questionsLoading: questionsLoadingCertId === activeCertId,
    questionsSource: questionsSourceByCert[activeCertId] ?? 'api',
  };

  return <CertContext.Provider value={value}>{children}</CertContext.Provider>;
}

export function useCertContext() {
  const context = useContext(CertContext);
  if (!context) throw new Error('useCertContext must be used within CertProvider');
  return context;
}
