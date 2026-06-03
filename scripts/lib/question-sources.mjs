import { pathToFileURL } from 'url';
import path from 'path';
import { fileURLToPath } from 'url';
import { buildPartsFromLayout, distinctTopics } from './exam-layout.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '../..');

export const EXAM_SOURCES = [
  {
    certId: 'ai-102',
    examCode: 'AI-102',
    name: 'Azure AI Engineer',
    provider: 'Microsoft',
    level: 'Associate',
    description: 'Designing and Implementing a Microsoft Azure AI Solution.',
    modulePath: 'apps/web/src/data/ai102Questions.js',
    questionsExport: 'ai102Questions',
    metaExport: 'ai102ExamMeta',
  },
  {
    certId: 'gh-300',
    examCode: 'GH-300',
    name: 'GitHub Copilot',
    provider: 'GitHub',
    level: 'Fundamentals',
    description: 'GitHub Copilot certification prep.',
    modulePath: 'apps/web/src/data/gh300Questions.js',
    questionsExport: 'gh300Questions',
    metaModulePath: 'apps/web/src/config/gh300Exam.js',
  },
];

async function loadModuleQuestions(source) {
  const mod = await import(pathToFileURL(path.join(root, source.modulePath)).href);
  const questions = (mod[source.questionsExport] ?? []).map((q, index) => ({
    topic: q.topic ?? '1',
    domainId: q.domainId,
    questionId: q.questionId ?? index + 1,
    images: q.images ?? [],
    explanation: q.explanation,
    quizEligible: q.quizEligible !== false && Boolean(q.choices?.length),
    type: q.type ?? 'mc',
    choices: q.choices ?? [],
    correct: q.correct ?? [],
    multiple: Boolean(q.multiple),
    text: q.text,
    questionKind: q.questionKind ?? 'mc',
    warn: q.warn,
  }));

  let meta;
  if (source.metaExport) {
    meta = mod[source.metaExport];
  } else {
    const metaMod = await import(pathToFileURL(path.join(root, source.metaModulePath)).href);
    meta = {
      partSizes: metaMod.partSizes,
      partTitles: metaMod.partTitles,
      partDomains: metaMod.partDomains ?? [],
      GRID_PAGE_SIZE: metaMod.GRID_PAGE_SIZE ?? 50,
      sourceFiles: 0,
    };
  }

  const parts = buildPartsFromLayout({
    partSizes: meta.partSizes,
    partTitles: meta.partTitles,
    partDomains: meta.partDomains ?? [],
  });

  return {
    questions,
    parts,
    gridPageSize: meta.GRID_PAGE_SIZE ?? 50,
    sourceFileCount: meta.sourceFiles ?? 0,
  };
}

/** Dùng cho build-exam-questions.mjs (export JS bundle). */
export function bankToExamMeta(bank, domainStats = null) {
  const { cert, parts, questions } = bank;
  const partSizes = parts.map((p) => p.questionCount);
  let start = 0;
  const partStarts = partSizes.map((size) => {
    const s = start;
    start += size;
    return s;
  });
  const partDomains = parts.map((p) => p.domainId).filter((id) => id != null);

  return {
    examCode: cert.examCode,
    total: questions.length,
    quizEligible: questions.filter((q) => q.quizEligible).length,
    sourceFiles: cert.sourceFileCount ?? 0,
    ...(domainStats ? { domainStats } : {}),
    partSizes,
    partStarts,
    partTitles: parts.map((p) => p.title),
    ...(partDomains.length ? { partDomains } : {}),
    topics: distinctTopics(questions),
    GRID_PAGE_SIZE: cert.gridPageSize ?? 50,
  };
}

/** @returns {Promise<Array<{ cert, parts, questions }>>} */
export async function loadAllQuestionBanks() {
  const banks = [];

  for (const source of EXAM_SOURCES) {
    const certBase = {
      id: source.certId,
      examCode: source.examCode,
      name: source.name,
      provider: source.provider,
      level: source.level,
      description: source.description,
      status: 'Ready',
      gridPageSize: 50,
      sourceFileCount: 0,
    };

    const { questions, parts, gridPageSize, sourceFileCount } = await loadModuleQuestions(source);
    banks.push({
      cert: { ...certBase, gridPageSize, sourceFileCount },
      parts,
      questions,
      domainStats: source.certId === 'ai-102' ? (await import(pathToFileURL(path.join(root, source.modulePath)).href))[source.metaExport]?.domainStats : null,
    });
  }

  return banks;
}
