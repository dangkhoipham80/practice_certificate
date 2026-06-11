import { ArrowRight } from 'lucide-react';
import { getSectionBadgeLabel } from '../../lib/examSections';
import { computePartStats } from '../../lib/statsUtils';

export function PartGrid({ cert, sections, startQuiz, partProgress = {}, compact = false, onShowDetail }) {
  const sectionLabel = cert.sectionLabel || 'part';

  return (
    <div className={compact ? 'panel divide-y divide-line overflow-hidden dark:divide-gh-border' : 'grid gap-3 md:grid-cols-2 xl:grid-cols-4'}>
      {sections.map((section, index) => {
        const size = section.questionIndices.length;
        const stats = computePartStats(index, partProgress, sections);
        const isEmpty = size === 0;
        const countText = isEmpty
          ? 'No questions in current bank'
          : `${size} questions${stats.hasProgress ? ` · ${stats.pct}% correct` : ''}`;
        return (
          <div
            className={compact ? '' : `panel group overflow-hidden p-0 transition ${isEmpty ? 'opacity-60' : 'hover:-translate-y-0.5 hover:border-accent-300 hover:shadow-soft dark:hover:border-accent-500/60'}`}
            key={section.key}
          >
            <button
              className={compact ? `part-row w-full ${isEmpty ? 'cursor-not-allowed' : ''}` : `w-full p-4 text-left ${isEmpty ? 'cursor-not-allowed' : ''}`}
              disabled={isEmpty}
              onClick={() =>
                startQuiz({
                  partIndex: index,
                  count: 'all',
                  label: `${sectionLabel} ${String(index + 1).padStart(2, '0')} · ${size}`,
                  shufflePool: false,
                })
              }
            >
              {compact ? (
                <>
                  <span className="part-number">{index + 1}</span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate font-bold">{section.title}</span>
                    <span className="text-xs text-muted dark:text-slate-400">
                      {countText}
                    </span>
                    {stats.hasProgress && (
                      <span className="progress-bar mt-2 h-1.5">
                        <span
                          className={`progress-bar-fill ${stats.pct >= 70 ? '!bg-success-500' : '!bg-amber-500'}`}
                          style={{ width: `${stats.pct}%` }}
                        />
                      </span>
                    )}
                  </span>
                  <ArrowRight className="text-accent-500 opacity-60 transition group-hover:opacity-100" size={18} />
                </>
              ) : (
                <>
                  <div className="mb-3 flex items-center justify-between">
                    <p className="text-xs font-bold uppercase tracking-[0.12em] text-muted dark:text-slate-400">
                      {getSectionBadgeLabel(cert, index)}
                    </p>
                    <span className="rounded-md bg-subtle px-2 py-1 text-xs font-semibold text-muted dark:bg-gh-subtle dark:text-slate-400">
                      {stats.hasProgress ? `${stats.pct}%` : size}
                    </span>
                  </div>
                  <h3 className="font-bold group-hover:text-accent-600 dark:group-hover:text-accent-300">{section.title}</h3>
                  <p className="mt-2 text-sm text-muted dark:text-slate-400">{isEmpty ? 'No questions in current bank' : `${size} questions`}</p>
                  {stats.hasProgress && (
                    <div className="progress-bar mt-3 h-1.5">
                      <div
                        className={`progress-bar-fill ${stats.pct >= 70 ? '!bg-success-500' : '!bg-amber-500'}`}
                        style={{ width: `${stats.pct}%` }}
                      />
                    </div>
                  )}
                </>
              )}
            </button>
            {stats.hasProgress && onShowDetail && (
              <div className={compact ? 'border-t border-line/60 px-5 pb-3 pt-0 dark:border-gh-border' : 'border-t border-line/60 px-4 pb-3 dark:border-gh-border'}>
                <button
                  className="text-[11px] font-semibold text-accent-600 hover:underline dark:text-accent-300"
                  type="button"
                  onClick={() => onShowDetail(index)}
                >
                  View details
                </button>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
