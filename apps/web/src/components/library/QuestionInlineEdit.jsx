import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { AlertTriangle, ListChecks, Loader2, Plus, RefreshCw, Sparkles, Trash2, X } from 'lucide-react';
import { questionsApi, taxonomyApi } from '../../api/client';
import { useCertContext } from '../../context/CertContext';
import { useQuestionTypes } from '../../context/QuestionTypesContext';
import { applyParsedUiConfig, getUiConfig } from '../../lib/examQuestionParser';
import {
  buildSavePayload,
  defaultUiConfig,
  getCorrectMode,
  isChoicesType,
  isDragDropType,
  isHotAreaType,
  resolveUiType,
  syncAnswerArea,
} from '../../lib/questionUiTypes';
import { getQuestionExternalId } from '../../lib/questionUtils';
import { useCertTaxonomy } from '../../hooks/useCertTaxonomy';
import { isValidDomainSlug, slugifyDomainTitle } from '../../lib/domainSlug';
import { formatQuizDomainLabel } from '../../lib/quizDomains';
import { normalizeDragDropUiConfig } from '../../lib/dragDropUiFormat';
import { normalizeHotAreaUiConfig } from '../../lib/hotAreaUiFormat';
import { ExplanationText } from '../shared/ExplanationText';
import { QuestionUiConfigEditor } from './QuestionUiConfigEditor';
import { DragDropQuestion } from './questionTypes/DragDropQuestion';
import { HotAreaQuestion } from './questionTypes/HotAreaQuestion';

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
    domainId: question.domainId ?? null,
    topic: question.topic ?? null,
    images: [...(question.images ?? uiConfig.images ?? [])],
    warn: question.warn ?? null,
    questionType,
    uiConfig: defaultUiConfig(typeRow ?? questionType, uiConfig),
  };
}

