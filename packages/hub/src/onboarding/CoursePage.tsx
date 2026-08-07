import type { ReactNode } from 'react';

import './course-page.css';

type Phase =
  'Advanced' | 'Core' | 'Orientation' | 'Reference' | 'Setup' | 'Welcome';

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

const coreDays = [
  [
    '01',
    'Upgrade & orient',
    'Migration confidence',
    'onboarding-core-01-upgrade-orient--docs',
  ],
  [
    '02',
    'Agentic setup',
    'AI with engineering judgment',
    'onboarding-core-02-agentic-setup--docs',
  ],
  [
    '03',
    'Stories & manifests',
    'Human and machine-readable UI',
    'onboarding-core-03-stories-docs-manifests--docs',
  ],
  [
    '04',
    'Storybook MCP',
    'Ground agents in real components',
    'onboarding-core-04-storybook-mcp--docs',
  ],
  [
    '05',
    'Mock Service Worker',
    'Deterministic network states',
    'onboarding-core-05-mock-service-worker--docs',
  ],
  [
    '06',
    'Interaction tests',
    'Prove behavior in the story',
    'onboarding-core-06-interaction-tests--docs',
  ],
  [
    '07',
    'Accessibility',
    'Catch regressions earlier',
    'onboarding-core-07-accessibility--docs',
  ],
  [
    '08',
    'First Chromatic build',
    'Create a shared branch build',
    'onboarding-core-08-first-chromatic-build--docs',
  ],
  [
    '09',
    'Visual review',
    'Separate intent from regression',
    'onboarding-core-09-visual-review--docs',
  ],
  [
    '10',
    'CI & core demo',
    'Automate and tell the story',
    'onboarding-core-10-ci-core-demo--docs',
  ],
] as const;

const advancedDays = [
  [
    '11',
    'Modes',
    'Responsive and theme matrices',
    'onboarding-advanced-11-modes--docs',
  ],
  [
    '12',
    'Composition',
    'One catalog across frameworks',
    'onboarding-advanced-12-composition--docs',
  ],
  [
    '13',
    'TurboSnap',
    'Optimize without losing trust',
    'onboarding-advanced-13-monorepo-turbosnap--docs',
  ],
  [
    '14',
    'Storybook 11 readiness',
    'Plan without speculation',
    'onboarding-advanced-14-storybook-11-readiness--docs',
  ],
  [
    '15',
    'Mock customer demo',
    'Turn product fluency into value',
    'onboarding-advanced-15-mock-demo--docs',
  ],
] as const;

const storybookHref = (storyId: string) => `./?path=/docs/${storyId}`;

function renderPath(
  heading: string,
  description: string,
  days: typeof coreDays | typeof advancedDays,
) {
  return (
    <section
      className="course-path"
      aria-labelledby={`${heading.toLowerCase()}-path`}
    >
      <div className="course-path__heading">
        <h2 id={`${heading.toLowerCase()}-path`}>{heading}</h2>
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
  const progress = day
    ? `${day} of 15`
    : phase === 'Setup'
      ? 'Set up first'
      : phase === 'Orientation'
        ? 'Why before how'
        : '10 core + 5 advanced';
  const progressLabel =
    phase === 'Setup' || phase === 'Orientation'
      ? 'Starting point'
      : 'Course progress';

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
            Storybook × Chromatic Field Lab
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
              {day ? `Day ${String(day).padStart(2, '0')}` : phase}
            </p>
            <h1>{title}</h1>
            <p className="onboarding-hero__description">{description}</p>
            <div className="onboarding-hero__meta" aria-label="Session details">
              <span>{phase}</span>
              <span>{duration ?? '60–90 minutes'}</span>
              <span>Async-first</span>
            </div>
          </div>

          <div
            className="onboarding-progress"
            aria-label={`Course progress: ${progress}`}
          >
            <span className="onboarding-progress__label">{progressLabel}</span>
            <strong>{progress}</strong>
            <div className="onboarding-progress__track" aria-hidden="true">
              {Array.from({ length: 15 }, (_, index) => (
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
              <span>Why this comes up</span>
              <p>{customerProblem}</p>
            </div>
          )}
          {outcome && (
            <div>
              <span>By the end</span>
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
              href={storybookHref('onboarding-start-here-setup--docs')}
              target="_top"
            >
              Set up the field lab <span aria-hidden="true">→</span>
            </a>
            <a
              className="onboarding-button"
              href={storybookHref(
                'onboarding-start-here-why-the-workflow-matters--docs',
              )}
              target="_top"
            >
              Why the workflow matters
            </a>
          </div>
        )}

        {children}

        {showPath && (
          <div className="onboarding-paths">
            {renderPath(
              'Core',
              'Ten sessions to a credible Storybook and Chromatic customer conversation.',
              coreDays,
            )}
            {renderPath(
              'Advanced',
              'Five sessions for composition, scale, roadmap judgment, and demo readiness.',
              advancedDays,
            )}
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
