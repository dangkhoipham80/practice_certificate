import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');

const EXAMS = [
  {
    folder: 'AI_102',
    filePattern: /^exam_41_page_(\d+)\.json$/,
    exportName: 'ai102Questions',
    metaName: 'ai102ExamMeta',
    output: 'src/data/ai102Questions.js',
    examCode: 'AI-102',
  },
  {
    folder: 'AI_200',
    filePattern: /^exam_\d+_page_(\d+)\.json$/,
    exportName: 'ai200Questions',
    metaName: 'ai200ExamMeta',
    output: 'src/data/ai200Questions.js',
    examCode: 'AI-200',
  },
];

const CHOICE_ORDER = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

function normalizeText(text = '', images = []) {
  let result = text.replace(/\r\n/g, '\n').trim();
  if (result.includes('//IMG//') && images.length) {
    const imgTags = images.map((url) => `\n[Image: ${url}]\n`).join('');
    result = result.replace(/\/\/IMG\/\//g, imgTags);
  }
  return result;
}

function transformQuestion(raw) {
  const images = raw.question_images ?? [];
  const text = normalizeText(raw.question_text, images);
  const topic = String(raw.topic ?? '0');
  const explanation = (raw.answer_description || raw.answer_ET || '').trim();
  const base = {
    topic,
    questionId: raw.question_id,
    images,
    explanation: explanation || undefined,
    quizEligible: false,
    type: raw.isMC ? 'mc' : 'interactive',
    choices: [],
    correct: [],
    multiple: false,
  };

  if (!raw.isMC || !raw.choices || !raw.answer) {
    return { ...base, text, warn: 'Interactive question — review in library only.' };
  }

  const choiceEntries = CHOICE_ORDER.filter((key) => raw.choices[key] !== undefined).map((key) => [
    key,
    String(raw.choices[key]),
  ]);

  if (!choiceEntries.length) {
    return { ...base, text, warn: 'Missing choices — review in library only.' };
  }

  const choices = choiceEntries.map(([, value]) => value);
  const letterToIndex = Object.fromEntries(choiceEntries.map(([letter], index) => [letter, index]));
  const answerLetters = String(raw.answer)
    .toUpperCase()
    .split('')
    .filter((char) => letterToIndex[char] !== undefined);
  const correct = [...new Set(answerLetters.map((letter) => letterToIndex[letter]))].sort((a, b) => a - b);

  if (!correct.length) {
    return { ...base, text, choices, warn: 'Answer not mapped — review in library only.' };
  }

  return {
    ...base,
    text,
    choices,
    correct,
    multiple: correct.length > 1,
    quizEligible: true,
    type: 'mc',
  };
}

function loadExamQuestions(exam) {
  const dir = path.join(root, exam.folder);
  if (!fs.existsSync(dir)) {
    return { questions: [], topics: [] };
  }

  const files = fs
    .readdirSync(dir)
    .filter((file) => exam.filePattern.test(file))
    .sort((a, b) => {
      const pageA = Number(a.match(exam.filePattern)[1]);
      const pageB = Number(b.match(exam.filePattern)[1]);
      return pageA - pageB;
    });

  const seen = new Set();
  const questions = [];

  for (const file of files) {
    const payload = JSON.parse(fs.readFileSync(path.join(dir, file), 'utf8'));
    for (const raw of payload.pageProps?.questions ?? []) {
      if (seen.has(raw.question_id)) continue;
      seen.add(raw.question_id);
      questions.push(transformQuestion(raw));
    }
  }

  const topics = [...new Set(questions.map((q) => q.topic))].sort((a, b) => Number(a) - Number(b));
  return { questions, topics, fileCount: files.length };
}

function buildTopicParts(questions, topics) {
  const partSizes = topics.map((topic) => questions.filter((q) => q.topic === topic).length);
  const partStarts = partSizes.reduce((acc, size, index) => {
    acc.push(index === 0 ? 0 : acc[index - 1] + partSizes[index - 1]);
    return acc;
  }, []);
  const partTitles = topics.map((topic) => `Topic ${topic}`);
  return { partSizes, partStarts, partTitles, topics };
}

function writeModule(exam, questions, meta) {
  const outPath = path.join(root, exam.output);
  fs.mkdirSync(path.dirname(outPath), { recursive: true });

  const body = `// Generated from ${exam.folder}/ by scripts/build-exam-questions.mjs
// ${exam.examCode}: ${questions.length} questions (${questions.filter((q) => q.quizEligible).length} quiz-eligible MC)

export const ${exam.exportName} = ${JSON.stringify(questions, null, 2)};

export const ${exam.metaName} = ${JSON.stringify(meta, null, 2)};
`;

  fs.writeFileSync(outPath, body, 'utf8');
  return outPath;
}

for (const exam of EXAMS) {
  const { questions, topics, fileCount = 0 } = loadExamQuestions(exam);
  const parts = buildTopicParts(questions, topics);
  const meta = {
    examCode: exam.examCode,
    total: questions.length,
    quizEligible: questions.filter((q) => q.quizEligible).length,
    sourceFiles: fileCount,
    ...parts,
  };

  const outPath = writeModule(exam, questions, meta);
  console.log(
    `${exam.examCode}: wrote ${questions.length} questions (${meta.quizEligible} MC) from ${fileCount} files → ${path.relative(root, outPath)}`,
  );
}
