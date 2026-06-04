import { getQuizIndicesForDomainFilter } from '../lib/quizDomains';
import { AI102_EXAMTOPIC_PRIMARY_DOMAIN } from './ai102DomainClassifier';

export function getExamTopicsForDomain(domainId) {
  return Object.entries(AI102_EXAMTOPIC_PRIMARY_DOMAIN)
    .filter(([, id]) => id === domainId)
    .map(([topic]) => Number(topic))
    .sort((a, b) => a - b);
}

export function getQuizIndicesForDomain(questions, domainId) {
  return getQuizIndicesForDomainFilter(questions, domainId ?? 'all');
}

export function getDomainQuestionStats(questions, domainId) {
  const inDomain = questions.filter((q) => q.domainId === domainId);
  return {
    total: inDomain.length,
    quizEligible: inDomain.filter((q) => q.quizEligible).length,
    examTopics: getExamTopicsForDomain(domainId),
  };
}

export function buildDomainStatsFromQuestions(questions) {
  const stats = {};
  questions.forEach((q, index) => {
    const id = q.domainId ?? 'unknown';
    if (!stats[id]) {
      stats[id] = { total: 0, quizEligible: 0, indices: [], examTopics: {} };
    }
    stats[id].total += 1;
    if (q.quizEligible) {
      stats[id].quizEligible += 1;
      stats[id].indices.push(index);
    }
    stats[id].examTopics[q.topic] = (stats[id].examTopics[q.topic] ?? 0) + 1;
  });
  return stats;
}
