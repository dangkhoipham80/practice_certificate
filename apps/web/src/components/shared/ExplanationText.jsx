import { useMemo } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { templateToLines, tokenizeCodeLine } from '../../lib/codeTemplateFormat';
import { explanationToMarkdown } from '../../lib/explanationToMarkdown';

const TOKEN_CLASS = {
  keyword: 'text-[#0000ff] dark:text-[#569cd6]',
  type: 'text-[#2b91af] dark:text-[#4ec9b0]',
  string: 'text-[#a31515] dark:text-[#ce9178]',
  number: 'text-[#098658] dark:text-[#b5cea8]',
  whitespace: 'whitespace-pre',
  plain: 'text-ink dark:text-slate-200',
};

const HEADING_CLASS = {
  1: 'text-base font-bold leading-7 text-ink dark:text-slate-100',
  2: 'text-sm font-bold leading-6 text-ink dark:text-slate-100',
  3: 'text-sm font-semibold leading-6 text-ink dark:text-slate-100',
  4: 'text-xs font-semibold leading-6 text-ink dark:text-slate-200',
  5: 'text-xs font-medium leading-6 text-ink dark:text-slate-200',
  6: 'text-[11px] font-medium uppercase tracking-wide leading-5 text-muted dark:text-slate-400',
};

function CodeLine({ line, language }) {
  const tokens = tokenizeCodeLine(line, language);
  return (
    <div className="min-h-[1.6em] whitespace-pre">
      {tokens.map((tok, index) =>
        tok.type === 'whitespace' ? (
          <span key={index} className={TOKEN_CLASS.whitespace}>
            {tok.value}
          </span>
        ) : (
          <span key={index} className={TOKEN_CLASS[tok.type] ?? TOKEN_CLASS.plain}>
            {tok.value}
          </span>
        ),
      )}
      {line.length === 0 ? '\u00A0' : null}
    </div>
  );
}

function CodeBlock({ content, language = 'csharp' }) {
  const lines = templateToLines(content);
  return (
    <pre className="m-0 overflow-x-auto rounded-lg border border-line/50 bg-[#fafafa] p-3 font-mono text-[13px] leading-[1.6] [tab-size:4] dark:border-gh-border dark:bg-[#1e1e1e]">
      <code>
        {lines.map((line, index) => (
          <CodeLine key={index} line={line} language={language} />
        ))}
      </code>
    </pre>
  );
}

const markdownComponents = {
  h1: ({ children }) => <h1 className={HEADING_CLASS[1]}>{children}</h1>,
  h2: ({ children }) => <h2 className={HEADING_CLASS[2]}>{children}</h2>,
  h3: ({ children }) => <h3 className={HEADING_CLASS[3]}>{children}</h3>,
  h4: ({ children }) => <h4 className={HEADING_CLASS[4]}>{children}</h4>,
  h5: ({ children }) => <h5 className={HEADING_CLASS[5]}>{children}</h5>,
  h6: ({ children }) => <h6 className={HEADING_CLASS[6]}>{children}</h6>,
  p: ({ children }) => <p className="leading-6">{children}</p>,
  strong: ({ children }) => <strong className="font-bold text-ink dark:text-slate-100">{children}</strong>,
  em: ({ children }) => <em className="italic">{children}</em>,
  del: ({ children }) => <del className="text-muted line-through dark:text-slate-500">{children}</del>,
  ul: ({ children }) => <ul className="list-disc space-y-1 pl-5">{children}</ul>,
  ol: ({ children }) => <ol className="list-decimal space-y-1 pl-5">{children}</ol>,
  li: ({ children }) => <li className="leading-6">{children}</li>,
  blockquote: ({ children }) => (
    <blockquote className="border-l-4 border-accent-300/80 py-0.5 pl-3 italic text-muted dark:border-accent-500/50 dark:text-slate-400">
      {children}
    </blockquote>
  ),
  hr: () => <hr className="border-line/70 dark:border-gh-border" />,
  table: ({ children }) => (
    <div className="my-2 overflow-x-auto">
      <table className="w-full min-w-[280px] border-collapse text-left text-[13px]">{children}</table>
    </div>
  ),
  thead: ({ children }) => (
    <thead className="border-b border-line/80 bg-subtle/60 dark:border-gh-border dark:bg-gh-subtle/60">{children}</thead>
  ),
  tbody: ({ children }) => <tbody className="divide-y divide-line/50 dark:divide-gh-border">{children}</tbody>,
  tr: ({ children }) => <tr>{children}</tr>,
  th: ({ children, style }) => (
    <th className="px-3 py-2 font-semibold text-ink dark:text-slate-100" style={style}>
      {children}
    </th>
  ),
  td: ({ children, style }) => (
    <td className="px-3 py-2 align-top text-ink dark:text-slate-200" style={style}>
      {children}
    </td>
  ),
  a: ({ href, children }) => (
    <a
      href={href}
      className="font-medium text-accent-600 underline decoration-accent-400/50 underline-offset-2 hover:text-accent-700 dark:text-accent-300 dark:hover:text-accent-200"
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  ),
  pre: ({ children }) => <>{children}</>,
  code: ({ className, children }) => {
    const match = /language-(\w+)/.exec(className ?? '');
    if (!match) {
      return (
        <code className="rounded bg-subtle/80 px-1.5 py-0.5 font-mono text-[12px] text-ink dark:bg-gh-subtle dark:text-slate-200">
          {children}
        </code>
      );
    }
    const content = String(children).replace(/\n$/, '');
    return <CodeBlock content={content} language={match[1]} />;
  },
};

export function ExplanationText({ children, className = '' }) {
  const markdown = useMemo(() => explanationToMarkdown(children), [children]);
  if (!markdown.trim()) return null;

  return (
    <div className={`explanation-markdown space-y-3 ${className}`}>
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
        {markdown}
      </ReactMarkdown>
    </div>
  );
}
