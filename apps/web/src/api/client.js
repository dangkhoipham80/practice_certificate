const API_BASE = '/api/v1';

export class ApiError extends Error {
  constructor(message, status, detail) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.detail = detail;
  }
}

function getStoredToken() {
  try {
    return sessionStorage.getItem('certforge_access_token');
  } catch {
    return null;
  }
}

export function setAccessToken(token) {
  if (token) {
    sessionStorage.setItem('certforge_access_token', token);
  } else {
    sessionStorage.removeItem('certforge_access_token');
  }
}

export function getAccessToken() {
  return getStoredToken();
}

async function parseResponse(res) {
  const text = await res.text();
  if (!text) return null;
  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
}

export async function apiFetch(path, options = {}) {
  const { auth = true, method = 'GET', body, headers = {} } = options;
  const reqHeaders = { ...headers };
  if (body !== undefined) {
    reqHeaders['Content-Type'] = 'application/json';
  }
  if (auth) {
    const token = getStoredToken();
    if (token) {
      reqHeaders.Authorization = `Bearer ${token}`;
    }
  }
  const res = await fetch(`${API_BASE}${path}`, {
    method,
    headers: reqHeaders,
    body: body !== undefined ? JSON.stringify(body) : undefined,
    credentials: 'same-origin',
  });
  const data = await parseResponse(res);
  if (!res.ok) {
    const detail = data?.detail;
    const message =
      typeof detail === 'string'
        ? detail
        : Array.isArray(detail)
          ? detail.map((d) => d.msg ?? d.message ?? String(d)).join(', ')
          : res.statusText || 'Request failed';
    throw new ApiError(message, res.status, detail);
  }
  return data;
}

export const authApi = {
  register: (payload) =>
    apiFetch('/auth/register', { method: 'POST', body: payload, auth: false }),
  login: (payload) => apiFetch('/auth/login', { method: 'POST', body: payload, auth: false }),
  logout: () => apiFetch('/auth/logout', { method: 'POST', auth: false }),
  me: () => apiFetch('/auth/me'),
};

export const taxonomyApi = {
  get: (certId, { auth = false } = {}) => apiFetch(`/certs/${certId}/taxonomy`, { auth }),
  upsertDomain: (certId, slug, payload) =>
    apiFetch(`/certs/${certId}/taxonomy/domains/${encodeURIComponent(slug)}`, {
      method: 'PUT',
      body: payload,
    }),
};

export const questionsApi = {
  list: (certId, { auth = false, page, pageSize, quizOnly } = {}) => {
    const params = new URLSearchParams();
    if (quizOnly) params.set('quiz_only', 'true');
    if (page != null) params.set('page', String(page));
    if (pageSize != null) params.set('pageSize', String(pageSize));
    const qs = params.toString();
    return apiFetch(`/certs/${certId}/questions${qs ? `?${qs}` : ''}`, { auth });
  },
  create: (certId, payload) =>
    apiFetch(`/certs/${certId}/questions`, { method: 'POST', body: payload }),
  update: (certId, externalId, payload) =>
    apiFetch(`/certs/${certId}/questions/${externalId}`, { method: 'PATCH', body: payload }),
  remove: (certId, externalId) =>
    apiFetch(`/certs/${certId}/questions/${externalId}`, { method: 'DELETE' }),
};

export const questionTypesApi = {
  list: () => apiFetch('/question-types', { auth: false }),
  listManage: () => apiFetch('/question-types/manage'),
  create: (payload) => apiFetch('/question-types', { method: 'POST', body: payload }),
  update: (id, payload) => apiFetch(`/question-types/${id}`, { method: 'PATCH', body: payload }),
  remove: (id) => apiFetch(`/question-types/${id}`, { method: 'DELETE' }),
};

export const progressApi = {
  recordSession: (payload) => apiFetch('/progress/sessions', { method: 'POST', body: payload }),
  getHistory: (certId, { limit = 80 } = {}) =>
    apiFetch(`/progress/sessions?certId=${encodeURIComponent(certId)}&limit=${limit}`),
  getStreak: (certId) => apiFetch(`/progress/streak?certId=${encodeURIComponent(certId)}`),
  getStreaks: () => apiFetch('/progress/streaks'),
  import: (payload) => apiFetch('/progress/import', { method: 'POST', body: payload }),
};
