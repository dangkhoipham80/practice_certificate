import { ArrowDown, ArrowUp, Plus, Trash2 } from 'lucide-react';
import { moveDraggableItem } from '../../lib/dragDropUiFormat';
import { useQuestionTypes } from '../../context/QuestionTypesContext';
import { normalizeDragDropUiConfig } from '../../lib/dragDropUiFormat';
import { handleCodeTextareaKeyDown } from '../../lib/codeTemplateFormat';
import {
  defaultUiConfig,
  isChoicesType,
  isDragDropType,
  isFillBlankType,
  isHotAreaType,
  nextId,
} from '../../lib/questionUiTypes';

function ListField({ label, items, onChange, placeholder }) {
  return (
    <div>
      <span className="auth-field-label">{label}</span>
      <div className="mt-2 space-y-2">
        {items.map((line, i) => (
          <div key={i} className="flex gap-2">
            <input
              className="auth-input !pl-4 flex-1"
              value={line}
              placeholder={placeholder}
              onChange={(e) => {
                const next = [...items];
                next[i] = e.target.value;
                onChange(next);
              }}
            />
            <button
              type="button"
              className="icon-button h-9 w-9 shrink-0"
              aria-label="Remove"
              onClick={() => onChange(items.filter((_, j) => j !== i))}
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}
      </div>
      <button
        type="button"
        className="secondary-button mt-2 !py-1.5 text-xs"
        onClick={() => onChange([...items, ''])}
      >
        <Plus size={14} />
        Add line
      </button>
    </div>
  );
}

function DraggableItemsEditor({ items, onChange, onMove }) {
  return (
    <div>
      <span className="auth-field-label">Values (draggable items)</span>
      <p className="mt-1 text-xs text-muted dark:text-slate-500">
        Use arrows to change order. IDs update to match position (item_1 = first row).
      </p>
      <div className="mt-2 space-y-2">
        {items.map((item, i) => (
          <div key={item.id} className="flex flex-wrap items-center gap-2">
            <span className="w-16 shrink-0 font-mono text-xs text-muted">{item.id}</span>
            <div className="flex shrink-0 flex-col gap-0.5">
              <button
                type="button"
                className="icon-button !h-7 !w-7"
                aria-label={`Move ${item.id} up`}
                disabled={i === 0}
                onClick={() => onMove(i, i - 1)}
              >
                <ArrowUp size={14} />
              </button>
              <button
                type="button"
                className="icon-button !h-7 !w-7"
                aria-label={`Move ${item.id} down`}
                disabled={i === items.length - 1}
                onClick={() => onMove(i, i + 1)}
              >
                <ArrowDown size={14} />
              </button>
            </div>
            <input
              className="auth-input !pl-4 min-w-0 flex-1"
              value={item.label}
              placeholder="Label"
              onChange={(e) => {
                const next = items.map((row, j) => (j === i ? { ...row, label: e.target.value } : row));
                onChange(next);
              }}
            />
            <button
              type="button"
              className="icon-button h-9 w-9 shrink-0"
              aria-label="Remove item"
              onClick={() => onChange(items.filter((_, j) => j !== i))}
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}
      </div>
      <button
        type="button"
        className="secondary-button mt-2 !py-1.5 text-xs"
        onClick={() => onChange([...items, { id: nextId('item', items), label: '' }])}
      >
        <Plus size={14} />
        Add value
      </button>
    </div>
  );
}

function DropZonesEditor({ zones, items, onChange }) {
  const selectable = items.filter((it) => it.label?.trim());
  return (
    <div>
      <span className="auth-field-label">Answer area — drop zones (pick correct value from list)</span>
      <div className="mt-2 space-y-2">
        {zones.map((zone, i) => (
          <div
            key={zone.id}
            className="flex flex-wrap items-center gap-2 rounded-xl border border-line/70 bg-white/60 p-2 dark:border-gh-border dark:bg-gh-subtle/40"
          >
            <span className="w-14 shrink-0 font-mono text-xs text-muted">{zone.id}</span>
            <input
              className="auth-input !pl-3 w-24 shrink-0 text-xs"
              value={zone.placeholder ?? zone.label ?? ''}
              placeholder="Placeholder"
              onChange={(e) => {
                const next = zones.map((row, j) =>
                  j === i ? { ...row, placeholder: e.target.value, label: e.target.value } : row
                );
                onChange(next);
              }}
            />
            <select
              className="auth-input !pl-3 min-w-0 flex-1 text-sm"
              value={zone.correct_item_id ?? ''}
              onChange={(e) => {
                const itemId = e.target.value || null;
                const item = items.find((it) => it.id === itemId);
                const label = item?.label ?? null;
                const next = zones.map((row, j) =>
                  j === i
                    ? {
                        ...row,
                        correct_item_id: itemId,
                        correct_item_label: label,
                        correct_answer: label,
                      }
                    : row
                );
                onChange(next);
              }}
            >
              <option value="">— pick value —</option>
              {selectable.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.id}: {item.label}
                </option>
              ))}
            </select>
            <button
              type="button"
              className="icon-button h-9 w-9 shrink-0"
              aria-label="Remove zone"
              onClick={() => onChange(zones.filter((_, j) => j !== i))}
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}
      </div>
      <button
        type="button"
        className="secondary-button mt-2 !py-1.5 text-xs"
        onClick={() =>
          onChange([
            ...zones,
            {
              id: `drop_${zones.length + 1}`,
              placeholder: `Blank ${zones.length + 1}`,
              correct_item_label: null,
            },
          ])
        }
      >
        <Plus size={14} />
        Add drop zone
      </button>
    </div>
  );
}

function patchDragDrop(uiConfig, partial) {
  return normalizeDragDropUiConfig({ ...uiConfig, ...partial });
}

export function QuestionUiConfigEditor({ questionType, uiConfig, onTypeChange, onUiConfigChange }) {
  const { types, loading } = useQuestionTypes();
  const typeRow = types.find((t) => t.slug === questionType);

  function patch(partial) {
    onUiConfigChange({ ...uiConfig, ...partial });
  }

  function handleTypeChange(slug) {
    const row = types.find((t) => t.slug === slug);
    onTypeChange(slug);
    onUiConfigChange(defaultUiConfig(row ?? slug, { ...uiConfig, type: slug }));
  }

  if (loading && !types.length) {
    return <p className="text-sm text-muted">Loading question types…</p>;
  }

  return (
    <div className="space-y-4 rounded-xl border border-violet-200/80 bg-violet-50/30 p-4 dark:border-violet-500/25 dark:bg-violet-500/5">
      <label className="block">
        <span className="auth-field-label">Question type</span>
        <select
          className="auth-input !pl-4 w-full text-sm"
          value={questionType}
          onChange={(e) => handleTypeChange(e.target.value)}
        >
          {types.map((t) => (
            <option key={t.id} value={t.slug}>
              {t.label} ({t.slug})
            </option>
          ))}
        </select>
      </label>

      {typeRow?.schema?.editor && (
        <p className="text-xs text-muted dark:text-slate-400">
          Editor: <span className="font-semibold text-ink dark:text-slate-200">{typeRow.schema.editor}</span>
        </p>
      )}

      <label className="block">
        <span className="auth-field-label">Title / header (optional)</span>
        <input
          className="auth-input !pl-4 w-full"
          value={uiConfig.title ?? ''}
          onChange={(e) => patch({ title: e.target.value })}
          placeholder="e.g. DRAG DROP"
        />
      </label>

      <ListField
        label="Instructions"
        items={uiConfig.instructions ?? []}
        placeholder="Instruction line"
        onChange={(instructions) =>
          patch({
            instructions,
            instruction_text: instructions.filter(Boolean).join('\n'),
          })
        }
      />

      {isDragDropType(types, questionType) && (
        <>
          <label className="block">
            <span className="auth-field-label">Code template (use {'{{drop_1}}'}, {'{{drop_2}}'}, …)</span>
            <p className="mb-1.5 text-xs text-muted dark:text-slate-500">
              Enter = new line · Tab = indent (saved as tab). Layout is shown exactly as typed.
            </p>
            <textarea
              className="auth-input !pl-4 min-h-[160px] w-full resize-y overflow-x-auto font-mono text-[13px] leading-[1.5] whitespace-pre [tab-size:4]"
              spellCheck={false}
              rows={10}
              value={uiConfig.answer_area?.template ?? uiConfig.template ?? ''}
              onKeyDown={(e) =>
                handleCodeTextareaKeyDown(e, (template) => {
                  onUiConfigChange(
                    patchDragDrop(uiConfig, {
                      template,
                      answer_area: {
                        ...uiConfig.answer_area,
                        template,
                        format: 'code',
                        language: uiConfig.answer_area?.language ?? 'csharp',
                      },
                    })
                  );
                })
              }
              onChange={(e) => {
                const template = e.target.value;
                onUiConfigChange(
                  patchDragDrop(uiConfig, {
                    template,
                    answer_area: {
                      ...uiConfig.answer_area,
                      template,
                      format: 'code',
                      language: uiConfig.answer_area?.language ?? 'csharp',
                    },
                  })
                );
              }}
            />
          </label>
          <DraggableItemsEditor
            items={uiConfig.draggable_items ?? uiConfig.items ?? []}
            onChange={(draggable_items) => onUiConfigChange(patchDragDrop(uiConfig, { draggable_items }))}
            onMove={(fromIndex, toIndex) => {
              const items = uiConfig.draggable_items ?? uiConfig.items ?? [];
              const zones = uiConfig.answer_area?.drop_zones ?? uiConfig.drop_zones ?? [];
              const { draggable_items, drop_zones } = moveDraggableItem(items, zones, fromIndex, toIndex);
              onUiConfigChange(
                patchDragDrop(uiConfig, {
                  draggable_items,
                  drop_zones,
                  answer_area: { ...uiConfig.answer_area, drop_zones },
                })
              );
            }}
          />
          <DropZonesEditor
            zones={uiConfig.answer_area?.drop_zones ?? uiConfig.drop_zones ?? []}
            items={uiConfig.draggable_items ?? uiConfig.items ?? []}
            onChange={(drop_zones) =>
              onUiConfigChange(
                patchDragDrop(uiConfig, {
                  drop_zones,
                  answer_area: { ...uiConfig.answer_area, drop_zones },
                })
              )
            }
          />
        </>
      )}

      {isHotAreaType(types, questionType) && (
        <ListField
          label="Hotspots (labels)"
          items={(uiConfig.hotspots ?? []).map((h) => (typeof h === 'string' ? h : h.label ?? ''))}
          placeholder="Hotspot label"
          onChange={(labels) =>
            patch({ hotspots: labels.filter(Boolean).map((label, i) => ({ id: `hot_${i + 1}`, label })) })
          }
        />
      )}

      {isFillBlankType(types, questionType) && (
        <label className="block">
          <span className="auth-field-label">Template with blanks</span>
          <textarea
            className="auth-input !pl-4 min-h-[72px] w-full resize-y"
            value={uiConfig.template ?? ''}
            onChange={(e) => patch({ template: e.target.value })}
          />
        </label>
      )}

      {!isChoicesType(types, questionType) &&
        !isDragDropType(types, questionType) &&
        !isHotAreaType(types, questionType) &&
        !isFillBlankType(types, questionType) && (
          <p className="text-xs text-muted dark:text-slate-400">
            Configure via schema JSON on the type, or use &quot;Auto-parse from text&quot;.
          </p>
        )}
    </div>
  );
}
