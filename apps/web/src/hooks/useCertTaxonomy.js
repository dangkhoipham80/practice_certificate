import { useCallback, useEffect, useMemo, useState } from 'react';
import { taxonomyApi } from '../api/client';
import { getFallbackTaxonomyDomains } from '../lib/certTaxonomyFallback';
import { buildDomainLabelMap } from '../lib/domainLabels';

function mergeTaxonomyDomains(certId, apiDomains = []) {
  const bySlug = new Map(getFallbackTaxonomyDomains(certId).map((d) => [d.slug, d]));
  for (const d of apiDomains) bySlug.set(d.slug, d);
  return [...bySlug.values()].sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0));
}

export function useCertTaxonomy(certId) {
  const [domains, setDomains] = useState(() => getFallbackTaxonomyDomains(certId));
  const [loading, setLoading] = useState(true);
  const [source, setSource] = useState('fallback');

  const refreshTaxonomy = useCallback(async () => {
    setLoading(true);
    try {
      const data = await taxonomyApi.get(certId, { auth: false });
      const apiDomains = data?.domains ?? [];
      setDomains(mergeTaxonomyDomains(certId, apiDomains));
      setSource(apiDomains.length ? 'api' : 'fallback');
    } catch {
      setDomains(getFallbackTaxonomyDomains(certId));
      setSource('fallback');
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
        setDomains(mergeTaxonomyDomains(certId, apiDomains));
        setSource(apiDomains.length ? 'api' : 'fallback');
      })
      .catch(() => {
        if (!cancelled) {
          setDomains(getFallbackTaxonomyDomains(certId));
          setSource('fallback');
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
