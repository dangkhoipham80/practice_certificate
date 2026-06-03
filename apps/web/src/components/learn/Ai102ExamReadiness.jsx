import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  BookOpen,
  ChevronDown,
  ExternalLink,
  FlaskConical,
  Lightbulb,
  Play,
  PlayCircle,
  Search,
} from 'lucide-react';
import { pathFromRouteId } from '../../config/routes';
import { AI102_EXAM_DOMAINS, AI102_READINESS_EPISODES } from '../../data/ai102ExamReadiness';
import { AI102_LAB_CATALOG } from './Ai102Labs';
import { getDomainLabel } from '../../utils/ai102DomainClassifier';
import {
  getDomainQuestionStats,
  getExamTopicsForDomain,
  getQuizIndicesForDomain,
} from '../../utils/ai102StudyPlan';

const DOMAIN_BAR = {
  violet: 'bg-violet-500',
  sky: 'bg-sky-500',
  emerald: 'bg-emerald-500',
  amber: 'bg-amber-500',
  rose: 'bg-rose-500',
  indigo: 'bg-indigo-500',
};

function DomainWeightBar({ domain }) {
  const mid = (domain.weightMin + domain.weightMax) / 2;
  return (
    <div className="space-y-1.5">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <p className="text-sm font-semibold text-ink dark:text-slate-100">{domain.title}</p>
        <p className="text-xs font-bold text-muted dark:text-slate-400">
          {domain.weightMin}–{domain.weightMax}%
          {domain.highlight && (
            <span className="ml-2 text-sky-600 dark:text-sky-300">· focus extra time</span>
          )}
        </p>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
        <div
          className={`h-full rounded-full ${DOMAIN_BAR[domain.color] ?? 'bg-accent'}`}
          style={{ width: `${mid}%` }}
        />
      </div>
      {domain.videoWeight && (
        <p className="text-[11px] text-muted dark:text-slate-500">Video series: {domain.videoWeight}</p>
      )}
    </div>
  );
}

