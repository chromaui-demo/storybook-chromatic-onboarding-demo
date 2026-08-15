import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';

import { CoursePage } from './CoursePage';

const meta = {
  component: CoursePage,
  parameters: { layout: 'fullscreen' },
  args: {
    description:
      'Start with shared product understanding, then continue into post-sales technical training when your role requires it.',
    phase: 'Core',
    title: 'One shared foundation, then deeper technical training',
  },
} satisfies Meta<typeof CoursePage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Welcome: Story = {
  args: {
    phase: 'Welcome',
    showPath: true,
    title: 'Start with the customer value',
    children: (
      <>
        <h2>How the course works</h2>
        <p>
          Every SE completes core onboarding. SEs who support implementation
          continue into post-sales technical training.
        </p>
      </>
    ),
  },
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole('heading', {
        name: 'Start with the customer value',
      }),
    ).toBeVisible();
    await expect(
      canvas.getByRole('link', { name: /See the learning path/ }),
    ).toHaveAttribute('href', '#course-tracks');
    await expect(
      canvas.getByRole('link', { name: 'Set up the project' }),
    ).toHaveAttribute(
      'href',
      './?path=/docs/onboarding-start-here-setup--docs',
    );
    await expect(
      canvas.getByRole('heading', {
        name: 'Understand why the workflow matters',
      }),
    ).toBeVisible();
    await expect(
      canvas.getByRole('heading', {
        name: 'Implement, diagnose, and expand the workflow',
      }),
    ).toBeVisible();
  },
};

export const OnboardingSession: Story = {
  args: {
    customerProblem:
      'The prospect sees AI-generated UI as fast but unreliable because the agent does not know its component library.',
    day: 3,
    duration: '45–60 minutes',
    next: {
      href: './?path=/docs/onboarding-core-onboarding-04-storybook-test-locally--docs',
      label: 'Session 4 · Storybook Test locally',
    },
    outcome:
      'Teach why documented component context improves an agent response and show the boundary of the current preview.',
    phase: 'Onboarding',
    title: 'Explain why Storybook MCP matters',
    children: (
      <>
        <h2>Teach, show, connect</h2>
        <ul>
          <li>Teach the customer problem</li>
          <li>Show the grounded agent workflow</li>
          <li>Connect the proof to an evaluation</li>
        </ul>
      </>
    ),
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('3 of 8')).toBeVisible();
    await expect(canvas.getByText('Learning track')).toBeVisible();
    await expect(canvas.getByText('Core onboarding')).toBeVisible();
    await expect(canvas.getByText('Session 03')).toBeVisible();
  },
};

