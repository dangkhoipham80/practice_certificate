import { splitLineSegments, splitTemplateSegments } from '../../../lib/codeTemplateFormat';
import { ExplanationText } from '../../shared/ExplanationText';

const DROP_INLINE_RE = /\{\{drop_\d+\}\}/;

function InlineLine({ line, zoneById, dropCellProps }) {
  return (
    <div className="min-h-[1.75em] whitespace-pre-wrap">
      {splitLineSegments(line).map((seg, segIndex) =>
        seg.kind === 'text' ? (
          <span key={segIndex}>{seg.value}</span>
        ) : (
          <span key={seg.id} className="inline align-baseline">
            {dropCellProps({
              zone: zoneById[seg.id] ?? { id: seg.id, placeholder: '' },
              zoneId: seg.id,
            })}
          </span>
        ),
      )}
      {line.length === 0 ? '\u00A0' : null}
    </div>
  );
}

export function TextTemplateView({ template, zoneById, dropCellProps }) {
  const hasDropTokens = DROP_INLINE_RE.test(template ?? '');

  if (!hasDropTokens) {
    return (
      <div className="text-answer-area overflow-auto rounded-md border border-line/50 bg-[#fafafa] p-3 text-[13px] text-ink dark:border-gh-border dark:bg-gh-subtle dark:text-slate-200">
        <ExplanationText>{template}</ExplanationText>
      </div>
    );
  }

  const segments = splitTemplateSegments(template);

  return (
    <div className="text-answer-area overflow-auto rounded-md border border-line/50 bg-[#fafafa] p-3 text-[13px] leading-7 text-ink dark:border-gh-border dark:bg-gh-subtle dark:text-slate-200">
      {segments.map((seg, index) => {
        if (seg.kind === 'drop') {
          return (
            <span key={`${seg.id}-${index}`} className="inline align-baseline">
              {dropCellProps({
                zone: zoneById[seg.id] ?? { id: seg.id, placeholder: '' },
                zoneId: seg.id,
              })}
            </span>
          );
        }

        if (!seg.value) return null;

        if (seg.value.includes('\n') || seg.value.includes('|')) {
          return (
            <div key={index} className="my-1">
              <ExplanationText className="text-[13px] leading-7">{seg.value}</ExplanationText>
            </div>
          );
        }

        if (DROP_INLINE_RE.test(seg.value)) {
          return (
            <InlineLine
              key={index}
              line={seg.value}
              zoneById={zoneById}
              dropCellProps={dropCellProps}
            />
          );
        }

        return (
          <span key={index} className="whitespace-pre-wrap">
            {seg.value}
          </span>
        );
      })}
    </div>
  );
}
