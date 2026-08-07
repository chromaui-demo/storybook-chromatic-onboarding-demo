import type { Meta, StoryObj } from '@storybook/react-vite';

import StartHereGuide from '../../stories/Introduction.mdx';

/**
 * MDX files create documentation entries, not Canvas stories. These stories
 * render the source MDX directly so Chromatic keeps visual history for every
 * guide without duplicating its content.
 */
const meta = {
  title: 'Visual snapshots/Demo guide',
  parameters: { layout: 'fullscreen' },
  tags: ['docs-snapshot', '!test'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const StartHere: Story = {
  render: () => <StartHereGuide />,
};
