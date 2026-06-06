import { Fragment } from 'react';
import {
  splitLineSegments,
  templateToDisplayLines,
} from '../../../lib/codeTemplateFormat';
import { ExplanationText } from '../../shared/ExplanationText';

const DROP_INLINE_RE = /\{\{drop_\d+\}\}/;

function StaticBlank() {
  return (
    <span
      className="mx-0.5 inline-block min-h-[1.35rem] min-w-[8rem] rounded-[1px] border border-[#ababab] bg-white align-baseline dark:border-gh-border dark:bg-[#1e1e1e]"
      aria-hidden
    >
      {'\u00A0'}
    </span>
  );
}

/** Prose-only template without code tokens — uses ExplanationText. */
function ProseTemplateView({ template }) {
  return (
    <div className="text-answer-area w-full overflow-visible rounded-md border border-line/50 bg-[#fafafa] p-3 text-[13px] text-ink dark:border-gh-border dark:bg-gh-subtle dark:text-slate-200">
      <ExplanationText>{template}</ExplanationText>
    </div>
  );
}

/** Inline template with {{drop_n}} — same layout as CodeTemplateView (pre/code), no syntax highlight. */
function InlineDropTemplateView({ template, zoneById, dropCellProps, staticBlanks = false }) {
  const lines = templateToDisplayLines(template);
  const blankProps = staticBlanks
    ? ({ zoneId }) => <StaticBlank key={zoneId} />
    : dropCellProps;

  return (
    <div className="text-answer-area max-w-full min-w-0 overflow-x-auto overflow-y-visible rounded-md border border-line/50 bg-[#fafafa] dark:border-gh-border dark:bg-gh-subtle">
      <pre className="m-0 min-w-0 p-3 font-mono text-[13px] leading-[1.6] whitespace-pre text-ink dark:text-slate-200">
        <code>
          {lines.map((line, lineIndex) => (
            <Fragment key={lineIndex}>
              {lineIndex > 0 ? '\n' : null}
              {line.length === 0
                ? null
                : splitLineSegments(line).map((seg, segIndex) =>
                    seg.kind === 'text' ? (
                      <span key={segIndex}>{seg.value}</span>
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

export function TextTemplateView({
  template,
  zoneById,
  dropCellProps,
  noScroll = false,
  staticBlanks = false,
  inlineCode = false,
}) {
  const hasDropTokens = DROP_INLINE_RE.test(template ?? '');

  if (!hasDropTokens) {
    return <ProseTemplateView template={template} />;
  }

  if (inlineCode || noScroll) {
    return (
      <InlineDropTemplateView
        template={template}
        zoneById={zoneById}
        dropCellProps={dropCellProps}
        staticBlanks={staticBlanks}
      />
    );
  }

  return (
    <InlineDropTemplateView
      template={template}
      zoneById={zoneById}
      dropCellProps={dropCellProps}
      staticBlanks={staticBlanks}
    />
  );
}
