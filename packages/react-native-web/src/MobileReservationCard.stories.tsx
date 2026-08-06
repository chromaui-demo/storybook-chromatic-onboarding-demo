import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { expect, fn } from 'storybook/test';

import { responsiveModes } from '../../../config/responsive';
import { MobileReservationCard } from './MobileReservationCard';

const meta = {
  component: MobileReservationCard,
  tags: ['ai-generated'],
  args: {
    location: 'Boise, Idaho',
    maxGuests: 6,
    onReserve: fn(),
    price: '$240',
    propertyId: 'canyon-house',
    title: 'Canyon House',
  },
} satisfies Meta<typeof MobileReservationCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const MobileWeb: Story = {
  globals: { viewport: { value: 'compact', isRotated: false } },
};

export const ResponsiveCoverage: Story = {
  parameters: { chromatic: { modes: responsiveModes } },
};

export const PressInteraction: Story = {
  globals: { viewport: { value: 'compact', isRotated: false } },
  play: async ({ args, canvas, userEvent }) => {
    await userEvent.click(
      canvas.getByRole('button', { name: 'Increase guests' }),
    );
    await userEvent.click(
      canvas.getByRole('button', { name: 'Reserve for 2 guests' }),
    );

    await expect(args.onReserve).toHaveBeenCalledWith({
      propertyId: 'canyon-house',
      guests: 2,
    });
    await expect(canvas.getByText('Reserved for 2 guests')).toBeVisible();
  },
};
