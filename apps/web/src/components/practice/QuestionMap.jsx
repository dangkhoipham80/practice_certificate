import { useEffect, useState } from 'react';
import { gradeAnswer, isAnswerComplete, percent } from '../../lib/quizUtils';

export function QuestionMap({ cert, session, flagged, setSession }) {
  const { questions, GRID_PAGE_SIZE } = cert;
  const [gridPage, setGridPage] = useState(() => Math.floor(session.current / GRID_PAGE_SIZE));
  const answered = session.checked.filter(Boolean).length;
  const total = session.indices.length;
  const pages = Math.ceil(total / GRID_PAGE_SIZE);
  const start = gridPage * GRID_PAGE_SIZE;
  const end = Math.min(start + GRID_PAGE_SIZE, total);

  useEffect(() => {
    setGridPage(Math.floor(session.current / GRID_PAGE_SIZE));
  }, [session.current, GRID_PAGE_SIZE]);

  return (
    <aside className="panel h-fit p-4 xl:sticky xl:top-24">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-bold">Session map</h3>
        <span className="text-xs text-muted dark:text-slate-400">
          {answered}/{total} checked
        </span>
      </div>
      <div className="progress-bar mb-3">
        <div className="progress-bar-fill" style={{ width: `${percent(answered, total)}%` }} />
      </div>
      <div className="mb-3 grid grid-cols-2 gap-1 text-[10px] text-muted dark:text-slate-400">
        <span>⬜ Idle</span>
        <span className="text-accent-600">🟦 Selected</span>
        <span className="text-success-600">🟩 Correct</span>
        <span className="text-danger-600">🟥 Wrong</span>
      </div>
      <div className="grid grid-cols-8 gap-1.5">
        {session.indices.slice(start, end).map((questionIndex, offset) => {
          const index = start + offset;
          const done = session.checked[index];
          const question = questions[questionIndex];
          const picked = isAnswerComplete(session.answers[index], question);
          const ok = done && gradeAnswer(session.answers[index], question);
          let state = 'map-idle';
          if (session.current === index) state = 'map-current';
          else if (done) state = ok ? 'map-correct' : 'map-wrong';
          else if (picked) state = 'map-selected';
          return (
            <button key={`${questionIndex}-${index}`} className={`map-cell ${state}`} onClick={() => setSession({ ...session, current: index })} type="button">
              {index + 1}
              {flagged.includes(questionIndex) ? '🚩' : ''}
            </button>
          );
        })}
      </div>
      {pages > 1 && (
        <div className="mt-3 flex items-center justify-between text-[10px]">
          <button className="secondary-button !min-h-8 px-2 py-1" disabled={gridPage === 0} onClick={() => setGridPage((page) => page - 1)} type="button">
            ←
          </button>
          <span className="text-muted">
            {start + 1}–{end} / {total}
          </span>
          <button className="secondary-button !min-h-8 px-2 py-1" disabled={gridPage >= pages - 1} onClick={() => setGridPage((page) => page + 1)} type="button">
            →
          </button>
        </div>
      )}
    </aside>
  );
}
