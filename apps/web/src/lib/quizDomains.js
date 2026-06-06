import { isDragDropQuizReady } from './dragDropUiFormat';
import { isHotAreaQuizReady } from './hotAreaUiFormat';

/** Sentinel for quiz questions with no domain assigned. */
export const QUIZ_DOMAIN_NONE = '__none__';

export const QUIZ_DOMAIN_NONE_LABEL = 'Do not have domain';

export function formatQuizDomainLabel(domainId, labelMap = {}) {
  if (!domainId) return QUIZ_DOMAIN_NONE_LABEL;
  return labelMap[domainId] ?? domainId;
}

export function isInQuizPool(question) {
  if (question.quizEligible === false) return false;
  if (question.choices?.length) return true;
  return isDragDropQuizReady(question.uiConfig) || isHotAreaQuizReady(question.uiConfig);
}

export function getQuizIndicesForDomainFilter(questions, domainFilter) {
  const pool = questions
    .map((q, index) => ({ q, index }))
    .filter(({ q }) => isInQuizPool(q));

  if (!domainFilter || domainFilter === 'all') {
    return pool.map(({ index }) => index);
  }
  if (domainFilter === QUIZ_DOMAIN_NONE) {
    return pool.filter(({ q }) => !q.domainId).map(({ index }) => index);
  }
  return pool.filter(({ q }) => q.domainId === domainFilter).map(({ index }) => index);
}

export function countQuizByDomain(questions, domains = []) {
  const counts = { [QUIZ_DOMAIN_NONE]: 0, all: 0 };
  for (const d of domains) counts[d.slug] = 0;

  questions.forEach((q) => {
    if (!isInQuizPool(q)) return;
    counts.all += 1;
    if (!q.domainId) counts[QUIZ_DOMAIN_NONE] += 1;
    else if (counts[q.domainId] != null) counts[q.domainId] += 1;
  });
  return counts;
}
