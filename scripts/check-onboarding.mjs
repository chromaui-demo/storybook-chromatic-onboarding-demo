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
  ['personal branch', 'git switch -c onboarding/<handle>'],
];

for (const [requirement, expectedText] of setupRequirements) {
  if (!setupGuide.includes(expectedText)) {
    failures.push(`Setup guide is missing ${requirement}: ${expectedText}`);
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
    `Onboarding guide is valid (${files.length} MDX pages, ${docsIds.size} Storybook docs IDs, ${snapshotGuideFiles.length} visual snapshot stories, 15 linked days).`,
  );
}
