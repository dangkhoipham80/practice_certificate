/**
 * Chuyển cấu hình part/domain từ pipeline build → rows cho certification_parts.
 */

export function buildPartsFromLayout({ partSizes = [], partTitles = [], partDomains = [] }) {
  return partSizes.map((size, index) => ({
    sortOrder: index,
    domainId: partDomains[index] ?? null,
    title: partTitles[index] ?? `Part ${index + 1}`,
    questionCount: Number(size) || 0,
  }));
}

export function computePartStarts(parts) {
  let start = 0;
  return parts.map((part) => {
    const partStart = start;
    start += part.questionCount;
    return partStart;
  });
}

export function distinctTopics(questions) {
  return [...new Set(questions.map((q) => String(q.topic ?? '')).filter(Boolean))].sort(
    (a, b) => Number(a) - Number(b),
  );
}
