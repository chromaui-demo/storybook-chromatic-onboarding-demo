import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';

import { CourseTable } from './CoursePage';

const meta = {
  component: CourseTable,
  parameters: { layout: 'padded' },
  args: {
    label: 'Story moments and the proof they provide',
    columns: ['Story moment', 'What to show', 'What it proves'],
    rows: [
      [
        'Default state',
        'Change an input through Controls',
        'The state is isolated and editable',
      ],
      [
        'Responsive coverage',
        'Move between named widths',
        'Important layout risks are explicit',
      ],
      [
        'Reservation interaction',
        'Run the play function',
        'The example can also prove behavior',
      ],
    ],
  },
} satisfies Meta<typeof CourseTable>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvas }) => {
    const tableRegion = canvas.getByRole('region', {
      name: 'Story moments and the proof they provide',
    });

    await expect(tableRegion).toBeVisible();
    await expect(
      canvas.getByRole('columnheader', { name: 'What it proves' }),
    ).toBeVisible();
    await expect(
      canvas.getByRole('rowheader', { name: 'Reservation interaction' }),
    ).toBeVisible();
    await expect(
      canvas.getByText('The example can also prove behavior'),
    ).toBeVisible();
  },
};
