import { progressApi } from '../api/client';
import { CERT_REGISTRY } from '../config/certRegistry';
import { readJson } from './storage';

export async function syncLocalProgressToServer() {
  const results = [];
  for (const cert of Object.values(CERT_REGISTRY)) {
    const history = readJson(cert.storageKeys.history, []);
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
