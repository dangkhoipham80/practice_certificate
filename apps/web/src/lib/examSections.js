import { QUIZ_DOMAIN_NONE, QUIZ_DOMAIN_NONE_LABEL } from './quizDomains';

export function usesDomainSections(certId) {
  return certId === 'ai-102';
}

export function buildStaticExamSections(cert) {
  const { partSizes, partStarts, partTitles } = cert;
  return partSizes.map((size, index) => ({
    key: String(index),
    title: partTitles[index] ?? `Part ${index + 1}`,
    slug: null,
    questionIndices: Array.from({ length: size }, (_, i) => partStarts[index] + i),
  }));
}

export function buildDomainExamSections(cert, domains = []) {
  const { questions } = cert;
  const activeDomains = domains.filter((d) => d.isActive !== false);
  const sections = activeDomains.map((domain) => {
    const questionIndices = [];
    questions.forEach((q, index) => {
      if (q.domainId === domain.slug) questionIndices.push(index);
    });
    return {
      key: domain.slug,
      title: domain.title,
      slug: domain.slug,
      questionIndices,
    };
  });

  const unassigned = [];
  questions.forEach((q, index) => {
    if (!q.domainId) unassigned.push(index);
  });
  if (unassigned.length) {
    sections.push({
      key: QUIZ_DOMAIN_NONE,
      title: QUIZ_DOMAIN_NONE_LABEL,
      slug: QUIZ_DOMAIN_NONE,
      questionIndices: unassigned,
    });
  }
  return sections;
}

/** Exam sections for progress grids and part-based quiz pools. */
export function buildExamSections(cert, domains = []) {
  if (usesDomainSections(cert.id) && domains.length) {
    return buildDomainExamSections(cert, domains);
  }
  return buildStaticExamSections(cert);
}

export function getSectionSizes(sections) {
  return sections.map((s) => s.questionIndices.length);
}

export function getSectionIndexForQuestion(questionIndex, sections) {
  for (let sectionIndex = 0; sectionIndex < sections.length; sectionIndex += 1) {
    const localIndex = sections[sectionIndex].questionIndices.indexOf(questionIndex);
    if (localIndex >= 0) return { sectionIndex, localIndex };
  }
  return null;
}

export function getSectionBadgeLabel(cert, sectionIndex) {
  if (cert.id === 'ai-102') return `D${String(sectionIndex + 1).padStart(2, '0')}`;
  if (cert.id.startsWith('ai-')) return `T${String(sectionIndex + 1).padStart(2, '0')}`;
  return `P${String(sectionIndex + 1).padStart(2, '0')}`;
}
