import { certsApi, progressApi } from '../api/client';
import { buildStorageKeys } from '../config/examConfig';
import { readJson } from './storage';

export async function syncLocalProgressToServer() {
  const results = [];
  let certifications = [];
  try {
    certifications = await certsApi.list();
  } catch {
    return results;
  }
  for (const cert of certifications) {
    const history = readJson(buildStorageKeys(cert.id).history, []);
    if (!history.length) continue;
    try {
      const res = await progressApi.import({
        certId: cert.id,
        sessions: history,
      });
      results.push(res);
    } catch {
      /* keep local data; sync can retry on next login */
    }
  }
  return results;
}
