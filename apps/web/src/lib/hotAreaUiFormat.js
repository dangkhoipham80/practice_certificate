/** Canonical hotspot / dropdown-in-code UI shape (answer area with inline selects). */

import { preserveCodeTemplate } from './codeTemplateFormat.js';
import {
  detectCodeLanguage,
  tokenizeBlanks,
} from './dragDropUiFormat.js';

const DROP_TOKEN_RE = /\{\{drop_(\d+)\}\}/g;

export function buildHotspotOptions(labels, existing = []) {
  const options = [];
  const seen = new Set();
  labels.forEach((label) => {
    const trimmed = String(label).trim();
    if (!trimmed || seen.has(trimmed)) return;
    seen.add(trimmed);
    const prior = existing.find((opt) => opt.label === trimmed);
    options.push(prior ?? { id: `opt_${options.length + 1}`, label: trimmed });
  });
  return options;
}

function optionLabelById(options = []) {
  return Object.fromEntries(options.map((opt) => [opt.id, opt.label]));
}

function resolveCorrectOption(zone, options) {
  const labelById = optionLabelById(options);
  let correct_option_id = zone.correct_option_id ?? null;
  let correct_answer =
    zone.correct_answer ??
    zone.correct_item_label ??
    (correct_option_id ? labelById[correct_option_id] : null) ??
    null;

  if (!correct_option_id && correct_answer) {
    const match = options.find((opt) => opt.label === correct_answer);
    correct_option_id = match?.id ?? null;
  }
  if (correct_option_id && !correct_answer) {
    correct_answer = labelById[correct_option_id] ?? null;
  }
  return { correct_option_id, correct_answer };
}

/** Build hotspot zones from template tokens + explanation boxes. */
export function buildHotspotsFromBoxes(boxes, template, allLabels = []) {
  const tokenMatches = [...template.matchAll(DROP_TOKEN_RE)];
  const blankCount = tokenMatches.length || boxes.length || 1;
  const sharedLabels = [...new Set([...allLabels, ...boxes.map((b) => b.value)])].filter(Boolean);
  const hotspots = [];

  for (let i = 0; i < Math.max(blankCount, boxes.length); i++) {
    const box = boxes[i];
    const id = `drop_${i + 1}`;
    const boxLabels = box?.value ? [box.value, ...sharedLabels.filter((l) => l !== box.value)] : sharedLabels;
    const options = buildHotspotOptions(boxLabels.length ? boxLabels : [`Option 1`, `Option 2`]);
    const correct_answer = box?.value ?? null;
    const match = options.find((opt) => opt.label === correct_answer);
    hotspots.push({
      id,
      placeholder: `Hotspot ${i + 1}`,
      options,
      correct_option_id: match?.id ?? null,
      correct_answer,
    });
  }
  return hotspots;
}

export function buildHotAreaUiConfig({
  title = 'HOTSPOT',
  questionText = '',
  instructions = [],
  explanation = '',
  snippet = '',
  boxes = [],
  valueLabels = [],
  images = [],
}) {
  const rawTemplate =
    snippet ||
    (boxes.length >= 2
      ? `var audioFormat = {{drop_1}}(AudioStreamContainerFormat.MP3);\nusing (var recognizer = new {{drop_2}}(speechConfig, audioConfig))\n{\n\tvar result = await recognizer.RecognizeOnceAsync();\n}`
      : '');
  const template = tokenizeBlanks(rawTemplate, boxes.length || 2);
  const hotspots = buildHotspotsFromBoxes(boxes, template, valueLabels);

  const answer_area = {
    format: /var\s+|await\s+/.test(rawTemplate) ? 'code' : 'text',
    language: detectCodeLanguage(rawTemplate),
    template,
    text_template: '',
    hotspots,
    content: template,
    targets: hotspots.map((z) => ({
      id: z.id,
      type: 'select',
      correct_answer: z.correct_answer,
    })),
  };

  return {
    type: 'hot_area',
    title,
    question_text: questionText,
    question: questionText,
    instructions,
    instruction_text: instructions.filter(Boolean).join('\n'),
    hotspots,
    template,
    answer_area,
    images,
    explanation: explanation || undefined,
    status: 'active',
    difficulty: null,
    category: null,
  };
}

