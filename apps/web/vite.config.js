import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';
import { defineConfig, loadEnv } from 'vite';

const webRoot = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(webRoot, '../..');

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, repoRoot, '');
  const proxyTarget = env.VITE_API_PROXY;
  if (!proxyTarget) {
    throw new Error('VITE_API_PROXY is required in .env at repo root (see .env.example)');
  }

  return {
    root: webRoot,
    envDir: repoRoot,
    css: {
      postcss: path.join(webRoot, 'postcss.config.js'),
    },
    plugins: [react()],
    server: {
      proxy: {
        '/api': {
          target: proxyTarget,
          changeOrigin: true,
        },
      },
    },
  };
});
