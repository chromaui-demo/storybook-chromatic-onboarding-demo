import type { Meta, StoryObj } from '@storybook/react-vite';

import ProgressTemplateGuide from '../../../../docs/onboarding/PROGRESS_TEMPLATE.mdx';
import WelcomeGuide from '../../../../docs/onboarding/README.mdx';
import SetupGuide from '../../../../docs/onboarding/SETUP.mdx';
import WhyTheWorkflowMattersGuide from '../../../../docs/onboarding/WHY_THIS_WORKFLOW.mdx';

const meta = {
  title: 'Visual snapshots/Onboarding/Start here',
  parameters: { layout: 'fullscreen' },
  tags: ['docs-snapshot', '!test'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Welcome: Story = {
  render: () => <WelcomeGuide />,
};

export const Setup: Story = {
  render: () => <SetupGuide />,
};

export const WhyTheWorkflowMatters: Story = {
  render: () => <WhyTheWorkflowMattersGuide />,
};

export const ProgressTemplate: Story = {
  render: () => <ProgressTemplateGuide />,
};
