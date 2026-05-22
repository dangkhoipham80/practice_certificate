import { Play, RotateCcw } from 'lucide-react';

export function ResumeQuizDialog({ inProgress, nextLabel, onContinue, onStartFresh, onCancel }) {
  const answered = inProgress.checked?.filter(Boolean).length ?? 0;
  return (
    <div className="modal-overlay" role="dialog" aria-modal="true" aria-labelledby="resume-quiz-title">
      <button className="modal-backdrop" type="button" aria-label="Đóng" onClick={onCancel} />
      <div className="modal-card panel max-w-md p-6 animate-slide-up">
        <p className="section-kicker">Quiz đang dở</p>
        <h2 id="resume-quiz-title" className="mt-2 text-xl font-extrabold tracking-tight">
          Tiếp tục hay làm mới?
        </h2>
        <p className="mt-3 text-sm leading-6 text-muted dark:text-slate-400">
          Bạn có phiên <span className="font-semibold text-ink dark:text-slate-200">{inProgress.label}</span> chưa hoàn thành
          (câu {(inProgress.current ?? 0) + 1}/{inProgress.indices.length}
          {answered > 0 ? `, đã check ${answered}` : ''}).
        </p>
        <p className="mt-2 text-sm text-muted dark:text-slate-400">
          Chọn <span className="font-semibold">Làm tiếp</span> để quay lại phiên cũ, hoặc <span className="font-semibold">Làm mới</span> để bắt đầu {nextLabel}.
        </p>
        <div className="mt-6 flex flex-col gap-2 sm:flex-row">
          <button className="primary-button flex-1" onClick={onContinue}>
            <Play size={16} />
            Làm tiếp
          </button>
          <button className="secondary-button flex-1" onClick={onStartFresh}>
            <RotateCcw size={16} />
            Làm mới từ đầu
          </button>
          <button className="ghost-button sm:flex-none" onClick={onCancel}>
            Hủy
          </button>
        </div>
      </div>
    </div>
  );
}
