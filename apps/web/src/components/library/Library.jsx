import { useEffect, useMemo, useState } from 'react';
import { ChevronDown, Flag, Pencil, Search } from 'lucide-react';
import { questionsApi } from '../../api/client';
import { SectionHeader } from '../ui/SectionHeader';
import { getUiConfig } from '../../lib/examQuestionParser';
import { isDragDropType } from '../../lib/questionUiTypes';
import { formatQuizCorrect } from '../../lib/quizUtils';
import { apiQuestionToLocal } from '../../lib/questionUtils';
import { QuestionText } from '../shared/QuestionText';
import { QuestionInlineEdit } from './QuestionInlineEdit';
import { QuestionTypesAdmin } from '../admin/QuestionTypesAdmin';
import { useQuestionTypes } from '../../context/QuestionTypesContext';
import { QuestionStructuredView } from './QuestionStructuredView';
import { useCertContext } from '../../context/CertContext';
import { useCertTaxonomy } from '../../hooks/useCertTaxonomy';
import { formatQuizDomainLabel, isInQuizPool } from '../../lib/quizDomains';

const PAGE_SIZE = 20;

export function Library({ cert, search, setSearch, flagged, toggleFlag, isAdmin }) {
  const { questionsSource, questionsLoading } = useCertContext();
  const { domainLabelMap } = useCertTaxonomy(cert.id);
  const [filter, setFilter] = useState('all');
  const [page, setPage] = useState(1);
  const [expanded, setExpanded] = useState(() => new Set());
  const [editingIndex, setEditingIndex] = useState(null);
  const [apiPage, setApiPage] = useState(null);
  const [apiPageLoading, setApiPageLoading] = useState(false);
  const { types } = useQuestionTypes();
  const { questions } = cert;

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
          return (
            !search.trim() ||
            `${question.text} ${(question.choices ?? []).join(' ')}`.toLowerCase().includes(search.toLowerCase())
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
  }, [filter, search, cert.id]);

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
    setEditingIndex(question.index);
    setExpanded((current) => new Set(current).add(question.index));
  }

  function cancelEdit() {
    setEditingIndex(null);
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
        <div className="flex flex-wrap gap-2">
          {[
            ['all', 'All'],
            ['flagged', `Flagged (${flagged.length})`],
            ['multi', 'Multi-answer'],
            ['single', 'Single-answer'],
            ['quiz', 'Quiz MC'],
            ['interactive', 'Interactive']
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
      </div>
      <div className="grid gap-3">
        {pageItems.map((question) => {
          const isOpen = expanded.has(question.index);
          const isEditing = isAdmin && editingIndex === question.index;
          const uiConfig = getUiConfig(question);
          const isDragDrop = isDragDropType(types, uiConfig?.type);
          const showDragDropPractice = !isEditing && isDragDrop && !isOpen;
          const showDragDropAnswer = !isEditing && isDragDrop && isOpen;
          const showStructuredInteractive =
            isOpen && !isEditing && !isDragDrop && !question.choices?.length && question.quizEligible === false;
          const correctLabels = (question.correct ?? []).map((item) => String.fromCharCode(65 + item)).join(', ');
          const dragDropAnswerSummary = isDragDrop ? formatQuizCorrect({ ...question, uiConfig }) : '';
          return (
            <article className="question-row" key={question.index}>
              <div className="mb-3 flex items-start justify-between gap-3">
                <div className="flex min-w-0 flex-1 gap-3">
                  <span className="question-number">{question.index + 1}</span>
                  <div className="min-w-0 flex-1">
                    <QuestionText
                      text={question.text}
                      images={isDragDrop || isOpen ? question.images : []}
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
                  </div>
                </div>
                <div className="flex shrink-0 gap-1.5">
                  {isAdmin && (
                    <button
                      className={`secondary-button !px-3 !py-1.5 text-xs ${isEditing ? '!border-accent-300 !bg-accent-50 dark:!bg-accent-500/10' : ''}`}
                      type="button"
                      onClick={() => (isEditing ? cancelEdit() : startEdit(question))}
                      title={isEditing ? 'Cancel editing' : 'Edit question'}
                    >
                      <Pencil size={14} />
                      {isEditing ? 'Cancel' : 'Edit'}
                    </button>
                  )}
                  <button
                    className={`secondary-button !px-3 !py-1.5 text-xs ${isOpen ? '!border-accent-300 !bg-accent-50 dark:!bg-accent-500/10' : ''}`}
                    type="button"
                    onClick={() => toggleDetail(question.index)}
                  >
                    {isDragDrop ? (isOpen ? 'Hide answer' : 'Answer') : isOpen ? 'Hide' : 'Detail'}
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
                {!isOpen && question.choices?.length && !isDragDrop ? ' · tap Detail to view choices' : ''}
                {isDragDrop && !isOpen ? ' · drag values into blanks, then tap Answer' : ''}
                {isDragDrop && isOpen ? ' · correct placement shown below' : ''}
              </p>
              {showDragDropPractice && (
                <div className="mt-4 w-full border-t border-line/50 pt-4 dark:border-gh-border/60">
                  <QuestionStructuredView question={question} readOnly={false} />
                </div>
              )}
              {showDragDropAnswer && (
                <div className="mt-4 w-full space-y-3 border-t border-line/50 pt-4 dark:border-gh-border/60">
                  {dragDropAnswerSummary && (
                    <p className="rounded-xl border border-success-200 bg-success-50 px-3 py-2 text-xs font-semibold text-success-800 dark:border-success-500/30 dark:bg-success-500/10 dark:text-success-200">
                      Correct: {dragDropAnswerSummary}
                    </p>
                  )}
                  <QuestionStructuredView question={question} readOnly answerOnly />
                  {question.explanation && (
                    <p className="rounded-xl border border-line/70 bg-subtle/50 px-3 py-2 text-xs leading-6 text-muted dark:border-gh-border dark:bg-gh-subtle/50 dark:text-slate-400">
                      {question.explanation.slice(0, 800)}
                    </p>
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
                />
              )}
              {isOpen && !isEditing && question.choices?.length > 0 && !isDragDrop && (
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
                    <p className="rounded-xl border border-line/70 bg-subtle/50 px-3 py-2 text-xs leading-6 text-muted dark:border-gh-border dark:bg-gh-subtle/50 dark:text-slate-400">
                      {question.explanation.slice(0, 800)}
                    </p>
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
    </section>
  );
}