export function QuestionInlineEdit({
  certId,
  question,
  index,
  onCancel,
  onRefresh,
  mode = 'edit',
  onCreated,
}) {
  const { reloadCertQuestions, questionsSource } = useCertContext();
  const { types, loading: typesLoading } = useQuestionTypes();
  const { domains, domainLabelMap, loading: taxonomyLoading, addDomain } = useCertTaxonomy(certId);
  const [draft, setDraft] = useState(() => buildDraft(question, types));
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [showNewDomain, setShowNewDomain] = useState(false);
  const [newDomainTitle, setNewDomainTitle] = useState('');
  const [newDomainSlug, setNewDomainSlug] = useState('');
  const [creatingDomain, setCreatingDomain] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const explanationRef = useRef(null);

  useLayoutEffect(() => {
    const el = explanationRef.current;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = `${el.scrollHeight}px`;
  }, [draft.explanation, index, types.length]);

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

  function validateDraft() {
    if (!draft.text.trim()) {
      return 'Question text is required.';
    }
    const choices = draft.choices.map((c) => c.trim()).filter(Boolean);
    const correct = draft.correct.filter((i) => i < choices.length);

    if (isChoicesType(types, draft.questionType)) {
      if (!choices.length) return 'Add at least one choice.';
      if (!correct.length) return 'Mark at least one correct choice.';
      if (getCorrectMode(types, draft.questionType) === 'single' && correct.length > 1) {
        return 'Single choice allows only one correct answer.';
      }
    }

    if (draft.warn != null && !draft.warn.trim()) {
      return 'Enter a warning note explaining why this question is flagged, or uncheck Mark as warning.';
    }

    if (draft.quizEligible && isDragDropType(types, draft.questionType)) {
      const ui = syncAnswerArea(draft.uiConfig, types, draft.questionType);
      const zones = ui.answer_area?.drop_zones ?? [];
      const items = ui.draggable_items ?? [];
      if (!zones.length) return 'Add at least one drop zone in the answer area.';
      for (const zone of zones) {
        if (!zone.correct_item_id || !items.some((it) => it.id === zone.correct_item_id)) {
          return `Pick the correct value for ${zone.id} from the Values list (e.g. item_1 → drop_1).`;
        }
      }
    } else if (draft.quizEligible && isHotAreaType(types, draft.questionType)) {
      const ui = syncAnswerArea(draft.uiConfig, types, draft.questionType);
      const hotspots = ui.answer_area?.hotspots ?? [];
      if (!hotspots.length) return 'Add at least one hotspot in the answer area.';
      for (const zone of hotspots) {
        if (!zone.options?.length) return `Add dropdown options for ${zone.id}.`;
        if (!zone.correct_option_id || !zone.options.some((opt) => opt.id === zone.correct_option_id)) {
          return `Mark the correct dropdown option for ${zone.id}.`;
        }
      }
    } else if (
      draft.quizEligible &&
      !isDragDropType(types, draft.questionType) &&
      !isHotAreaType(types, draft.questionType)
    ) {
      if (!choices.length) return 'Add at least one quiz answer choice.';
      if (!correct.length) return 'Mark at least one correct choice for the quiz.';
    }
    return null;
  }

  async function persistQuestionToDb(draftState) {
    if (questionsSource !== 'api') {
      throw new Error(
        'Questions are loaded from the bundled copy. Start the API, run migrate:questions, then reload — edits only persist in PostgreSQL.',
      );
    }
    const payload = buildSavePayload(draftState, types, question);
    if (mode === 'create') {
      const created = await questionsApi.create(certId, payload);
      await reloadCertQuestions(certId);
      return created;
    }
    const externalId = getQuestionExternalId(question, index);
    await questionsApi.update(certId, externalId, payload);
    await reloadCertQuestions(certId);
  }

  async function handleSave(e) {
    e.preventDefault();
    setError('');
    const validationError = validateDraft();
    if (validationError) {
      setError(validationError);
      return;
    }

    setSaving(true);
    try {
      const created = await persistQuestionToDb(draft);
      if (onRefresh) await onRefresh();
      if (mode === 'create' && onCreated) onCreated(created);
    } catch (err) {
      setError(err.message || 'Failed to save question.');
    } finally {
      setSaving(false);
    }
  }

  async function handleRefresh() {
    if (!onRefresh) return;
    setRefreshing(true);
    setError('');
    try {
      await onRefresh();
      document.getElementById(`question-edit-${index}`)?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    } catch (err) {
      setError(err.message || 'Failed to refresh question.');
    } finally {
      setRefreshing(false);
    }
  }

  const isDragDrop = isDragDropType(types, draft.questionType);
  const isHotArea = isHotAreaType(types, draft.questionType);
  const isStructured = isDragDrop || isHotArea;
  const showChoices = isChoicesType(types, draft.questionType) || (draft.quizEligible && !isStructured);

  function handleNewDomainTitleChange(value) {
    setNewDomainTitle(value);
    setNewDomainSlug((slug) => {
      if (!slug.trim() || slug === slugifyDomainTitle(newDomainTitle)) {
        return slugifyDomainTitle(value);
      }
      return slug;
    });
  }

  async function handleCreateDomain() {
    const title = newDomainTitle.trim();
    if (!title) {
      setError('Enter a title for the new domain.');
      return;
    }
    const slug = (newDomainSlug.trim() || slugifyDomainTitle(title)).toLowerCase();
    if (!isValidDomainSlug(slug)) {
      setError('Slug must be lowercase letters, numbers, and hyphens (e.g. my-domain).');
      return;
    }
    if (domains.some((d) => d.slug === slug)) {
      setError(`Domain "${slug}" already exists. Pick it from the list or use another slug.`);
      return;
    }

    setCreatingDomain(true);
    setError('');
    try {
      const created = await taxonomyApi.upsertDomain(certId, slug, {
        slug,
        title,
        sortOrder: domains.length,
        isActive: true,
      });
      addDomain(created);
      const nextDraft = {
        ...draft,
        domainId: slug,
        quizEligible: true,
      };
      setDraft(nextDraft);
      setShowNewDomain(false);
      setNewDomainTitle('');
      setNewDomainSlug('');
      if (questionsSource === 'api' && mode !== 'create') {
        await persistQuestionToDb(nextDraft);
      }
    } catch (err) {
      setError(err.message || 'Failed to create domain.');
    } finally {
      setCreatingDomain(false);
    }
  }

  function toggleQuizPool() {
    setDraft((d) => {
      const next = !d.quizEligible;
      const needsMcChoices =
        next && !isChoicesType(types, d.questionType) && !isStructured && !d.choices.length;
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
      <div className="mt-4 flex items-center gap-2 text-sm text-muted">
        <Loader2 size={16} className="animate-spin" />
        Loading question types…
      </div>
    );
  }

  return (
    <form
      className="mt-4 w-full min-w-0 max-w-full space-y-4 rounded-2xl border border-accent-200/80 bg-accent-50/40 p-4 dark:border-accent-500/30 dark:bg-accent-500/5 sm:p-5"
      onSubmit={handleSave}
    >
      {questionsSource !== 'api' && (
        <p className="rounded-xl border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-900 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-100">
          Bundled question bank — Save will not write to PostgreSQL. Run the API and{' '}
          <code className="text-[11px]">migrate:questions</code>, then reload this page.
        </p>
      )}

      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="text-xs font-bold uppercase tracking-wide text-accent-700 dark:text-accent-300">
          {mode === 'create' ? 'New question' : `Editing question ${index + 1}`}
          {questionsSource === 'api' ? ' · saved to database' : ''}
        </p>
        <div className="flex flex-wrap gap-2">
          {onRefresh && (
            <button
              type="button"
              className="secondary-button !py-1.5 text-xs"
              onClick={handleRefresh}
              disabled={refreshing || saving}
              title="Reload from database (discards unsaved changes)"
            >
              <RefreshCw size={14} className={refreshing ? 'animate-spin' : ''} />
              {refreshing ? 'Refreshing…' : 'Refresh'}
            </button>
          )}
          <button type="button" className="secondary-button !py-1.5 text-xs" onClick={autoParse} disabled={refreshing || saving}>
            <Sparkles size={14} />
            Auto-parse from text
          </button>
        </div>
      </div>

      {!isStructured && (
        <QuestionUiConfigEditor
          questionType={draft.questionType}
          uiConfig={draft.uiConfig}
          onTypeChange={handleTypeChange}
          onUiConfigChange={(uiConfig) => setDraft((d) => ({ ...d, uiConfig }))}
        />
      )}

      <label className="block">
        <span className="auth-field-label">Question text</span>
        <textarea
          className="auth-input !pl-4 min-h-[120px] resize-y"
          value={draft.text}
          onChange={(e) => setDraft((d) => ({ ...d, text: e.target.value }))}
          required
        />
      </label>

      {isDragDrop && (
        <>
          <div className="w-full min-w-0 max-w-full overflow-x-auto">
            <DragDropQuestion
              uiConfig={normalizeDragDropUiConfig(syncAnswerArea(draft.uiConfig, types, draft.questionType))}
              readOnly={false}
            />
          </div>
          <QuestionUiConfigEditor
            questionType={draft.questionType}
            uiConfig={draft.uiConfig}
            onTypeChange={handleTypeChange}
            onUiConfigChange={(uiConfig) => setDraft((d) => ({ ...d, uiConfig }))}
          />
        </>
      )}

      {isHotArea && (
        <>
          <div className="w-full min-w-0 max-w-full overflow-x-auto">
            <HotAreaQuestion
              uiConfig={normalizeHotAreaUiConfig(syncAnswerArea(draft.uiConfig, types, draft.questionType))}
              readOnly={false}
            />
          </div>
          <QuestionUiConfigEditor
            questionType={draft.questionType}
            uiConfig={draft.uiConfig}
            onTypeChange={handleTypeChange}
            onUiConfigChange={(uiConfig) => setDraft((d) => ({ ...d, uiConfig }))}
          />
        </>
      )}

      <div className="flex flex-wrap items-center gap-2 rounded-xl border border-line/70 bg-white/60 p-3 dark:border-gh-border dark:bg-gh-subtle/40">
        <span className="text-xs font-semibold text-muted dark:text-slate-400">Quiz practice</span>
        {draft.quizEligible ? (
          <>
            <span className="inline-flex items-center gap-1 rounded-full bg-success-500/15 px-2.5 py-1 text-xs font-bold text-success-800 dark:text-success-200">
              <ListChecks size={14} />
              In quiz pool
            </span>
            <span className="inline-flex rounded-full bg-violet-100 px-2.5 py-1 text-xs font-semibold text-violet-800 dark:bg-violet-500/15 dark:text-violet-200">
              {formatQuizDomainLabel(draft.domainId, domainLabelMap)}
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
        {draft.quizEligible && (
          <div className="flex w-full min-w-[12rem] flex-1 flex-col gap-2 sm:max-w-lg">
            <span className="text-xs font-semibold text-muted dark:text-slate-400">Quiz domain</span>
            <div className="flex flex-wrap items-center gap-2">
              <select
                className="auth-input !pl-4 min-w-[12rem] flex-1 text-sm"
                value={draft.domainId ?? ''}
                disabled={taxonomyLoading || creatingDomain}
                onChange={(e) =>
                  setDraft((d) => ({
                    ...d,
                    domainId: e.target.value || null,
                  }))
                }
              >
                <option value="">Do not have domain</option>
                {domains.map((d) => (
                  <option key={d.slug} value={d.slug}>
                    {d.title}
                  </option>
                ))}
              </select>
              <button
                type="button"
                className="secondary-button shrink-0 !py-1.5 text-xs"
                disabled={taxonomyLoading || creatingDomain}
                onClick={() => {
                  setShowNewDomain((open) => !open);
                  setError('');
                }}
              >
                <Plus size={14} />
                New domain
              </button>
            </div>
            {showNewDomain && (
              <div className="space-y-2 rounded-xl border border-line/70 bg-white/80 p-3 dark:border-gh-border dark:bg-gh-subtle/60">
                <label className="block">
                  <span className="text-xs font-semibold text-muted dark:text-slate-400">Domain title</span>
                  <input
                    className="auth-input !pl-4 mt-1 w-full text-sm"
                    value={newDomainTitle}
                    onChange={(e) => handleNewDomainTitleChange(e.target.value)}
                    placeholder="e.g. Implement NLP solutions"
                    disabled={creatingDomain}
                  />
                </label>
                <label className="block">
                  <span className="text-xs font-semibold text-muted dark:text-slate-400">Slug (optional)</span>
                  <input
                    className="auth-input !pl-4 mt-1 w-full text-sm font-mono"
                    value={newDomainSlug}
                    onChange={(e) => setNewDomainSlug(e.target.value.toLowerCase())}
                    placeholder="nlp"
                    disabled={creatingDomain}
                  />
                </label>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    className="primary-button !py-1.5 text-xs"
                    disabled={creatingDomain}
                    onClick={handleCreateDomain}
                  >
                    {creatingDomain ? (
                      <>
                        <Loader2 size={14} className="animate-spin" />
                        Creating…
                      </>
                    ) : (
                      'Create & assign to question'
                    )}
                  </button>
                  <button
                    type="button"
                    className="ghost-button !py-1.5 text-xs"
                    disabled={creatingDomain}
                    onClick={() => {
                      setShowNewDomain(false);
                      setNewDomainTitle('');
                      setNewDomainSlug('');
                    }}
                  >
                    Cancel
                  </button>
                </div>
                <p className="text-[11px] text-muted dark:text-slate-500">
                  Creates the domain in the database and saves this question with that domain when the API bank is
                  active.
                </p>
              </div>
            )}
            {!domains.length && !taxonomyLoading && !showNewDomain && (
              <span className="text-xs text-muted dark:text-slate-500">
                No domains yet — use <strong>New domain</strong> or run <code className="text-[11px]">migrate:questions</code>.
              </span>
            )}
          </div>
        )}
        {isDragDrop && draft.quizEligible && (
          <p className="w-full text-xs text-muted dark:text-slate-500">
            In Answer area — drop zones, pick the correct value from Values for each blank (e.g. drop_1 → item_1).
            Quiz uses drag-and-drop scoring, not multiple choice.
          </p>
        )}
        {isHotArea && draft.quizEligible && (
          <p className="w-full text-xs text-muted dark:text-slate-500">
            In Answer area — add dropdown options per hotspot and mark the correct option for each blank.
            Quiz uses hotspot scoring, not multiple choice.
          </p>
        )}
        {!isChoicesType(types, draft.questionType) && !isStructured && draft.quizEligible && (
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

      <div className="rounded-xl border border-amber-200/80 bg-amber-50/40 p-4 dark:border-amber-500/25 dark:bg-amber-500/5">
        <label className="flex cursor-pointer items-start gap-2.5">
          <input
            type="checkbox"
            className="mt-0.5 h-4 w-4 shrink-0 accent-amber-600"
            checked={draft.warn != null}
            onChange={(e) =>
              setDraft((d) => ({
                ...d,
                warn: e.target.checked ? (d.warn?.trim() ? d.warn : '') : null,
              }))
            }
          />
          <span>
            <span className="flex items-center gap-1.5 text-sm font-semibold text-amber-900 dark:text-amber-200">
              <AlertTriangle size={15} />
              Mark as warning
            </span>
            <span className="mt-0.5 block text-xs text-amber-800/80 dark:text-amber-200/70">
              Shown in library and during quiz practice. Add a note explaining why.
            </span>
          </span>
        </label>
        {draft.warn != null && (
          <label className="mt-3 block">
            <span className="auth-field-label text-amber-900 dark:text-amber-200">Warning note</span>
            <textarea
              className="auth-input !pl-4 mt-1 min-h-[72px] w-full resize-y border-amber-200/80 focus:border-amber-400 focus:ring-amber-400/20 dark:border-amber-500/30"
              value={draft.warn}
              placeholder="e.g. Answer key disputed, typo in stem, image outdated, needs SME review…"
              onChange={(e) => setDraft((d) => ({ ...d, warn: e.target.value }))}
            />
          </label>
        )}
      </div>

      <label className="block">
        <span className="auth-field-label">Explanation (optional)</span>
        <textarea
          ref={explanationRef}
          className="auth-input !pl-4 min-h-[200px] resize-none overflow-hidden"
          value={draft.explanation}
          onChange={(e) => setDraft((d) => ({ ...d, explanation: e.target.value }))}
        />
        {draft.explanation.trim() && (
          <div className="mt-3 min-w-0 max-w-full overflow-x-auto rounded-xl border border-line/70 bg-white/80 p-3 dark:border-gh-border dark:bg-gh-subtle/60">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted dark:text-slate-400">
              Preview
            </p>
            <ExplanationText className="text-xs text-muted dark:text-slate-400">{draft.explanation}</ExplanationText>
          </div>
        )}
      </label>

      {error && (
        <p className="auth-error" role="alert">
          {error}
        </p>
      )}

      <div className="flex flex-wrap gap-2">
        <button className="primary-button" type="submit" disabled={saving || refreshing}>
          {saving ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              Saving…
            </>
          ) : mode === 'create' ? (
            'Create question'
          ) : (
            'Save'
          )}
        </button>
        <button className="ghost-button" type="button" onClick={onCancel} disabled={saving || refreshing}>
          Cancel
        </button>
      </div>
    </form>
  );
}
