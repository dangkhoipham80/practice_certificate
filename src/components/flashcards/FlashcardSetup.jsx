import { useState } from 'react';
import { Flag, Play } from 'lucide-react';
import { partSizes } from '../../config/gh300Exam';
import { SectionHeader } from '../ui/SectionHeader';

export function FlashcardSetup({ launchFlash, flagged, weak, fcKnown, fcUnknown }) {
  const [parts, setParts] = useState(() => partSizes.map((_, index) => index));
  const [source, setSource] = useState('all');
  const [order, setOrder] = useState('random');
  const [count, setCount] = useState(0);

  function togglePart(index) {
    setParts((current) => (current.includes(index) ? current.filter((item) => item !== index) : [...current, index].sort((a, b) => a - b)));
  }

  return (
    <section className="animate-slide-up space-y-6">
      <SectionHeader
        kicker="Flashcards"
        title="Build your deck"
        description="Chọn part, nguồn câu, số lượng và thứ tự — giống GH-300 Pro (không giới hạn 40 câu)."
      />
      <div className="panel space-y-5 p-5">
        <div>
          <p className="mb-2 text-xs font-bold uppercase text-muted">Parts</p>
          <div className="flex flex-wrap gap-2">
            {partSizes.map((size, index) => (
              <button key={index} type="button" className={`filter-chip ${parts.includes(index) ? 'filter-chip-active' : ''}`} onClick={() => togglePart(index)}>
                P{String(index + 1).padStart(2, '0')} ({size})
              </button>
            ))}
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <p className="mb-2 text-xs font-bold uppercase text-muted">Source</p>
            <div className="flex flex-wrap gap-2">
              {[
                ['all', 'All'],
                ['weak', 'Weak only'],
                ['unknown', 'Previously unknown']
              ].map(([id, label]) => (
                <button key={id} type="button" className={`filter-chip ${source === id ? 'filter-chip-active' : ''}`} onClick={() => setSource(id)}>
                  {label}
                </button>
              ))}
            </div>
          </div>
          <div>
            <p className="mb-2 text-xs font-bold uppercase text-muted">Order</p>
            <div className="flex flex-wrap gap-2">
              {[
                ['random', 'Random'],
                ['seq', 'Sequential']
              ].map(([id, label]) => (
                <button key={id} type="button" className={`filter-chip ${order === id ? 'filter-chip-active' : ''}`} onClick={() => setOrder(id)}>
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div>
          <p className="mb-2 text-xs font-bold uppercase text-muted">Number of cards</p>
          <div className="flex flex-wrap gap-2">
            {[10, 20, 50, 100, 0].map((value) => (
              <button key={value} type="button" className={`filter-chip ${count === value ? 'filter-chip-active' : ''}`} onClick={() => setCount(value)}>
                {value === 0 ? 'All' : value}
              </button>
            ))}
          </div>
        </div>
        <div className="rounded-xl bg-subtle/80 px-4 py-3 text-xs text-muted dark:bg-gh-subtle/60 dark:text-slate-400">
          <span className="font-semibold text-success-600 dark:text-success-300">Known: {fcKnown.length}</span>
          {' · '}
          <span className="font-semibold text-danger-600 dark:text-danger-300">Unknown: {fcUnknown.length}</span>
          {' · '}
          <span>Flagged: {flagged.length}</span>
          {' · '}
          <span>Weak: {Object.keys(weak).length}</span>
        </div>
        <div className="flex flex-wrap gap-3">
          <button className="primary-button" type="button" onClick={() => launchFlash({ count, parts, source, order })}>
            <Play size={16} />
            Start flashcards
          </button>
          <button className="secondary-button" type="button" onClick={() => launchFlash({ mode: 'flagged', count: 0 })}>
            <Flag size={16} />
            Flagged only
          </button>
        </div>
      </div>
    </section>
  );
}