function normalizeZoneOptions(zone, zoneIndex) {
  if (zone.options?.length > 0) {
    return zone.options.map((opt, i) => {
      if (typeof opt === 'string') {
        return { id: `opt_${i + 1}`, label: opt };
      }
      return {
        id: opt.id ?? `opt_${i + 1}`,
        label: opt.label ?? '',
      };
    });
  }
  return buildHotspotOptions(
    [
      zone.correct_answer,
      zone.correct_item_label,
      ...(zone.labels ?? []),
      ...(zone.values ?? []),
    ].filter(Boolean),
    zone.options ?? [],
  );
}

/** Normalize legacy uiConfig to canonical hotspot shape. */
export function normalizeHotAreaUiConfig(uiConfig = {}) {
  const legacyHotspots = uiConfig.hotspots ?? uiConfig.answer_area?.hotspots ?? [];
  const templateRaw =
    uiConfig.answer_area?.template ??
    uiConfig.template ??
    uiConfig.answer_area?.content ??
    '';
  const template = tokenizeBlanks(templateRaw, legacyHotspots.length);

  const hotspots = legacyHotspots.map((zone, i) => {
    const id = zone.id?.startsWith('drop_') ? zone.id : zone.id?.replace('zone_', 'drop_') ?? `drop_${i + 1}`;
    const options = normalizeZoneOptions(zone, i);
    const { correct_option_id, correct_answer } = resolveCorrectOption(zone, options);
    return {
      id,
      placeholder: zone.placeholder ?? zone.label ?? `Hotspot ${i + 1}`,
      options,
      correct_option_id,
      correct_answer,
    };
  });

  if (!hotspots.length && template.includes('{{drop_')) {
    const inferred = buildHotspotsFromBoxes([], template, []);
    hotspots.push(...inferred);
  }

  const rawFormat = uiConfig.answer_area?.format;
  const inferredCode = /var\s+|await\s+|using\s*\(|new\s+\w/.test(templateRaw);
  let format =
    rawFormat === 'code' || rawFormat === 'text' || rawFormat === 'both'
      ? rawFormat
      : inferredCode
        ? 'code'
        : 'text';

  if (format === 'text' && inferredCode) {
    format = 'code';
  }

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
    format === 'code' || format === 'both' ? preserveCodeTemplate(codeTemplate) : '';
  const preservedText = format === 'text' || format === 'both' ? textTemplate : '';
  const topLevelTemplate = format === 'text' ? preservedText : preservedCode;

  const answer_area = {
    format,
    language,
    template: preservedCode,
    text_template: preservedText,
    hotspots,
    content: topLevelTemplate,
    targets: hotspots.map((z) => ({
      id: z.id,
      type: 'select',
      correct_answer: z.correct_answer,
    })),
  };

  return {
    ...uiConfig,
    hotspots,
    template: topLevelTemplate,
    answer_area,
  };
}

export function isHotAreaQuizReady(uiConfig = {}) {
  const ui = normalizeHotAreaUiConfig(uiConfig);
  const zones = ui.answer_area?.hotspots ?? [];
  if (!zones.length) return false;
  return zones.every(
    (z) =>
      z.options?.length > 0 &&
      z.correct_option_id &&
      z.options.some((opt) => opt.id === z.correct_option_id),
  );
}

export function getHotAreaCorrectFilled(uiConfig = {}) {
  const ui = normalizeHotAreaUiConfig(uiConfig);
  const filled = {};
  for (const z of ui.answer_area?.hotspots ?? []) {
    const label = z.options?.find((opt) => opt.id === z.correct_option_id)?.label;
    if (label) filled[z.id] = label;
  }
  return filled;
}

export function hotAreaFilledComplete(userFilled = {}, uiConfig = {}) {
  const ui = normalizeHotAreaUiConfig(uiConfig);
  const zones = ui.answer_area?.hotspots ?? [];
  return zones.length > 0 && zones.every((z) => userFilled[z.id]);
}

export function gradeHotAreaFilled(userFilled = {}, uiConfig = {}) {
  const correct = getHotAreaCorrectFilled(uiConfig);
  const zoneIds = Object.keys(correct);
  if (!zoneIds.length) return false;
  return zoneIds.every((id) => userFilled[id] === correct[id]);
}
