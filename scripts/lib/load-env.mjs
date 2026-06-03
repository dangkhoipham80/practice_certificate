import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, '../..');

export function loadRepoEnv() {
  const envPath = path.join(repoRoot, '.env');
  if (!fs.existsSync(envPath)) {
    throw new Error(`Missing .env at ${envPath}. Copy from .env.example and configure.`);
  }
  const result = dotenv.config({ path: envPath });
  if (result.error) {
    throw result.error;
  }
  return repoRoot;
}

/** @param {string} name */
export function requireEnv(name) {
  const value = process.env[name];
  if (value === undefined || value === '') {
    throw new Error(`Missing required env: ${name} (set in .env)`);
  }
  return value;
}
