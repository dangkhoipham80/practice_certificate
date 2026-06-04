import { templateToLines, splitLineSegments, tokenizeCodeLine } from '../../../lib/codeTemplateFormat';

const TOKEN_CLASS = {
  keyword: 'text-[#0000ff] dark:text-[#569cd6]',
  type: 'text-[#2b91af] dark:text-[#4ec9b0]',
  string: 'text-[#a31515] dark:text-[#ce9178]',
  number: 'text-[#098658] dark:text-[#b5cea8]',
  whitespace: 'whitespace-pre',
  plain: 'text-ink dark:text-slate-200',
};

function CodeText({ text, language }) {
  const tokens = tokenizeCodeLine(text, language);
  return (
    <>
      {tokens.map((tok, i) =>
        tok.type === 'whitespace' ? (
          <span key={i} className={TOKEN_CLASS.whitespace}>
            {tok.value}
          </span>
        ) : (
          <span key={i} className={TOKEN_CLASS[tok.type] ?? TOKEN_CLASS.plain}>
            {tok.value}
          </span>
        )
      )}
    </>
  );
}

export function CodeTemplateView({ template, language = 'csharp', zoneById, dropCellProps }) {
  const lines = templateToLines(template);

  return (
    <div className="code-answer-area overflow-auto rounded-md border border-line/50 bg-[#fafafa] dark:border-gh-border dark:bg-[#1e1e1e]">
      <pre className="m-0 min-w-min p-3 font-mono text-[13px] leading-[1.6] [tab-size:4]">
        <code>
          {lines.map((line, lineIndex) => (
            <div key={lineIndex} className="min-h-[1.6em] whitespace-pre">
              {splitLineSegments(line).map((seg, segIndex) =>
                seg.kind === 'text' ? (
                  <span key={segIndex}>
                    <CodeText text={seg.value} language={language} />
                  </span>
                ) : (
                  <span key={seg.id} className="inline align-baseline">
                    {dropCellProps({
                      zone: zoneById[seg.id] ?? { id: seg.id, placeholder: '' },
                      zoneId: seg.id,
                    })}
                  </span>
                )
              )}
              {line.length === 0 ? '\u00A0' : null}
            </div>
          ))}
        </code>
      </pre>
    </div>
  );
}
