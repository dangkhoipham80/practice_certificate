export const partSizes = [50, 48, 46, 50, 49, 46, 38];

export const partStarts = partSizes.reduce((acc, size, index) => {
  acc.push(index === 0 ? 0 : acc[index - 1] + partSizes[index - 1]);
  return acc;
}, []);

export const partTitles = [
  'Copilot fundamentals',
  'Plans, setup, administration',
  'Prompt engineering',
  'Developer workflows',
  'Responsible AI and security',
  'Enterprise features',
  'Exam review set'
];

export const storageKeys = {
  history: 'certforge-gh300-history',
  savedQuiz: 'certforge-gh300-progress',
  flagged: 'certforge-gh300-flagged',
  weak: 'certforge-gh300-weak',
  partProgress: 'certforge-gh300-part-progress',
  fcKnown: 'certforge-gh300-fc-known',
  fcUnknown: 'certforge-gh300-fc-unknown'
};

export const GRID_PAGE_SIZE = 50;
