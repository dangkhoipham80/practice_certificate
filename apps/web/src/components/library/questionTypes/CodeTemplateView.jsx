import { Fragment } from 'react';
import { templateToDisplayLines, splitLineSegments, tokenizeCodeLine } from '../../../lib/codeTemplateFormat';

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

function StaticBlank() {
  return (
    <span
      className="mx-0.5 inline-block min-h-[1.35rem] min-w-[10rem] rounded-[1px] border border-[#ababab] bg-white align-baseline dark:border-gh-border dark:bg-[#1e1e1e]"
      aria-hidden
    >
      {'\u00A0'}
    </span>
  );
}

export function CodeTemplateView({
  template,
  language = 'csharp',
  zoneById,
  dropCellProps,
  noScroll = false,
  staticBlanks = false,
}) {
  const lines = templateToDisplayLines(template);
  const blankProps = staticBlanks
    ? ({ zoneId }) => <StaticBlank key={zoneId} />
    : dropCellProps;

  return (
    <div
      className={[
        'code-answer-area max-w-full min-w-0 rounded-md border border-line/50 bg-[#fafafa] dark:border-gh-border dark:bg-[#1e1e1e]',
        noScroll ? 'overflow-x-auto overflow-y-visible' : 'overflow-auto',
      ].join(' ')}
    >
      <pre className="m-0 min-w-0 p-3 font-mono text-[13px] leading-[1.6] whitespace-pre [tab-size:4]">
        <code>
          {lines.map((line, lineIndex) => (
            <Fragment key={lineIndex}>
              {lineIndex > 0 ? '\n' : null}
              {line.length === 0
                ? null
                : splitLineSegments(line).map((seg, segIndex) =>
                    seg.kind === 'text' ? (
                      <span key={segIndex}>
                        <CodeText text={seg.value} language={language} />
                      </span>
                    ) : (
                      <span key={seg.id} className="inline align-baseline">
                        {blankProps({
                          zone: zoneById[seg.id] ?? { id: seg.id, placeholder: '' },
                          zoneId: seg.id,
                        })}
                      </span>
                    ),
                  )}
            </Fragment>
          ))}
        </code>
      </pre>
    </div>
  );
}
