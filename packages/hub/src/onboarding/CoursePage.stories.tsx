import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';

import { CoursePage } from './CoursePage';

const meta = {
  component: CoursePage,
  parameters: { layout: 'fullscreen' },
  args: {
    description:
      'Build customer-ready fluency by working in the same Storybook you will eventually demonstrate.',
    phase: 'Core',
    title: 'A field guide that lives inside the product',
  },
} satisfies Meta<typeof CoursePage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Welcome: Story = {
  args: {
    phase: 'Welcome',
    showPath: true,
    title: 'Learn the product by using the product',
    children: (
      <>
        <h2>The assignment</h2>
        <p>
          Help Trailhead Travel turn fragmented component catalogs into a
          dependable development and review workflow.
        </p>
      </>
    ),
  },
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole('heading', {
        name: 'Learn the product by using the product',
      }),
    ).toBeVisible();
    await expect(
      canvas.getByRole('link', { name: /Set up the field lab/ }),
    ).toHaveAttribute(
      'href',
      './?path=/docs/onboarding-start-here-setup--docs',
    );
  },
};

export const CoreDay: Story = {
  args: {
    customerProblem:
      'The team inherited several Storybooks and is afraid an upgrade will silently break them.',
    day: 1,
    duration: '60–75 minutes',
    next: {
      href: './?path=/docs/onboarding-core-02-agentic-setup--docs',
      label: 'Day 2 · Agentic setup',
    },
    outcome:
      'Explain the migration boundary and prove the React Storybook is healthy in development and production.',
    phase: 'Core',
    title: 'Upgrade boundary and product orientation',
    children: (
      <>
        <h2>Your 75 minutes</h2>
        <ul>
          <li>10 min · Understand the migration boundary</li>
          <li>25 min · Run the health checks</li>
          <li>30 min · Inspect Storybook like a customer would</li>
        </ul>
        <h2>Run the upgrade without hand-waving</h2>
        <p>
          Start with the official migration guide, then inspect the workspace.
        </p>
        <details>
          <summary>Need a hint?</summary>
          <p>Separate package migration from behavioral verification.</p>
        </details>
      </>
    ),
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('1 of 15')).toBeVisible();
    await expect(
      canvas.getByRole('navigation', { name: 'Course days' }),
    ).toBeVisible();
  },
};

export const Setup: Story = {
  args: {
    description:
      'Install once, claim a branch, and prove the demo works before you change it.',
    duration: '30–45 minutes',
    next: {
      href: './?path=/docs/onboarding-start-here-why-the-workflow-matters--docs',
      label: 'Why the workflow matters',
    },
    phase: 'Setup',
    title: 'Get to a known-good starting point',
    children: (
      <>
        <div className="setup-finish-line">
          <span className="setup-finish-line__check" aria-hidden="true">
            ✓
          </span>
          <div>
            <strong>Your finish line</strong>
            <p>
              The Hub and React Storybook open, the repository checks pass, and
              your progress file lives on a personal branch.
            </p>
          </div>
        </div>
        <section className="setup-readiness" aria-labelledby="setup-ready">
          <div className="setup-section-heading">
            <h2 id="setup-ready">Bring four things</h2>
            <p>
              A current runtime, repository access, a browser, and a coding
              agent that can talk to local Storybook.
            </p>
          </div>
          <ul className="setup-requirements">
            <li>
              <strong>Node and pnpm</strong>
              <span>Use the versions pinned by the repository.</span>
            </li>
            <li>
              <strong>Chromatic access</strong>
              <span>Join the shared organization before Day 8.</span>
            </li>
          </ul>
        </section>
        <div className="setup-runbook">
          <section className="setup-step">
            <span className="setup-step__number" aria-hidden="true">
              1
            </span>
            <div className="setup-step__body">
              <span className="setup-step__label">Workspace</span>
              <h2>Install and claim your branch</h2>
              <p>
                Give yourself a clean place to work before the first exercise.
              </p>
              <pre>
                <code>pnpm install --frozen-lockfile</code>
              </pre>
            </div>
          </section>
        </div>
        <section
          className="setup-guardrails"
          aria-labelledby="setup-story-guardrails"
        >
          <div>
            <span>How this repo works</span>
            <h2 id="setup-story-guardrails">A few lines we do not cross</h2>
          </div>
          <ul>
            <li>
              <p>
                Do the required implementation work in{' '}
                <code>packages/react</code>. The Hub and other frameworks are
                here for composition and comparison.
              </p>
            </li>
            <li>
              <p>
                Treat generated code as a first draft. Read it, run it, and be
                ready to explain it.
              </p>
            </li>
          </ul>
        </section>
      </>
    ),
  },
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole('heading', {
        name: 'Get to a known-good starting point',
      }),
    ).toBeVisible();
    await expect(canvas.getByText('Set up first')).toBeVisible();
    await expect(
      canvas.getByRole('heading', { name: 'A few lines we do not cross' }),
    ).toBeVisible();
  },
};

export const Orientation: Story = {
  args: {
    customerProblem:
      'Important UI states are hard to reproduce, reviews rely on screenshots, and regressions arrive late.',
    description:
      'Learn the customer problem each part of the workflow solves before you configure the first tool.',
    duration: '35–45 minutes',
    outcome:
      'You can explain why Storybook and Chromatic belong together and know when more coverage would actually help.',
    phase: 'Orientation',
    title: 'Why this workflow matters',
    children: (
      <>
        <section className="value-thesis">
          <span className="value-eyebrow">The field answer</span>
          <h2>Make UI risk visible before it reaches a customer</h2>
          <p>
            Storybook makes important UI states reproducible. Chromatic turns
            those states into shared evidence that a team can test and review.
          </p>
        </section>
        <section className="value-product-pair" aria-label="Product roles">
          <article>
            <span>Storybook</span>
            <h2>Make the state real</h2>
            <p>Develop, document, and test the UI outside the full app.</p>
          </article>
          <article>
            <span>Chromatic</span>
            <h2>Make the change shared</h2>
            <p>
              Capture, compare, and review those states against Git history.
            </p>
          </article>
        </section>
      </>
    ),
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Why before how')).toBeVisible();
    await expect(
      canvas.getByRole('heading', { name: 'Make the state real' }),
    ).toBeVisible();
    await expect(
      canvas.getByRole('heading', { name: 'Make the change shared' }),
    ).toBeVisible();
  },
};

export const AdvancedDay: Story = {
  args: {
    customerProblem:
      'Full visual builds are becoming expensive, but skipping an affected story would destroy trust.',
    day: 13,
    duration: '75–90 minutes',
    outcome:
      'Validate the dependency and Git-history boundaries before enabling selective snapshots.',
    phase: 'Advanced',
    title: 'Monorepo configuration and TurboSnap',
    children: (
      <>
        <h2>Gate</h2>
        <blockquote>
          <p>Do not optimize a build you do not yet trust.</p>
        </blockquote>
      </>
    ),
  },
};

export const ReferencePage: Story = {
  args: {
    phase: 'Reference',
    title: 'Facilitator setup',
    children: (
      <>
        <h2>Shared Chromatic project</h2>
        <p>Seed a passing main build before learners branch.</p>
      </>
    ),
  },
};
