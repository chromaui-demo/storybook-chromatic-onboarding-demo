import type { Meta, StoryObj } from '@storybook/react-vite';

import Day11Guide from '../../../../docs/onboarding/days/day-11-modes.mdx';
import Day12Guide from '../../../../docs/onboarding/days/day-12-composition.mdx';
import Day13Guide from '../../../../docs/onboarding/days/day-13-monorepo-and-turbosnap.mdx';
import Day14Guide from '../../../../docs/onboarding/days/day-14-storybook-11-readiness.mdx';
import Day15Guide from '../../../../docs/onboarding/days/day-15-capstone.mdx';

const meta = {
  title: 'Visual snapshots/Onboarding/Post-sales technical training/Advanced',
  parameters: { layout: 'fullscreen' },
  tags: ['docs-snapshot', '!test'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Day11Modes: Story = {
  render: () => <Day11Guide />,
};

export const Day12Composition: Story = {
  render: () => <Day12Guide />,
};

export const Day13MonorepoAndTurboSnap: Story = {
  render: () => <Day13Guide />,
};

export const Day14Storybook11Readiness: Story = {
  render: () => <Day14Guide />,
};

export const Day15MockDemo: Story = {
  render: () => <Day15Guide />,
};
