import type { Meta, StoryObj } from '@storybook/react-vite';

import CapstoneRubricGuide from '../../../../docs/onboarding/CAPSTONE.mdx';
import FacilitatorSetupGuide from '../../../../docs/onboarding/FACILITATOR.mdx';

const meta = {
  title: 'Visual snapshots/Onboarding/Reference',
  parameters: { layout: 'fullscreen' },
  tags: ['docs-snapshot', '!test'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const CapstoneRubric: Story = {
  render: () => <CapstoneRubricGuide />,
};

export const FacilitatorSetup: Story = {
  render: () => <FacilitatorSetupGuide />,
};
