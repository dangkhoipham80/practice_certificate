/** Canonical drag-and-drop / code-completion UI shape (values left, answer area right). */

import { preserveCodeTemplate } from './codeTemplateFormat.js';

const DROP_TOKEN_RE = /\{\{drop_(\d+)\}\}/g;
const LEGACY_BLANK_RE = /____+/g;

export function detectCodeLanguage(snippet = '') {
  if (/^\s*</.test(snippet) || snippet.includes('</')) return 'xml';
  if (/\bawait\s+/.test(snippet) || /\bvar\s+\w+\s*=/.test(snippet)) return 'csharp';
  if (/=>|function\s*\(/.test(snippet)) return 'javascript';
  if (/^\s*SELECT\b/i.test(snippet)) return 'sql';
  if (/^\s*def\s+\w+/.test(snippet) || /\bimport\s+\w+/.test(snippet)) return 'python';
  return 'plain';
}

export function tokenizeBlanks(rawTemplate, zoneCount) {
  let template = rawTemplate ?? '';
  const count = zoneCount || (template.match(LEGACY_BLANK_RE) || []).length || 1;
  let index = 0;
  template = template.replace(LEGACY_BLANK_RE, () => {
    index += 1;
    return `{{drop_${index}}}`;
  });
  if (!DROP_TOKEN_RE.test(template) && count > 0) {
    const parts = template.split(/\s+/).length ? [template] : [''];
    if (!template.trim()) {
      template = Array.from({ length: count }, (_, i) => `{{drop_${i + 1}}}`).join(' ');
    }
  }
  return template;
}

/** Move a value row; renumber item_1…n and remap drop-zone answers by label. */
export function moveDraggableItem(items, zones, fromIndex, toIndex) {
  if (toIndex < 0 || toIndex >= items.length || fromIndex === toIndex) {
    return { draggable_items: items, drop_zones: zones };
  }
  const labelByOldId = Object.fromEntries(items.map((it) => [it.id, it.label]));
  const next = [...items];
  const [moved] = next.splice(fromIndex, 1);
  next.splice(toIndex, 0, moved);
  const draggable_items = next.map((it, i) => ({ ...it, id: `item_${i + 1}` }));
  const idByLabel = Object.fromEntries(
    draggable_items.filter((it) => it.label?.trim()).map((it) => [it.label.trim(), it.id])
  );
  const drop_zones = (zones ?? []).map((z) => {
    const label =
      z.correct_item_label?.trim() ||
      (z.correct_item_id ? labelByOldId[z.correct_item_id]?.trim() : null) ||
      null;
    const correct_item_id = label ? idByLabel[label] ?? null : null;
    return {
      ...z,
      correct_item_id,
      correct_item_label: label || null,
      correct_answer: label || null,
    };
  });
  return { draggable_items, drop_zones };
}

export function buildDraggableItems(labels, existing = []) {
  const items = [];
  const seen = new Set();
  labels.forEach((label, i) => {
    const trimmed = String(label).trim();
    if (!trimmed || seen.has(trimmed)) return;
    seen.add(trimmed);
    const prior = existing.find((it) => it.label === trimmed);
    items.push(prior ?? { id: `item_${items.length + 1}`, label: trimmed });
  });
  return items;
}

export function buildDropZonesFromBoxes(boxes, template) {
  const tokenMatches = [...template.matchAll(DROP_TOKEN_RE)];
  const blankCount = tokenMatches.length || (template.match(LEGACY_BLANK_RE) || []).length || boxes.length;
  const zones = [];
  for (let i = 0; i < Math.max(blankCount, boxes.length); i++) {
    const box = boxes[i];
    const id = `drop_${i + 1}`;
    zones.push({
      id,
      placeholder: `Blank ${i + 1}`,
      correct_item_label: box?.value ?? null,
      correct_item_id: box ? `item_${i + 1}` : null,
      label: `Blank ${i + 1}`,
      correct_answer: box?.value ?? null,
    });
  }
  return zones;
}

/**
 * Build canonical drag-drop UI block from parser inputs.
 */
export function buildDragDropUiConfig({
  title = 'DRAG DROP',
  questionText = '',
  instructions = [],
  explanation = '',
  snippet = '',
  boxes = [],
  valueLabels = [],
  uiType = 'drag_drop',
  images = [],
}) {
  const draggable_items = buildDraggableItems(
    [...valueLabels, ...boxes.map((b) => b.value)],
    []
  );
  const rawTemplate =
    snippet ||
    (boxes.length >= 2
      ? `var phraselistId = await client.Features.____\n(appId, versionId, new ____\n{\n\tEnabledForAllModels = false,\n\tIsExchangeable = true,\n\tName = "PL1",\n\tPhrases = "item1,item2,item3,item4,item5"\n});`
      : '');
  const template = tokenizeBlanks(rawTemplate, boxes.length || 2);
  const drop_zones = buildDropZonesFromBoxes(boxes, template);

  const answer_area = {
    format: uiType === 'code_completion' || /var\s+|await\s+/.test(rawTemplate) ? 'code' : 'text',
    language: detectCodeLanguage(rawTemplate),
    template,
    text_template: '',
    drop_zones,
    content: template,
    targets: drop_zones.map((z) => ({
      id: z.id,
      type: 'drop',
      correct_answer: z.correct_item_label,
    })),
  };

  return {
    type: uiType === 'code_completion' ? 'code_completion' : uiType === 'ordering' ? 'ordering' : 'drag_drop',
    title,
    question_text: questionText,
    question: questionText,
    instructions,
    instruction_text: instructions.filter(Boolean).join('\n'),
    draggable_items,
    items: draggable_items,
    values: draggable_items.map((it) => it.label),
    drop_zones,
    template,
    answer_area,
    images,
    explanation: explanation || undefined,
    status: 'active',
    difficulty: null,
    category: null,
  };
}

/** Normalize legacy uiConfig to canonical drag-drop shape (additive). */
export function normalizeDragDropUiConfig(uiConfig = {}) {
  const draggable_items =
    uiConfig.draggable_items?.length > 0
      ? uiConfig.draggable_items
      : buildDraggableItems(
          [
            ...(uiConfig.items ?? []).map((it) => it.label),
            ...(uiConfig.values ?? []),
          ],
          uiConfig.items ?? []
        );

  const legacyZones = uiConfig.drop_zones ?? uiConfig.answer_area?.targets ?? [];
  const templateRaw =
    uiConfig.answer_area?.template ??
    uiConfig.template ??
    uiConfig.answer_area?.content ??
    '';
  const template = tokenizeBlanks(templateRaw, legacyZones.length);

  const labelByItemId = Object.fromEntries(draggable_items.map((it) => [it.id, it.label]));

  const drop_zones = (uiConfig.answer_area?.drop_zones ?? legacyZones).map((z, i) => {
    const id = z.id?.startsWith('drop_') ? z.id : z.id?.replace('zone_', 'drop_') ?? `drop_${i + 1}`;
    let correct_item_id = z.correct_item_id ?? null;
    let correct_item_label =
      z.correct_item_label ??
      z.correct_answer ??
      (correct_item_id ? labelByItemId[correct_item_id] : null) ??
      null;
    if (!correct_item_id && correct_item_label) {
      const match = draggable_items.find((it) => it.label === correct_item_label);
      correct_item_id = match?.id ?? null;
    }
    if (correct_item_id && !correct_item_label) {
      correct_item_label = labelByItemId[correct_item_id] ?? null;
    }
    return {
      id,
      placeholder: z.placeholder ?? z.label ?? `Blank ${i + 1}`,
      correct_item_label,
      correct_item_id,
      label: z.label ?? z.placeholder ?? `Blank ${i + 1}`,
      correct_answer: correct_item_label,
    };
  });

  const rawFormat = uiConfig.answer_area?.format;
  const inferredCode = /var\s+|await\s+/.test(templateRaw);
  const format =
    rawFormat === 'code' || rawFormat === 'text' || rawFormat === 'both'
      ? rawFormat
      : inferredCode
        ? 'code'
        : 'text';

  const language =
    uiConfig.answer_area?.language && uiConfig.answer_area.language !== 'text'
      ? uiConfig.answer_area.language
      : detectCodeLanguage(templateRaw);

  let codeTemplate = '';
  let textTemplate = uiConfig.answer_area?.text_template ?? '';
  if (format === 'text') {
    textTemplate = textTemplate || templateRaw;
  } else if (format === 'both') {
    codeTemplate = uiConfig.answer_area?.template ?? templateRaw;
    textTemplate = textTemplate || '';
  } else {
    codeTemplate = uiConfig.answer_area?.template ?? templateRaw;
  }

  const preservedCode =
    format === 'code' || format === 'both'
      ? preserveCodeTemplate(codeTemplate)
      : '';
  const preservedText = format === 'text' || format === 'both' ? textTemplate : '';
  const topLevelTemplate = format === 'text' ? preservedText : preservedCode;

  const answer_area = {
    format,
    language,
    template: preservedCode,
    text_template: preservedText,
    drop_zones,
    content: topLevelTemplate,
    targets: drop_zones.map((z) => ({
      id: z.id,
      type: 'drop',
      correct_answer: z.correct_item_label,
    })),
  };

  return {
    ...uiConfig,
    draggable_items,
    items: draggable_items,
    values: draggable_items.map((it) => it.label),
    drop_zones,
    template: topLevelTemplate,
    answer_area,
  };
}

/** All drop zones have a correct draggable item selected by id. */
export function isDragDropQuizReady(uiConfig = {}) {
  const ui = normalizeDragDropUiConfig(uiConfig);
  const zones = ui.answer_area?.drop_zones ?? [];
  const items = ui.draggable_items ?? [];
  if (!zones.length || !items.length) return false;
  return zones.every((z) => z.correct_item_id && items.some((it) => it.id === z.correct_item_id));
}

/** Correct placement keyed by drop zone id (labels from item ids). */
export function getDragDropCorrectFilled(uiConfig = {}) {
  const ui = normalizeDragDropUiConfig(uiConfig);
  const labelById = Object.fromEntries((ui.draggable_items ?? []).map((it) => [it.id, it.label]));
  const filled = {};
  for (const z of ui.answer_area?.drop_zones ?? []) {
    if (z.correct_item_id && labelById[z.correct_item_id]) {
      filled[z.id] = labelById[z.correct_item_id];
    }
  }
  return filled;
}

export function dragDropFilledComplete(userFilled = {}, uiConfig = {}) {
  const ui = normalizeDragDropUiConfig(uiConfig);
  const zones = ui.answer_area?.drop_zones ?? [];
  return zones.length > 0 && zones.every((z) => userFilled[z.id]);
}

export function gradeDragDropFilled(userFilled = {}, uiConfig = {}) {
  const correct = getDragDropCorrectFilled(uiConfig);
  const zoneIds = Object.keys(correct);
  if (!zoneIds.length) return false;
  return zoneIds.every((id) => userFilled[id] === correct[id]);
}

export function splitTemplateParts(template) {
  const parts = [];
  let last = 0;
  const re = new RegExp(DROP_TOKEN_RE.source, 'g');
  let m;
  while ((m = re.exec(template))) {
    if (m.index > last) parts.push({ kind: 'text', value: template.slice(last, m.index) });
    parts.push({ kind: 'drop', id: `drop_${m[1]}` });
    last = m.index + m[0].length;
  }
  if (last < template.length) parts.push({ kind: 'text', value: template.slice(last) });
  if (!parts.length && template) parts.push({ kind: 'text', value: template });
  return parts;
}
