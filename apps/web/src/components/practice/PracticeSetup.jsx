import { useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Brain, ClipboardList, Flag, Layers3, MousePointerClick, Move, Play, RotateCcw, Search, Terminal } from 'lucide-react';
import { getQuizQuestions } from '../../config/certRegistry';
import { pathFromRouteId } from '../../config/routes';
import { getDomainLabel } from '../../utils/ai102DomainClassifier';
import { useCertTaxonomy } from '../../hooks/useCertTaxonomy';
import { useExamSections } from '../../hooks/useExamSections';
import {
  QUIZ_DOMAIN_NONE,
  QUIZ_DOMAIN_NONE_LABEL,
  countQuizByDomain,
  formatQuizDomainLabel,
  getQuizIndicesForDomainFilter,
} from '../../lib/quizDomains';
import {
  getIndicesForQuestionKind,
  getInteractiveIndices,
  getQuestionKindStats,
  QUESTION_KIND_LABELS,
} from '../../utils/ai102InteractiveKind';
import { ActionButton } from '../ui/ActionButton';
import { InfoTile } from '../ui/InfoTile';
import { SectionHeader } from '../ui/SectionHeader';
import { PartGrid } from '../shared/PartGrid';
import { QuizCustomSetup } from './QuizCustomSetup';