export const CoreDay: Story = {
  args: {
    customerProblem:
      'The team inherited several Storybooks and fears that an upgrade will silently break them.',
    day: 1,
    duration: '60–75 minutes',
    next: {
      href: './?path=/docs/onboarding-post-sales-technical-training-core-02-agentic-setup--docs',
      label: 'Day 2 · Agentic setup',
    },
    outcome:
      'Explain a safe migration plan and show the evidence that makes an upgrade trustworthy.',
    phase: 'Core',
    title: 'Prove the Storybook 10 upgrade',
    children: (
      <>
        <h2>Plan your session</h2>
        <ul>
          <li>10 min · Understand the migration boundary</li>
          <li>25 min · Run the health checks</li>
          <li>30 min · Inspect Storybook like a customer would</li>
        </ul>
        <h2>Run the supported upgrade workflow</h2>
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
      'Install the shared tools and reach the finish line for core onboarding or technical training.',
    duration: '60–90 minutes on a new machine',
    next: {
      href: './?path=/docs/onboarding-start-here-why-the-workflow-matters--docs',
      label: 'Why the workflow matters',
    },
    phase: 'Setup',
    title: 'Set up the shared SE project',
    children: (
      <>
        <div className="setup-finish-line">
          <span className="setup-finish-line__check" aria-hidden="true">
            ✓
          </span>
          <div>
            <strong>Your finish line</strong>
            <p>
              VS Code opens the repository, Codex can read it, and both
              Storybooks load from your personal branch.
            </p>
          </div>
        </div>
        <section className="setup-readiness" aria-labelledby="setup-ready">
          <div className="setup-section-heading">
            <h2 id="setup-ready">Confirm access before you install anything</h2>
            <p>
              Confirm GitHub, Chromatic, Codex, and computer access before
              session 1.
            </p>
          </div>
          <ul className="setup-requirements">
            <li>
              <strong>Computer access</strong>
              <span>Install VS Code, Git, Node.js, pnpm, and Codex.</span>
            </li>
            <li>
              <strong>Chromatic access</strong>
              <span>Get the project role required by your training stage.</span>
            </li>
          </ul>
        </section>
        <div className="setup-runbook">
          <section className="setup-step">
            <span className="setup-step__number" aria-hidden="true">
              1
            </span>
            <div className="setup-step__body">
              <span className="setup-step__label">Editor</span>
              <h2>Install Visual Studio Code</h2>
              <p>
                Install the stable release and add the code command to PATH.
              </p>
              <pre>
                <code>code --version</code>
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
            <h2 id="setup-story-guardrails">
              Keep the lab safe and recoverable
            </h2>
          </div>
          <ul>
            <li>
              <p>
                Make only the changes your training stage requests in{' '}
                <code>packages/react</code>. Use the Hub and other frameworks
                for composition and comparison.
              </p>
            </li>
            <li>
              <p>
                Treat Codex output as a proposal. Review it, run the checks, and
                explain why the result is safe.
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
        name: 'Set up the shared SE project',
      }),
    ).toBeVisible();
    await expect(canvas.getByText('Before session 1')).toBeVisible();
    await expect(
      canvas.getByRole('heading', {
        name: 'Keep the lab safe and recoverable',
      }),
    ).toBeVisible();
  },
};

export const Orientation: Story = {
  args: {
    customerProblem:
      'Important UI states are hard to reproduce, reviews depend on screenshots, and regressions appear late.',
    description:
      'Connect each part of the workflow to a customer problem before you configure or demo it.',
    duration: '35–45 minutes',
    outcome:
      'Explain why Storybook and Chromatic work together and avoid unnecessary coverage.',
    phase: 'Orientation',
    title: 'Start with customer risk, not product features',
    children: (
      <>
        <section className="value-thesis">
          <span className="value-eyebrow">Your field answer</span>
          <h2>Make UI risk visible before it reaches production</h2>
          <p>
            Storybook makes important UI states reproducible. Chromatic turns
            those states into shared evidence that a team can test and review.
          </p>
        </section>
        <section className="value-product-pair" aria-label="Product roles">
          <article>
            <span>Storybook</span>
            <h2>Make the state repeatable</h2>
            <p>Develop, document, and test the UI outside the full app.</p>
          </article>
          <article>
            <span>Chromatic</span>
            <h2>Make the change reviewable</h2>
            <p>
              Capture, compare, and review those states against Git history.
            </p>
          </article>
        </section>
      </>
    ),
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Why customers care')).toBeVisible();
    await expect(
      canvas.getByRole('heading', { name: 'Make the state repeatable' }),
    ).toBeVisible();
    await expect(
      canvas.getByRole('heading', { name: 'Make the change reviewable' }),
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
    title: 'Earn the right to use TurboSnap',
    children: (
      <>
        <h2>Gate</h2>
        <blockquote>
          <p>Do not optimize a build you do not yet trust.</p>
        </blockquote>
      </>
    ),
  },
  play: async ({ canvas }) => {
    await expect(
      canvas.getByText('Post-sales technical training · Advanced'),
    ).toBeVisible();
    await expect(canvas.getByText('Technical training')).toBeVisible();
  },
};

export const ReferencePage: Story = {
  args: {
    phase: 'Reference',
    title: 'Facilitator setup',
    children: (
      <>
        <h2>Shared Chromatic project</h2>
        <p>Seed a passing main build before SEs branch.</p>
      </>
    ),
  },
};
