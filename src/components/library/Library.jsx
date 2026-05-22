import { useState } from 'react';
import { Flag, Search } from 'lucide-react';
import { gh300Questions } from '../../data/gh300Questions';
import { SectionHeader } from '../ui/SectionHeader';

export function Library({ search, setSearch, flagged, toggleFlag }) {
  const [filter, setFilter] = useState('all');
  const filtered = gh300Questions
    .map((question, index) => ({ ...question, index }))
    .filter((question) => {
      if (filter === 'flagged' && !flagged.includes(question.index)) return false;
      if (filter === 'multi' && !question.multiple) return false;
      if (filter === 'single' && question.multiple) return false;
      return !search.trim() || `${question.text} ${question.choices.join(' ')}`.toLowerCase().includes(search.toLowerCase());
    });

  return (
    <section className="space-y-4">
      <SectionHeader
        kicker="Question library"
        title="Browse GH-300 bank"
        description={`${filtered.length} matching questions. Showing the first 80 for fast scanning.`}
      />
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
            ['single', 'Single-answer']
          ].map(([id, label]) => (
            <button key={id} className={`filter-chip ${filter === id ? 'filter-chip-active' : ''}`} onClick={() => setFilter(id)}>
              {label}
            </button>
          ))}
        </div>
      </div>
      <div className="grid gap-3">
        {filtered.slice(0, 80).map((question) => (
          <article className="question-row" key={question.index}>
            <div className="mb-3 flex items-start justify-between gap-3">
              <div className="flex min-w-0 gap-3">
                <span className="question-number">{question.index + 1}</span>
                <p className="text-sm font-semibold leading-6">{question.text}</p>
              </div>
              <button
                className={`icon-button h-9 w-9 shrink-0 ${flagged.includes(question.index) ? 'text-danger-600 dark:text-danger-300' : ''}`}
                onClick={() => toggleFlag(question.index)}
                title="Flag"
              >
                <Flag size={16} fill={flagged.includes(question.index) ? 'currentColor' : 'none'} />
              </button>
            </div>
            <p className="ml-10 text-xs text-muted dark:text-slate-400">
              {question.multiple ? 'Multiple answer' : 'Single answer'} · Correct:{' '}
              {question.correct.map((item) => String.fromCharCode(65 + item)).join(', ')}
            </p>
          </article>
        ))}
        {!filtered.length && (
          <div className="empty-state">
            <Search size={32} className="mb-3 text-muted/50" />
            <p className="text-sm font-semibold text-ink dark:text-slate-200">No questions match</p>
            <p className="mt-1 text-sm text-muted dark:text-slate-400">Try a different search or filter.</p>
          </div>
        )}
      </div>
    </section>
  );
}
