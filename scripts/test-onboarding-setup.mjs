import { spawn } from 'node:child_process';
import { copyFile, mkdtemp, readFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';

const repositoryRoot = resolve(import.meta.dirname, '..');
const startupTimeout = 180_000;

function run(command, args, cwd, options = {}) {
  return new Promise((resolveRun, rejectRun) => {
    const child = spawn(command, args, {
      cwd,
      env: { ...process.env, STORYBOOK_DISABLE_TELEMETRY: '1' },
      stdio: options.stdio ?? 'inherit',
    });

    let stdout = '';
    if (child.stdout) child.stdout.on('data', (chunk) => (stdout += chunk));

    child.once('error', rejectRun);
    child.once('exit', (code, signal) => {
      if (code === 0) {
        resolveRun(stdout.trim());
        return;
      }

      rejectRun(
        new Error(
          `${command} ${args.join(' ')} failed (${signal ?? `exit code ${code}`})`,
        ),
      );
    });
  });
}

async function waitForCatalog(url, matchesEntry) {
  const deadline = Date.now() + startupTimeout;

  while (Date.now() < deadline) {
    try {
      const response = await fetch(url);
      if (response.ok) {
        const index = await response.json();
        if (Object.values(index.entries ?? {}).some(matchesEntry)) return;
      }
    } catch {
      // Storybook is still starting.
    }

    await new Promise((resolveWait) => setTimeout(resolveWait, 500));
  }

  throw new Error(`Timed out waiting for the expected catalog entry at ${url}`);
}

async function stopProcessGroup(child) {
  if (!child.pid || child.exitCode !== null) return;

  try {
    process.kill(-child.pid, 'SIGTERM');
  } catch (error) {
    if (error.code !== 'ESRCH') throw error;
  }

  await Promise.race([
    new Promise((resolveExit) => child.once('exit', resolveExit)),
    new Promise((resolveWait) => setTimeout(resolveWait, 10_000)),
  ]);
}

const expectedNodeMajor = Number(
  (await readFile(join(repositoryRoot, '.nvmrc'), 'utf8')).trim(),
);
const actualNodeMajor = Number(process.versions.node.split('.')[0]);

if (actualNodeMajor !== expectedNodeMajor) {
  throw new Error(
    `Run this setup test with Node ${expectedNodeMajor}; received Node ${process.versions.node}.`,
  );
}

const remote = await run(
  'git',
  ['remote', 'get-url', 'origin'],
  repositoryRoot,
  { stdio: ['ignore', 'pipe', 'inherit'] },
);
const temporaryRoot = await mkdtemp(join(tmpdir(), 'storybook-onboarding-'));
const learnerWorkspace = join(temporaryRoot, 'learner');
let devProcess;

try {
  console.log(`Cloning a clean learner workspace from ${remote}`);
  await run(
    'git',
    ['clone', '--branch', 'main', '--single-branch', remote, learnerWorkspace],
    temporaryRoot,
  );

  await run('pnpm', ['install', '--frozen-lockfile'], learnerWorkspace);
  await run('git', ['switch', '-c', 'onboarding/smoke-test'], learnerWorkspace);
  await copyFile(
    join(learnerWorkspace, 'progress/TEMPLATE.md'),
    join(learnerWorkspace, 'progress/smoke-test.md'),
  );

  await run('pnpm', ['check'], learnerWorkspace);

  console.log(
    'Starting the same composed development environment used in Setup.',
  );
  devProcess = spawn('pnpm', ['dev'], {
    cwd: learnerWorkspace,
    detached: true,
    env: { ...process.env, STORYBOOK_DISABLE_TELEMETRY: '1' },
    stdio: 'inherit',
  });

  await Promise.all([
    waitForCatalog('http://localhost:6006/index.json', (entry) =>
      entry.id?.startsWith('onboarding-welcome'),
    ),
    waitForCatalog(
      'http://localhost:6007/index.json',
      (entry) => entry.title === 'ReservationCard',
    ),
  ]);

  console.log(
    'Onboarding setup passed: clean clone, install, personal branch, checks, Hub, and React Storybook.',
  );
} finally {
  if (devProcess) await stopProcessGroup(devProcess);
  await rm(temporaryRoot, { recursive: true, force: true });
}
