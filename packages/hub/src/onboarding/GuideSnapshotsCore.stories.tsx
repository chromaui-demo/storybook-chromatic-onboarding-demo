import type { Meta, StoryObj } from '@storybook/react-vite';

import Day01Guide from '../../../../docs/onboarding/days/day-01-upgrade-and-orient.mdx';
import Day02Guide from '../../../../docs/onboarding/days/day-02-agentic-setup.mdx';
import Day03Guide from '../../../../docs/onboarding/days/day-03-stories-docs-manifests.mdx';
import Day04Guide from '../../../../docs/onboarding/days/day-04-mcp.mdx';
import Day05Guide from '../../../../docs/onboarding/days/day-05-msw.mdx';
import Day06Guide from '../../../../docs/onboarding/days/day-06-interactions.mdx';
import Day07Guide from '../../../../docs/onboarding/days/day-07-accessibility.mdx';
import Day08Guide from '../../../../docs/onboarding/days/day-08-chromatic-first-build.mdx';
import Day09Guide from '../../../../docs/onboarding/days/day-09-visual-review.mdx';
import Day10Guide from '../../../../docs/onboarding/days/day-10-ci-and-core-demo.mdx';

const meta = {
  title: 'Visual snapshots/Onboarding/Post-sales technical training/Core',
  parameters: { layout: 'fullscreen' },
  tags: ['docs-snapshot', '!test'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Day01UpgradeAndOrient: Story = {
  render: () => <Day01Guide />,
};

export const Day02AgenticSetup: Story = {
  render: () => <Day02Guide />,
};

export const Day03StoriesDocsAndManifests: Story = {
  render: () => <Day03Guide />,
};

export const Day04StorybookMcp: Story = {
  render: () => <Day04Guide />,
};

export const Day05MockServiceWorker: Story = {
  render: () => <Day05Guide />,
};

export const Day06InteractionTests: Story = {
  render: () => <Day06Guide />,
};

export const Day07Accessibility: Story = {
  render: () => <Day07Guide />,
};

export const Day08FirstChromaticBuild: Story = {
  render: () => <Day08Guide />,
};

export const Day09VisualReview: Story = {
  render: () => <Day09Guide />,
};

export const Day10CiAndCoreDemo: Story = {
  render: () => <Day10Guide />,
};
