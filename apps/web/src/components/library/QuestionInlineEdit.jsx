import { useEffect, useState } from 'react';
import { ListChecks, Loader2, Plus, Sparkles, Trash2, X } from 'lucide-react';
import { questionsApi } from '../../api/client';
import { useQuestionTypes } from '../../context/QuestionTypesContext';
import { applyParsedUiConfig, getUiConfig } from '../../lib/examQuestionParser';
import {
  buildSavePayload,
  defaultUiConfig,
  getCorrectMode,
  isChoicesType,
  isDragDropType,
  resolveUiType,
  syncAnswerArea,
} from '../../lib/questionUiTypes';
import { apiQuestionToLocal, getQuestionExternalId } from '../../lib/questionUtils';
import { QuestionUiConfigEditor } from './QuestionUiConfigEditor';

function buildDraft(question, types) {
  const uiConfig = { ...getUiConfig(question), ...(question.uiConfig ?? {}) };
  const questionType = resolveUiType({ ...question, uiConfig }, types);
  const typeRow = types.find((t) => t.slug === questionType);
  const choices = [...(question.choices ?? uiConfig.choices ?? [])];
  if (isChoicesType(types, questionType) && !choices.length) {
    choices.push('');
  }
  const correct =
    question.correct?.length > 0 ? [...question.correct] : [...(uiConfig.correct_indices ?? [])];

  return {
    text: question.text ?? uiConfig.question_text ?? '',
    choices,
    correct,
    explanation: question.explanation ?? uiConfig.explanation ?? '',
    quizEligible: question.quizEligible !== false,
    questionType,
    uiConfig: defaultUiConfig(typeRow ?? questionType, uiConfig),
  };
}

