import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { authApi, getAccessToken, progressApi, setAccessToken } from '../api/client';
import { syncLocalProgressToServer } from '../lib/progressSync';
import { getBurnStreak } from '../lib/streakUtils';

const AuthContext = createContext(null);

function normalizeUser(raw) {
  if (!raw) return null;
  return {
    id: raw.id,
    email: raw.email,
    role: raw.role,
    displayName: raw.displayName ?? raw.display_name ?? null,
    isActive: raw.isActive ?? raw.is_active ?? true,
  };
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [streaks, setStreaks] = useState({});
  const [loginBurnPulse, setLoginBurnPulse] = useState(false);

  const clearError = useCallback(() => setError(null), []);

  const applyAuth = useCallback((data) => {
    const token = data.accessToken ?? data.access_token;
    setAccessToken(token);
    setUser(normalizeUser(data.user));
    setError(null);
  }, []);

  const refreshStreaks = useCallback(async () => {
    try {
      const res = await progressApi.getStreaks();
      setStreaks(res.streaks ?? {});
    } catch {
      setStreaks({});
    }
  }, []);

  const refreshUser = useCallback(async () => {
    const token = getAccessToken();
    if (!token) {
      setUser(null);
      setStreaks({});
      setLoading(false);
      return;
    }
    try {
      const me = await authApi.me();
      setUser(normalizeUser(me));
      setError(null);
      await refreshStreaks();
    } catch {
      setAccessToken(null);
      setUser(null);
      setStreaks({});
    } finally {
      setLoading(false);
    }
  }, [refreshStreaks]);

  useEffect(() => {
    refreshUser();
  }, [refreshUser]);

  const login = useCallback(
    async ({ email, password }) => {
      clearError();
      const data = await authApi.login({ email, password });
      applyAuth(data);
      await syncLocalProgressToServer();
      await refreshStreaks();
      setLoginBurnPulse(true);
      return normalizeUser(data.user);
    },
    [applyAuth, clearError, refreshStreaks]
  );

  const register = useCallback(
    async ({ email, password, displayName }) => {
      clearError();
      const data = await authApi.register({
        email,
        password,
        displayName: displayName || undefined,
      });
      applyAuth(data);
      await syncLocalProgressToServer();
      await refreshStreaks();
      setLoginBurnPulse(true);
      return normalizeUser(data.user);
    },
    [applyAuth, clearError, refreshStreaks]
  );

  const logout = useCallback(async () => {
    try {
      await authApi.logout();
    } catch {
      /* stateless */
    }
    setAccessToken(null);
    setUser(null);
    setStreaks({});
    setLoginBurnPulse(false);
    setError(null);
  }, []);

  const clearLoginBurnPulse = useCallback(() => setLoginBurnPulse(false), []);

  const runAuthAction = useCallback(
    async (action) => {
      clearError();
      try {
        return await action();
      } catch (err) {
        setError(err.message || 'Something went wrong');
        throw err;
      }
    },
    [clearError]
  );

  const burnStreak = useMemo(() => getBurnStreak(streaks), [streaks]);

  const value = useMemo(
    () => ({
      user,
      loading,
      error,
      streaks,
      burnStreak,
      loginBurnPulse,
      clearLoginBurnPulse,
      refreshStreaks,
      isAuthenticated: Boolean(user),
      login: (payload) => runAuthAction(() => login(payload)),
      register: (payload) => runAuthAction(() => register(payload)),
      logout,
      clearError,
      hasRole: (...roles) => user && roles.includes(user.role),
      isAdmin: user?.role === 'admin',
      isTeacher: user?.role === 'teacher' || user?.role === 'admin',
    }),
    [
      user,
      loading,
      error,
      streaks,
      burnStreak,
      loginBurnPulse,
      clearLoginBurnPulse,
      refreshStreaks,
      login,
      register,
      logout,
      clearError,
      runAuthAction,
    ]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return ctx;
}
