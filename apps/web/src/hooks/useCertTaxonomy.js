import { useCallback, useEffect, useMemo, useState } from 'react';
import { taxonomyApi } from '../api/client';
import { buildDomainLabelMap } from '../lib/domainLabels';

function sortDomains(domains = []) {
  return [...domains].sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0));
}

export function useCertTaxonomy(certId) {
  const [domains, setDomains] = useState([]);
  const [loading, setLoading] = useState(true);
  const [source, setSource] = useState('api');

  const refreshTaxonomy = useCallback(async () => {
    setLoading(true);
    try {
      const data = await taxonomyApi.get(certId, { auth: false });
      const apiDomains = data?.domains ?? [];
      setDomains(sortDomains(apiDomains));
      setSource('api');
    } catch {
      setDomains([]);
      setSource('error');
    } finally {
      setLoading(false);
    }
  }, [certId]);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    taxonomyApi
      .get(certId, { auth: false })
      .then((data) => {
        if (cancelled) return;
        const apiDomains = data?.domains ?? [];
        setDomains(sortDomains(apiDomains));
        setSource('api');
      })
      .catch(() => {
        if (!cancelled) {
          setDomains([]);
          setSource('error');
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [certId]);

  const addDomain = useCallback((domain) => {
    setDomains((prev) => {
      if (prev.some((d) => d.slug === domain.slug)) {
        return prev.map((d) => (d.slug === domain.slug ? domain : d));
      }
      return [...prev, domain].sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0));
    });
  }, []);

  const domainLabelMap = useMemo(() => buildDomainLabelMap(domains), [domains]);

  return { domains, domainLabelMap, loading, source, refreshTaxonomy, addDomain };
}
