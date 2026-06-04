import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { questionTypesApi } from '../api/client';
import { useAuth } from './AuthContext';

const QuestionTypesContext = createContext(null);

function normalizeType(row) {
  if (!row) return null;
  return {
    id: row.id,
    slug: row.slug,
    label: row.label,
    legacyKind: row.legacyKind ?? row.legacy_kind,
    legacyType: row.legacyType ?? row.legacy_type,
    schema: row.schema ?? {},
    sortOrder: row.sortOrder ?? row.sort_order ?? 0,
    isActive: row.isActive ?? row.is_active ?? true,
  };
}

export function QuestionTypesProvider({ children }) {
  const { isAdmin } = useAuth();
  const [types, setTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const rows = isAdmin ? await questionTypesApi.listManage() : await questionTypesApi.list();
      setTypes(rows.map(normalizeType).filter(Boolean));
    } catch (err) {
      setError(err.message || 'Failed to load question types');
      setTypes([]);
    } finally {
      setLoading(false);
    }
  }, [isAdmin]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const value = useMemo(
    () => ({
      types,
      loading,
      error,
      refresh,
      getBySlug: (slug) => types.find((t) => t.slug === slug),
      getById: (id) => types.find((t) => t.id === id),
    }),
    [types, loading, error, refresh]
  );

  return <QuestionTypesContext.Provider value={value}>{children}</QuestionTypesContext.Provider>;
}

export function useQuestionTypes() {
  const ctx = useContext(QuestionTypesContext);
  if (!ctx) {
    throw new Error('useQuestionTypes must be used within QuestionTypesProvider');
  }
  return ctx;
}
