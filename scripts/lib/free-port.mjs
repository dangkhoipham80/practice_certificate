import { execSync, spawnSync } from 'child_process';

/**
 * Dừng process đang LISTEN trên port (Windows).
 * @param {number|string} port
 * @returns {number[]} PIDs đã kill
 */
export function freePort(port) {
  if (process.platform !== 'win32') {
    return [];
  }

  const killed = [];
  const myPid = String(process.ppid === process.pid ? process.pid : process.pid);

  let output = '';
  try {
    output = execSync('netstat -ano -p tcp', { encoding: 'utf8' });
  } catch {
    return killed;
  }

  const portSuffix = `:${port}`;
  const pids = new Set();

  for (const line of output.split(/\r?\n/)) {
    if (!line.includes('LISTENING')) continue;
    const local = line.trim().split(/\s+/)[1] ?? '';
    if (!local.endsWith(portSuffix)) continue;
    const pid = line.trim().split(/\s+/).at(-1);
    if (!pid || !/^\d+$/.test(pid) || pid === '0' || pid === myPid) continue;
    pids.add(pid);
  }

  for (const pid of pids) {
    console.log(`Port ${port} in use by PID ${pid} — stopping…`);
    const r = spawnSync('taskkill', ['/PID', pid, '/F'], { encoding: 'utf8' });
    if (r.status === 0) {
      killed.push(Number(pid));
    } else {
      console.warn(`Could not stop PID ${pid}:`, (r.stderr || r.stdout || '').trim());
    }
  }

  if (killed.length) {
    // Brief pause so Windows releases the socket
    spawnSync('powershell', ['-Command', 'Start-Sleep -Milliseconds 400'], { stdio: 'ignore' });
  }

  return killed;
}
