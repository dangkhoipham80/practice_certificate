const DROP_TOKEN_RE = /\{\{drop_(\d+)\}\}/g;

const CSHARP_KEYWORDS = new Set([
  'var', 'await', 'new', 'false', 'true', 'null', 'return', 'if', 'else', 'for', 'foreach',
  'while', 'class', 'public', 'private', 'static', 'async', 'void', 'int', 'string', 'bool',
]);

const CSHARP_TYPES = new Set(['Features', 'Object', 'List', 'Task', 'String', 'Boolean']);

/** Keep newlines/tabs/spaces exactly as authored; only unify line endings. */
export function preserveCodeTemplate(template) {
  if (template == null) return '';
  return String(template).replace(/\r\n/g, '\n');
}

export function templateToLines(template) {
  return preserveCodeTemplate(template).split('\n');
}

/** Join lines that were wrongly broken after {{drop_n}} (e.g. "(AudioStream...)" on the next line). */
export function templateToDisplayLines(template) {
  const lines = templateToLines(template);
  const merged = [];
  for (const line of lines) {
    if (!line.trim()) {
      merged.push('');
      continue;
    }
    let prevIdx = merged.length - 1;
    while (prevIdx >= 0 && !merged[prevIdx].trim()) prevIdx -= 1;
    const prev = prevIdx >= 0 ? merged[prevIdx] : null;
    if (prev != null && /\{\{drop_\d+\}\}\s*$/.test(prev) && /^\s*[\(\[\{\.]/.test(line)) {
      while (merged.length > prevIdx + 1) merged.pop();
      merged[prevIdx] = prev + line.replace(/^\s+/, '');
    } else {
      merged.push(line);
    }
  }
  return merged;
}

/** Insert Tab (or any text) at the textarea caret without leaving the field. */
export function insertInTextarea(textarea, insert) {
  const start = textarea.selectionStart;
  const end = textarea.selectionEnd;
  const value = textarea.value;
  const next = value.slice(0, start) + insert + value.slice(end);
  const caret = start + insert.length;
  return { next, caret };
}

export function handleCodeTextareaKeyDown(e, onValueChange) {
  if (e.key !== 'Tab') return;
  e.preventDefault();
  const { next, caret } = insertInTextarea(e.target, '\t');
  onValueChange(next);
  requestAnimationFrame(() => {
    e.target.selectionStart = caret;
    e.target.selectionEnd = caret;
  });
}

/** Split template into text blocks and {{drop_n}} placeholders (multi-line safe). */
export function splitTemplateSegments(template) {
  const segments = [];
  const text = preserveCodeTemplate(template);
  const re = new RegExp(DROP_TOKEN_RE.source, 'g');
  let last = 0;
  let match;
  while ((match = re.exec(text))) {
    if (match.index > last) {
      segments.push({ kind: 'text', value: text.slice(last, match.index) });
    }
    segments.push({ kind: 'drop', id: `drop_${match[1]}` });
    last = match.index + match[0].length;
  }
  if (last < text.length) segments.push({ kind: 'text', value: text.slice(last) });
  if (!segments.length) segments.push({ kind: 'text', value: text });
  return segments;
}

/** Split one line into text + drop segments (line content unchanged). */
export function splitLineSegments(line) {
  const segments = [];
  let last = 0;
  const re = new RegExp(DROP_TOKEN_RE.source, 'g');
  let m;
  while ((m = re.exec(line))) {
    if (m.index > last) {
      segments.push({ kind: 'text', value: line.slice(last, m.index) });
    }
    segments.push({ kind: 'drop', id: `drop_${m[1]}` });
    last = m.index + m[0].length;
  }
  if (last < line.length) segments.push({ kind: 'text', value: line.slice(last) });
  if (!segments.length) segments.push({ kind: 'text', value: line });
  return segments;
}

/**
 * Tokenize a line preserving leading spaces/tabs and all characters.
 */
export function tokenizeCodeLine(line, language = 'csharp') {
  if (line == null) return [];
  const tokens = [];
  let i = 0;

  while (i < line.length) {
    const rest = line.slice(i);

    const ws = rest.match(/^[ \t]+/);
    if (ws) {
      tokens.push({ type: 'whitespace', value: ws[0] });
      i += ws[0].length;
      continue;
    }

    const str = rest.match(/^"(?:\\.|[^"\\])*"/);
    if (str) {
      tokens.push({ type: 'string', value: str[0] });
      i += str[0].length;
      continue;
    }

    const word = rest.match(/^[A-Za-z_][A-Za-z0-9_]*/);
    if (word) {
      const w = word[0];
      let type = 'plain';
      if (language === 'csharp' || language === 'javascript' || language === 'typescript') {
        if (CSHARP_KEYWORDS.has(w)) type = 'keyword';
        else if (CSHARP_TYPES.has(w) || /^[A-Z][a-zA-Z]+$/.test(w)) type = 'type';
      } else if (language === 'python' && ['def', 'import', 'from', 'return', 'if', 'else', 'for', 'in', 'async', 'await', 'class', 'True', 'False', 'None'].includes(w)) {
        type = 'keyword';
      } else if (language === 'plain') {
        type = 'plain';
      }
      tokens.push({ type, value: w });
      i += w.length;
      continue;
    }

    const num = rest.match(/^\d+/);
    if (num) {
      tokens.push({ type: 'number', value: num[0] });
      i += num[0].length;
      continue;
    }

    tokens.push({ type: 'plain', value: rest[0] });
    i += 1;
  }

  return tokens;
}

/** Layout of the answer-area template(s). */
export const ANSWER_AREA_FORMATS = [
  { id: 'code', label: 'Code' },
  { id: 'text', label: 'Text / prose' },
  { id: 'both', label: 'Text + code' },
];

/** Syntax highlighting for code blocks (optional). */
export const TEMPLATE_LANGUAGES = [
  { id: 'csharp', label: 'C#' },
  { id: 'javascript', label: 'JavaScript' },
  { id: 'typescript', label: 'TypeScript' },
  { id: 'python', label: 'Python' },
  { id: 'sql', label: 'SQL' },
  { id: 'powershell', label: 'PowerShell' },
  { id: 'xml', label: 'XML' },
  { id: 'html', label: 'HTML' },
  { id: 'json', label: 'JSON' },
  { id: 'plain', label: 'Plain (no highlighting)' },
];

export function normalizeAnswerAreaFormat(format) {
  if (format === 'code' || format === 'text' || format === 'both') return format;
  return 'code';
}

export function isCodeAnswerArea(answerArea) {
  const format = normalizeAnswerAreaFormat(answerArea?.format);
  if (format === 'text') return false;
  const code = answerArea?.template?.trim();
  if (format === 'code' || format === 'both') return Boolean(code);
  return (
    answerArea?.format === 'code' ||
    answerArea?.language === 'csharp' ||
    answerArea?.language === 'javascript'
  );
}

export function resolveCodeTemplate(answerArea = {}) {
  const format = normalizeAnswerAreaFormat(answerArea.format);
  if (format === 'text') return '';
  return answerArea.template ?? '';
}

export function resolveTextTemplate(answerArea = {}) {
  const format = normalizeAnswerAreaFormat(answerArea.format);
  if (format === 'code') return '';
  if (format === 'text') return answerArea.text_template ?? answerArea.template ?? '';
  return answerArea.text_template ?? '';
}
