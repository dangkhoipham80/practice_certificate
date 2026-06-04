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

export const questionsApi = {
  update: (certId, externalId, payload) =>
    apiFetch(`/certs/${certId}/questions/${externalId}`, { method: 'PATCH', body: payload }),
};

export const questionTypesApi = {
  list: () => apiFetch('/question-types', { auth: false }),
  listManage: () => apiFetch('/question-types/manage'),
  create: (payload) => apiFetch('/question-types', { method: 'POST', body: payload }),
  update: (id, payload) => apiFetch(`/question-types/${id}`, { method: 'PATCH', body: payload }),
  remove: (id) => apiFetch(`/question-types/${id}`, { method: 'DELETE' }),
};
