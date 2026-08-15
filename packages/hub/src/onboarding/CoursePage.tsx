import type { ReactNode } from 'react';

import './course-page.css';

type Phase =
  | 'Advanced'
  | 'Core'
  | 'Onboarding'
  | 'Orientation'
  | 'Reference'
  | 'Setup'
  | 'Welcome';

type CoursePathItem = readonly [
  number: string,
  title: string,
  outcome: string,
  storyId: string,
];

type CourseDestination = {
  href: string;
  label: string;
};

export interface CoursePageProps {
  children?: ReactNode;
  customerProblem?: string;
  day?: number;
  description: string;
  duration?: string;
  next?: CourseDestination;
  outcome?: string;
  phase: Phase;
  previous?: CourseDestination;
  showPath?: boolean;
  title: string;
}

export interface CourseTableProps {
  columns: readonly string[];
  label: string;
  rows: readonly (readonly ReactNode[])[];
}

export function CourseTable({ columns, label, rows }: CourseTableProps) {
  const size =
    columns.length >= 4
      ? 'wide'
      : columns.length === 2
        ? 'compact'
        : 'standard';

  return (
    <div className="course-table-scroll" role="region" aria-label={label}>
      <table className={`course-table course-table--${size}`}>
        <thead>
          <tr>
            {columns.map((column, columnIndex) => (
              <th scope="col" key={`${column}-${columnIndex}`}>
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, columnIndex) =>
                columnIndex === 0 ? (
                  <th scope="row" key={columnIndex}>
                    {cell}
                  </th>
                ) : (
                  <td key={columnIndex}>{cell}</td>
                ),
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const onboardingSessions = [
  [
    '01',
    'Make the Storybook 10 case',
    'Teach the upgrade value',
    'onboarding-core-onboarding-01-storybook-10-value--docs',
  ],
  [
    '02',
    'Build the demo around stories',
    'Turn features into customer proof',
    'onboarding-core-onboarding-02-stories-demo-states--docs',
  ],
  [
    '03',
    'Explain Storybook MCP',
    'Show why grounded agents matter',
    'onboarding-core-onboarding-03-storybook-mcp--docs',
  ],
  [
    '04',
    'Show Storybook Test locally',
    'Make fast feedback visible',
    'onboarding-core-onboarding-04-storybook-test-locally--docs',
  ],
  [
    '05',
    'Connect Storybook Test to CI',
    'Move confidence into every PR',
    'onboarding-core-onboarding-05-storybook-test-in-ci--docs',
  ],
  [
    '06',
    'Add shared visual evidence',
    'Connect local work to Chromatic',
    'onboarding-core-onboarding-06-chromatic-evidence--docs',
  ],
  [
    '07',
    'Connect the customer story',
    'Build one clear value narrative',
    'onboarding-core-onboarding-07-customer-narrative--docs',
  ],
  [
    '08',
    'Practice the customer conversation',
    'Turn product knowledge into a next step',
    'onboarding-core-onboarding-08-customer-conversation--docs',
  ],
] as const satisfies readonly CoursePathItem[];

const postSalesCoreDays = [
  [
    '01',
    'Prove the Storybook 10 upgrade',
    'Connect value to safe migration',
    'onboarding-post-sales-technical-training-core-01-upgrade-orient--docs',
  ],
  [
    '02',
    'Use Codex with judgment',
    'Review AI-assisted changes',
    'onboarding-post-sales-technical-training-core-02-agentic-setup--docs',
  ],
  [
    '03',
    'Write useful stories',
    'Serve people and agents',
    'onboarding-post-sales-technical-training-core-03-stories-docs-manifests--docs',
  ],
  [
    '04',
    'Connect Storybook MCP',
    'Ground Codex in real components',
    'onboarding-post-sales-technical-training-core-04-storybook-mcp--docs',
  ],
  [
    '05',
    'Mock API states',
    'Make demos repeatable',
    'onboarding-post-sales-technical-training-core-05-mock-service-worker--docs',
  ],
  [
    '06',
    'Run Storybook Test locally',
    'Prove behavior in the browser',
    'onboarding-post-sales-technical-training-core-06-storybook-test-locally--docs',
  ],
  [
    '07',
    'Test accessibility',
    'Set honest expectations',
    'onboarding-post-sales-technical-training-core-07-accessibility--docs',
  ],
  [
    '08',
    'Publish to Chromatic',
    'Share durable evidence',
    'onboarding-post-sales-technical-training-core-08-first-chromatic-build--docs',
  ],
  [
    '09',
    'Review visual changes',
    'Separate intent from regression',
    'onboarding-post-sales-technical-training-core-09-visual-review--docs',
  ],
  [
    '10',
    'Run Storybook Test in CI',
    'Protect every pull request',
    'onboarding-post-sales-technical-training-core-10-storybook-test-ci--docs',
  ],
] as const satisfies readonly CoursePathItem[];

const postSalesAdvancedDays = [
  [
    '11',
    'Test with Modes',
    'Choose a useful test matrix',
    'onboarding-post-sales-technical-training-advanced-11-modes--docs',
  ],
  [
    '12',
    'Compose Storybooks',
    'Unify discovery, not ownership',
    'onboarding-post-sales-technical-training-advanced-12-composition--docs',
  ],
  [
    '13',
    'Validate TurboSnap',
    'Optimize without losing trust',
    'onboarding-post-sales-technical-training-advanced-13-monorepo-turbosnap--docs',
  ],
  [
    '14',
    'Plan the next upgrade',
    'Separate facts from roadmap',
    'onboarding-post-sales-technical-training-advanced-14-storybook-11-readiness--docs',
  ],
  [
    '15',
    'Lead the adoption call',
    'Turn implementation fluency into value',
    'onboarding-post-sales-technical-training-advanced-15-adoption-capstone--docs',
  ],
] as const satisfies readonly CoursePathItem[];

const storybookHref = (storyId: string) => `./?path=/docs/${storyId}`;

function renderPath(
  heading: string,
  description: string,
  days: readonly CoursePathItem[],
) {
  const pathId = `${heading.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-path`;

  return (
    <section className="course-path" aria-labelledby={pathId}>
      <div className="course-path__heading">
        <h3 id={pathId}>{heading}</h3>
        <p>{description}</p>
      </div>
      <ol className="course-path__list">
        {days.map(([number, title, outcome, storyId]) => (
          <li key={number}>
            <a href={storybookHref(storyId)} target="_top">
              <span className="course-path__number" aria-hidden="true">
                {number}
              </span>
              <span className="course-path__copy">
                <strong>{title}</strong>
                <span>{outcome}</span>
              </span>
              <span className="course-path__arrow" aria-hidden="true">
                →
              </span>
            </a>
          </li>
        ))}
      </ol>
    </section>
  );
}

export function CoursePage({
  children,
  customerProblem,
  day,
  description,
  duration,
  next,
  outcome,
  phase,
  previous,
  showPath = false,
  title,
}: CoursePageProps) {
  const isOnboarding = phase === 'Onboarding';
  const totalSessions = isOnboarding ? 8 : 15;
  const progress = day
    ? `${day} of ${totalSessions}`
    : phase === 'Setup'
      ? 'Before session 1'
      : phase === 'Orientation'
        ? 'Start core onboarding'
        : '2 stages · 3 shared themes';
  const progressLabel =
    phase === 'Setup' || phase === 'Orientation'
      ? 'Starting point'
      : 'Course progress';
  const format = isOnboarding
    ? 'Learning track'
    : phase === 'Core' || phase === 'Advanced'
      ? 'Technical training'
      : phase === 'Welcome'
        ? 'Start here'
        : 'Course guide';
  const phaseLabel =
    phase === 'Core' || phase === 'Advanced'
      ? `Post-sales technical training · ${phase}`
      : phase === 'Onboarding'
        ? 'Core onboarding'
        : phase;

  return (
    <article
      className={`onboarding-page onboarding-page--${phase.toLowerCase()}${day ? ' onboarding-page--day' : ''}`}
    >
      <header className="onboarding-hero">
        <nav className="onboarding-hero__nav" aria-label="Onboarding">
          <a href={storybookHref('onboarding-welcome--docs')} target="_top">
            <span className="onboarding-mark" aria-hidden="true">
              <span />
              <span />
              <span />
            </span>
            Storybook × Chromatic SE Academy
          </a>
          <a
            href={storybookHref('onboarding-start-here-setup--docs')}
            target="_top"
          >
            Setup
          </a>
        </nav>

        <div className="onboarding-hero__body">
          <div className="onboarding-hero__copy">
            <p className="onboarding-hero__phase">
              {day
                ? `${isOnboarding ? 'Session' : 'Day'} ${String(day).padStart(2, '0')}`
                : phase}
            </p>
            <h1>{title}</h1>
            <p className="onboarding-hero__description">{description}</p>
            <div className="onboarding-hero__meta" aria-label="Session details">
              <span>{phaseLabel}</span>
              <span>{duration ?? '60–90 minutes'}</span>
              <span>{format}</span>
            </div>
          </div>

          <div
            className="onboarding-progress"
            aria-label={`Course progress: ${progress}`}
          >
            <span className="onboarding-progress__label">{progressLabel}</span>
            <strong>{progress}</strong>
            <div className="onboarding-progress__track" aria-hidden="true">
              {Array.from({ length: totalSessions }, (_, index) => (
                <span
                  className={day && index < day ? 'is-active' : undefined}
                  key={index}
                />
              ))}
            </div>
          </div>
        </div>
      </header>

      {(customerProblem || outcome) && (
        <section className="onboarding-context" aria-label="Session brief">
          {customerProblem && (
            <div>
              <span>Why customers care</span>
              <p>{customerProblem}</p>
            </div>
          )}
          {outcome && (
            <div>
              <span>What you can do</span>
              <p>{outcome}</p>
            </div>
          )}
        </section>
      )}

      <div
        className={`onboarding-content${phase === 'Setup' ? ' onboarding-content--setup' : ''}`}
      >
        {phase === 'Welcome' && (
          <div className="onboarding-actions" aria-label="Get started">
            <a
              className="onboarding-button onboarding-button--primary"
              href="#course-tracks"
            >
              See the learning path <span aria-hidden="true">↓</span>
            </a>
            <a
              className="onboarding-button"
              href={storybookHref('onboarding-start-here-setup--docs')}
              target="_top"
            >
              Set up the project
            </a>
          </div>
        )}

        {children}

        {showPath && (
          <div className="onboarding-paths" id="course-tracks">
            <section
              className="course-track course-track--presales"
              aria-labelledby="onboarding-track-heading"
            >
              <header className="course-track__heading">
                <span>Core onboarding · 8 sessions</span>
                <h2 id="onboarding-track-heading">
                  Understand why the workflow matters
                </h2>
                <p>
                  Every SE starts here. Learn each capability through the
                  customer problem it solves, then practice explaining the value
                  with a demo-ready project.
                </p>
              </header>
              {renderPath(
                'Core onboarding sessions',
                'Storybook 10, MCP, local tests, CI, Chromatic evidence, and a customer conversation.',
                onboardingSessions,
              )}
            </section>
            <section
              className="course-track course-track--postsales"
              aria-labelledby="postsales-track-heading"
            >
              <header className="course-track__heading">
                <span>Post-sales technical training · 15 sessions</span>
                <h2 id="postsales-track-heading">
                  Implement, diagnose, and expand the workflow
                </h2>
                <p>
                  Continue here when your role requires hands-on delivery.
                  Configure, diagnose, and validate the workflow before you
                  guide customer adoption.
                </p>
              </header>
              <div className="course-track__paths">
                {renderPath(
                  'Technical foundations',
                  'Ten required sessions from Storybook 10 through local and CI testing.',
                  postSalesCoreDays,
                )}
                {renderPath(
                  'Advanced technical training',
                  'Five optional sessions for complex architectures, scale, and adoption readiness.',
                  postSalesAdvancedDays,
                )}
              </div>
            </section>
          </div>
        )}
      </div>

      {(previous || next) && (
        <nav className="onboarding-pagination" aria-label="Course days">
          {previous ? (
            <a href={previous.href} target="_top" rel="prev">
              <span>Previous</span>
              <strong>← {previous.label}</strong>
            </a>
          ) : (
            <span />
          )}
          {next && (
            <a href={next.href} target="_top" rel="next">
              <span>Up next</span>
              <strong>{next.label} →</strong>
            </a>
          )}
        </nav>
      )}
    </article>
  );
}
