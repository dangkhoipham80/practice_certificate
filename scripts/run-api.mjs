/**
 * Chạy Uvicorn — host/port từ .env (API_HOST, API_PORT).
 *   npm run api
 *   npm run api:lan   (--lan → 0.0.0.0)
 */
import { existsSync } from 'fs';
import { spawnSync } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';
import { loadRepoEnv } from './lib/load-env.mjs';
import { freePort } from './lib/free-port.mjs';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const apiDir = path.join(root, 'apps', 'api');
const isWin = process.platform === 'win32';
const venvPython = path.join(apiDir, 'venv', isWin ? 'Scripts' : 'bin', isWin ? 'python.exe' : 'python');
const lan = process.argv.includes('--lan');

loadRepoEnv();

const host = lan ? '0.0.0.0' : (process.env.API_HOST ?? '127.0.0.1');
const port = String(process.env.API_PORT ?? '8000');

if (!existsSync(venvPython)) {
  console.error('Missing venv. Run: npm run api:install');
  process.exit(1);
}

const browserHost = host === '0.0.0.0' ? 'localhost' : host;

const stopped = freePort(port);
if (stopped.length) {
  console.log(`Freed port ${port} (stopped PID: ${stopped.join(', ')})`);
}

console.log(`Starting API on http://${host}:${port}`);
console.log(`  Docs:  http://${browserHost}:${port}/docs`);

const result = spawnSync(
  venvPython,
  ['-m', 'uvicorn', 'app.main:app', '--reload', '--host', host, '--port', port],
  { cwd: apiDir, stdio: 'inherit', env: process.env },
);

if (result.status !== 0 && result.status !== null) {
  console.error(`
Port ${port} still unavailable. Try API_PORT=8001 in .env or run as Administrator.
`);
}

process.exit(result.status ?? 1);
