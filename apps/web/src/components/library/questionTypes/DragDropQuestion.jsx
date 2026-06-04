import { useMemo, useState } from 'react';
import { ResizableColumns } from '../../ui/ResizableColumns';
import { normalizeDragDropUiConfig } from '../../../lib/dragDropUiFormat';
import {
  isCodeAnswerArea,
  normalizeAnswerAreaFormat,
  resolveCodeTemplate,
  resolveTextTemplate,
} from '../../../lib/codeTemplateFormat';
import { CodeTemplateView } from './CodeTemplateView';
import { TextTemplateView } from './TextTemplateView';

function zoneWidthClass(zoneId) {
  if (zoneId === 'drop_1') return 'min-w-[10.5rem]';
  if (zoneId === 'drop_2') return 'min-w-[8.5rem]';
  return 'min-w-[7rem]';
}

function DropCell({ zone, value, readOnly, isHover, isCorrect, onDrop, onDragOver, onDragLeave, onClear }) {
  const empty = !value;
  return (
    <span
      role="button"
      tabIndex={readOnly ? -1 : 0}
      className={[
        'mx-0.5 inline-flex h-[1.35rem] max-w-full items-center justify-center align-middle',
        'rounded-[2px] border-2 px-2 font-mono text-[12px] font-semibold leading-none transition-all duration-150',
        zoneWidthClass(zone.id),
        empty
          ? 'border-[#0078d4] bg-white text-transparent dark:border-[#4fc3f7] dark:bg-[#1e1e1e]'
          : 'border-[#0078d4] bg-[#e8f4fc] text-[#003966] dark:border-[#4fc3f7] dark:bg-[#264f78] dark:text-[#d4e8ff]',
        isHover && !readOnly ? 'ring-2 ring-accent-400 ring-offset-1' : '',
        readOnly && isCorrect
          ? 'border-success-600 bg-success-50 text-success-900 dark:border-success-400 dark:bg-success-500/20 dark:text-success-100'
          : '',
      ].join(' ')}
      onDragOver={(e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
        onDragOver?.();
      }}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      onDoubleClick={readOnly ? undefined : onClear}
      title={readOnly ? undefined : 'Double-click to clear'}
    >
      {value || '\u00A0'}
    </span>
  );
}

function ValueChip({ label, readOnly, isDragging, onDragStart, onDragEnd }) {
  return (
    <div
      draggable={!readOnly}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      className={[
        'select-none rounded-sm border-2 border-[#0078d4] bg-white px-4 py-2.5 text-center',
        'font-mono text-sm font-medium text-[#003966] shadow-sm transition-all',
        'dark:border-[#4fc3f7] dark:bg-gh-panel dark:text-sky-100',
        readOnly ? 'cursor-default opacity-90' : 'cursor-grab active:cursor-grabbing hover:shadow-md',
        isDragging ? 'scale-95 opacity-40' : '',
      ].join(' ')}
    >
      {label}
    </div>
  );
}

