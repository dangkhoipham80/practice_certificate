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
      if (language === 'csharp' || language === 'javascript') {
        if (CSHARP_KEYWORDS.has(w)) type = 'keyword';
        else if (CSHARP_TYPES.has(w) || /^[A-Z][a-zA-Z]+$/.test(w)) type = 'type';
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

export function isCodeAnswerArea(answerArea) {
  return answerArea?.format === 'code' || answerArea?.language === 'csharp' || answerArea?.language === 'javascript';
}
