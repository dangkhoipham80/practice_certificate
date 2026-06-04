import { templateToLines, splitLineSegments } from '../../../lib/codeTemplateFormat';

export function TextTemplateView({ template, zoneById, dropCellProps }) {
  const lines = templateToLines(template);

  return (
    <div className="text-answer-area overflow-auto rounded-md border border-line/50 bg-[#fafafa] p-3 text-[13px] leading-7 text-ink dark:border-gh-border dark:bg-gh-subtle dark:text-slate-200">
      {lines.map((line, lineIndex) => (
        <div key={lineIndex} className="min-h-[1.75em] whitespace-pre-wrap">
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
            )
          )}
          {line.length === 0 ? '\u00A0' : null}
        </div>
      ))}
    </div>
  );
}
