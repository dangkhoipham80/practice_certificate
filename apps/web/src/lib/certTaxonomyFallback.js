import ai102Taxonomy from '../../../../data/taxonomy/ai-102.json';
import gh300Taxonomy from '../../../../data/taxonomy/gh-300.json';

const RAW_BY_CERT = {
  'ai-102': ai102Taxonomy,
  'gh-300': gh300Taxonomy,
};

/** Domains from repo taxonomy JSON — used when DB /taxonomy is empty or unreachable. */
export function getFallbackTaxonomyDomains(certId) {
  const raw = RAW_BY_CERT[certId];
  if (!raw?.domains?.length) return [];
  return raw.domains.map((d, i) => ({
    slug: d.slug,
    title: d.title,
    sortOrder: d.sortOrder ?? i,
    examWeightPct: d.examWeightPct ?? null,
    isActive: d.isActive !== false,
  }));
}

export function getFallbackDomainLabelMap(certId) {
  return Object.fromEntries(getFallbackTaxonomyDomains(certId).map((d) => [d.slug, d.title]));
}
