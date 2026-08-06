import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, fn } from 'storybook/test';

import { responsiveModes } from '../../../config/responsive';
import { StayCard } from './StayCard';

const meta = {
  component: StayCard,
  tags: ['ai-generated'],
  args: {
    detailsHref: '/stays/canyon-house',
    location: 'Boise, Idaho',
    onFavoriteChange: fn(),
    price: '$240',
    title: 'Canyon House',
  },
} satisfies Meta<typeof StayCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const ResponsiveCoverage: Story = {
  parameters: { chromatic: { modes: responsiveModes } },
};

export const AppRouterLink: Story = {
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole('link', { name: 'View route details' }),
    ).toHaveAttribute('href', '/stays/canyon-house');
  },
};

export const FavoriteInteraction: Story = {
  play: async ({ args, canvas, userEvent }) => {
    const favoriteButton = canvas.getByRole('button', {
      name: 'Add to favorites',
    });
    await userEvent.click(favoriteButton);

    await expect(args.onFavoriteChange).toHaveBeenCalledWith(true);
    await expect(
      canvas.getByRole('button', { name: 'Remove from favorites' }),
    ).toHaveAttribute('aria-pressed', 'true');
  },
};
