import { useState } from 'react';
import { Loader2, Pencil, Plus, Trash2 } from 'lucide-react';
import { certsApi } from '../../api/client';
import { useCertContext } from '../../context/CertContext';

const EMPTY_FORM = {
  id: '',
  examCode: '',
  name: '',
  provider: '',
  level: '',
  description: '',
  status: 'Draft',
  gridPageSize: 50,
  sectionMode: 'parts',
  sectionLabel: 'part',
  sectionBadgePrefix: 'P',
  learnEnabled: false,
  labsEnabled: false,
  learnContentType: 'none',
  labsContentType: 'none',
};

export function CertificationsAdmin() {
  const { certifications, catalogLoading, refreshCertifications } = useCertContext();
  const [form, setForm] = useState(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  function openCreate() {
    setForm({ ...EMPTY_FORM });
    setError('');
  }

  function openEdit(cert) {
    setForm({
      id: cert.id,
      examCode: cert.exam,
      name: cert.name,
      provider: cert.provider,
      level: cert.level,
      description: cert.description,
      status: cert.status,
      gridPageSize: cert.GRID_PAGE_SIZE,
      sectionMode: cert.sectionMode,
      sectionLabel: cert.sectionLabel,
      sectionBadgePrefix: cert.sectionBadgePrefix,
      learnEnabled: cert.features.learn,
      labsEnabled: cert.features.labs,
      learnContentType: cert.learnContentType,
      labsContentType: cert.labsContentType,
      editing: true,
    });
    setError('');
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setSaving(true);
    setError('');
    const payload = {
      examCode: form.examCode.trim(),
      name: form.name.trim(),
      provider: form.provider.trim(),
      level: form.level.trim(),
      description: form.description.trim(),
      status: form.status.trim(),
      gridPageSize: Number(form.gridPageSize),
      sectionMode: form.sectionMode,
      sectionLabel: form.sectionLabel.trim(),
      sectionBadgePrefix: form.sectionBadgePrefix.trim(),
      learnEnabled: form.learnEnabled,
      labsEnabled: form.labsEnabled,
      learnContentType: form.learnContentType,
      labsContentType: form.labsContentType,
    };
    try {
      if (form.editing) {
        await certsApi.update(form.id, payload);
      } else {
        await certsApi.create({ id: form.id.trim().toLowerCase(), ...payload });
      }
      await refreshCertifications();
      setForm(null);
    } catch (err) {
      setError(err.message || 'Could not save certification');
    } finally {
      setSaving(false);
    }
  }

  async function removeCertification(cert) {
    const questionWarning = cert.questionCount
      ? ` This also deletes ${cert.questionCount} questions and related progress.`
      : '';
    if (!window.confirm(`Delete ${cert.exam}?${questionWarning}`)) return;
    setSaving(true);
    setError('');
    try {
      await certsApi.remove(cert.id);
      await refreshCertifications();
      setForm((current) => (current?.id === cert.id ? null : current));
    } catch (err) {
      setError(err.message || 'Could not delete certification');
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="panel space-y-4 p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="section-kicker">Admin</p>
          <h3 className="text-lg font-bold">Manage certifications</h3>
          <p className="text-xs text-muted dark:text-slate-400">
            Metadata and workspace behavior are stored in PostgreSQL.
          </p>
        </div>
        <button type="button" className="primary-button" onClick={openCreate}>
          <Plus size={16} />
          Add certification
        </button>
      </div>

      {catalogLoading ? (
        <p className="flex items-center gap-2 text-sm text-muted">
          <Loader2 size={16} className="animate-spin" />
          Loading certifications...
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-line text-xs uppercase text-muted dark:border-gh-border">
                <th className="py-2 pr-3">ID</th>
                <th className="py-2 pr-3">Exam</th>
                <th className="py-2 pr-3">Status</th>
                <th className="py-2 pr-3">Questions</th>
                <th className="py-2" />
              </tr>
            </thead>
            <tbody>
              {certifications.map((cert) => (
                <tr key={cert.id} className="border-b border-line/50 dark:border-gh-border/50">
                  <td className="py-2 pr-3 font-mono text-xs">{cert.id}</td>
                  <td className="py-2 pr-3">
                    <span className="font-semibold">{cert.exam}</span>
                    <span className="ml-2 text-xs text-muted">{cert.name}</span>
                  </td>
                  <td className="py-2 pr-3">{cert.status}</td>
                  <td className="py-2 pr-3 tabular-nums">{cert.questionCount}</td>
                  <td className="py-2">
                    <div className="flex justify-end gap-1">
                      <button className="icon-button h-8 w-8" type="button" title="Edit" onClick={() => openEdit(cert)}>
                        <Pencil size={14} />
                      </button>
                      <button
                        className="icon-button h-8 w-8"
                        type="button"
                        title="Delete"
                        disabled={saving}
                        onClick={() => removeCertification(cert)}
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {form && (
        <form
          className="space-y-3 rounded-xl border border-accent-200/80 bg-accent-50/30 p-4 dark:border-accent-500/30 dark:bg-accent-500/5"
          onSubmit={handleSubmit}
        >
          <p className="text-sm font-bold">{form.editing ? `Edit ${form.examCode}` : 'New certification'}</p>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <Field label="ID">
              <input
                className="auth-input !pl-4 w-full font-mono"
                value={form.id}
                onChange={(event) => setForm((current) => ({ ...current, id: event.target.value }))}
                pattern="[a-z0-9]+(?:-[a-z0-9]+)*"
                disabled={form.editing}
                required
              />
            </Field>
            <Field label="Exam code">
              <input
                className="auth-input !pl-4 w-full"
                value={form.examCode}
                onChange={(event) => setForm((current) => ({ ...current, examCode: event.target.value }))}
                required
              />
            </Field>
            <Field label="Name">
              <input
                className="auth-input !pl-4 w-full"
                value={form.name}
                onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
                required
              />
            </Field>
            <Field label="Provider">
              <input
                className="auth-input !pl-4 w-full"
                value={form.provider}
                onChange={(event) => setForm((current) => ({ ...current, provider: event.target.value }))}
              />
            </Field>
            <Field label="Level">
              <input
                className="auth-input !pl-4 w-full"
                value={form.level}
                onChange={(event) => setForm((current) => ({ ...current, level: event.target.value }))}
              />
            </Field>
            <Field label="Status">
              <select
                className="auth-input !pl-4 w-full"
                value={form.status}
                onChange={(event) => setForm((current) => ({ ...current, status: event.target.value }))}
              >
                <option value="Draft">Draft</option>
                <option value="Ready">Ready</option>
                <option value="Archived">Archived</option>
              </select>
            </Field>
            <Field label="Section mode">
              <select
                className="auth-input !pl-4 w-full"
                value={form.sectionMode}
                onChange={(event) => setForm((current) => ({ ...current, sectionMode: event.target.value }))}
              >
                <option value="parts">Parts</option>
                <option value="domains">Domains</option>
              </select>
            </Field>
            <Field label="Section label">
              <input
                className="auth-input !pl-4 w-full"
                value={form.sectionLabel}
                onChange={(event) => setForm((current) => ({ ...current, sectionLabel: event.target.value }))}
                required
              />
            </Field>
            <Field label="Badge prefix">
              <input
                className="auth-input !pl-4 w-full"
                value={form.sectionBadgePrefix}
                onChange={(event) => setForm((current) => ({ ...current, sectionBadgePrefix: event.target.value }))}
                required
              />
            </Field>
            <Field label="Grid page size">
              <input
                type="number"
                min="10"
                max="200"
                className="auth-input !pl-4 w-full"
                value={form.gridPageSize}
                onChange={(event) => setForm((current) => ({ ...current, gridPageSize: event.target.value }))}
                required
              />
            </Field>
            <label className="flex items-center gap-2 pt-6 text-sm">
              <input
                type="checkbox"
                checked={form.learnEnabled}
                onChange={(event) => setForm((current) => ({ ...current, learnEnabled: event.target.checked }))}
              />
              Enable Learn
            </label>
            <label className="flex items-center gap-2 pt-6 text-sm">
              <input
                type="checkbox"
                checked={form.labsEnabled}
                onChange={(event) => setForm((current) => ({ ...current, labsEnabled: event.target.checked }))}
              />
              Enable Labs
            </label>
            <Field label="Learn content">
              <select
                className="auth-input !pl-4 w-full"
                value={form.learnContentType}
                onChange={(event) => setForm((current) => ({ ...current, learnContentType: event.target.value }))}
              >
                <option value="none">None</option>
                <option value="legacy-knowledge-base">Legacy knowledge base</option>
                <option value="ai102-guide">AI-102 guide</option>
              </select>
            </Field>
            <Field label="Labs content">
              <select
                className="auth-input !pl-4 w-full"
                value={form.labsContentType}
                onChange={(event) => setForm((current) => ({ ...current, labsContentType: event.target.value }))}
              >
                <option value="none">None</option>
                <option value="ai102-labs">AI-102 labs</option>
              </select>
            </Field>
          </div>
          <Field label="Description">
            <textarea
              className="auth-input !pl-4 min-h-24 w-full"
              value={form.description}
              onChange={(event) => setForm((current) => ({ ...current, description: event.target.value }))}
            />
          </Field>
          {error && <p className="auth-error">{error}</p>}
          <div className="flex gap-2">
            <button className="primary-button" type="submit" disabled={saving}>
              {saving ? 'Saving...' : 'Save certification'}
            </button>
            <button className="ghost-button" type="button" onClick={() => setForm(null)}>
              Cancel
            </button>
          </div>
        </form>
      )}
      {error && !form && <p className="auth-error">{error}</p>}
    </div>
  );
}

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="auth-field-label">{label}</span>
      {children}
    </label>
  );
}