export function PracticeSetup({ cert, startQuiz, partProgress }) {
  const [searchParams] = useSearchParams();
  const domainFilter = searchParams.get('domain');
  const quizCount = getQuizQuestions(cert).length;
  const sectionLabel = cert.id === 'ai-102' ? 'domains' : cert.id.startsWith('ai-') ? 'topics' : 'parts';
  const { sections } = useExamSections(cert);
  const { domains, domainLabelMap } = useCertTaxonomy(cert.id);

  const domainQuizCount = useMemo(() => {
    if (!domainFilter) return 0;
    return getQuizIndicesForDomainFilter(cert.questions, domainFilter).length;
  }, [cert.questions, domainFilter]);

  const domainCounts = useMemo(() => countQuizByDomain(cert.questions, domains), [cert.questions, domains]);

  const questionKindStats = useMemo(() => {
    if (cert.id !== 'ai-102') return null;
    return getQuestionKindStats(cert.questions);
  }, [cert]);

  function startInteractiveReview(kind) {
    const indices =
      kind === 'all'
        ? getInteractiveIndices(cert.questions)
        : getIndicesForQuestionKind(cert.questions, kind);
    if (!indices.length) return;
    const label =
      kind === 'all'
        ? `${cert.exam} · Interactive review`
        : `${cert.exam} · ${QUESTION_KIND_LABELS[kind]} review`;
    startQuiz({
      reviewMode: true,
      customIndices: indices,
      count: 'all',
      label,
    });
  }

  function startDomainQuiz(count = 20) {
    const indices = getQuizIndicesForDomainFilter(cert.questions, domainFilter);
    if (!indices.length) return;
    const title =
      domainFilter === QUIZ_DOMAIN_NONE
        ? QUIZ_DOMAIN_NONE_LABEL
        : formatQuizDomainLabel(domainFilter, domainLabelMap) || getDomainLabel(domainFilter, domainLabelMap);
    startQuiz({
      customIndices: indices,
      count: count === 'all' ? 'all' : Math.min(count, indices.length),
      label: `${cert.exam} · ${title}`,
    });
  }

  return (
    <section className="space-y-6">
      {domainFilter && domainQuizCount > 0 && (
        <div className="panel border-accent-200 bg-accent-50/50 p-5 dark:border-accent-500/30 dark:bg-accent-500/10">
          <p className="font-bold text-ink dark:text-slate-100">
            {domainFilter === QUIZ_DOMAIN_NONE
              ? QUIZ_DOMAIN_NONE_LABEL
              : formatQuizDomainLabel(domainFilter, domainLabelMap) || getDomainLabel(domainFilter, domainLabelMap)}
          </p>
          <p className="mt-1 text-sm text-muted dark:text-slate-400">
            {domainQuizCount} multiple-choice questions tagged to this exam domain (keyword + topic rules).
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <button className="primary-button !min-h-10" type="button" onClick={() => startDomainQuiz(20)}>
              Start quiz (20)
            </button>
            <button className="secondary-button !min-h-10" type="button" onClick={() => startDomainQuiz('all')}>
              Full domain ({domainQuizCount})
            </button>
            <Link className="secondary-button !min-h-10" to={pathFromRouteId('learn', cert.id)}>
              Back to Learn
            </Link>
          </div>
        </div>
      )}

      {cert.id === 'ai-102' && questionKindStats && (
        <div className="panel p-5">
          <SectionHeader
            kicker="Question bank"
            title="Phân loại câu hỏi"
            description={`${cert.questions.length} câu tổng — ${quizCount} MC tự chấm (quiz pool) và ${questionKindStats.hotspot + questionKindStats['drag-drop'] + questionKindStats.simulation + questionKindStats.other} interactive chỉ ôn tập.`}
          />
          <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
            <InfoTile label="Quiz pool (MC)" value={questionKindStats.mc} />
            <InfoTile label="Hotspot" value={questionKindStats.hotspot} />
            <InfoTile label="Drag & drop" value={questionKindStats['drag-drop']} />
            <InfoTile label="Simulation" value={questionKindStats.simulation} />
            <InfoTile label="Other interactive" value={questionKindStats.other} />
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            <ActionButton
              icon={MousePointerClick}
              label="Hotspot review"
              meta={`${questionKindStats.hotspot} câu`}
              onClick={() => startInteractiveReview('hotspot')}
            />
            <ActionButton
              icon={Move}
              label="Drag & drop review"
              meta={`${questionKindStats['drag-drop']} câu`}
              onClick={() => startInteractiveReview('drag-drop')}
            />
            <ActionButton
              icon={Terminal}
              label="Simulation review"
              meta={`${questionKindStats.simulation} câu`}
              onClick={() => startInteractiveReview('simulation')}
            />
            <ActionButton
              icon={Layers3}
              label="All interactive"
              meta={`${getInteractiveIndices(cert.questions).length} câu`}
              onClick={() => startInteractiveReview('all')}
            />
          </div>
        </div>
      )}

      {domains.length > 0 && (
        <div className="panel p-5">
          <p className="text-xs font-bold uppercase text-muted dark:text-slate-400">Practice by quiz domain</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {domains.map((domain) => {
              const count = domainCounts[domain.slug] ?? 0;
              const shortTitle =
                cert.id === 'ai-102'
                  ? domain.title.replace('Implement ', '').replace('Plan and manage an Azure AI solution', 'Plan & manage')
                  : domain.title;
              return count ? (
                <Link
                  key={domain.slug}
                  className={`filter-chip ${domainFilter === domain.slug ? 'filter-chip-active' : ''}`}
                  to={`${pathFromRouteId('practice', cert.id)}?domain=${domain.slug}`}
                >
                  {shortTitle} ({count})
                </Link>
              ) : (
                <span className="filter-chip cursor-not-allowed opacity-50" key={domain.slug}>
                  {shortTitle} (0)
                </span>
              );
            })}
            {(domainCounts[QUIZ_DOMAIN_NONE] ?? 0) > 0 && (
              <Link
                className={`filter-chip ${domainFilter === QUIZ_DOMAIN_NONE ? 'filter-chip-active' : ''}`}
                to={`${pathFromRouteId('practice', cert.id)}?domain=${QUIZ_DOMAIN_NONE}`}
              >
                {QUIZ_DOMAIN_NONE_LABEL} ({domainCounts[QUIZ_DOMAIN_NONE]})
              </Link>
            )}
            {domainFilter && (
              <Link className="filter-chip" to={pathFromRouteId('practice', cert.id)}>
                Clear filter
              </Link>
            )}
          </div>
        </div>
      )}
      <SectionHeader
        kicker={`${cert.exam} practice`}
        title="Choose a session"
        description="Random drills, wrong/new pools, custom filters, or practice by exam section — with Check, Reveal, and Try Again."
      />
      <QuizCustomSetup cert={cert} startQuiz={startQuiz} partProgress={partProgress} />
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {[10, 20, 50, 100].map((count) => (
          <ActionButton key={count} icon={Play} label={`Random ${count}`} meta="Mixed question bank" onClick={() => startQuiz({ count, label: `${cert.exam} · Random ${count}` })} />
        ))}
        <ActionButton icon={ClipboardList} label="Full bank" meta={`${quizCount} MC questions`} onClick={() => startQuiz({ count: 'all', label: `${cert.exam} · Full Exam` })} />
        <ActionButton icon={Layers3} label="Multi-answer" meta="Multiple choice only" onClick={() => startQuiz({ mode: 'multi', count: 50, label: `${cert.exam} · Multi-Select` })} />
        <ActionButton icon={RotateCcw} label="Random wrong" meta="From part progress" onClick={() => startQuiz({ mode: 'wrong', count: 20, label: `${cert.exam} · Random Wrong` })} />
        <ActionButton icon={Search} label="Random new" meta="Unanswered only" onClick={() => startQuiz({ mode: 'unanswered', count: 20, label: `${cert.exam} · Random New` })} />
        <ActionButton icon={Brain} label="Weak areas" meta="Spaced repetition" onClick={() => startQuiz({ mode: 'weak', count: 'all', label: `${cert.exam} · Weak Areas` })} />
        <ActionButton icon={Flag} label="Flagged" meta="Saved for review" onClick={() => startQuiz({ mode: 'flagged', count: 'all', label: `${cert.exam} · Flagged` })} />
      </div>
      <div>
        <SectionHeader kicker={`Exam ${sectionLabel}`} title="Focused practice" description="Sequential section runs — progress tracked per question." />
        <PartGrid cert={cert} sections={sections} startQuiz={startQuiz} partProgress={partProgress} />
      </div>
    </section>
  );
}
