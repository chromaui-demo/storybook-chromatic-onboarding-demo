import { spawn } from 'node:child_process';

const childStorybooks = [
  { name: '@demo/react', url: 'http://localhost:6007/index.json' },
  { name: '@demo/nextjs', url: 'http://localhost:6008/index.json' },
  { name: '@demo/angular', url: 'http://localhost:6009/index.json' },
  { name: '@demo/web-components', url: 'http://localhost:6010/index.json' },
  { name: '@demo/react-native-web', url: 'http://localhost:6011/index.json' },
];

const runningProcesses = new Set();
let shuttingDown = false;

function startStorybook(name) {
  const child = spawn('pnpm', ['--filter', name, 'storybook'], {
    env: { ...process.env, STORYBOOK_DISABLE_TELEMETRY: '1' },
    stdio: 'inherit',
  });

  runningProcesses.add(child);
  child.once('exit', (code, signal) => {
    runningProcesses.delete(child);

    if (!shuttingDown) {
      console.error(
        `${name} stopped unexpectedly (${signal ?? `exit code ${code}`}).`,
      );
      shutdown('SIGTERM', code && code > 0 ? code : 1);
    }
  });

  return child;
}

async function waitUntilReady({ name, url }) {
  const deadline = Date.now() + 120_000;

  while (Date.now() < deadline) {
    if (shuttingDown) throw new Error(`${name} stopped before it was ready`);

    try {
      const response = await fetch(url);
      if (response.ok) return;
    } catch {
      // The server is still starting.
    }

    await new Promise((resolve) => setTimeout(resolve, 250));
  }

  throw new Error(`Timed out waiting for ${name} at ${url}`);
}

function shutdown(signal, exitCode = 0) {
  if (shuttingDown) return;
  shuttingDown = true;

  for (const child of runningProcesses) child.kill(signal);
  process.exitCode = exitCode;
}

process.once('SIGINT', () => shutdown('SIGINT'));
process.once('SIGTERM', () => shutdown('SIGTERM'));

for (const childStorybook of childStorybooks)
  startStorybook(childStorybook.name);

try {
  await Promise.all(childStorybooks.map(waitUntilReady));
  console.log(
    'All referenced Storybooks are ready. Starting the composed hub.',
  );
  startStorybook('@demo/hub');
} catch (error) {
  if (!shuttingDown) {
    console.error(error);
    shutdown('SIGTERM', 1);
  }
}
