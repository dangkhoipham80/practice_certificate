import { Loader2 } from 'lucide-react';

export function ConfirmDialog({
  title,
  message,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  onConfirm,
  onCancel,
  loading = false,
  titleId = 'confirm-dialog-title',
}) {
  return (
    <div className="modal-overlay" role="dialog" aria-modal="true" aria-labelledby={titleId}>
      <button className="modal-backdrop" type="button" aria-label="Close" onClick={onCancel} disabled={loading} />
      <div className="modal-card panel max-w-md p-6 animate-slide-up">
        <h2 id={titleId} className="text-xl font-extrabold tracking-tight">
          {title}
        </h2>
        <p className="mt-3 text-sm leading-6 text-muted dark:text-slate-400">{message}</p>
        <div className="mt-6 flex flex-col gap-2 sm:flex-row">
          <button className="danger-button flex-1" onClick={onConfirm} disabled={loading} type="button">
            {loading ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                {confirmLabel}…
              </>
            ) : (
              confirmLabel
            )}
          </button>
          <button className="ghost-button sm:flex-none" onClick={onCancel} disabled={loading} type="button">
            {cancelLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
