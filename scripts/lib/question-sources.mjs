import { pathToFileURL } from 'url';
import path from 'path';
import { fileURLToPath } from 'url';
import { distinctTopics } from './exam-layout.mjs';
import { buildDomainStats } from './question-transform.mjs';
import {
  buildPartsFromTaxonomy,
  loadTaxonomy,
  sortQuestionsByTaxonomy,
} from './taxonomy.mjs';

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
  },
];

async function loadModuleQuestions(source) {
  const taxonomy = loadTaxonomy(source.certId);
  const mod = await import(pathToFileURL(path.join(root, source.modulePath)).href);
  let questions = (mod[source.questionsExport] ?? []).map((q, index) => ({
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

  if (taxonomy?.domainSlugs?.length) {
    questions = sortQuestionsByTaxonomy(taxonomy, questions);
  }

  const parts = taxonomy ? buildPartsFromTaxonomy(taxonomy, questions) : [];

  const metaMod =
    source.certId === 'gh-300'
      ? await import(pathToFileURL(path.join(root, 'apps/web/src/config/gh300Exam.js')).href)
      : null;

  return {
    questions,
    parts,
    taxonomy,
    gridPageSize: metaMod?.GRID_PAGE_SIZE ?? 50,
    sourceFileCount: source.certId === 'ai-102' ? 66 : 0,
  };
}

/** Dùng cho build-exam-questions.mjs (export JS bundle). */
export function bankToExamMeta(bank) {
  const { cert, parts, questions } = bank;
  const partSizes = parts.map((p) => p.questionCount);
  let start = 0;
  const partStarts = partSizes.map((size) => {
    const s = start;
    start += size;
    return s;
  });
  const partDomains = parts.map((p) => p.domainId).filter((id) => id != null);
  const domainStats = buildDomainStats(questions);

  return {
    examCode: cert.examCode,
    total: questions.length,
    quizEligible: questions.filter((q) => q.quizEligible).length,
    sourceFiles: cert.sourceFileCount ?? 0,
    domainStats: Object.keys(domainStats).length ? domainStats : undefined,
    partSizes,
    partStarts,
    partTitles: parts.map((p) => p.title),
    ...(partDomains.length ? { partDomains } : {}),
    topics: distinctTopics(questions),
    GRID_PAGE_SIZE: cert.gridPageSize ?? 50,
  };
}

/** @returns {Promise<Array<{ cert, parts, questions, taxonomy }>>} */
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

    const { questions, parts, taxonomy, gridPageSize, sourceFileCount } =
      await loadModuleQuestions(source);
    banks.push({
      cert: { ...certBase, gridPageSize, sourceFileCount },
      parts,
      questions,
      taxonomy,
    });
  }

  return banks;
}
