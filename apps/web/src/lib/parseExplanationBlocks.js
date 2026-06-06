const FENCE_RE = /```(\w*)\r?\n([\s\S]*?)```/g;

const STRONG_CODE_RE =
  /^(var|await|new|using|import|def|class|public|private|protected|static|async|const|let|function|#include|namespace)\s/i;

function inferLanguage(code) {
  const sample = code.slice(0, 800);
  if (/\b(using\s+System|namespace\s|PhraselistCreateObject|AddPhraseListAsync)\b/.test(sample)) return 'csharp';
  if (/\b(def\s|import\s|from\s+\w+\s+import|print\()/.test(sample)) return 'python';
  if (/\b(const\s|let\s|function\s|=>|export\s)/.test(sample)) return 'javascript';
  if (/\b(SELECT|FROM|WHERE|INSERT|UPDATE)\b/i.test(sample)) return 'sql';
  if (/(\$[A-Za-z]|Get-|Set-|Write-)/.test(sample)) return 'powershell';
  return 'csharp';
}

function isStrongCodeLine(line) {
  const trimmed = line.trim();
  if (!trimmed) return false;
  if (STRONG_CODE_RE.test(trimmed)) return true;
  if (/[;{}]\s*$/.test(trimmed)) return true;
  if (/\.\w+\(/.test(trimmed)) return true;
  if (/^\s*[\}\)];?\s*$/.test(line)) return true;
  return false;
}

function isLikelyCodeLine(line) {
  const trimmed = line.trim();
  if (!trimmed) return false;
  if (/^drop_\d+:/i.test(trimmed)) return false;
  if (/^#{1,6}\s/.test(trimmed)) return false;
  if (/^[\wÀ-ỹ][^:;{}()]*[?:？]\s*$/u.test(trimmed) && !/[;{}]/.test(trimmed)) return false;
  if (/^[-*•]\s/.test(trimmed)) return false;
  if (/^\d+\.\s/.test(trimmed)) return false;
  if (/^>\s/.test(trimmed)) return false;
  if (/^\|.+\|/.test(trimmed)) return false;

  if (isStrongCodeLine(line)) return true;
  if (/^\s{2,}\S/.test(line)) return true;
  if (/^[\w.]+\s*=\s*/.test(trimmed) && /[;{]/.test(trimmed)) return true;
  if (/^\s*[\{\}]\s*,?\s*$/.test(trimmed)) return true;
  return false;
}

function isCodeBlock(lines) {
  const nonEmpty = lines.filter((line) => line.trim());
  if (!nonEmpty.length) return false;
  if (nonEmpty.length === 1) return isStrongCodeLine(nonEmpty[0]);
  const codeLines = nonEmpty.filter(isLikelyCodeLine).length;
  return codeLines >= Math.ceil(nonEmpty.length * 0.5);
}

function nextNonEmptyLine(lines, start) {
  for (let i = start; i < lines.length; i += 1) {
    if (lines[i].trim()) return lines[i];
  }
  return null;
}

function parseLineSegments(text) {
  const blocks = [];
  const lines = String(text ?? '').replace(/\r\n/g, '\n').split('\n');
  let i = 0;

  while (i < lines.length) {
    while (i < lines.length && !lines[i].trim()) i += 1;
    if (i >= lines.length) break;

    if (isLikelyCodeLine(lines[i])) {
      const codeLines = [];
      while (i < lines.length) {
        if (!lines[i].trim()) {
          const upcoming = nextNonEmptyLine(lines, i + 1);
          if (!upcoming || !isLikelyCodeLine(upcoming)) break;
        }
        if (!isLikelyCodeLine(lines[i]) && codeLines.length) break;
        if (!isLikelyCodeLine(lines[i]) && !codeLines.length) break;
        codeLines.push(lines[i]);
        i += 1;
      }

      if (isCodeBlock(codeLines)) {
        const content = codeLines.join('\n').replace(/\n+$/, '');
        blocks.push({ type: 'code', language: inferLanguage(content), content });
        continue;
      }

      blocks.push({ type: 'prose', content: codeLines.join('\n') });
      continue;
    }

    const proseLines = [];
    while (i < lines.length) {
      if (isLikelyCodeLine(lines[i])) {
        const upcoming = nextNonEmptyLine(lines, i);
        if (upcoming && isLikelyCodeLine(upcoming)) break;
      }
      if (!lines[i].trim() && proseLines.length) {
        const upcoming = nextNonEmptyLine(lines, i + 1);
        if (upcoming && isLikelyCodeLine(upcoming)) break;
      }
      proseLines.push(lines[i]);
      i += 1;
    }

    const content = proseLines.join('\n').replace(/\n+$/, '');
    if (content.trim()) blocks.push({ type: 'prose', content });
  }

  return blocks;
}

/** Split explanation text into prose and code blocks (fenced ``` or detected code). */
export function parseExplanationBlocks(text) {
  const source = String(text ?? '');
  if (!source.trim()) return [];

  const blocks = [];
  let lastIndex = 0;

  for (const match of source.matchAll(FENCE_RE)) {
    if (match.index > lastIndex) {
      blocks.push(...parseLineSegments(source.slice(lastIndex, match.index)));
    }
    const content = match[2].replace(/\n$/, '');
    blocks.push({
      type: 'code',
      language: match[1] || inferLanguage(content),
      content,
    });
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < source.length) {
    blocks.push(...parseLineSegments(source.slice(lastIndex)));
  }

  return blocks.filter((block) => block.content?.trim());
}