function EpisodeStudyPlan({ episode, cert, startQuiz }) {
  const stats = useMemo(
    () => getDomainQuestionStats(cert.questions, episode.domainId),
    [cert.questions, episode.domainId],
  );
  const labs = useMemo(
    () => AI102_LAB_CATALOG.filter((lab) => lab.domainId === episode.domainId && lab.fit === 'High').slice(0, 5),
    [episode.domainId],
  );
  const practicePath = `${pathFromRouteId('practice', cert.id)}?domain=${episode.domainId}`;
  const labsPath = `${pathFromRouteId('labs', cert.id)}?domain=${episode.domainId}`;
  const examTopics = getExamTopicsForDomain(episode.domainId);

  function startDomainQuiz(count = 20) {
    const indices = getQuizIndicesForDomain(cert.questions, episode.domainId);
    if (!indices.length) return;
    startQuiz({
      customIndices: indices,
      count: count === 'all' ? 'all' : Math.min(count, indices.length),
      label: `${cert.exam} · ${getDomainLabel(episode.domainId)}`,
    });
  }

  return (
    <div className="rounded-xl border border-line/80 bg-subtle/40 p-4 dark:border-gh-border dark:bg-gh-subtle/30">
      <p className="text-xs font-bold uppercase tracking-wide text-muted dark:text-slate-500">Study plan</p>
      <div className="mt-3 grid gap-4 lg:grid-cols-3">
        <div>
          <p className="flex items-center gap-1.5 text-sm font-bold text-ink dark:text-slate-100">
            <BookOpen size={16} className="text-accent" />
            Learn
          </p>
          <ul className="mt-2 space-y-2">
            {(episode.studyPaths ?? []).map((path) => (
              <li key={path.url}>
                <a
                  className="text-sm font-semibold text-accent-600 hover:underline dark:text-accent-300"
                  href={path.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {path.title}
                  <ExternalLink className="ml-1 inline" size={12} />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="flex items-center gap-1.5 text-sm font-bold text-ink dark:text-slate-100">
            <Play size={16} className="text-accent" />
            Quiz
          </p>
          <p className="mt-2 text-sm text-muted dark:text-slate-400">
            <span className="font-semibold text-ink dark:text-slate-200">{stats.quizEligible}</span> MC questions
            tagged to this domain (of {stats.total} total in bank).
          </p>
          <p className="mt-1 text-xs text-muted dark:text-slate-500">
            ExamTopics sections (primary):{' '}
            {examTopics.map((t) => `Topic ${t}`).join(', ') || '—'}
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <button className="secondary-button !min-h-9" type="button" onClick={() => startDomainQuiz(20)}>
              Quiz 20
            </button>
            <button className="secondary-button !min-h-9" type="button" onClick={() => startDomainQuiz('all')}>
              Full domain
            </button>
            <Link className="secondary-button !min-h-9" to={practicePath}>
              Practice page
            </Link>
          </div>
        </div>

        <div>
          <p className="flex items-center gap-1.5 text-sm font-bold text-ink dark:text-slate-100">
            <FlaskConical size={16} className="text-accent" />
            Labs
          </p>
          <ul className="mt-2 space-y-1.5 text-sm text-muted dark:text-slate-400">
            {labs.map((lab) => (
              <li key={lab.url}>
                <a className="font-semibold text-accent-600 hover:underline dark:text-accent-300" href={lab.url} target="_blank" rel="noopener noreferrer">
                  {lab.title}
                </a>
              </li>
            ))}
          </ul>
          <Link className="secondary-button mt-3 !min-h-9" to={labsPath}>
            All labs for this domain
          </Link>
        </div>
      </div>
    </div>
  );
}

function EpisodeCard({ episode, cert, startQuiz, open, onToggle }) {
  const stats = useMemo(
    () => getDomainQuestionStats(cert.questions, episode.domainId),
    [cert.questions, episode.domainId],
  );

  return (
    <article className={`panel overflow-hidden transition-colors ${open ? 'border-accent-300 dark:border-accent-500/40' : ''}`}>
      <button
        type="button"
        className="flex w-full items-start gap-3 p-5 text-left transition-colors hover:bg-subtle/60 dark:hover:bg-gh-subtle/50"
        onClick={onToggle}
        aria-expanded={open}
      >
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-accent-100 text-sm font-black text-accent-800 dark:bg-accent-500/15 dark:text-accent-200">
          {episode.part}
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-xs font-bold uppercase tracking-wide text-muted dark:text-slate-500">
            Episode {episode.part} · Exam Readiness Zone
          </p>
          <h3 className="mt-0.5 text-base font-black text-ink dark:text-slate-100">{episode.title}</h3>
          <div className="mt-2 flex flex-wrap gap-2 text-xs font-semibold">
            <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-slate-700 dark:bg-slate-700 dark:text-slate-200">
              Study guide: {episode.studyGuideWeight}
            </span>
            <span className="rounded-full bg-sky-100 px-2.5 py-0.5 text-sky-800 dark:bg-sky-500/15 dark:text-sky-200">
              Video: {episode.videoWeight}
            </span>
            <span className="rounded-full bg-violet-100 px-2.5 py-0.5 text-violet-800 dark:bg-violet-500/15 dark:text-violet-200">
              {stats.quizEligible} MC · {stats.total} Q
            </span>
          </div>
        </div>
        <ChevronDown
          className={`mt-1 shrink-0 text-muted transition-transform duration-200 dark:text-slate-500 ${open ? 'rotate-180' : ''}`}
          size={20}
        />
      </button>

      {open && (
        <div className="space-y-4 border-t border-line/70 px-5 pb-5 pt-4 dark:border-gh-border">
          <div className="flex flex-wrap items-center gap-3">
            <a className="secondary-button !min-h-9" href={episode.videoUrl} target="_blank" rel="noopener noreferrer">
              <PlayCircle size={16} />
              Watch on Microsoft Learn
              <ExternalLink size={14} />
            </a>
          </div>

          {startQuiz && <EpisodeStudyPlan cert={cert} episode={episode} startQuiz={startQuiz} />}

          {episode.sections.map((section) => (
            <div key={section.heading}>
              <h4 className="text-sm font-bold text-ink dark:text-slate-100">{section.heading}</h4>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-muted dark:text-slate-400">
                {section.topics.map((topic) => (
                  <li key={topic}>{topic}</li>
                ))}
              </ul>
            </div>
          ))}

          {episode.examTips?.length > 0 && (
            <div className="rounded-xl border border-amber-200/80 bg-amber-50/60 p-4 dark:border-amber-400/25 dark:bg-amber-500/10">
              <div className="flex gap-2">
                <Lightbulb className="mt-0.5 shrink-0 text-amber-600 dark:text-amber-300" size={18} />
                <div>
                  <p className="text-sm font-bold text-amber-900 dark:text-amber-100">Exam tips</p>
                  <ul className="mt-2 list-disc space-y-1 pl-4 text-sm text-amber-900/85 dark:text-amber-100/85">
                    {episode.examTips.map((tip) => (
                      <li key={tip}>{tip}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </article>
  );
}

function DomainQuestionMatrix({ cert }) {
  const rows = useMemo(() => {
    return AI102_EXAM_DOMAINS.map((domain) => {
      const stats = getDomainQuestionStats(cert.questions, domain.id);
      const topics = Object.entries(
        cert.questions.reduce((acc, q) => {
          if (q.domainId !== domain.id) return acc;
          acc[q.topic] = (acc[q.topic] ?? 0) + 1;
          return acc;
        }, {}),
      )
        .sort((a, b) => Number(a[0]) - Number(b[0]))
        .map(([topic, count]) => `T${topic} (${count})`)
        .join(', ');
      return { domain, stats, topics };
    });
  }, [cert.questions]);

  return (
    <div className="panel overflow-x-auto p-5">
      <p className="text-xs font-bold uppercase text-muted dark:text-slate-400">Question bank by domain</p>
      <p className="mt-1 text-sm text-muted dark:text-slate-400">
        Each question has a <code className="text-xs">domainId</code> from keyword rules + ExamTopics topic fallback.
        Practice by domain uses this tag, not only ExamTopics Topic 1–15.
      </p>
      <table className="mt-4 w-full min-w-[520px] text-left text-sm">
        <thead>
          <tr className="border-b border-line/70 text-xs font-bold uppercase text-muted dark:border-gh-border">
            <th className="py-2 pr-4">Domain</th>
            <th className="py-2 pr-4">MC / Total</th>
            <th className="py-2">ExamTopics mix</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(({ domain, stats, topics }) => (
            <tr className="border-b border-line/50 dark:border-gh-border" key={domain.id}>
              <td className="py-2.5 pr-4 font-semibold text-ink dark:text-slate-100">{domain.title}</td>
              <td className="py-2.5 pr-4 text-muted dark:text-slate-400">
                {stats.quizEligible} / {stats.total}
              </td>
              <td className="py-2.5 text-xs text-muted dark:text-slate-500">{topics || '—'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function Ai102ExamReadiness({ cert, startQuiz }) {
  const [search, setSearch] = useState('');
  const [openParts, setOpenParts] = useState(() => new Set([1, 2]));
  const [domainFilter, setDomainFilter] = useState('all');

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return AI102_READINESS_EPISODES.filter((ep) => {
      if (domainFilter !== 'all' && ep.domainId !== domainFilter) return false;
      if (!q) return true;
      const blob = [
        ep.title,
        ep.learningPathMatch,
        ...ep.sections.flatMap((s) => [s.heading, ...s.topics]),
        ...(ep.examTips ?? []),
      ]
        .join(' ')
        .toLowerCase();
      return blob.includes(q);
    });
  }, [search, domainFilter]);

  useEffect(() => {
    if (!search.trim()) return;
    setOpenParts(new Set(filtered.map((ep) => ep.part)));
  }, [search, filtered]);

  function togglePart(part) {
    setOpenParts((prev) => {
      const next = new Set(prev);
      if (next.has(part)) next.delete(part);
      else next.add(part);
      return next;
    });
  }

  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-2xl font-black text-ink dark:text-slate-100">Exam Readiness Zone (6 videos)</h2>
        <p className="mt-1 max-w-3xl text-sm text-muted dark:text-slate-400">
          Checklist from six Microsoft prep video transcripts (Bobbie Russell), aligned to skills measured Dec 2025.
          Episode 2 (Generative AI) is the heaviest in the video series. For the real exam, prioritize weights on the{' '}
          <a
            className="font-semibold text-accent-600 hover:underline dark:text-accent-300"
            href="https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/ai-102"
            target="_blank"
            rel="noopener noreferrer"
          >
            official study guide
          </a>
          ; video percentages may differ slightly.
        </p>
      </div>

      <div className="panel p-5">
        <p className="text-xs font-bold uppercase text-muted dark:text-slate-400">Domain weights (study guide)</p>
        <div className="mt-4 space-y-4">
          {AI102_EXAM_DOMAINS.map((domain) => (
            <DomainWeightBar domain={domain} key={domain.id} />
          ))}
        </div>
      </div>

      {cert && <DomainQuestionMatrix cert={cert} />}

      <div className="panel p-4 space-y-3">
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            className={`filter-chip ${domainFilter === 'all' ? 'filter-chip-active' : ''}`}
            onClick={() => setDomainFilter('all')}
          >
            All domains
          </button>
          {AI102_EXAM_DOMAINS.map((domain) => (
            <button
              key={domain.id}
              type="button"
              className={`filter-chip ${domainFilter === domain.id ? 'filter-chip-active' : ''}`}
              onClick={() => setDomainFilter(domain.id)}
            >
              {domain.title.replace('Implement ', '').replace('Plan and manage an Azure AI solution', 'Plan & manage')}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex min-w-0 flex-1 items-center gap-3">
            <Search className="shrink-0 text-accent-500" size={18} />
            <input
              className="w-full bg-transparent text-sm outline-none placeholder:text-muted/70"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search: RAG, Custom Vision, PII, Document Intelligence..."
            />
          </div>
          <div className="flex shrink-0 gap-2">
            <button className="learn-toolbar-btn" type="button" onClick={() => setOpenParts(new Set(filtered.map((e) => e.part)))}>
              Expand all
            </button>
            <button className="learn-toolbar-btn" type="button" onClick={() => setOpenParts(new Set())}>
              Collapse all
            </button>
          </div>
        </div>
        <p className="mt-2 text-xs text-muted dark:text-slate-500">
          {search.trim()
            ? `${filtered.length} / ${AI102_READINESS_EPISODES.length} episodes match`
            : `${AI102_READINESS_EPISODES.length} episodes · expand for Learn, Quiz, and Labs`}
        </p>
      </div>

      <div className="space-y-3">
        {filtered.map((episode) => (
          <EpisodeCard
            cert={cert}
            episode={episode}
            key={episode.part}
            open={openParts.has(episode.part)}
            onToggle={() => togglePart(episode.part)}
            startQuiz={startQuiz}
          />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="empty-state text-sm">No episodes match your search.</p>
      )}
    </section>
  );
}
