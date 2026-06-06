import { X } from 'lucide-react';
import { getSectionBadgeLabel } from '../../lib/examSections';
import { computePartStats } from '../../lib/statsUtils';

export function PartDetailPanel({ cert, sections, partIndex, partProgress, onClose }) {
  if (partIndex === null) return null;
  const section = sections[partIndex];
  if (!section) return null;
  const sectionLabel = cert.id === 'ai-102' ? 'Domain' : cert.id.startsWith('ai-') ? 'Topic' : 'Part';
  const stats = computePartStats(partIndex, partProgress, sections);
  const rows = partProgress[partIndex];

  return (
    <div className="panel p-5">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <p className="section-kicker">{sectionLabel} detail</p>
          <h3 className="text-lg font-extrabold">
            {getSectionBadgeLabel(cert, partIndex)} — {section.title}
          </h3>
        </div>
        <button className="icon-button" onClick={onClose} type="button" aria-label="Close part detail">
          <X size={18} />
        </button>
      </div>

      <div className="mb-4 flex items-center gap-3">
        <div className="progress-bar h-2 flex-1">
          <div
            className={`progress-bar-fill ${stats.pct >= 70 ? '!bg-success-500' : '!bg-amber-500'}`}
            style={{ width: `${stats.pct}%` }}
          />
        </div>
        <span className={`text-sm font-extrabold tabular-nums ${stats.pct >= 70 ? 'text-success-600 dark:text-success-400' : 'text-amber-600 dark:text-amber-400'}`}>
          {stats.pct}%
        </span>
      </div>

      <div className="mb-3 flex flex-wrap gap-3 text-[10px] font-semibold text-muted dark:text-slate-400">
        <span className="text-success-600 dark:text-success-400">{stats.correct} correct</span>
        <span className="text-danger-600 dark:text-danger-400">{stats.wrong} wrong</span>
        <span>{stats.unanswered} not attempted</span>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {Array.from({ length: stats.size }, (_, localIndex) => {
          const status = rows?.[localIndex] ?? null;
          const cellClass =
            status === 'correct'
              ? 'part-detail-cell part-detail-correct'
              : status === 'wrong'
                ? 'part-detail-cell part-detail-wrong'
                : 'part-detail-cell part-detail-idle';
          return (
            <div className={cellClass} key={localIndex} title={`Question ${localIndex + 1}`}>
              {localIndex + 1}
            </div>
          );
        })}
      </div>

      <div className="mt-3 flex flex-wrap gap-4 text-[10px] text-muted dark:text-slate-400">
        <span className="flex items-center gap-1.5">
          <span className="part-detail-cell part-detail-correct !h-3 !w-3 !text-[0px]" />
          Correct
        </span>
        <span className="flex items-center gap-1.5">
          <span className="part-detail-cell part-detail-wrong !h-3 !w-3 !text-[0px]" />
          Wrong
        </span>
        <span className="flex items-center gap-1.5">
          <span className="part-detail-cell part-detail-idle !h-3 !w-3 !text-[0px]" />
          Not attempted
        </span>
      </div>
    </div>
  );
}
