import { useMemo, useState } from 'react';
import { Play } from 'lucide-react';
import { getUnansweredIndices, getWrongIndices } from '../../lib/progressUtils';
import {
  QUIZ_DOMAIN_NONE,
  QUIZ_DOMAIN_NONE_LABEL,
  countQuizByDomain,
  getQuizIndicesForDomainFilter,
  isInQuizPool,
} from '../../lib/quizDomains';
import { shuffle } from '../../lib/quizUtils';
import { useCertTaxonomy } from '../../hooks/useCertTaxonomy';
import { SectionHeader } from '../ui/SectionHeader';

export function QuizCustomSetup({ cert, startQuiz, partProgress }) {
  const { questions, partSizes, partStarts } = cert;
  const { domains, domainLabelMap } = useCertTaxonomy(cert.id);
  const domainCounts = useMemo(() => countQuizByDomain(questions, domains), [questions, domains]);
  const sectionPrefix = cert.id === 'ai-102' ? 'D' : cert.id.startsWith('ai-') ? 'T' : 'P';
  const [parts, setParts] = useState(() => partSizes.map((size, index) => (size ? index : null)).filter((index) => index !== null));
  const [questionType, setQuestionType] = useState('all');
  const [source, setSource] = useState('all');
  const [order, setOrder] = useState('random');
  const [count, setCount] = useState('20');
  const [domainFilter, setDomainFilter] = useState('all');

  function togglePart(index) {
    setParts((current) => (current.includes(index) ? current.filter((item) => item !== index) : [...current, index].sort((a, b) => a - b)));
  }

  function launchCustomFixed() {
    let pool = [];
    parts.forEach((partIndex) => {
      const start = partStarts[partIndex];
      for (let i = 0; i < partSizes[partIndex]; i += 1) {
        const questionIndex = start + i;
        const question = questions[questionIndex];
        if (!isInQuizPool(question)) continue;
        if (questionType === 'multiple' && !question.multiple) continue;
        if (questionType === 'single' && question.multiple) continue;
        pool.push(questionIndex);
      }
    });
    if (!pool.length) return window.alert('No questions match.');
    if (domainFilter !== 'all') {
      const allowed = new Set(getQuizIndicesForDomainFilter(questions, domainFilter));
      pool = pool.filter((index) => allowed.has(index));
      if (!pool.length) return window.alert('No questions match the selected domain.');
    }
    if (source === 'wrong') {
      pool = pool.filter((index) => getWrongIndices(partProgress, partSizes, partStarts).includes(index));
      if (!pool.length) return window.alert('No wrong answers in the selected scope!');
    }
    if (source === 'unanswered') {
      pool = pool.filter((index) => getUnansweredIndices(partProgress, partSizes, partStarts).includes(index));
      if (!pool.length) return window.alert('All questions in the selected scope have been answered!');
    }
    const ordered = order === 'random' ? shuffle(pool) : [...pool];
    const parsed = count.trim() ? Math.min(Number(count) || ordered.length, ordered.length) : ordered.length;
    const srcLabel = source === 'wrong' ? ' (Wrong)' : source === 'unanswered' ? ' (New)' : '';
    const domainLabel =
      domainFilter === 'all'
        ? ''
        : domainFilter === QUIZ_DOMAIN_NONE
          ? ` · ${QUIZ_DOMAIN_NONE_LABEL}`
          : ` · ${domainLabelMap[domainFilter] ?? domainFilter}`;
    startQuiz({
      mode: 'custom',
      count: parsed,
      label: `${cert.exam} · ${order === 'random' ? 'Random' : 'Sequential'}${srcLabel}${domainLabel} · ${parsed}`,
      shufflePool: false,
      customIndices: ordered.slice(0, parsed)
    });
  }

  return (
    <div className="panel space-y-4 p-5">
      <SectionHeader kicker="Custom quiz" title="Build your session" description="Filter by section, question type, and wrong/unanswered pools." />
      <div className="flex flex-wrap gap-2">
        {partSizes.map((size, index) => (
          <label className={`filter-chip ${size ? 'cursor-pointer' : 'cursor-not-allowed opacity-50'} ${parts.includes(index) ? 'filter-chip-active' : ''}`} key={index}>
            <input className="hidden" type="checkbox" checked={parts.includes(index)} disabled={!size} onChange={() => togglePart(index)} />
            {sectionPrefix}{String(index + 1).padStart(2, '0')} ({size})
          </label>
        ))}
      </div>
      {domains.length > 0 && (
        <div>
          <p className="mb-2 text-xs font-bold uppercase text-muted">Quiz domain</p>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              className={`filter-chip ${domainFilter === 'all' ? 'filter-chip-active' : ''}`}
              onClick={() => setDomainFilter('all')}
            >
              All domains ({domainCounts.all})
            </button>
            {domains.map((d) => (
              <button
                key={d.slug}
                type="button"
                className={`filter-chip ${domainFilter === d.slug ? 'filter-chip-active' : ''}`}
                onClick={() => setDomainFilter(d.slug)}
              >
                {d.title} ({domainCounts[d.slug] ?? 0})
              </button>
            ))}
            {(domainCounts[QUIZ_DOMAIN_NONE] ?? 0) > 0 && (
              <button
                type="button"
                className={`filter-chip ${domainFilter === QUIZ_DOMAIN_NONE ? 'filter-chip-active' : ''}`}
                onClick={() => setDomainFilter(QUIZ_DOMAIN_NONE)}
              >
                {QUIZ_DOMAIN_NONE_LABEL} ({domainCounts[QUIZ_DOMAIN_NONE]})
              </button>
            )}
          </div>
        </div>
      )}
      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <p className="mb-2 text-xs font-bold uppercase text-muted">Question type</p>
          <div className="flex flex-wrap gap-2">
            {[
              ['all', 'All'],
              ['single', 'Single'],
              ['multiple', 'Multiple']
            ].map(([id, label]) => (
              <button key={id} className={`filter-chip ${questionType === id ? 'filter-chip-active' : ''}`} onClick={() => setQuestionType(id)} type="button">
                {label}
              </button>
            ))}
          </div>
        </div>
        <div>
          <p className="mb-2 text-xs font-bold uppercase text-muted">Source</p>
          <div className="flex flex-wrap gap-2">
            {[
              ['all', 'All'],
              ['wrong', 'Wrong only'],
              ['unanswered', 'Unanswered']
            ].map(([id, label]) => (
              <button key={id} className={`filter-chip ${source === id ? 'filter-chip-active' : ''}`} onClick={() => setSource(id)} type="button">
                {label}
              </button>
            ))}
          </div>
        </div>
        <div>
          <p className="mb-2 text-xs font-bold uppercase text-muted">Order & count</p>
          <div className="flex flex-wrap gap-2">
            {[
              ['random', 'Random'],
              ['seq', 'Sequential']
            ].map(([id, label]) => (
              <button key={id} className={`filter-chip ${order === id ? 'filter-chip-active' : ''}`} onClick={() => setOrder(id)} type="button">
                {label}
              </button>
            ))}
          </div>
          <input
            className="mt-2 w-full rounded-xl border border-line/80 bg-white px-3 py-2 text-sm dark:border-gh-border dark:bg-gh-subtle"
            value={count}
            onChange={(event) => setCount(event.target.value)}
            placeholder="Question count (blank = all)"
          />
        </div>
      </div>
      <button className="primary-button" onClick={launchCustomFixed} type="button">
        <Play size={16} />
        Launch custom quiz
      </button>
    </div>
  );
}
