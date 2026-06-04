import { questionsApi } from '../api/client';
import { getCert } from '../config/certRegistry';
import { apiQuestionToLocal } from './questionUtils';

/** Questions for a cert: API (PostgreSQL) when available, else bundled JS bank. */
export async function fetchCertQuestions(certId) {
  try {
    const data = await questionsApi.list(certId, { auth: false });
    if (data?.questions?.length) {
      return { questions: data.questions.map(apiQuestionToLocal), source: 'api' };
    }
  } catch {
    /* API down or cert not migrated — use bundle */
  }
  return { questions: getCert(certId).questions, source: 'bundle' };
}
