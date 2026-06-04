import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const taxonomyDir = path.join(__dirname, '../../data/taxonomy');

/** @returns {Record<string, object>} */
export function loadAllTaxonomies() {
  const byCert = {};
  if (!fs.existsSync(taxonomyDir)) return byCert;

  for (const file of fs.readdirSync(taxonomyDir)) {
    if (!file.endsWith('.json')) continue;
    const raw = JSON.parse(fs.readFileSync(path.join(taxonomyDir, file), 'utf8'));
    const certId = raw.certId ?? file.replace(/\.json$/, '');
    byCert[certId] = normalizeTaxonomy(raw);
  }
  return byCert;
}

export function loadTaxonomy(certId) {
  const all = loadAllTaxonomies();
  return all[certId] ?? null;
}

function normalizeTaxonomy(raw) {
  const domains = (raw.domains ?? []).map((d, i) => ({
    slug: d.slug,
    title: d.title,
    sortOrder: d.sortOrder ?? i,
    examWeightPct: d.examWeightPct ?? null,
    isActive: d.isActive !== false,
  }));

  const topics = (raw.topics ?? []).map((t) => ({
    topicNumber: String(t.topicNumber),
    label: t.label ?? null,
    primaryDomainSlug: t.primaryDomainSlug ?? null,
  }));

  const parts = (raw.parts ?? []).map((p, i) => ({
    sortOrder: p.sortOrder ?? i,
    domainSlug: p.domainSlug ?? null,
    title: p.title ?? `Part ${i + 1}`,
  }));

  const domainBySlug = Object.fromEntries(domains.map((d) => [d.slug, d]));
  const topicToDomain = Object.fromEntries(
    topics
      .filter((t) => t.primaryDomainSlug)
      .map((t) => [t.topicNumber, t.primaryDomainSlug]),
  );

  return {
    certId: raw.certId,
    domains,
    topics,
    parts,
    partSizes: raw.partSizes ?? null,
    domainBySlug,
    topicToDomain,
    domainSlugs: domains.map((d) => d.slug),
  };
}

/** Fallback domain when keyword rules do not match (build pipeline). */
export function resolveDomainFromTaxonomy(taxonomy, question) {
  if (!taxonomy) return question.domainId ?? null;
  const topic = String(question.topic ?? '');
  return taxonomy.topicToDomain[topic] ?? taxonomy.domainSlugs[0] ?? null;
}

export function buildPartsFromTaxonomy(taxonomy, questions) {
  if (!taxonomy?.parts?.length) return [];

  if (taxonomy.domainSlugs?.length) {
    return taxonomy.parts.map((part) => ({
      sortOrder: part.sortOrder,
      domainId: part.domainSlug,
      title: part.title,
      questionCount: questions.filter((q) => q.domainId === part.domainSlug).length,
    }));
  }

  const sizes =
    taxonomy.partSizes ??
    Array(taxonomy.parts.length).fill(Math.floor(questions.length / taxonomy.parts.length));

  return taxonomy.parts.map((part, index) => ({
    sortOrder: part.sortOrder,
    domainId: null,
    title: part.title,
    questionCount: Number(sizes[index]) || 0,
  }));
}

export function sortQuestionsByTaxonomy(taxonomy, questions) {
  if (!taxonomy?.domainSlugs?.length) return questions;

  const order = new Map(taxonomy.domainSlugs.map((slug, index) => [slug, index]));
  return [...questions].sort((a, b) => {
    const domainDelta = (order.get(a.domainId) ?? 999) - (order.get(b.domainId) ?? 999);
    if (domainDelta) return domainDelta;
    return (a.questionId ?? 0) - (b.questionId ?? 0);
  });
}

export function getDomainTitle(taxonomy, slug) {
  return taxonomy?.domainBySlug?.[slug]?.title ?? slug;
}
