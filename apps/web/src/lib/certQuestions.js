import { questionsApi } from '../api/client';
import { apiQuestionToLocal } from './questionUtils';

/** Questions for a cert, loaded from PostgreSQL through the API. */
export async function fetchCertQuestions(certId) {
  const data = await questionsApi.list(certId, { auth: false });
  return {
    questions: (data?.questions ?? []).map(apiQuestionToLocal),
    source: 'api',
  };
}
