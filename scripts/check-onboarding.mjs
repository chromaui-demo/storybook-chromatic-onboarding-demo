import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { dirname, extname, resolve } from 'node:path';

const repositoryRoot = resolve(import.meta.dirname, '..');
const guideRoot = resolve(repositoryRoot, 'docs/onboarding');
const hubGuideRoot = resolve(repositoryRoot, 'packages/hub/stories');
const hubOnboardingRoot = resolve(
  repositoryRoot,
  'packages/hub/src/onboarding',
);

function markdownFiles(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = resolve(directory, entry.name);
    if (entry.isDirectory()) return markdownFiles(path);
    return ['.md', '.mdx'].includes(extname(entry.name)) ? [path] : [];
  });
}

const files = markdownFiles(guideRoot);
const failures = [];
const docsIds = new Set();

const setupGuide = readFileSync(resolve(guideRoot, 'SETUP.mdx'), 'utf8');
const welcomeGuide = readFileSync(resolve(guideRoot, 'README.mdx'), 'utf8');
const capstoneGuide = readFileSync(resolve(guideRoot, 'CAPSTONE.mdx'), 'utf8');
const rootPackage = JSON.parse(
  readFileSync(resolve(repositoryRoot, 'package.json'), 'utf8'),
);
const reactPackage = JSON.parse(
  readFileSync(resolve(repositoryRoot, 'packages/react/package.json'), 'utf8'),
);
const storybookTestWorkflow = readFileSync(
  resolve(repositoryRoot, '.github/workflows/storybook-test.yml'),
  'utf8',
);
const setupRequirements = [
  [
    'VS Code installation',
    'https://code.visualstudio.com/docs/getstarted/overview',
  ],
  ['Codex installation', 'https://learn.chatgpt.com/docs/codex/ide'],
  ['editor verification', 'code --version'],
  [
    'Node version manager',
    'https://github.com/nvm-sh/nvm#installing-and-updating',
  ],
  ['Node installation', 'nvm install'],
  ['workspace verification', 'pnpm check'],
  ['local Storybooks', 'pnpm dev'],
  ['port conflict recovery', 'STORYBOOK_PORT_OFFSET=100 pnpm dev'],
  [
    'technical-training branch guidance',
    'Create a personal branch before technical Day 1',
  ],
];

for (const [requirement, expectedText] of setupRequirements) {
  if (!setupGuide.includes(expectedText)) {
    failures.push(`Setup guide is missing ${requirement}: ${expectedText}`);
  }
}

const stageRequirements = [
  [
    'welcome core onboarding',
    welcomeGuide,
    'Core onboarding · Required for every SE',
  ],
  [
    'welcome technical training',
    welcomeGuide,
    'Post-sales technical training · Role-based',
  ],
  ['shared Storybook 10 focus', welcomeGuide, 'Why upgrade to Storybook 10?'],
  ['shared Storybook MCP focus', welcomeGuide, 'Why use Storybook MCP?'],
  [
    'shared Storybook Test focus',
    welcomeGuide,
    'Why use Storybook Test locally and in CI?',
  ],
  [
    'core onboarding conversation',
    capstoneGuide,
    'Core onboarding conversation',
  ],
  ['technical readiness rubric', capstoneGuide, 'Technical readiness rubric'],
];

for (const [requirement, source, expectedText] of stageRequirements) {
  if (!source.includes(expectedText)) {
    failures.push(
      `Onboarding guide is missing ${requirement}: ${expectedText}`,
    );
  }
}

if (
  rootPackage.scripts?.['test:storybook'] !==
  'pnpm --filter @demo/react test:storybook'
) {
  failures.push('Root package is missing the shared test:storybook command');
}

if (
  reactPackage.scripts?.['test:storybook'] !== 'vitest run --project=storybook'
) {
  failures.push('React package is missing the Storybook Test command');
}

for (const expectedText of [
  'pull_request:',
  'mcr.microsoft.com/playwright:',
  'pnpm test:storybook',
]) {
  if (!storybookTestWorkflow.includes(expectedText)) {
    failures.push(
      `Storybook Test workflow is missing required content: ${expectedText}`,
    );
  }
}

const snapshotStoryFiles = readdirSync(hubOnboardingRoot, {
  withFileTypes: true,
})
  .filter(
    (entry) =>
      entry.isFile() &&
      entry.name.startsWith('GuideSnapshots') &&
      entry.name.endsWith('.stories.tsx'),
  )
  .map((entry) => resolve(hubOnboardingRoot, entry.name));

const snapshotGuideFiles = [
  ...files.filter((file) => extname(file) === '.mdx'),
  ...markdownFiles(hubGuideRoot).filter((file) => extname(file) === '.mdx'),
];
const snapshotCoverage = new Map(snapshotGuideFiles.map((file) => [file, []]));

