import { storageKeys } from '../config/gh300Exam';

const LEGACY_KEYS = {
  'gh300-history': 'history',
  'gh300-part-progress': 'partProgress',
  'gh300-weak': 'weak',
  'gh300-flagged': 'flagged',
  'gh300-fc-known': 'fcKnown',
  'gh300-fc-unknown': 'fcUnknown',
  'gh300-progress': 'savedQuiz'
};

function parseStoredValue(value) {
  if (typeof value !== 'string') return value;
  try {
    return JSON.parse(value);
  } catch {
    return value;
  }
}

export function normalizeHistory(rows = []) {
  if (!Array.isArray(rows)) return [];
  return rows.map((row) => ({
    id: row.id ?? crypto.randomUUID(),
    label: row.label ?? 'Quiz',
    total: row.total ?? 0,
    correct: row.correct ?? 0,
    score: row.score ?? row.pct ?? 0,
    date: row.date ?? new Date().toISOString()
  }));
}

export function parseImportPayload(raw) {
  const payload = typeof raw === 'string' ? JSON.parse(raw) : raw;
  if (!payload || typeof payload !== 'object') {
    throw new Error('Invalid file format.');
  }

  const isLegacy = Object.keys(payload).some((key) => key.startsWith('gh300-'));
  if (isLegacy) {
    const data = {};
    let count = 0;
    Object.entries(LEGACY_KEYS).forEach(([legacyKey, field]) => {
      if (!(legacyKey in payload)) return;
      data[field] = parseStoredValue(payload[legacyKey]);
      count += 1;
    });
    if (payload['gh300-dark'] !== undefined) {
      data.theme = payload['gh300-dark'] === '1' ? 'dark' : 'light';
      count += 1;
    }
    return { format: 'gh300-pro', data, count };
  }

  if (payload.version || payload.history || payload.partProgress) {
    const data = {
      history: payload.history,
      partProgress: payload.partProgress,
      weak: payload.weak,
      flagged: payload.flagged,
      fcKnown: payload.fcKnown,
      fcUnknown: payload.fcUnknown,
      savedQuiz: payload.savedQuiz,
      theme: payload.theme
    };
    const count = Object.values(data).filter((value) => value !== undefined).length;
    return { format: 'certforge', data, count };
  }

  throw new Error('Unrecognized progress file.');
}

export function buildExportPayload({ history, flagged, weak, partProgress, fcKnown, fcUnknown }) {
  return {
    version: 1,
    exportedAt: new Date().toISOString(),
    storageKeys,
    history,
    flagged,
    weak,
    partProgress,
    fcKnown,
    fcUnknown
  };
}
