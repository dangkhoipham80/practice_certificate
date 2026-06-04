import { buildDragDropUiConfig } from './dragDropUiFormat.js';

/**
 * Rule-based exam question parser: classifies type and extracts UI blocks.
 * Output merges with legacy question fields (text, choices, images, …).
 */

const HEADER_PATTERNS = [
  { re: /^SIMULATION\s*-/i, type: 'case_study', title: 'SIMULATION' },
  { re: /^HOTSPOT\s*-/i, type: 'hot_area', title: 'HOTSPOT' },
  { re: /^DRAG\s*DROP\s*-/i, type: 'drag_drop', title: 'DRAG DROP' },
  { re: /^DROP\s*DOWN\s*-/i, type: 'dropdown', title: 'DROP DOWN' },
];

const INSTRUCTION_MARKERS = [
  /^to answer,/i,
  /^note:/i,
  /^each correct selection/i,
  /^each value may be used/i,
  /^select and place/i,
  /^hot area:/i,
  /^you may need to drag/i,
];

const IMAGE_TAG_RE = /\[Image:\s*([^\]]+)\]/gi;

export function extractImageUrls(text = '') {
  const urls = [];
  let m;
  const re = new RegExp(IMAGE_TAG_RE.source, IMAGE_TAG_RE.flags);
  while ((m = re.exec(text))) {
    urls.push(m[1].trim());
  }
  return urls;
}

export function stripImageTags(text = '') {
  return text.replace(IMAGE_TAG_RE, '').replace(/\n{3,}/g, '\n\n').trim();
}

function linesOf(text) {
  return text.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
}

function parseExplanationBoxes(explanation = '') {
  const boxes = [];
  const re = /Box\s+(\d+):\s*([^\n]+?)(?=\s*-\s*\n|\s*Box\s+\d+:|$)/gi;
  let m;
  while ((m = re.exec(explanation))) {
    const value = m[2].replace(/\s*-\s*$/, '').trim();
    if (value) boxes.push({ index: Number(m[1]), value });
  }
  return boxes.sort((a, b) => a.index - b.index);
}

function extractCodeSnippet(explanation = '') {
  const match = explanation.match(/(?:Example:|[\r\n]+)(var\s[\s\S]{20,}?)(?:\n\n|Reference:|$)/i);
  if (match) return match[1].trim();
  const varMatch = explanation.match(/(var\s+[\s\S]{20,})/);
  return varMatch ? varMatch[1].trim() : '';
}

function inferValuesFromExplanation(explanation, boxes) {
  const values = new Set(boxes.map((b) => b.value));
  const apiTokens = explanation.match(/\b[A-Z][a-zA-Z]+(?:Async|Object|List)?\b/g) ?? [];
  for (const token of apiTokens) {
    if (token.length > 3 && !/^Box|Reference|Example|Enabled|IsExchangeable|Name|Phrases$/i.test(token)) {
      values.add(token);
    }
  }
  return [...values];
}

function detectUiType(text, { choices, correct, multiple }) {
  const trimmed = text.trim();
  for (const { re, type } of HEADER_PATTERNS) {
    if (re.test(trimmed)) {
      if (type === 'drag_drop') {
        if (/complete the code|____|await client\./i.test(trimmed + text)) return 'code_completion';
        if (/in sequence|correct order|arrange them/i.test(trimmed)) return 'ordering';
      }
      return type;
    }
  }
  if (choices?.length && (multiple || (correct?.length ?? 0) > 1)) return 'multiple_choice';
  if (choices?.length) return 'single_choice';
  if (/fill in the blank|____/i.test(trimmed)) return 'fill_blank';
  if (/match each|matching/i.test(trimmed)) return 'matching';
  return 'single_choice';
}

function splitStemAndInstructions(bodyLines) {
  const instructions = [];
  const stem = [];
  for (const line of bodyLines) {
    const splitAt = line.search(/\bto answer,/i);
    if (splitAt >= 0) {
      const before = line.slice(0, splitAt).trim();
      const after = line.slice(splitAt).trim();
      if (before) stem.push(before);
      if (after) instructions.push(after);
      continue;
    }
    if (INSTRUCTION_MARKERS.some((re) => re.test(line))) {
      instructions.push(line);
    } else if (instructions.length) {
      instructions.push(line);
    } else {
      stem.push(line);
    }
  }
  return { stem, instructions };
}

function questionKindFromUiType(uiType) {
  const map = {
    single_choice: 'mc',
    multiple_choice: 'mc',
    drag_drop: 'drag-drop',
    code_completion: 'drag-drop',
    ordering: 'drag-drop',
    hot_area: 'hotspot',
    case_study: 'simulation',
    dropdown: 'hotspot',
    matching: 'drag-drop',
    fill_blank: 'other',
  };
  return map[uiType] ?? 'other';
}

function snippetWithBlanks(snippet, boxes) {
  if (!snippet) return '';
  let template = snippet.trim();
  for (const box of boxes) {
    if (template.includes(box.value)) {
      template = template.replace(box.value, '____');
      continue;
    }
    const alt = box.value.replace(/PhraseList/i, 'Phraselist');
    if (alt !== box.value && template.includes(alt)) {
      template = template.replace(alt, '____');
    }
  }
  if (!/____/.test(template) && boxes.length) {
    template = template.replace(boxes[0].value, '____');
    if (boxes[1]) template = template.replace(new RegExp(`new\\s+\\w+`, 'i'), 'new ____');
  }
  return template;
}

