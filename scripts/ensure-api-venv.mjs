/**
 * Tạo apps/api/venv chỉ khi chưa có — tránh lỗi venvlauncher.exe khi ghi đè.
 */
import { existsSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { spawnSync } from 'child_process';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const apiDir = path.join(root, 'apps', 'api');
const isWin = process.platform === 'win32';
const venvPython = path.join(apiDir, 'venv', isWin ? 'Scripts' : 'bin', isWin ? 'python.exe' : 'python');

function run(cmd, args, opts = {}) {
  const result = spawnSync(cmd, args, { stdio: 'inherit', cwd: apiDir, ...opts });
  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}

if (!existsSync(venvPython)) {
  console.log('Creating venv at apps/api/venv …');
  run('python', ['-m', 'venv', 'venv']);
} else {
  console.log('Using existing venv:', venvPython);
}

run(venvPython, ['-m', 'pip', 'install', '--upgrade', 'pip']);
run(venvPython, ['-m', 'pip', 'install', '-r', 'requirements.txt']);

console.log('API venv ready.');