for (const storyFile of snapshotStoryFiles) {
  const source = readFileSync(storyFile, 'utf8');
  const imports = source.matchAll(
    /import\s+(\w+)\s+from\s+['"]([^'"]+\.mdx)['"];?/g,
  );

  for (const match of imports) {
    const [, localName, importPath] = match;
    const guideFile = resolve(dirname(storyFile), importPath);
    const coverage = snapshotCoverage.get(guideFile);

    if (!coverage) continue;

    const renderPattern = new RegExp(
      `render:\\s*\\(\\)\\s*=>\\s*<${localName}\\s*/>`,
    );

    if (!renderPattern.test(source)) {
      failures.push(
        `${storyFile.slice(repositoryRoot.length + 1)} imports ${importPath} but does not render it in a story`,
      );
      continue;
    }

    coverage.push(storyFile);
  }
}

for (const [guideFile, storyFiles] of snapshotCoverage) {
  if (storyFiles.length === 0) {
    failures.push(
      `${guideFile.slice(repositoryRoot.length + 1)} has no visual snapshot story`,
    );
  }

  if (storyFiles.length > 1) {
    failures.push(
      `${guideFile.slice(repositoryRoot.length + 1)} has duplicate visual snapshot stories`,
    );
  }
}

function titleToDocsId(title) {
  const slug = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
  return `${slug}--docs`;
}

for (const file of files) {
  const source = readFileSync(file, 'utf8');
  const links = source.matchAll(/!?\[[^\]]*\]\(([^)]+)\)/g);
  const metaTitle = source.match(/<Meta title="([^"]+)" \/>/)?.[1];

  if (extname(file) === '.mdx') {
    if (!metaTitle) {
      failures.push(
        `${file.slice(repositoryRoot.length + 1)} has no Meta title`,
      );
    } else {
      docsIds.add(titleToDocsId(metaTitle));
    }
  }

  for (const match of links) {
    const destination = match[1].trim().replace(/^<|>$/g, '');
    if (/^(?:https?:|mailto:|#)/.test(destination)) continue;

    const path = decodeURIComponent(destination.split('#')[0]);
    if (!path) continue;

    const resolvedPath = resolve(dirname(file), path);
    if (!existsSync(resolvedPath)) {
      failures.push(
        `${file.slice(repositoryRoot.length + 1)} -> ${destination}`,
      );
    }
  }
}

for (let day = 1; day <= 15; day += 1) {
  const prefix = `day-${String(day).padStart(2, '0')}-`;
  if (!files.some((file) => file.split('/').at(-1).startsWith(prefix))) {
    failures.push(`Onboarding guide is missing Day ${day}`);
  }
}

const onboardingSessionRoot = resolve(guideRoot, 'presales');
const onboardingSessionFiles = markdownFiles(onboardingSessionRoot);

for (let session = 1; session <= 8; session += 1) {
  const prefix = `session-${String(session).padStart(2, '0')}-`;
  if (
    !onboardingSessionFiles.some((file) =>
      file.split('/').at(-1).startsWith(prefix),
    )
  ) {
    failures.push(
      `Onboarding guide is missing core onboarding Session ${session}`,
    );
  }
}

const learningPages = [
  ...onboardingSessionFiles,
  ...files.filter((file) => file.includes('/days/day-')),
];

for (const file of learningPages) {
  const source = readFileSync(file, 'utf8');
  for (const requiredSection of [
    'learning-callout',
    '## Questions to think through',
    '## How would you respond?',
  ]) {
    if (!source.includes(requiredSection)) {
      failures.push(
        `${file.slice(repositoryRoot.length + 1)} is missing ${requiredSection}`,
      );
    }
  }
}

for (const file of files) {
  const source = readFileSync(file, 'utf8');
  if (source.includes('progress/<handle>.md')) {
    failures.push(
      `${file.slice(repositoryRoot.length + 1)} still requires a repository progress file`,
    );
  }
}

const iframeNavigationSources = [
  ...files,
  resolve(repositoryRoot, 'packages/hub/src/onboarding/CoursePage.tsx'),
];

for (const file of iframeNavigationSources) {
  const source = readFileSync(file, 'utf8');
  if (/(?<!\.\/)\?path=\/docs\/onboarding-/.test(source)) {
    failures.push(
      `${file.slice(repositoryRoot.length + 1)} contains an iframe-unsafe query-only Storybook link`,
    );
  }
}

const navigationSources = [
  ...iframeNavigationSources,
  resolve(repositoryRoot, 'packages/hub/.storybook/main.ts'),
];

for (const file of navigationSources) {
  const source = readFileSync(file, 'utf8');
  const referencedIds = source.matchAll(/onboarding-[a-z0-9-]+--docs/g);

  for (const match of referencedIds) {
    if (!docsIds.has(match[0])) {
      failures.push(
        `${file.slice(repositoryRoot.length + 1)} references missing ${match[0]}`,
      );
    }
  }
}

if (failures.length > 0) {
  console.error('Onboarding guide validation failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exitCode = 1;
} else {
  console.log(
    `Onboarding guide is valid (${files.length} MDX pages, ${docsIds.size} Storybook docs IDs, ${snapshotGuideFiles.length} visual snapshot stories, 8 core onboarding sessions, 15 technical-training days).`,
  );
}
