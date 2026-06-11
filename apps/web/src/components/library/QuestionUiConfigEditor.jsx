import { useState } from 'react';
import { GripVertical, Plus, Trash2 } from 'lucide-react';
import { moveDraggableItem } from '../../lib/dragDropUiFormat';
import { normalizeHotAreaUiConfig } from '../../lib/hotAreaUiFormat';
import { useQuestionTypes } from '../../context/QuestionTypesContext';
import { normalizeDragDropUiConfig } from '../../lib/dragDropUiFormat';
import { AnswerAreaTemplateEditor } from './AnswerAreaTemplateEditor';
import {
  defaultUiConfig,
  isChoicesType,
  isDragDropType,
  isFillBlankType,
  isHotAreaType,
  isInlineDropdownType,
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
  const [dragIndex, setDragIndex] = useState(null);
  const [overIndex, setOverIndex] = useState(null);

  function endDrag() {
    setDragIndex(null);
    setOverIndex(null);
  }

  function handleDrop(toIndex, e) {
    e.preventDefault();
    const fromIndex = dragIndex ?? Number(e.dataTransfer.getData('text/plain'));
    if (Number.isFinite(fromIndex) && fromIndex !== toIndex) {
      onMove(fromIndex, toIndex);
    }
    endDrag();
  }

  return (
    <div>
      <span className="auth-field-label">Values (draggable items)</span>
      <p className="mt-1 text-xs text-muted dark:text-slate-500">
        Drag a row by the grip to reorder. IDs update to match position (item_1 = first row).
      </p>
      <div className="mt-2 space-y-2">
        {items.map((item, i) => (
          <div
            key={item.id}
            className={[
              'flex flex-wrap items-center gap-2 rounded-lg border px-2 py-1.5 transition-colors',
              dragIndex === i ? 'opacity-50' : '',
              overIndex === i && dragIndex !== i
                ? 'border-accent-400 bg-accent-50/60 dark:border-accent-500/50 dark:bg-accent-500/10'
                : 'border-line/50 dark:border-gh-border/60',
            ].join(' ')}
            onDragOver={(e) => {
              e.preventDefault();
              e.dataTransfer.dropEffect = 'move';
              setOverIndex(i);
            }}
            onDragLeave={() => setOverIndex((current) => (current === i ? null : current))}
            onDrop={(e) => handleDrop(i, e)}
          >
            <span className="w-16 shrink-0 font-mono text-xs text-muted">{item.id}</span>
            <span
              draggable
              title="Drag to reorder"
              aria-label={`Drag ${item.id} to reorder`}
              className="flex h-9 w-8 shrink-0 cursor-grab items-center justify-center rounded-md text-muted active:cursor-grabbing hover:bg-subtle/80 dark:hover:bg-gh-subtle"
              onDragStart={(e) => {
                setDragIndex(i);
                e.dataTransfer.setData('text/plain', String(i));
                e.dataTransfer.effectAllowed = 'move';
              }}
              onDragEnd={endDrag}
            >
              <GripVertical size={16} />
            </span>
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

function patchHotArea(uiConfig, partial) {
  return normalizeHotAreaUiConfig({ ...uiConfig, ...partial });
}

function HotspotsEditor({ hotspots, onChange }) {
  return (
    <div>
      <span className="auth-field-label">Answer area — hotspots (dropdown options per blank)</span>
      <div className="mt-2 space-y-4">
        {hotspots.map((zone, zoneIndex) => (
          <div
            key={zone.id}
            className="rounded-xl border border-line/70 bg-white/60 p-3 dark:border-gh-border dark:bg-gh-subtle/40"
          >
            <div className="mb-2 flex flex-wrap items-center gap-2">
              <span className="font-mono text-xs font-semibold text-muted">{zone.id}</span>
              <input
                className="auth-input !pl-3 min-w-0 flex-1 text-xs"
                value={zone.placeholder ?? ''}
                placeholder="Placeholder label"
                onChange={(e) => {
                  const next = hotspots.map((row, j) =>
                    j === zoneIndex ? { ...row, placeholder: e.target.value } : row,
                  );
                  onChange(next);
                }}
              />
              <button
                type="button"
                className="icon-button h-9 w-9 shrink-0"
                aria-label="Remove hotspot"
                onClick={() => onChange(hotspots.filter((_, j) => j !== zoneIndex))}
              >
                <Trash2 size={16} />
              </button>
            </div>
            <div className="space-y-2">
              {(zone.options ?? []).map((opt, optIndex) => (
                <div key={opt.id} className="flex flex-wrap items-center gap-2">
                  <input
                    type="radio"
                    name={`correct-${zone.id}`}
                    className="h-4 w-4 shrink-0 accent-accent-500"
                    checked={zone.correct_option_id === opt.id}
                    title="Mark as correct"
                    onChange={() => {
                      const next = hotspots.map((row, j) =>
                        j === zoneIndex
                          ? {
                              ...row,
                              correct_option_id: opt.id,
                              correct_answer: opt.label,
                            }
                          : row,
                      );
                      onChange(next);
                    }}
                  />
                  <span className="w-14 shrink-0 font-mono text-[10px] text-muted">{opt.id}</span>
                  <input
                    className="auth-input !pl-3 min-w-0 flex-1 text-sm font-mono"
                    value={opt.label}
                    placeholder="Option label"
                    onChange={(e) => {
                      const label = e.target.value;
                      const nextOptions = (zone.options ?? []).map((row, k) =>
                        k === optIndex ? { ...row, label } : row,
                      );
                      const next = hotspots.map((row, j) => {
                        if (j !== zoneIndex) return row;
                        const updated = { ...row, options: nextOptions };
                        if (row.correct_option_id === opt.id) {
                          updated.correct_answer = label;
                        }
                        return updated;
                      });
                      onChange(next);
                    }}
                  />
                  <button
                    type="button"
                    className="icon-button h-9 w-9 shrink-0"
                    aria-label="Remove option"
                    onClick={() => {
                      const nextOptions = (zone.options ?? []).filter((_, k) => k !== optIndex);
                      const next = hotspots.map((row, j) => {
                        if (j !== zoneIndex) return row;
                        const cleared =
                          row.correct_option_id === opt.id
                            ? { correct_option_id: null, correct_answer: null }
                            : {};
                        return { ...row, ...cleared, options: nextOptions };
                      });
                      onChange(next);
                    }}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
            <button
              type="button"
              className="secondary-button mt-2 !py-1.5 text-xs"
              onClick={() => {
                const options = zone.options ?? [];
                const next = hotspots.map((row, j) =>
                  j === zoneIndex
                    ? {
                        ...row,
                        options: [...options, { id: nextId('opt', options), label: '' }],
                      }
                    : row,
                );
                onChange(next);
              }}
            >
              <Plus size={14} />
              Add option
            </button>
          </div>
        ))}
      </div>
      <button
        type="button"
        className="secondary-button mt-2 !py-1.5 text-xs"
        onClick={() =>
          onChange([
            ...hotspots,
            {
              id: `drop_${hotspots.length + 1}`,
              placeholder: `Hotspot ${hotspots.length + 1}`,
              options: [
                { id: 'opt_1', label: '' },
                { id: 'opt_2', label: '' },
              ],
              correct_option_id: null,
              correct_answer: null,
            },
          ])
        }
      >
        <Plus size={14} />
        Add hotspot
      </button>
    </div>
  );
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
          <AnswerAreaTemplateEditor
            uiConfig={uiConfig}
            patchDragDrop={patchDragDrop}
            onUiConfigChange={onUiConfigChange}
          />
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
        <>
          {isInlineDropdownType(types, questionType) ? (
            <p className="rounded-lg border border-violet-200/70 bg-white/60 px-3 py-2 text-xs text-muted dark:border-violet-500/25 dark:bg-gh-subtle/40 dark:text-slate-400">
              Put <code>{'{{drop_1}}'}</code>, <code>{'{{drop_2}}'}</code>, ... directly in Question text.
              Each token uses the hotspot with the same ID below.
            </p>
          ) : (
            <AnswerAreaTemplateEditor
              uiConfig={uiConfig}
              patchUiConfig={patchHotArea}
              onUiConfigChange={onUiConfigChange}
            />
          )}
          <HotspotsEditor
            hotspots={uiConfig.answer_area?.hotspots ?? uiConfig.hotspots ?? []}
            onChange={(hotspots) =>
              onUiConfigChange(
                patchHotArea(uiConfig, {
                  hotspots,
                  answer_area: { ...uiConfig.answer_area, hotspots },
                }),
              )
            }
          />
        </>
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
