/**
 * @deprecated Use taxonomy from DB/API (`layout.domains`) or `getDomainLabel` from `lib/domainLabels.js`.
 * Build-time keyword rules remain in `scripts/lib/question-transform.mjs` only.
 */
export { buildDomainLabelMap, getDomainLabel } from '../lib/domainLabels.js';

import ai102Taxonomy from '../../../../data/taxonomy/ai-102.json';

export const AI102_DOMAIN_IDS = (ai102Taxonomy.domains ?? []).map((d) => d.slug);

export const AI102_EXAMTOPIC_PRIMARY_DOMAIN = Object.fromEntries(
  (ai102Taxonomy.topics ?? [])
    .filter((t) => t.primaryDomainSlug)
    .map((t) => [Number(t.topicNumber), t.primaryDomainSlug]),
);

/** Maps Ai102Labs `domain` string to skills-measured domain id (labs metadata). */
export function labDomainToId(labDomain = '') {
  const d = labDomain.toLowerCase();
  if (d.includes('agentic') || d.includes('agent')) return 'agentic';
  if (d.includes('generative ai') && !d.includes('guardrail')) return 'generative-ai';
  if (d.includes('vision') || d.includes('computer vision')) return 'computer-vision';
  if (d.includes('language') || d.includes('nlp') || d.includes('natural language'))
    return 'nlp';
  if (d.includes('knowledge mining') || d.includes('information extraction'))
    return 'knowledge-mining';
  if (d.includes('responsible') || d.includes('plan and manage') || d.includes('guardrail'))
    return 'plan-manage';
  return 'plan-manage';
}
