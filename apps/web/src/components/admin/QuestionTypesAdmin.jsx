import { useState } from 'react';
import { Loader2, Pencil, Plus, Trash2 } from 'lucide-react';
import { questionTypesApi } from '../../api/client';
import { useQuestionTypes } from '../../context/QuestionTypesContext';

const EMPTY_FORM = {
  slug: '',
  label: '',
  legacyKind: 'other',
  legacyType: 'interactive',
  schemaJson: '{"editor":"generic","fields":["instructions"]}',
  sortOrder: 0,
  isActive: true,
};

export function QuestionTypesAdmin() {
  const { types, loading, refresh } = useQuestionTypes();
  const [form, setForm] = useState(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  function openCreate() {
    setForm({ ...EMPTY_FORM, sortOrder: (types.length + 1) * 10 });
    setError('');
  }

  function openEdit(row) {
    setForm({
      id: row.id,
      slug: row.slug,
      label: row.label,
      legacyKind: row.legacyKind,
      legacyType: row.legacyType,
      schemaJson: JSON.stringify(row.schema ?? {}, null, 2),
      sortOrder: row.sortOrder,
      isActive: row.isActive,
    });
    setError('');
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    let schema;
    try {
      schema = JSON.parse(form.schemaJson);
    } catch {
      setError('Schema must be valid JSON.');
      return;
    }
    const body = {
      slug: form.slug.trim(),
      label: form.label.trim(),
      legacyKind: form.legacyKind,
      legacyType: form.legacyType,
      schema,
      sortOrder: Number(form.sortOrder) || 0,
      isActive: form.isActive,
    };
    setSaving(true);
    try {
      if (form.id) {
        await questionTypesApi.update(form.id, body);
      } else {
        await questionTypesApi.create(body);
      }
      await refresh();
      setForm(null);
    } catch (err) {
      setError(err.message || 'Save failed');
    } finally {
      setSaving(false);
    }
  }

  async function deactivate(row) {
    if (!window.confirm(`Deactivate type "${row.label}"?`)) return;
    setSaving(true);
    try {
      await questionTypesApi.remove(row.id);
      await refresh();
    } catch (err) {
      setError(err.message || 'Deactivate failed');
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="panel space-y-4 p-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <p className="section-kicker">Admin</p>
          <h3 className="text-lg font-bold">Question types</h3>
          <p className="text-xs text-muted dark:text-slate-400">Stored in the database. Used for edit forms and rendering.</p>
        </div>
        <button type="button" className="primary-button !py-2 text-sm" onClick={openCreate}>
          <Plus size={16} />
          Add type
        </button>
      </div>

      {loading ? (
        <p className="flex items-center gap-2 text-sm text-muted">
          <Loader2 size={16} className="animate-spin" />
          Loading types…
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-line text-xs uppercase text-muted dark:border-gh-border">
                <th className="py-2 pr-3">Slug</th>
                <th className="py-2 pr-3">Label</th>
                <th className="py-2 pr-3">Editor</th>
                <th className="py-2 pr-3">Legacy</th>
                <th className="py-2 pr-3">Active</th>
                <th className="py-2" />
              </tr>
            </thead>
            <tbody>
              {types.map((row) => (
                <tr key={row.id} className="border-b border-line/50 dark:border-gh-border/50">
                  <td className="py-2 pr-3 font-mono text-xs">{row.slug}</td>
                  <td className="py-2 pr-3">{row.label}</td>
                  <td className="py-2 pr-3 text-xs">{row.schema?.editor ?? '—'}</td>
                  <td className="py-2 pr-3 text-xs">
                    {row.legacyKind} / {row.legacyType}
                  </td>
                  <td className="py-2 pr-3">{row.isActive ? 'Yes' : 'No'}</td>
                  <td className="py-2">
                    <div className="flex gap-1">
                      <button type="button" className="icon-button h-8 w-8" onClick={() => openEdit(row)} title="Edit">
                        <Pencil size={14} />
                      </button>
                      {row.isActive && (
                        <button type="button" className="icon-button h-8 w-8" onClick={() => deactivate(row)} title="Deactivate">
                          <Trash2 size={14} />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {form && (
        <form className="space-y-3 rounded-xl border border-accent-200/80 bg-accent-50/30 p-4 dark:border-accent-500/30 dark:bg-accent-500/5" onSubmit={handleSubmit}>
          <p className="text-sm font-bold">{form.id ? 'Edit type' : 'New type'}</p>
          <div className="grid gap-3 sm:grid-cols-2">
            <label className="block">
              <span className="auth-field-label">Slug</span>
              <input
                className="auth-input !pl-4 w-full font-mono text-sm"
                value={form.slug}
                onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))}
                required
                disabled={Boolean(form.id)}
                pattern="[a-z][a-z0-9_]*"
              />
            </label>
            <label className="block">
              <span className="auth-field-label">Label</span>
              <input
                className="auth-input !pl-4 w-full"
                value={form.label}
                onChange={(e) => setForm((f) => ({ ...f, label: e.target.value }))}
                required
              />
            </label>
            <label className="block">
              <span className="auth-field-label">Legacy kind</span>
              <input
                className="auth-input !pl-4 w-full"
                value={form.legacyKind}
                onChange={(e) => setForm((f) => ({ ...f, legacyKind: e.target.value }))}
              />
            </label>
            <label className="block">
              <span className="auth-field-label">Legacy type</span>
              <select
                className="auth-input !pl-4 w-full"
                value={form.legacyType}
                onChange={(e) => setForm((f) => ({ ...f, legacyType: e.target.value }))}
              >
                <option value="mc">mc</option>
                <option value="interactive">interactive</option>
              </select>
            </label>
            <label className="block">
              <span className="auth-field-label">Sort order</span>
              <input
                type="number"
                className="auth-input !pl-4 w-full"
                value={form.sortOrder}
                onChange={(e) => setForm((f) => ({ ...f, sortOrder: e.target.value }))}
              />
            </label>
            <label className="flex items-center gap-2 pt-6 text-sm">
              <input
                type="checkbox"
                checked={form.isActive}
                onChange={(e) => setForm((f) => ({ ...f, isActive: e.target.checked }))}
              />
              Active
            </label>
          </div>
          <label className="block">
            <span className="auth-field-label">Schema (JSON)</span>
            <textarea
              className="auth-input !pl-4 min-h-[100px] w-full font-mono text-xs"
              value={form.schemaJson}
              onChange={(e) => setForm((f) => ({ ...f, schemaJson: e.target.value }))}
            />
            <p className="mt-1 text-xs text-muted dark:text-slate-500">
              e.g. {`{"editor":"choices","correctMode":"single","quizEligibleDefault":true}`} or{' '}
              {`{"editor":"drag_drop","fields":["template","items","drop_zones"]}`}
            </p>
          </label>
          {error && <p className="auth-error">{error}</p>}
          <div className="flex gap-2">
            <button type="submit" className="primary-button" disabled={saving}>
              {saving ? 'Saving…' : 'Save type'}
            </button>
            <button type="button" className="ghost-button" onClick={() => setForm(null)}>
              Cancel
            </button>
          </div>
        </form>
      )}
      {error && !form && <p className="auth-error">{error}</p>}
    </div>
  );
}
