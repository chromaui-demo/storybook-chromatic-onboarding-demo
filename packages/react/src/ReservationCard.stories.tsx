import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn } from 'storybook/test';

import { responsiveModes } from '../../../config/responsive';
import { ReservationCard } from './ReservationCard';

const meta = {
  component: ReservationCard,
  tags: ['ai-generated'],
  args: {
    framework: 'React',
    location: 'Boise, Idaho',
    maxGuests: 6,
    onReserve: fn(),
    price: '$240',
    propertyId: 'canyon-house',
    title: 'Canyon House',
  },
} satisfies Meta<typeof ReservationCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const ResponsiveCoverage: Story = {
  parameters: {
    chromatic: { modes: responsiveModes },
  },
};

export const LongLocalizedContent: Story = {
  args: {
    location: 'Bergisches Land, Nordrhein-Westfalen, Deutschland',
    price: '€1,240',
    title: 'A restorative hillside retreat with panoramic valley views',
  },
};

export const ReservationInteraction: Story = {
  play: async ({ args, canvas, userEvent }) => {
    await userEvent.click(
      canvas.getByRole('button', { name: 'Increase guests' }),
    );
    await userEvent.click(
      canvas.getByRole('button', { name: 'Increase guests' }),
    );
    await userEvent.click(
      canvas.getByRole('button', { name: 'Reserve for 3 guests' }),
    );

    await expect(args.onReserve).toHaveBeenCalledWith({
      propertyId: 'canyon-house',
      guests: 3,
    });
    await expect(canvas.getByText('Reserved for 3 guests')).toBeVisible();
  },
};

export const CssCheck: Story = {
  play: async ({ canvas }) => {
    const reserveButton = canvas.getByRole('button', {
      name: 'Reserve for 1 guest',
    });
    await expect(getComputedStyle(reserveButton).backgroundColor).toBe(
      'rgb(74, 44, 255)',
    );
  },
};