export function QuestionInlineEdit({ certId, question, index, onCancel, onSaved }) {
  const { types, loading: typesLoading } = useQuestionTypes();
  const [draft, setDraft] = useState(() => buildDraft(question, types));
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (types.length) {
      setDraft(buildDraft(question, types));
      setError('');
    }
  }, [question, index, types]);

  function setChoiceText(choiceIndex, value) {
    setDraft((d) => {
      const choices = [...d.choices];
      choices[choiceIndex] = value;
      return { ...d, choices };
    });
  }

  function addChoice() {
    setDraft((d) => ({ ...d, choices: [...d.choices, ''] }));
  }

  function removeChoice(choiceIndex) {
    setDraft((d) => {
      const choices = d.choices.filter((_, i) => i !== choiceIndex);
      const correct = d.correct
        .filter((i) => i !== choiceIndex)
        .map((i) => (i > choiceIndex ? i - 1 : i));
      return { ...d, choices: choices.length ? choices : [''], correct };
    });
  }

  function toggleCorrect(choiceIndex) {
    setDraft((d) => {
      const single = getCorrectMode(types, d.questionType) === 'single';
      const has = d.correct.includes(choiceIndex);
      let correct;
      if (single) {
        correct = has ? [] : [choiceIndex];
      } else {
        correct = has
          ? d.correct.filter((i) => i !== choiceIndex)
          : [...d.correct, choiceIndex].sort((a, b) => a - b);
      }
      return { ...d, correct };
    });
  }

  function handleTypeChange(questionType) {
    const typeRow = types.find((t) => t.slug === questionType);
    setDraft((d) => ({
      ...d,
      questionType,
      uiConfig: defaultUiConfig(typeRow ?? questionType, { ...d.uiConfig, type: questionType }),
      quizEligible: typeRow?.schema?.quizEligibleDefault ?? d.quizEligible,
      choices: isChoicesType(types, questionType) && !d.choices.length ? [''] : d.choices,
    }));
  }

  function autoParse() {
    const parsed = applyParsedUiConfig({
      text: draft.text,
      explanation: draft.explanation,
      choices: draft.choices.filter((c) => c.trim()),
      correct: draft.correct,
      multiple: draft.correct.length > 1,
      uiConfig: draft.uiConfig,
    });
    const slug = parsed.uiConfig?.type;
    const typeRow = types.find((t) => t.slug === slug) ?? types[0];
    setDraft((d) => ({
      ...d,
      questionType: typeRow?.slug ?? slug ?? d.questionType,
      uiConfig: defaultUiConfig(typeRow ?? slug, parsed.uiConfig),
      choices: parsed.choices?.length ? parsed.choices : d.choices,
      correct: parsed.correct?.length ? parsed.correct : d.correct,
    }));
  }

  async function handleSave(e) {
    e.preventDefault();
    setError('');
    if (!draft.text.trim()) {
      setError('Question text is required.');
      return;
    }

    const choices = draft.choices.map((c) => c.trim()).filter(Boolean);
    const correct = draft.correct.filter((i) => i < choices.length);

    if (isChoicesType(types, draft.questionType)) {
      if (!choices.length) {
        setError('Add at least one choice.');
        return;
      }
      if (!correct.length) {
        setError('Mark at least one correct choice.');
        return;
      }
      if (getCorrectMode(types, draft.questionType) === 'single' && correct.length > 1) {
        setError('Single choice allows only one correct answer.');
        return;
      }
    }

    if (draft.quizEligible && isDragDropType(types, draft.questionType)) {
      const ui = syncAnswerArea(draft.uiConfig);
      const zones = ui.answer_area?.drop_zones ?? [];
      const items = ui.draggable_items ?? [];
      if (!zones.length) {
        setError('Add at least one drop zone in the answer area.');
        return;
      }
      for (const zone of zones) {
        if (!zone.correct_item_id || !items.some((it) => it.id === zone.correct_item_id)) {
          setError(`Pick the correct value for ${zone.id} from the Values list (e.g. item_1 → drop_1).`);
          return;
        }
      }
    } else if (draft.quizEligible) {
      if (!choices.length) {
        setError('Add at least one quiz answer choice.');
        return;
      }
      if (!correct.length) {
        setError('Mark at least one correct choice for the quiz.');
        return;
      }
    }

    const payload = buildSavePayload(draft, types);

    setSaving(true);
    try {
      const externalId = getQuestionExternalId(question, index);
      const updated = await questionsApi.update(certId, externalId, payload);
      onSaved(index, apiQuestionToLocal(updated));
      onCancel();
    } catch (err) {
      setError(err.message || 'Failed to save question.');
    } finally {
      setSaving(false);
    }
  }

  const isDragDrop = isDragDropType(types, draft.questionType);
  const showChoices = isChoicesType(types, draft.questionType) || (draft.quizEligible && !isDragDrop);

  function toggleQuizPool() {
    setDraft((d) => {
      const next = !d.quizEligible;
      const needsMcChoices =
        next && !isChoicesType(types, d.questionType) && !isDragDropType(types, d.questionType) && !d.choices.length;
      return {
        ...d,
        quizEligible: next,
        choices: needsMcChoices ? [''] : d.choices,
        correct: needsMcChoices ? [] : d.correct,
      };
    });
    setError('');
  }

  if (typesLoading && !types.length) {
    return (
      <div className="ml-10 mt-4 flex items-center gap-2 text-sm text-muted">
        <Loader2 size={16} className="animate-spin" />
        Loading question types…
      </div>
    );
  }

  return (
    <form
      className="ml-10 mt-4 space-y-4 rounded-2xl border border-accent-200/80 bg-accent-50/40 p-4 dark:border-accent-500/30 dark:bg-accent-500/5 sm:p-5"
      onSubmit={handleSave}
    >
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="text-xs font-bold uppercase tracking-wide text-accent-700 dark:text-accent-300">
          Editing question {index + 1}
        </p>
        <button type="button" className="secondary-button !py-1.5 text-xs" onClick={autoParse}>
          <Sparkles size={14} />
          Auto-parse from text
        </button>
      </div>

      <QuestionUiConfigEditor
        questionType={draft.questionType}
        uiConfig={draft.uiConfig}
        onTypeChange={handleTypeChange}
        onUiConfigChange={(uiConfig) => setDraft((d) => ({ ...d, uiConfig }))}
      />

      <label className="block">
        <span className="auth-field-label">Question text</span>
        <textarea
          className="auth-input !pl-4 min-h-[120px] resize-y"
          value={draft.text}
          onChange={(e) => setDraft((d) => ({ ...d, text: e.target.value }))}
          required
        />
      </label>

      <div className="flex flex-wrap items-center gap-2 rounded-xl border border-line/70 bg-white/60 p-3 dark:border-gh-border dark:bg-gh-subtle/40">
        <span className="text-xs font-semibold text-muted dark:text-slate-400">Quiz practice</span>
        {draft.quizEligible ? (
          <>
            <span className="inline-flex items-center gap-1 rounded-full bg-success-500/15 px-2.5 py-1 text-xs font-bold text-success-800 dark:text-success-200">
              <ListChecks size={14} />
              In quiz pool
            </span>
            <button type="button" className="secondary-button !py-1.5 text-xs" onClick={toggleQuizPool}>
              <X size={14} />
              Remove from quiz
            </button>
          </>
        ) : (
          <button type="button" className="primary-button !py-1.5 text-xs" onClick={toggleQuizPool}>
            <ListChecks size={14} />
            Add to quiz
          </button>
        )}
        {isDragDrop && draft.quizEligible && (
          <p className="w-full text-xs text-muted dark:text-slate-500">
            In Answer area — drop zones, pick the correct value from Values for each blank (e.g. drop_1 → item_1).
            Quiz uses drag-and-drop scoring, not multiple choice.
          </p>
        )}
        {!isChoicesType(types, draft.questionType) && !isDragDrop && draft.quizEligible && (
          <p className="w-full text-xs text-muted dark:text-slate-500">
            Add answer choices below for scored quiz.
          </p>
        )}
      </div>

      {showChoices && (
        <div>
          <span className="auth-field-label">
            {isChoicesType(types, draft.questionType) ? 'Answer choices' : 'Quiz answer choices'}
          </span>
          <div className="mt-2 space-y-2">
            {draft.choices.map((choice, choiceIndex) => (
              <div key={choiceIndex} className="flex items-start gap-2">
                <label className="mt-2.5 flex shrink-0 cursor-pointer items-center gap-1.5">
                  <input
                    type={getCorrectMode(types, draft.questionType) === 'single' ? 'radio' : 'checkbox'}
                    name={`correct-${index}`}
                    className="h-4 w-4 border-line accent-accent-500"
                    checked={draft.correct.includes(choiceIndex)}
                    onChange={() => toggleCorrect(choiceIndex)}
                    title="Mark as correct"
                  />
                  <span className="text-xs font-bold text-muted dark:text-slate-400">
                    {String.fromCharCode(65 + choiceIndex)}
                  </span>
                </label>
                <input
                  className="auth-input !pl-4 flex-1"
                  value={choice}
                  onChange={(e) => setChoiceText(choiceIndex, e.target.value)}
                  placeholder={`Choice ${String.fromCharCode(65 + choiceIndex)}`}
                />
                <button
                  type="button"
                  className="icon-button h-9 w-9 shrink-0"
                  onClick={() => removeChoice(choiceIndex)}
                  disabled={draft.choices.length <= 1}
                  aria-label="Remove choice"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
          <button type="button" className="secondary-button mt-2 !py-1.5 text-xs" onClick={addChoice}>
            <Plus size={14} />
            Add choice
          </button>
        </div>
      )}

      <label className="block">
        <span className="auth-field-label">Explanation (optional)</span>
        <textarea
          className="auth-input !pl-4 min-h-[80px] resize-y"
          value={draft.explanation}
          onChange={(e) => setDraft((d) => ({ ...d, explanation: e.target.value }))}
        />
      </label>

      {error && (
        <p className="auth-error" role="alert">
          {error}
        </p>
      )}

      <div className="flex flex-wrap gap-2">
        <button className="primary-button" type="submit" disabled={saving}>
          {saving ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              Saving…
            </>
          ) : (
            'Save'
          )}
        </button>
        <button className="ghost-button" type="button" onClick={onCancel} disabled={saving}>
          Cancel
        </button>
      </div>
    </form>
  );
}
