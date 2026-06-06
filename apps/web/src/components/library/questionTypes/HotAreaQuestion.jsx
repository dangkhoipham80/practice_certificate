import { useMemo, useState } from 'react';
import { normalizeHotAreaUiConfig } from '../../../lib/hotAreaUiFormat';
import {
  isCodeAnswerArea,
  normalizeAnswerAreaFormat,
  resolveCodeTemplate,
  resolveTextTemplate,
} from '../../../lib/codeTemplateFormat';
import { CodeTemplateView } from './CodeTemplateView';
import { TextTemplateView } from './TextTemplateView';

function longestOptionChars(options = [], value = '') {
  const labels = options.map((opt) => opt.label ?? '').filter(Boolean);
  return Math.max(value.length, ...labels.map((l) => l.length), 12);
}

/** Native <select> ignores ch reliably; size from monospace char count + arrow padding. */
function zoneSelectStyle(value, options = []) {
  const len = longestOptionChars(options, value ?? '');
  const px = Math.ceil(len * 8.4 + 36);
  return { width: `${px}px`, minWidth: `${px}px` };
}

function DropdownCell({ zone, value, readOnly, isCorrect, onChange }) {
  const options = zone.options ?? [];
  const empty = !value;

  return (
    <select
      value={value ?? ''}
      disabled={readOnly}
      onChange={(e) => onChange?.(e.target.value || null)}
      style={zoneSelectStyle(value, options)}
      className={[
        'hot-area-inline-select mx-0.5 inline-block cursor-pointer rounded-[1px] border bg-white pl-1.5 pr-7 py-0',
        'font-mono text-[13px] font-normal leading-[1.35rem] text-[#003966]',
        'align-baseline focus:border-[#0078d4] focus:outline-none focus:ring-1 focus:ring-[#0078d4]',
        'dark:border-gh-border dark:bg-[#1e1e1e] dark:text-sky-100',
        empty ? 'border-[#ababab] text-muted dark:text-slate-500' : 'border-[#ababab]',
        readOnly && isCorrect
          ? 'border-success-600 bg-success-50 text-success-900 dark:border-success-400 dark:bg-success-500/20 dark:text-success-100'
          : '',
        readOnly && !empty && !isCorrect
          ? 'border-danger-400 bg-danger-50 text-danger-900 dark:border-danger-400/60 dark:bg-danger-500/15 dark:text-danger-100'
          : '',
        readOnly ? 'cursor-default opacity-100' : 'hover:border-[#0078d4]',
      ].join(' ')}
      aria-label={zone.placeholder ?? zone.id}
    >
      <option value="">&nbsp;</option>
      {options.map((opt) => (
        <option key={opt.id} value={opt.label}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}

export function HotAreaQuestion({
  uiConfig: rawConfig,
  readOnly = false,
  answerOnly = false,
  filled,
  onFilledChange,
}) {
  const uiConfig = useMemo(() => normalizeHotAreaUiConfig(rawConfig), [rawConfig]);

  const hotspots = uiConfig.answer_area?.hotspots ?? uiConfig.hotspots ?? [];
  const answerArea = uiConfig.answer_area ?? {};
  const layoutFormat = normalizeAnswerAreaFormat(answerArea.format);
  const codeTemplate = resolveCodeTemplate(answerArea) || (layoutFormat !== 'text' ? uiConfig.template ?? '' : '');
  const textTemplate = resolveTextTemplate(answerArea);
  const isCode = isCodeAnswerArea(answerArea);
  const language = answerArea.language ?? 'csharp';

  const correctByZone = useMemo(() => {
    const map = {};
    for (const z of hotspots) {
      const label = z.options?.find((opt) => opt.id === z.correct_option_id)?.label;
      if (label) map[z.id] = label;
    }
    return map;
  }, [hotspots]);

  const [localFilled, setLocalFilled] = useState({});
  const controlled = onFilledChange != null;
  const dropdownReadOnly = readOnly || answerOnly;

  const displayFilled = answerOnly
    ? correctByZone
    : controlled
      ? (filled ?? {})
      : readOnly
        ? correctByZone
        : localFilled;

  function updateFilled(updater) {
    if (dropdownReadOnly) return;
    const apply = (prev) => (typeof updater === 'function' ? updater(prev) : updater);
    if (controlled) onFilledChange(apply(filled ?? {}));
    else setLocalFilled(apply);
  }

  const zoneById = Object.fromEntries(hotspots.map((z) => [z.id, z]));

  function renderDropdownCell(zone, zoneId) {
    const value = displayFilled[zoneId] ?? '';
    return (
      <DropdownCell
        zone={zone}
        value={value}
        readOnly={dropdownReadOnly}
        isCorrect={dropdownReadOnly && value && correctByZone[zoneId] === value}
        onChange={(label) =>
          updateFilled((prev) => {
            const next = { ...prev };
            if (label) next[zoneId] = label;
            else delete next[zoneId];
            return next;
          })
        }
      />
    );
  }

  const cellProps = ({ zone, zoneId }) => renderDropdownCell(zone, zoneId);
  const primaryTemplate = (codeTemplate || textTemplate || uiConfig.template || '').trim();
  const hasCodeBlock = Boolean(codeTemplate?.trim()) || isCode || layoutFormat === 'code';
  const hasProseBlock = Boolean(textTemplate?.trim()) && layoutFormat === 'both';

  const renderBody = () => {
    if (!primaryTemplate && !hasProseBlock) {
      return (
        <div className="flex flex-col gap-2">
          {hotspots.map((zone) => renderDropdownCell(zone, zone.id))}
        </div>
      );
    }

    return (
      <div className="w-full space-y-3">
        {hasProseBlock && (
          <TextTemplateView
            template={textTemplate}
            zoneById={zoneById}
            dropCellProps={cellProps}
            noScroll
            inlineCode
          />
        )}
        {primaryTemplate && (
          <CodeTemplateView
            template={primaryTemplate}
            language={hasCodeBlock ? language : 'plain'}
            zoneById={zoneById}
            dropCellProps={cellProps}
            noScroll
          />
        )}
      </div>
    );
  };

  return (
    <div className="hot-area-exam w-full space-y-3">
      {uiConfig.instructions?.length > 0 && (
        <ul className="list-disc space-y-1 pl-5 text-xs text-muted dark:text-slate-400">
          {uiConfig.instructions.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
      )}

      <div
        className={[
          'w-full overflow-visible rounded-lg border bg-[#f3f3f3] dark:bg-gh-subtle',
          answerOnly
            ? 'border-success-200/80 dark:border-success-500/30'
            : 'border-line/80 dark:border-gh-border',
        ].join(' ')}
      >
        <div className="w-full bg-white p-4 dark:bg-gh-panel">
          <p className="mb-3 text-sm font-semibold text-ink dark:text-slate-200">
            Answer Area
            {layoutFormat === 'both' && (
              <span className="ml-2 text-xs font-normal text-muted dark:text-slate-500">(text + code)</span>
            )}
            {hasCodeBlock && layoutFormat !== 'text' && (
              <span className="ml-2 font-mono text-xs font-normal text-muted dark:text-slate-500">
                ({language})
              </span>
            )}
          </p>
          {renderBody()}
        </div>
      </div>

      {!dropdownReadOnly && (
        <p className="text-xs text-muted dark:text-slate-500">
          Select the appropriate option in each dropdown to complete the code.
        </p>
      )}
    </div>
  );
}
