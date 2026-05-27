import { gh300Questions } from '../data/gh300Questions';
import { ai102Questions, ai102ExamMeta } from '../data/ai102Questions';
import { ai200Questions, ai200ExamMeta } from '../data/ai200Questions';
import { partSizes, partStarts, partTitles, storageKeys as gh300StorageKeys, GRID_PAGE_SIZE } from './gh300Exam';
import { buildExamParts, buildStorageKeys } from './examConfig';

function withExamParts(meta) {
  return {
    ...buildExamParts(meta),
    GRID_PAGE_SIZE: meta.GRID_PAGE_SIZE ?? GRID_PAGE_SIZE,
  };
}

export const ACTIVE_CERT_KEY = 'certforge-active-cert';
export const DEFAULT_CERT_ID = 'gh-300';

export const CERT_REGISTRY = {
  'gh-300': {
    id: 'gh-300',
    name: 'GitHub Copilot',
    exam: 'GH-300',
    provider: 'GitHub',
    level: 'Fundamentals',
    description: 'GitHub Copilot certification prep with part-based drills, flashcards, and a knowledge base.',
    questions: gh300Questions,
    storageKeys: gh300StorageKeys,
    ...withExamParts({ partSizes, partStarts, partTitles }),
    status: 'Ready',
    features: {
      learn: true,
      labs: false,
      legacyImport: true,
      images: false,
    },
  },
  'ai-102': {
    id: 'ai-102',
    name: 'Azure AI Engineer',
    exam: 'AI-102',
    provider: 'Microsoft',
    level: 'Associate',
    description: 'Designing and Implementing a Microsoft Azure AI Solution — full question bank with topic-based practice.',
    questions: ai102Questions,
    storageKeys: buildStorageKeys('ai-102'),
    ...withExamParts(ai102ExamMeta),
    status: 'Ready',
    features: {
      learn: true,
      labs: true,
      legacyImport: false,
      images: true,
    },
  },
  'ai-200': {
    id: 'ai-200',
    name: 'Azure AI Fundamentals',
    exam: 'AI-200',
    provider: 'Microsoft',
    level: 'Fundamentals',
    description: 'AI-200 certification track — add exam JSON files to the AI_200 folder and run npm run build:questions.',
    questions: ai200Questions,
    storageKeys: buildStorageKeys('ai-200'),
    ...withExamParts(ai200ExamMeta),
    status: 'Coming soon',
    features: {
      learn: false,
      labs: false,
      legacyImport: false,
      images: true,
    },
  },
};

export const certifications = Object.values(CERT_REGISTRY).map((cert) => ({
  id: cert.id,
  name: cert.name,
  exam: cert.exam,
  provider: cert.provider,
  level: cert.level,
  questions: cert.questions.length,
  quizEligible: cert.questions.filter((q) => q.quizEligible !== false).length,
  status: cert.status,
  description: cert.description,
}));

export function getCert(certId) {
  return CERT_REGISTRY[certId] ?? CERT_REGISTRY[DEFAULT_CERT_ID];
}

export function isCertReady(cert) {
  return cert.status === 'Ready' && getQuizQuestions(cert).length > 0;
}

export function getQuizQuestions(cert) {
  return cert.questions.filter((q) => q.quizEligible !== false && q.choices?.length);
}

export function certPath(certId, section = '') {
  const base = `/c/${certId}`;
  return section ? `${base}/${section}` : base;
}
