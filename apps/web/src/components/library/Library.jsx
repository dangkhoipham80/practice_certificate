import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { AlertTriangle, ChevronDown, Flag, Pencil, Plus, Search, Trash2 } from 'lucide-react';
import { questionsApi } from '../../api/client';
import { SectionHeader } from '../ui/SectionHeader';
import { ConfirmDialog } from '../ui/ConfirmDialog';
import { getUiConfig } from '../../lib/examQuestionParser';
import { isDragDropType, isHotAreaType } from '../../lib/questionUiTypes';
import { formatQuizCorrect } from '../../lib/quizUtils';
import { apiQuestionToLocal, getQuestionExternalId } from '../../lib/questionUtils';
import { ExplanationText } from '../shared/ExplanationText';
import { QuestionText } from '../shared/QuestionText';
import { QuestionInlineEdit } from './QuestionInlineEdit';
import { QuestionTypesAdmin } from '../admin/QuestionTypesAdmin';
import { useQuestionTypes } from '../../context/QuestionTypesContext';
import { QuestionStructuredView } from './QuestionStructuredView';
import { useCertContext } from '../../context/CertContext';
import { useCertTaxonomy } from '../../hooks/useCertTaxonomy';
import { formatQuizDomainLabel, isInQuizPool } from '../../lib/quizDomains';

const PAGE_SIZE = 20;

const EMPTY_QUESTION = {
  text: '',
  choices: [],
  correct: [],
  explanation: '',
  quizEligible: false,
  domainId: null,
  topic: null,
  images: [],
  warn: null,
  uiConfig: {},
};

function readInitialLibraryPage(searchParams) {
  const page = Number(searchParams.get('page'));
  return Number.isFinite(page) && page > 0 ? page : 1;
}

function findQuestionIndexByExternalId(questions, externalId) {
  return questions.findIndex((question, index) => getQuestionExternalId(question, index) === externalId);
}

