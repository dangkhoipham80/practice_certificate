import { ArrowRight } from 'lucide-react';
import { partSizes, partTitles } from '../../config/gh300Exam';
import { percent } from '../../lib/quizUtils';

export function PartGrid({ startQuiz, partProgress = {}, compact = false }) {
  return (
    <div className={compact ? 'panel divide-y divide-line overflow-hidden dark:divide-gh-border' : 'grid gap-3 md:grid-cols-2 xl:grid-cols-4'}>
      {partSizes.map((size, index) => {
        const rows = partProgress[index];
        const done = rows ? rows.filter((value) => value === 'correct').length : 0;
        const pct = rows ? percent(done, size) : 0;
        return (
          <button
            className={compact ? 'part-row' : 'panel group p-4 text-left transition hover:-translate-y-0.5 hover:border-accent-300 hover:shadow-soft dark:hover:border-accent-500/60'}
            key={partTitles[index]}
            onClick={() => startQuiz({ partIndex: index, count: 'all', label: `Part ${String(index + 1).padStart(2, '0')} · ${size}`, shufflePool: false })}
          >
            {compact ? (
              <>
                <span className="part-number">{index + 1}</span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate font-bold">{partTitles[index]}</span>
                  <span className="text-xs text-muted dark:text-slate-400">
                    {size} questions{rows ? ` · ${pct}%` : ''}
                  </span>
                </span>
                <ArrowRight className="text-accent-500 opacity-60 transition group-hover:opacity-100" size={18} />
              </>
            ) : (
              <>
                <div className="mb-3 flex items-center justify-between">
                  <p className="text-xs font-bold uppercase tracking-[0.12em] text-muted dark:text-slate-400">Part {index + 1}</p>
                  <span className="rounded-md bg-subtle px-2 py-1 text-xs font-semibold text-muted dark:bg-gh-subtle dark:text-slate-400">{rows ? `${pct}%` : size}</span>
                </div>
                <h3 className="font-bold group-hover:text-accent-600 dark:group-hover:text-accent-300">{partTitles[index]}</h3>
                <p className="mt-2 text-sm text-muted dark:text-slate-400">{size} questions</p>
              </>
            )}
          </button>
        );
      })}
    </div>
  );
}
