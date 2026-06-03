import fs from 'fs';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';
import { buildPartsFromLayout, distinctTopics } from './exam-layout.mjs';
import {
  buildDomainParts,
  buildDomainStats,
  buildTopicParts,
  transformRawQuestion,
} from './question-transform.mjs';

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
    folder: 'AI_102',
    filePattern: /^exam_41_page_(\d+)\.json$/,
    usesDomainClassifier: true,
  },
  {
    certId: 'gh-300',
    examCode: 'GH-300',
    name: 'GitHub Copilot',
    provider: 'GitHub',
    level: 'Fundamentals',
    description: 'GitHub Copilot certification prep.',
    modulePath: 'src/data/gh300Questions.js',
    metaModulePath: 'src/config/gh300Exam.js',
    usesDomainClassifier: false,
  },
];

async function loadClassifier() {
  const classifierPath = path.join(root, 'src/utils/ai102DomainClassifier.js');
  return import(pathToFileURL(classifierPath).href);
}

function loadJsonExamQuestions(source, classifyDomain) {
  const dir = path.join(root, source.folder);
  if (!fs.existsSync(dir)) {
    return { questions: [], topics: [], fileCount: 0 };
  }

  const files = fs
    .readdirSync(dir)
    .filter((file) => source.filePattern.test(file))
    .sort((a, b) => {
      const pageA = Number(a.match(source.filePattern)[1]);
      const pageB = Number(b.match(source.filePattern)[1]);
      return pageA - pageB;
    });

  const seen = new Set();
  const questions = [];

  for (const file of files) {
    const payload = JSON.parse(fs.readFileSync(path.join(dir, file), 'utf8'));
    for (const raw of payload.pageProps?.questions ?? []) {
      if (seen.has(raw.question_id)) continue;
      seen.add(raw.question_id);
      questions.push(transformRawQuestion(raw, classifyDomain));
    }
  }

  const topics = distinctTopics(questions);
  return { questions, topics, fileCount: files.length };
}

async function loadModuleQuestions(source) {
  const mod = await import(pathToFileURL(path.join(root, source.modulePath)).href);
  const metaMod = await import(pathToFileURL(path.join(root, source.metaModulePath)).href);
  const questions = (mod.gh300Questions ?? []).map((q, index) => ({
    topic: '1',
    domainId: undefined,
    questionId: index + 1,
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

  const parts = buildPartsFromLayout({
    partSizes: metaMod.partSizes,
    partTitles: metaMod.partTitles,
    partDomains: [],
  });

  return {
    questions,
    parts,
    gridPageSize: metaMod.GRID_PAGE_SIZE ?? 50,
    sourceFileCount: 0,
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

    if (source.folder) {
      const classifier = source.usesDomainClassifier ? await loadClassifier() : null;
      const classifyDomain = classifier?.classifyAi102Domain ?? null;
      const { questions, fileCount } = loadJsonExamQuestions(source, classifyDomain);
      const prepared = classifier
        ? buildDomainParts(questions, classifier)
        : { questions, parts: buildTopicParts(questions, distinctTopics(questions)) };
      const finalQuestions = prepared.questions;
      const parts = buildPartsFromLayout(prepared.parts);

      banks.push({
        cert: { ...certBase, sourceFileCount: fileCount },
        parts,
        questions: finalQuestions,
        domainStats: classifier ? buildDomainStats(finalQuestions) : null,
      });
      continue;
    }

    const { questions, parts, gridPageSize, sourceFileCount } = await loadModuleQuestions(source);
    banks.push({
      cert: { ...certBase, gridPageSize, sourceFileCount },
      parts,
      questions,
      domainStats: null,
    });
  }

  return banks;
}
