import type { Meta, StoryObj } from '@storybook/angular-vite';
import { expect, fn } from 'storybook/test';

import { responsiveModes } from '../../../../config/responsive';
import { ReservationCardComponent } from './reservation-card.component';

const reserved = fn();

const meta = {
  component: ReservationCardComponent,
  tags: ['ai-generated'],
  args: {
    location: 'Boise, Idaho',
    maxGuests: 6,
    price: '$240',
    propertyId: 'canyon-house',
    reserved,
    title: 'Canyon House',
  },
} satisfies Meta<ReservationCardComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const ResponsiveCoverage: Story = {
  parameters: { chromatic: { modes: responsiveModes } },
};

export const OutputInteraction: Story = {
  play: async ({ canvas, userEvent }) => {
    reserved.mockClear();
    await userEvent.click(canvas.getByRole('button', { name: 'Increase guests' }));
    await userEvent.click(canvas.getByRole('button', { name: 'Reserve for 2 guests' }));

    await expect(reserved).toHaveBeenCalledWith({
      propertyId: 'canyon-house',
      guests: 2,
    });
    await expect(canvas.getByText('Reserved for 2 guests')).toBeVisible();
  },
};
