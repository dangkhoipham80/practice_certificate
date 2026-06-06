/** Helpers driven by question types loaded from the API (see QuestionTypesContext). */

import { isDragDropQuizReady, normalizeDragDropUiConfig } from './dragDropUiFormat.js';
import { normalizeHotAreaUiConfig } from './hotAreaUiFormat.js';

export function findQuestionType(types, slug) {
  return types.find((t) => t.slug === slug);
}

export function getEditorKind(types, slug) {
  return findQuestionType(types, slug)?.schema?.editor ?? 'generic';
}

export function isChoicesType(types, slug) {
  return getEditorKind(types, slug) === 'choices';
}

export function isDragDropType(types, slug) {
  return getEditorKind(types, slug) === 'drag_drop';
}

export function isHotAreaType(types, slug) {
  return getEditorKind(types, slug) === 'hot_area';
}

export function isFillBlankType(types, slug) {
  return getEditorKind(types, slug) === 'fill_blank';
}

export function getCorrectMode(types, slug) {
  return findQuestionType(types, slug)?.schema?.correctMode ?? 'multiple';
}

export function resolveUiType(question, types = []) {
  const fromConfig = question?.uiConfig?.type;
  if (fromConfig && (!types.length || findQuestionType(types, fromConfig))) return fromConfig;
  if (question?.questionTypeSlug && findQuestionType(types, question.questionTypeSlug)) {
    return question.questionTypeSlug;
  }
  if (question?.choices?.length) {
    const multi = types.find((t) => t.slug === 'multiple_choice');
    const single = types.find((t) => t.slug === 'single_choice');
    return question.multiple ? (multi?.slug ?? 'multiple_choice') : (single?.slug ?? 'single_choice');
  }
  const byKind = types.find((t) => t.legacyKind === question?.questionKind);
  if (byKind) return byKind.slug;
  return types[0]?.slug ?? 'drag_drop';
}

export function defaultUiConfig(typeRow, partial = {}) {
  const slug = typeof typeRow === 'string' ? typeRow : typeRow?.slug;
  const label = typeof typeRow === 'object' ? typeRow?.label : slug;
  return {
    type: slug,
    status: 'active',
    difficulty: null,
    category: null,
    title: label ?? slug,
    question_text: '',
    instruction_text: '',
    instructions: [],
    items: [],
    drop_zones: [],
    values: [],
    template: '',
    choices: [],
    correct_indices: [],
    images: [],
    explanation: '',
    answer_area: { content: '', targets: [] },
    ...partial,
  };
}

export function nextId(prefix, existing) {
  let n = existing.length + 1;
  let id = `${prefix}_${n}`;
  while (existing.some((row) => row.id === id)) {
    n += 1;
    id = `${prefix}_${n}`;
  }
  return id;
}

export function syncAnswerArea(uiConfig, types = [], slug) {
  const typeSlug = slug ?? uiConfig.type;
  if (types.length && isHotAreaType(types, typeSlug)) {
    return normalizeHotAreaUiConfig(uiConfig);
  }
  if (
    uiConfig.draggable_items?.length ||
    uiConfig.answer_area?.drop_zones?.length ||
    uiConfig.drop_zones?.length ||
    uiConfig.template?.includes('{{drop_')
  ) {
    return normalizeDragDropUiConfig(uiConfig);
  }
  const template = uiConfig.template ?? '';
  const zones = uiConfig.drop_zones ?? [];
  const items = uiConfig.items ?? [];
  const labelById = Object.fromEntries(items.map((it) => [it.id, it.label]));
  return normalizeDragDropUiConfig({
    ...uiConfig,
    values: items.map((it) => it.label).filter(Boolean),
    answer_area: {
      content: template,
      targets: zones.map((z) => ({
        id: z.id,
        type: 'drop',
        correct_answer: z.correct_answer ?? labelById[z.correct_item_id] ?? '',
      })),
    },
  });
}

/** Full question PATCH body — every editable field is sent so PostgreSQL is the source of truth. */
export function buildSavePayload(draft, types, baseQuestion = {}) {
  const slug = draft.questionType;
  const typeRow = findQuestionType(types, slug);
  const images = [...(draft.images ?? draft.uiConfig?.images ?? baseQuestion.images ?? [])].filter(Boolean);
  let uiConfig = syncAnswerArea(
    {
      ...draft.uiConfig,
      type: slug,
      question_text: draft.text.trim(),
      question: draft.text.trim(),
      explanation: draft.explanation.trim() || undefined,
      images,
    },
    types,
    slug,
  );

  const choices = draft.choices.map((c) => c.trim()).filter(Boolean);
  const correct = draft.correct.filter((i) => i < choices.length);

  if (isChoicesType(types, slug)) {
    uiConfig = {
      ...uiConfig,
      choices,
      correct_indices: correct,
      items: choices.map((label, i) => ({ id: `choice_${i + 1}`, label })),
    };
  } else if (draft.quizEligible && choices.length && !isDragDropType(types, slug)) {
    uiConfig = {
      ...uiConfig,
      choices,
      correct_indices: correct,
    };
  }

  const payload = {
    text: draft.text.trim(),
    explanation: draft.explanation.trim() || null,
    quizEligible: Boolean(draft.quizEligible),
    domainId: draft.domainId ?? null,
    topic: draft.topic != null && draft.topic !== '' ? String(draft.topic) : null,
    images,
    warn: draft.warn?.trim() ? draft.warn.trim() : null,
    uiConfig,
    choices: [],
    correct: [],
    multiple: false,
  };

  if (typeRow?.id) {
    payload.questionTypeId = typeRow.id;
  }

  if (isChoicesType(types, slug)) {
    payload.choices = choices;
    payload.correct = correct;
    payload.multiple = getCorrectMode(types, slug) === 'multiple' || correct.length > 1;
  } else if (isDragDropType(types, slug)) {
    payload.choices = [];
    payload.correct = [];
    payload.multiple = false;
  } else if (isHotAreaType(types, slug)) {
    payload.choices = [];
    payload.correct = [];
    payload.multiple = false;
  } else if (draft.quizEligible && choices.length) {
    payload.choices = choices;
    payload.correct = correct;
    payload.multiple = correct.length > 1;
  }

  return payload;
}