export function DragDropQuestion({
  uiConfig: rawConfig,
  readOnly = false,
  answerOnly = false,
  filled,
  onFilledChange,
}) {
  const uiConfig = useMemo(() => normalizeDragDropUiConfig(rawConfig), [rawConfig]);

  const draggable_items = uiConfig.draggable_items ?? [];
  const drop_zones = uiConfig.answer_area?.drop_zones ?? uiConfig.drop_zones ?? [];
  const answerArea = uiConfig.answer_area ?? {};
  const layoutFormat = normalizeAnswerAreaFormat(answerArea.format);
  const codeTemplate = resolveCodeTemplate(answerArea) || (layoutFormat !== 'text' ? uiConfig.template ?? '' : '');
  const textTemplate = resolveTextTemplate(answerArea);
  const isCode = isCodeAnswerArea(answerArea);
  const language = answerArea.language ?? 'csharp';

  const correctByZone = useMemo(() => {
    const map = {};
    for (const z of drop_zones) {
      if (z.correct_item_label) map[z.id] = z.correct_item_label;
    }
    return map;
  }, [drop_zones]);

  const [localFilled, setLocalFilled] = useState({});
  const [draggingLabel, setDraggingLabel] = useState(null);
  const [hoverZoneId, setHoverZoneId] = useState(null);

  const controlled = onFilledChange != null;
  const displayFilled = controlled ? (filled ?? {}) : readOnly ? correctByZone : localFilled;

  function updateFilled(updater) {
    const apply = (prev) => (typeof updater === 'function' ? updater(prev) : updater);
    if (controlled) onFilledChange(apply(filled ?? {}));
    else setLocalFilled(apply);
  }
  const zoneById = Object.fromEntries(drop_zones.map((z) => [z.id, z]));

  function startDrag(e, label) {
    if (readOnly) return;
    setDraggingLabel(label);
    e.dataTransfer.setData('text/plain', label);
    e.dataTransfer.effectAllowed = 'move';
  }

  function endDrag() {
    setDraggingLabel(null);
    setHoverZoneId(null);
  }

  function dropOn(zoneId) {
    return (e) => {
      e.preventDefault();
      if (readOnly) return;
      const label = e.dataTransfer.getData('text/plain');
      if (label) updateFilled((prev) => ({ ...prev, [zoneId]: label }));
      endDrag();
    };
  }

  function renderDropCell(zone, zoneId) {
    return (
      <DropCell
        zone={zone}
        value={displayFilled[zoneId]}
        readOnly={readOnly}
        isHover={hoverZoneId === zoneId}
        isCorrect={
          readOnly &&
          displayFilled[zoneId] &&
          correctByZone[zoneId] === displayFilled[zoneId]
        }
        onDragOver={() => setHoverZoneId(zoneId)}
        onDragLeave={() => setHoverZoneId((id) => (id === zoneId ? null : id))}
        onDrop={dropOn(zoneId)}
        onClear={() =>
          updateFilled((prev) => {
            const next = { ...prev };
            delete next[zoneId];
            return next;
          })
        }
      />
    );
  }

  const renderTemplateBody = () => {
    const dropProps = ({ zone, zoneId }) => renderDropCell(zone, zoneId);
    const hasText = Boolean(textTemplate?.trim());
    const hasCode = Boolean(codeTemplate?.trim());

    if (!hasText && !hasCode) {
      return (
        <div className="flex flex-col gap-2">
          {drop_zones.map((zone) => renderDropCell(zone, zone.id))}
        </div>
      );
    }

    return (
      <div className="space-y-3">
        {hasText && (
          <TextTemplateView template={textTemplate} zoneById={zoneById} dropCellProps={dropProps} />
        )}
        {hasCode && (
          <CodeTemplateView
            template={codeTemplate}
            language={language}
            zoneById={zoneById}
            dropCellProps={dropProps}
          />
        )}
      </div>
    );
  };

  const answerAreaPanel = (
    <div className="h-full bg-white p-4 dark:bg-gh-panel">
      <p className="mb-3 text-sm font-semibold text-ink dark:text-slate-200">
        {answerOnly ? 'Answer' : 'Answer Area'}
        {layoutFormat === 'both' && (
          <span className="ml-2 text-xs font-normal text-muted dark:text-slate-500">(text + code)</span>
        )}
        {isCode && layoutFormat !== 'text' && (
          <span className="ml-2 font-mono text-xs font-normal text-muted dark:text-slate-500">
            ({language})
          </span>
        )}
      </p>
      {renderTemplateBody()}
    </div>
  );

  return (
    <div className="drag-drop-exam space-y-3">
      {uiConfig.instructions?.length > 0 && (
        <ul className="list-disc space-y-1 pl-5 text-xs text-muted dark:text-slate-400">
          {uiConfig.instructions.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
      )}

      {answerOnly ? (
        <div className="overflow-hidden rounded-lg border border-success-200/80 bg-[#f3f3f3] dark:border-success-500/30 dark:bg-gh-subtle">
          {answerAreaPanel}
        </div>
      ) : (
        <div className="overflow-hidden rounded-lg border border-line/80 bg-[#f3f3f3] dark:border-gh-border dark:bg-gh-subtle">
          <ResizableColumns
            initialLeftPercent={36}
            left={
              <div className="h-full border-r border-line/60 p-4 dark:border-gh-border">
                <p className="mb-3 text-sm font-semibold text-ink dark:text-slate-200">Values</p>
                <div className="flex flex-col gap-2.5">
                  {draggable_items.length > 0 ? (
                    draggable_items.map((item) => (
                      <ValueChip
                        key={item.id}
                        label={item.label}
                        readOnly={readOnly}
                        isDragging={draggingLabel === item.label}
                        onDragStart={(e) => startDrag(e, item.label)}
                        onDragEnd={endDrag}
                      />
                    ))
                  ) : (
                    <p className="text-xs text-muted">No values defined.</p>
                  )}
                </div>
              </div>
            }
            right={answerAreaPanel}
          />
        </div>
      )}

      {!readOnly && !answerOnly && (
        <p className="text-xs text-muted dark:text-slate-500">
          Drag a value into a blank cell. Double-click a cell to clear it. Values can be reused.
        </p>
      )}
    </div>
  );
}
