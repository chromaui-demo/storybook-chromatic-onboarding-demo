import type { Meta, StoryObj } from '@storybook/react-vite';

import Session01Guide from '../../../../docs/onboarding/presales/session-01-storybook-10-value.mdx';
import Session02Guide from '../../../../docs/onboarding/presales/session-02-stories-demo-states.mdx';
import Session03Guide from '../../../../docs/onboarding/presales/session-03-storybook-mcp.mdx';
import Session04Guide from '../../../../docs/onboarding/presales/session-04-storybook-test-locally.mdx';
import Session05Guide from '../../../../docs/onboarding/presales/session-05-storybook-test-in-ci.mdx';
import Session06Guide from '../../../../docs/onboarding/presales/session-06-chromatic-evidence.mdx';
import Session07Guide from '../../../../docs/onboarding/presales/session-07-demo-narrative.mdx';
import Session08Guide from '../../../../docs/onboarding/presales/session-08-demo-capstone.mdx';

const meta = {
  title: 'Visual snapshots/Onboarding/Core onboarding',
  parameters: { layout: 'fullscreen' },
  tags: ['docs-snapshot', '!test'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Session01Storybook10Value: Story = {
  render: () => <Session01Guide />,
};

export const Session02StoriesAndDemoStates: Story = {
  render: () => <Session02Guide />,
};

export const Session03StorybookMcp: Story = {
  render: () => <Session03Guide />,
};

export const Session04StorybookTestLocally: Story = {
  render: () => <Session04Guide />,
};

export const Session05StorybookTestInCi: Story = {
  render: () => <Session05Guide />,
};

export const Session06ChromaticEvidence: Story = {
  render: () => <Session06Guide />,
};

export const Session07DemoNarrative: Story = {
  render: () => <Session07Guide />,
};

export const Session08DemoCapstone: Story = {
  render: () => <Session08Guide />,
};
