/**
 * Seed student / teacher / admin demo accounts (dev only).
 * Requires: .env with DATABASE_URL, migration 003 applied.
 */
import { existsSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { spawnSync } from 'child_process';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const apiDir = path.join(root, 'apps', 'api');
const isWin = process.platform === 'win32';
const python = path.join(apiDir, 'venv', isWin ? 'Scripts' : 'bin', isWin ? 'python.exe' : 'python');

if (!existsSync(python)) {
  console.error('Missing venv. Run: npm run api:install');
  process.exit(1);
}

const result = spawnSync(python, ['-m', 'scripts.seed_sample_users'], {
  cwd: apiDir,
  stdio: 'inherit',
  env: process.env,
});
process.exit(result.status ?? 1);
