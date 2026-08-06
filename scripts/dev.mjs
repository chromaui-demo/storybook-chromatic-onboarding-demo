import { spawn } from 'node:child_process';

const portOffset = Number.parseInt(
  process.env.STORYBOOK_PORT_OFFSET ?? '0',
  10,
);

if (!Number.isInteger(portOffset) || portOffset < 0) {
  throw new Error('STORYBOOK_PORT_OFFSET must be a non-negative integer.');
}

const storybook = (name, defaultPort) => ({
  name,
  port: defaultPort + portOffset,
  url: `http://localhost:${defaultPort + portOffset}/index.json`,
});

const hubStorybook = storybook('@demo/hub', 6006);
const childStorybooks = [
  storybook('@demo/react', 6007),
  storybook('@demo/nextjs', 6008),
  storybook('@demo/angular', 6009),
  storybook('@demo/web-components', 6010),
  storybook('@demo/react-native-web', 6011),
];

const runningProcesses = new Set();
let shuttingDown = false;

function startStorybook({ name, port }) {
  const args = ['--filter', name, 'storybook'];
  if (portOffset > 0) args.push('--port', String(port));

  const child = spawn('pnpm', args, {
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

for (const childStorybook of childStorybooks) startStorybook(childStorybook);

try {
  await Promise.all(childStorybooks.map(waitUntilReady));
  console.log(
    'All referenced Storybooks are ready. Starting the composed hub.',
  );
  startStorybook(hubStorybook);
} catch (error) {
  if (!shuttingDown) {
    console.error(error);
    shutdown('SIGTERM', 1);
  }
}
