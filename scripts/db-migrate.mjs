/**
 * Chạy Alembic từ apps/api (venv + đúng thư mục).
 * Mặc định: upgrade head
 * Ví dụ: npm run db:migrate -- current
 */
import { existsSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { spawnSync } from 'child_process';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const apiDir = path.join(root, 'apps', 'api');
const isWin = process.platform === 'win32';
const alembic = path.join(apiDir, 'venv', isWin ? 'Scripts' : 'bin', isWin ? 'alembic.exe' : 'alembic');

if (!existsSync(alembic)) {
  console.error('Missing venv alembic. Run: npm run api:install');
  process.exit(1);
}

const args = process.argv.slice(2);
if (args.length === 0) {
  args.push('upgrade', 'head');
}

const result = spawnSync(alembic, args, { cwd: root, stdio: 'inherit', env: process.env });
process.exit(result.status ?? 1);