function buildDragDropConfig({ title, stem, instructions, explanation, images, uiType }) {
  const boxes = parseExplanationBoxes(explanation);
  const snippet = snippetWithBlanks(extractCodeSnippet(explanation), boxes);
  const values = inferValuesFromExplanation(explanation, boxes);
  const resolvedType =
    uiType === 'code_completion' ? 'code_completion' : uiType === 'ordering' ? 'ordering' : 'drag_drop';

  return buildDragDropUiConfig({
    title,
    questionText: stem.join('\n'),
    instructions,
    explanation,
    snippet,
    boxes,
    valueLabels: values,
    uiType: resolvedType,
    images,
  });
}

function buildMcConfig({ stem, instructions, choices, correct, multiple, images, explanation, uiType }) {
  const questionText = stem.join('\n');
  const items = (choices ?? []).map((label, i) => ({
    id: `choice_${i + 1}`,
    label,
  }));
  return {
    type: uiType,
    title: multiple ? 'MULTIPLE CHOICE' : 'SINGLE CHOICE',
    question: questionText,
    question_text: questionText,
    instructions,
    instruction_text: instructions.join('\n'),
    choices,
    items,
    correct_indices: correct ?? [],
    multiple,
    images,
    explanation: explanation || undefined,
    status: 'active',
  };
}

function buildHotAreaConfig({ title, stem, instructions, images, explanation }) {
  const questionText = stem.join('\n');
  return {
    type: 'hot_area',
    title,
    question: questionText,
    question_text: questionText,
    instructions,
    instruction_text: instructions.join('\n'),
    images,
    explanation: explanation || undefined,
    status: 'active',
    hotspots: [],
  };
}

function buildCaseStudyConfig({ title, stem, instructions, images, explanation }) {
  const questionText = stem.join('\n');
  return {
    type: 'case_study',
    title,
    question: questionText,
    question_text: questionText,
    instructions,
    instruction_text: instructions.join('\n'),
    images,
    explanation: explanation || undefined,
    status: 'active',
  };
}

/**
 * Parse raw exam text into uiConfig + legacy field hints.
 * @param {string} rawText
 * @param {{ explanation?: string, images?: string[], choices?: string[], correct?: number[], multiple?: boolean }} opts
 */
export function parseExamQuestion(rawText = '', opts = {}) {
  const mergedImages = [...(opts.images ?? []), ...extractImageUrls(rawText)];
  const text = stripImageTags(rawText);
  const lines = linesOf(text);

  let title = '';
  let bodyStart = 0;
  for (const { re, title: t } of HEADER_PATTERNS) {
    if (lines[0] && re.test(lines[0])) {
      title = t;
      bodyStart = 1;
      break;
    }
  }
  if (!title && /^DRAG\s*DROP/i.test(lines[0] ?? '')) {
    title = 'DRAG DROP';
    bodyStart = /^DRAG\s*DROP\s*$/i.test(lines[0]) ? 1 : 0;
  }

  const bodyLines = lines.slice(bodyStart);
  const { stem, instructions } = splitStemAndInstructions(bodyLines);
  const uiType = detectUiType(rawText, opts);
  const explanation = opts.explanation ?? '';

  let uiConfig;
  if (uiType === 'drag_drop' || uiType === 'code_completion' || uiType === 'ordering') {
    uiConfig = buildDragDropConfig({
      title: title || 'DRAG DROP',
      stem,
      instructions,
      explanation,
      images: [...new Set(mergedImages)],
      uiType,
    });
  } else if (uiType === 'hot_area' || uiType === 'dropdown') {
    uiConfig = buildHotAreaConfig({
      title: title || 'HOTSPOT',
      stem,
      instructions,
      images: [...new Set(mergedImages)],
      explanation,
    });
  } else if (uiType === 'case_study') {
    uiConfig = buildCaseStudyConfig({
      title: title || 'SIMULATION',
      stem,
      instructions,
      images: [...new Set(mergedImages)],
      explanation,
    });
  } else if (uiType === 'single_choice' || uiType === 'multiple_choice') {
    uiConfig = buildMcConfig({
      stem,
      instructions,
      choices: opts.choices ?? [],
      correct: opts.correct ?? [],
      multiple: opts.multiple ?? uiType === 'multiple_choice',
      images: [...new Set(mergedImages)],
      explanation,
      uiType,
    });
  } else {
    uiConfig = {
      type: uiType,
      title,
      question_text: stem.join('\n'),
      instructions,
      instruction_text: instructions.join('\n'),
      images: [...new Set(mergedImages)],
      explanation: explanation || undefined,
      status: 'active',
    };
  }

  const questionKind = questionKindFromUiType(uiConfig.type);
  const legacyType =
    uiConfig.type === 'single_choice' || uiConfig.type === 'multiple_choice' ? 'mc' : 'interactive';

  return {
    text: rawText.trim() || text,
    images: [...new Set(mergedImages)],
    explanation: explanation || undefined,
    questionKind,
    type: legacyType,
    quizEligible: legacyType === 'mc' && (opts.choices?.length ?? 0) > 0,
    uiConfig,
  };
}

/** Merge parser output into an existing question without removing fields. */
export function applyParsedUiConfig(question) {
  const parsed = parseExamQuestion(question.text ?? '', {
    explanation: question.explanation,
    images: question.images,
    choices: question.choices,
    correct: question.correct,
    multiple: question.multiple,
  });
  return {
    ...question,
    ...parsed,
    uiConfig: {
      ...(question.uiConfig ?? {}),
      ...parsed.uiConfig,
    },
  };
}

export function getUiConfig(question) {
  if (question?.uiConfig && Object.keys(question.uiConfig).length) return question.uiConfig;
  return applyParsedUiConfig(question).uiConfig;
}
