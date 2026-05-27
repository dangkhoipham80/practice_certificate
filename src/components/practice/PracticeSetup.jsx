import { useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Brain, ClipboardList, Flag, Layers3, Play, RotateCcw, Search } from 'lucide-react';
import { getQuizQuestions } from '../../config/certRegistry';
import { pathFromRouteId } from '../../config/routes';
import { AI102_EXAM_DOMAINS } from '../../data/ai102ExamReadiness';
import { getDomainLabel } from '../../utils/ai102DomainClassifier';
import { getQuizIndicesForDomain } from '../../utils/ai102StudyPlan';
import { ActionButton } from '../ui/ActionButton';
import { SectionHeader } from '../ui/SectionHeader';
import { PartGrid } from '../shared/PartGrid';
import { QuizCustomSetup } from './QuizCustomSetup';

export function PracticeSetup({ cert, startQuiz, partProgress }) {
  const [searchParams] = useSearchParams();
  const domainFilter = searchParams.get('domain');
  const quizCount = getQuizQuestions(cert).length;
  const sectionLabel = cert.id.startsWith('ai-') ? 'topics' : 'parts';

  const domainQuizCount = useMemo(() => {
    if (cert.id !== 'ai-102' || !domainFilter) return 0;
    return getQuizIndicesForDomain(cert.questions, domainFilter).length;
  }, [cert, domainFilter]);

  function startDomainQuiz(count = 20) {
    const indices = getQuizIndicesForDomain(cert.questions, domainFilter);
    if (!indices.length) return;
    startQuiz({
      customIndices: indices,
      count: count === 'all' ? 'all' : Math.min(count, indices.length),
      label: `${cert.exam} · ${getDomainLabel(domainFilter)}`,
    });
  }

  return (
    <section className="space-y-6">
      {cert.id === 'ai-102' && domainFilter && domainQuizCount > 0 && (
        <div className="panel border-accent-200 bg-accent-50/50 p-5 dark:border-accent-500/30 dark:bg-accent-500/10">
          <p className="font-bold text-ink dark:text-slate-100">{getDomainLabel(domainFilter)}</p>
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

      {cert.id === 'ai-102' && (
        <div className="panel p-5">
          <p className="text-xs font-bold uppercase text-muted dark:text-slate-400">Practice by exam domain</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {AI102_EXAM_DOMAINS.map((domain) => (
              <Link
                key={domain.id}
                className={`filter-chip ${domainFilter === domain.id ? 'filter-chip-active' : ''}`}
                to={`${pathFromRouteId('practice', cert.id)}?domain=${domain.id}`}
              >
                {domain.title.replace('Implement ', '').replace('Plan and manage an Azure AI solution', 'Plan & manage')}
              </Link>
            ))}
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
        <PartGrid cert={cert} startQuiz={startQuiz} partProgress={partProgress} />
      </div>
    </section>
  );
}
