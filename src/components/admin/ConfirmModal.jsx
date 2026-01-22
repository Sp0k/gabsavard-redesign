import { FiX, FiTrash2 } from "react-icons/fi";

export function ConfirmModal({
  open,
  title = "Confirm",
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  danger = false,
  busy = false,
  onConfirm,
  onCancel,
  children,
}) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
      role="dialog"
      aria-modal="true"
      onMouseDown={onCancel}
    >
      <div
        className="w-full max-w-md rounded-lg bg-white shadow-lg"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b px-4 py-3">
          <h3 className="text-sm font-semibold text-stone-900">{title}</h3>
          <button
            type="button"
            onClick={onCancel}
            className="rounded p-1 hover:bg-stone-100"
            aria-label="Close"
          >
            <FiX />
          </button>
        </div>

        <div className="px-4 py-4">
          {message && <p className="text-sm text-stone-700">{message}</p>}
          {children}
        </div>

        <div className="flex items-center justify-end gap-2 border-t px-4 py-3">
          <button
            type="button"
            onClick={onCancel}
            disabled={busy}
            className="rounded border border-stone-300 px-3 py-1.5 text-sm hover:bg-stone-50 disabled:opacity-60"
          >
            {cancelText}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={busy}
            className={`inline-flex items-center gap-2 rounded px-3 py-1.5 text-sm text-white disabled:opacity-60
              ${danger ? "bg-red-600 hover:bg-red-700" : "bg-stone-900 hover:bg-stone-800"}`}
          >
            {danger && <FiTrash2 />}
            {busy ? "Working…" : confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