export function Library({ cert, search, setSearch, flagged, toggleFlag, isAdmin }) {
  const { questionsSource, questionsLoading, reloadCertQuestions } = useCertContext();
  const { domainLabelMap } = useCertTaxonomy(cert.id);
  const [searchParams, setSearchParams] = useSearchParams();
  const [filter, setFilter] = useState('all');
  const [page, setPage] = useState(() => readInitialLibraryPage(searchParams));
  const [expanded, setExpanded] = useState(() => new Set());
  const [editingIndex, setEditingIndex] = useState(null);
  const [apiPage, setApiPage] = useState(null);
  const [apiPageLoading, setApiPageLoading] = useState(false);
  const [editRestored, setEditRestored] = useState(false);
  const [creatingNew, setCreatingNew] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const skipFilterPageResetRef = useRef(true);
  const { types } = useQuestionTypes();
  const { questions } = cert;

  const updateLibraryParams = useCallback(
    (updates) => {
      setSearchParams(
        (current) => {
          const next = new URLSearchParams(current);
          if (updates.editQuestionId != null) {
            next.set('edit', String(updates.editQuestionId));
          } else if ('editQuestionId' in updates) {
            next.delete('edit');
          }
          if (updates.page != null && updates.page > 1) {
            next.set('page', String(updates.page));
          } else if ('page' in updates) {
            next.delete('page');
          }
          return next;
        },
        { replace: true },
      );
    },
    [setSearchParams],
  );

  const useApiPagination = questionsSource === 'api' && filter === 'all' && !search.trim();

  const filtered = useMemo(
    () =>
      questions
        .map((question, index) => ({ ...question, index }))
        .filter((question) => {
          if (filter === 'flagged' && !flagged.includes(question.index)) return false;
          if (filter === 'multi' && !question.multiple) return false;
          if (filter === 'single' && question.multiple) return false;
          if (filter === 'quiz' && question.quizEligible === false) return false;
          if (filter === 'interactive' && question.quizEligible !== false) return false;
          if (filter === 'warning' && !question.warn?.trim()) return false;
          return (
            !search.trim() ||
            `${question.text} ${(question.choices ?? []).join(' ')} ${question.warn ?? ''}`
              .toLowerCase()
              .includes(search.toLowerCase())
          );
        }),
    [questions, filter, flagged, search]
  );

  const totalMatches = useApiPagination ? (apiPage?.total ?? 0) : filtered.length;
  const totalPages = useApiPagination
    ? (apiPage?.totalPages ?? 1)
    : Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));

  const pageItems = useMemo(() => {
    if (useApiPagination && apiPage?.questions) {
      return apiPage.questions.map((q) => {
        const local = apiQuestionToLocal(q);
        const index = questions.findIndex(
          (item, i) => (item.questionId ?? i + 1) === local.questionId
        );
        return { ...local, index: index >= 0 ? index : (local.questionId ?? 1) - 1 };
      });
    }
    const start = (page - 1) * PAGE_SIZE;
    return filtered.slice(start, start + PAGE_SIZE);
  }, [useApiPagination, apiPage, page, filtered, questions]);

  useEffect(() => {
    setPage(1);
    setEditingIndex(null);
    setEditRestored(false);
    updateLibraryParams({ editQuestionId: null, page: 1 });
  }, [cert.id, updateLibraryParams]);

  useEffect(() => {
    if (skipFilterPageResetRef.current) {
      skipFilterPageResetRef.current = false;
      return;
    }
    setPage(1);
    setEditingIndex(null);
    updateLibraryParams({ editQuestionId: null, page: 1 });
  }, [filter, search, updateLibraryParams]);

  useEffect(() => {
    if (questionsLoading || editRestored || !isAdmin) return;

    const editQuestionId = Number(searchParams.get('edit'));
    if (!Number.isFinite(editQuestionId)) {
      setEditRestored(true);
      return;
    }

    const index = findQuestionIndexByExternalId(questions, editQuestionId);
    if (index < 0) {
      setEditRestored(true);
      return;
    }

    const pageFromUrl = readInitialLibraryPage(searchParams);
    let targetPage = pageFromUrl;
    if (useApiPagination) {
      targetPage = pageFromUrl > 1 ? pageFromUrl : Math.floor(index / PAGE_SIZE) + 1;
    } else {
      const posInFiltered = filtered.findIndex((question) => question.index === index);
      if (posInFiltered < 0) {
        setEditRestored(true);
        return;
      }
      targetPage = pageFromUrl > 1 ? pageFromUrl : Math.floor(posInFiltered / PAGE_SIZE) + 1;
    }

    if (page !== targetPage) {
      setPage(targetPage);
      return;
    }

    if (useApiPagination && (apiPageLoading || apiPage?.page !== targetPage)) {
      return;
    }

    setEditingIndex(index);
    setExpanded((current) => new Set(current).add(index));
    setEditRestored(true);

    const scrollTimer = window.setTimeout(() => {
      document.getElementById(`question-edit-${index}`)?.scrollIntoView({ block: 'nearest' });
    }, 150);
    return () => window.clearTimeout(scrollTimer);
  }, [
    questionsLoading,
    editRestored,
    isAdmin,
    searchParams,
    questions,
    filtered,
    useApiPagination,
    page,
    apiPageLoading,
    apiPage,
  ]);

  useEffect(() => {
    if (editingIndex == null || !isAdmin) return;
    const question = questions[editingIndex];
    if (!question) return;
    updateLibraryParams({
      editQuestionId: getQuestionExternalId(question, editingIndex),
      page,
    });
  }, [editingIndex, page, isAdmin, questions, updateLibraryParams]);

  useEffect(() => {
    if (!useApiPagination) {
      setApiPage(null);
      return;
    }
    let cancelled = false;
    setApiPageLoading(true);
    questionsApi
      .list(cert.id, { auth: false, page, pageSize: PAGE_SIZE })
      .then((data) => {
        if (!cancelled) setApiPage(data);
      })
      .catch(() => {
        if (!cancelled) setApiPage(null);
      })
      .finally(() => {
        if (!cancelled) setApiPageLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [useApiPagination, cert.id, page]);

  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [page, totalPages]);

  function toggleDetail(index) {
    setExpanded((current) => {
      const next = new Set(current);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  }

  function startEdit(question) {
    setCreatingNew(false);
    setEditingIndex(question.index);
    setExpanded((current) => new Set(current).add(question.index));
    updateLibraryParams({
      editQuestionId: getQuestionExternalId(question, question.index),
      page,
    });
  }

  function cancelEdit() {
    setEditingIndex(null);
    updateLibraryParams({ editQuestionId: null, page });
  }

  function startCreate() {
    setEditingIndex(null);
    setCreatingNew(true);
    updateLibraryParams({ editQuestionId: null, page });
  }

  function cancelCreate() {
    setCreatingNew(false);
  }

  function handleQuestionCreated(created) {
    setCreatingNew(false);
    setEditRestored(false);
    updateLibraryParams({ editQuestionId: created.questionId });
  }

  const refreshLibraryQuestions = useCallback(
    async (pageOverride) => {
      const targetPage = pageOverride ?? page;
      await reloadCertQuestions(cert.id);
      if (useApiPagination) {
        const data = await questionsApi.list(cert.id, { auth: false, page: targetPage, pageSize: PAGE_SIZE });
        setApiPage(data);
        if (!data.questions?.length && targetPage > 1) {
          setPage(targetPage - 1);
        }
      }
    },
    [reloadCertQuestions, cert.id, useApiPagination, page],
  );

  async function confirmDelete() {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      const externalId = getQuestionExternalId(deleteTarget.question, deleteTarget.index);
      await questionsApi.remove(cert.id, externalId);
      if (editingIndex === deleteTarget.index) {
        setEditingIndex(null);
        updateLibraryParams({ editQuestionId: null, page });
      }
      await refreshLibraryQuestions();
      setDeleteTarget(null);
    } catch (err) {
      window.alert(err.message || 'Failed to delete question.');
    } finally {
      setDeleting(false);
    }
  }

  return (
    <section className="library-page space-y-4">
      <SectionHeader
        kicker="Question library"
        title={`Browse ${cert.exam} bank`}
        description={
          questionsLoading || (useApiPagination && apiPageLoading)
            ? 'Loading questions from database…'
            : questionsSource === 'api'
              ? `${totalMatches} matching questions (from database). Page ${page} of ${totalPages} · ${PAGE_SIZE} per page.`
              : `${totalMatches} matching questions (bundled copy — start API and run migrate:questions to persist edits). Page ${page} of ${totalPages} · ${PAGE_SIZE} per page.`
        }
      />
      {isAdmin && <QuestionTypesAdmin />}
      <div className="panel sticky top-[88px] z-[5] space-y-4 p-4 shadow-card">
        <div className="flex items-center gap-3 rounded-xl border border-line/70 bg-subtle/50 px-4 py-2.5 dark:border-gh-border dark:bg-gh-subtle/50">
          <Search className="shrink-0 text-accent-500" size={18} />
          <input
            className="w-full bg-transparent text-sm outline-none placeholder:text-muted/70 dark:placeholder:text-slate-500"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search questions, choices, or concepts"
          />
        </div>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap gap-2">
          {[
            ['all', 'All'],
            ['flagged', `Flagged (${flagged.length})`],
            ['multi', 'Multi-answer'],
            ['single', 'Single-answer'],
            ['quiz', 'Quiz MC'],
            ['interactive', 'Interactive'],
            ['warning', 'Warnings'],
          ].map(([id, label]) => (
            <button
              key={id}
              className={`filter-chip ${filter === id ? 'filter-chip-active' : ''}`}
              onClick={() => {
                setFilter(id);
                setPage(1);
              }}
              type="button"
            >
              {label}
            </button>
          ))}
          </div>
          {isAdmin && (
            <button
              className="primary-button !py-1.5 text-xs"
              type="button"
              onClick={startCreate}
              disabled={creatingNew || questionsSource !== 'api'}
              title={questionsSource !== 'api' ? 'Requires database-backed question bank' : 'Add a new question'}
            >
              <Plus size={14} />
              Add question
            </button>
          )}
        </div>
      </div>
      <div className="grid gap-3">
        {isAdmin && creatingNew && (
          <article className="question-row" id="question-create">
            <div className="mb-3 flex items-start justify-between gap-3">
              <div className="flex min-w-0 flex-1 gap-3">
                <span className="question-number">+</span>
                <p className="text-sm font-semibold text-ink dark:text-slate-200">New question</p>
              </div>
            </div>
            <QuestionInlineEdit
              certId={cert.id}
              question={EMPTY_QUESTION}
              index={questions.length}
              mode="create"
              onCancel={cancelCreate}
              onRefresh={refreshLibraryQuestions}
              onCreated={handleQuestionCreated}
            />
          </article>
        )}
        {pageItems.map((question) => {
          const isOpen = expanded.has(question.index);
          const isEditing = isAdmin && editingIndex === question.index;
          const uiConfig = getUiConfig(question);
          const isDragDrop = isDragDropType(types, uiConfig?.type);
          const isHotArea = isHotAreaType(types, uiConfig?.type);
          const isStructured = isDragDrop || isHotArea;
          const showStructuredPractice = !isEditing && isStructured && !isOpen;
          const showStructuredAnswer = !isEditing && isStructured && isOpen;
          const showStructuredInteractive =
            isOpen && !isEditing && !isStructured && !question.choices?.length && question.quizEligible === false;
          const correctLabels = (question.correct ?? []).map((item) => String.fromCharCode(65 + item)).join(', ');
          const structuredAnswerSummary = isStructured ? formatQuizCorrect({ ...question, uiConfig }) : '';
          return (
            <article
              className="question-row"
              key={question.index}
              id={isEditing ? `question-edit-${question.index}` : undefined}
            >
              <div className="mb-3 flex items-start justify-between gap-3">
                <div className="flex min-w-0 flex-1 gap-3">
                  <span className="question-number">{question.index + 1}</span>
                  <div className="min-w-0 flex-1">
                    <QuestionText
                      text={question.text}
                      images={isStructured || isOpen ? question.images : []}
                      className="text-sm font-semibold"
                    />
                    {question.quizEligible === false && (
                      <span className="mt-1 inline-block rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-bold text-amber-800 dark:bg-amber-500/15 dark:text-amber-200">
                        Interactive / library only
                      </span>
                    )}
                    {isInQuizPool(question) && (
                      <span className="mt-1 ml-1 inline-block rounded-full bg-sky-100 px-2 py-0.5 text-[10px] font-bold text-sky-800 dark:bg-sky-500/15 dark:text-sky-200">
                        Quiz · {formatQuizDomainLabel(question.domainId, domainLabelMap)}
                      </span>
                    )}
                    {(question.questionTypeLabel || uiConfig?.type) && (
                      <span className="mt-1 ml-1 inline-block rounded-full bg-violet-100 px-2 py-0.5 text-[10px] font-bold text-violet-800 dark:bg-violet-500/15 dark:text-violet-200">
                        {question.questionTypeLabel ??
                          types.find((t) => t.slug === uiConfig?.type)?.label ??
                          uiConfig?.type}
                      </span>
                    )}
                    {question.warn?.trim() && (
                      <span
                        className="mt-1 ml-1 inline-flex items-center gap-1 rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-bold text-amber-800 dark:bg-amber-500/15 dark:text-amber-200"
                        title={question.warn}
                      >
                        <AlertTriangle size={11} />
                        Warning
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex shrink-0 gap-1.5">
                  {isAdmin && (
                    <>
                      <button
                        className={`secondary-button !px-3 !py-1.5 text-xs ${isEditing ? '!border-accent-300 !bg-accent-50 dark:!bg-accent-500/10' : ''}`}
                        type="button"
                        onClick={() => (isEditing ? cancelEdit() : startEdit(question))}
                        title={isEditing ? 'Cancel editing' : 'Edit question'}
                        disabled={creatingNew}
                      >
                        <Pencil size={14} />
                        {isEditing ? 'Cancel' : 'Edit'}
                      </button>
                      <button
                        className="icon-button h-9 w-9 text-danger-600 dark:text-danger-300"
                        type="button"
                        onClick={() => setDeleteTarget({ question, index: question.index })}
                        title="Delete question"
                        disabled={creatingNew || questionsSource !== 'api'}
                      >
                        <Trash2 size={16} />
                      </button>
                    </>
                  )}
                  <button
                    className={`secondary-button !px-3 !py-1.5 text-xs ${isOpen ? '!border-accent-300 !bg-accent-50 dark:!bg-accent-500/10' : ''}`}
                    type="button"
                    onClick={() => toggleDetail(question.index)}
                  >
                    {isStructured ? (isOpen ? 'Hide answer' : 'Answer') : isOpen ? 'Hide' : 'Detail'}
                    <ChevronDown size={14} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                  </button>
                  <button
                    className={`icon-button h-9 w-9 ${flagged.includes(question.index) ? 'text-danger-600 dark:text-danger-300' : ''}`}
                    type="button"
                    onClick={() => toggleFlag(question.index)}
                    title="Flag"
                  >
                    <Flag size={16} fill={flagged.includes(question.index) ? 'currentColor' : 'none'} />
                  </button>
                </div>
              </div>
              <p className="text-xs text-muted dark:text-slate-400 sm:pl-10">
                {question.multiple ? 'Multiple answer' : question.choices?.length ? 'Single answer' : 'Non-MC'}
                {!isOpen && question.choices?.length && !isStructured ? ' · tap Detail to view choices' : ''}
                {isDragDrop && !isOpen ? ' · drag values into blanks, then tap Answer' : ''}
                {isHotArea && !isOpen ? ' · select options in the code, then tap Answer' : ''}
                {isDragDrop && isOpen ? ' · correct placement shown below' : ''}
                {isHotArea && isOpen ? ' · correct options filled in the code' : ''}
              </p>
              {question.warn?.trim() && (isOpen || isEditing) && (
                <div className="mt-3 flex items-start gap-2 rounded-xl border border-amber-200 bg-amber-50 px-3 py-2.5 text-xs text-amber-900 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-100 sm:ml-10">
                  <AlertTriangle size={15} className="mt-0.5 shrink-0" />
                  <div>
                    <p className="font-semibold">Warning</p>
                    <p className="mt-0.5 leading-relaxed">{question.warn}</p>
                  </div>
                </div>
              )}
              {showStructuredPractice && (
                <div className="mt-4 w-full border-t border-line/50 pt-4 dark:border-gh-border/60">
                  <QuestionStructuredView question={question} readOnly={false} />
                </div>
              )}
              {showStructuredAnswer && (
                <div className="mt-4 w-full space-y-3 border-t border-line/50 pt-4 dark:border-gh-border/60">
                  {!isHotArea && structuredAnswerSummary && (
                    <p className="rounded-xl border border-success-200 bg-success-50 px-3 py-2 text-xs font-semibold text-success-800 dark:border-success-500/30 dark:bg-success-500/10 dark:text-success-200">
                      Correct: {structuredAnswerSummary}
                    </p>
                  )}
                  <QuestionStructuredView question={question} readOnly answerOnly />
                  {question.explanation && (
                    <div className="rounded-xl border border-line/70 bg-subtle/50 px-3 py-2 text-xs text-muted dark:border-gh-border dark:bg-gh-subtle/50 dark:text-slate-400">
                      <ExplanationText>{question.explanation}</ExplanationText>
                    </div>
                  )}
                </div>
              )}
              {showStructuredInteractive && (
                <div className="mt-4 w-full border-t border-line/50 pt-4 dark:border-gh-border/60">
                  <QuestionStructuredView question={question} readOnly={false} />
                </div>
              )}
              {isEditing && (
                <QuestionInlineEdit
                  certId={cert.id}
                  question={question}
                  index={question.index}
                  onCancel={cancelEdit}
                  onRefresh={refreshLibraryQuestions}
                />
              )}
              {isOpen && !isEditing && question.choices?.length > 0 && !isStructured && (
                <div className="mt-4 w-full space-y-3 border-t border-line/50 pt-4 dark:border-gh-border/60 sm:pl-10">
                  <div className="space-y-2">
                    {question.choices.map((choice, choiceIndex) => {
                      const isCorrect = question.correct.includes(choiceIndex);
                      return (
                        <div
                          key={choiceIndex}
                          className={`answer answer-locked pointer-events-none ${isCorrect ? 'answer-correct' : ''}`}
                        >
                          <span className="answer-letter">{String.fromCharCode(65 + choiceIndex)}</span>
                          <span className="leading-6">{choice}</span>
                          {isCorrect && (
                            <span className="ml-auto shrink-0 rounded-full bg-success-500/15 px-2 py-0.5 text-[10px] font-bold uppercase text-success-700 dark:text-success-300">
                              Correct
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                  {correctLabels && (
                    <p className="rounded-xl border border-success-200 bg-success-50 px-3 py-2 text-xs font-semibold text-success-800 dark:border-success-500/30 dark:bg-success-500/10 dark:text-success-200">
                      Correct answer{question.correct.length > 1 ? 's' : ''}: {correctLabels}
                    </p>
                  )}
                  {question.explanation && (
                    <div className="rounded-xl border border-line/70 bg-subtle/50 px-3 py-2 text-xs text-muted dark:border-gh-border dark:bg-gh-subtle/50 dark:text-slate-400">
                      <ExplanationText>{question.explanation}</ExplanationText>
                    </div>
                  )}
                </div>
              )}
            </article>
          );
        })}
        {!pageItems.length && !questionsLoading && !(useApiPagination && apiPageLoading) && (
          <div className="empty-state">
            <Search size={32} className="mb-3 text-muted/50" />
            <p className="text-sm font-semibold text-ink dark:text-slate-200">No questions match</p>
            <p className="mt-1 text-sm text-muted dark:text-slate-400">Try a different search or filter.</p>
          </div>
        )}
      </div>
      {totalPages > 1 && (
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <button
            className="secondary-button !min-h-9 px-3 py-1.5 text-sm"
            disabled={page <= 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            type="button"
          >
            Previous
          </button>
          <span className="text-sm text-muted dark:text-slate-400">
            Page {page} of {totalPages}
          </span>
          <button
            className="secondary-button !min-h-9 px-3 py-1.5 text-sm"
            disabled={page >= totalPages}
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            type="button"
          >
            Next
          </button>
        </div>
      )}
      {deleteTarget && (
        <ConfirmDialog
          title="Delete question?"
          message={`Remove question ${deleteTarget.index + 1}? This cannot be undone.`}
          confirmLabel="Delete"
          onConfirm={confirmDelete}
          onCancel={() => setDeleteTarget(null)}
          loading={deleting}
        />
      )}
    </section>
  );
}
