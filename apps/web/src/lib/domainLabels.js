import { getFallbackDomainLabelMap } from './certTaxonomyFallback';

export function buildDomainLabelMap(domains = []) {
  return Object.fromEntries(domains.map((d) => [d.slug, d.title]));
}

export function getDomainLabel(domainId, certIdOrLabelMap = 'ai-102') {
  if (!domainId) return '';
  if (certIdOrLabelMap && typeof certIdOrLabelMap === 'object') {
    return certIdOrLabelMap[domainId] ?? domainId;
  }
  const certId = typeof certIdOrLabelMap === 'string' ? certIdOrLabelMap : 'ai-102';
  return getFallbackDomainLabelMap(certId)[domainId] ?? domainId;
}
