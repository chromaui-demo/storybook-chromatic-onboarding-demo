import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import { expect, fn } from 'storybook/test';

import { responsiveModes } from '../../../config/responsive';
import type { ReservationConfirmedDetail } from './demo-reservation-card';
import './demo-reservation-card';

interface ReservationCardArgs {
  location: string;
  maxGuests: number;
  price: string;
  propertyId: string;
  title: string;
}

const meta = {
  tags: ['ai-generated'],
  args: {
    location: 'Boise, Idaho',
    maxGuests: 6,
    price: '$240',
    propertyId: 'canyon-house',
    title: 'Canyon House',
  },
  render: (args) => html`
    <demo-reservation-card
      data-testid="reservation-card"
      .location=${args.location}
      .maxGuests=${args.maxGuests}
      .price=${args.price}
      .propertyId=${args.propertyId}
      .title=${args.title}
    ></demo-reservation-card>
  `,
} satisfies Meta<ReservationCardArgs>;

export default meta;
type Story = StoryObj<ReservationCardArgs>;

export const Default: Story = {};

export const ResponsiveCoverage: Story = {
  parameters: { chromatic: { modes: responsiveModes } },
};

export const CustomEventInteraction: Story = {
  play: async ({ canvas, userEvent }) => {
    const card = canvas.getByTestId('reservation-card');
    const shadowRoot = card.shadowRoot;

    if (!shadowRoot) {
      throw new Error(
        'Expected the reservation card shadow root to be available',
      );
    }

    const increaseButton = shadowRoot.querySelector<HTMLButtonElement>(
      'button[aria-label="Increase guests"]',
    );
    const reserveButton =
      shadowRoot.querySelector<HTMLButtonElement>('.wc-card__primary');
    const confirmation = shadowRoot.querySelector<HTMLElement>(
      '.wc-card__confirmation',
    );

    if (!increaseButton || !reserveButton || !confirmation) {
      throw new Error(
        'Expected the reservation controls to render inside the shadow root',
      );
    }

    const listener =
      fn<(event: CustomEvent<ReservationConfirmedDetail>) => void>();
    card.addEventListener('reservation-confirmed', listener);

    await userEvent.click(increaseButton);
    await expect(reserveButton).toHaveAccessibleName('Reserve for 2 guests');
    await userEvent.click(reserveButton);

    await expect(listener).toHaveBeenCalledOnce();
    const event = listener.mock.calls[0][0];
    await expect(event.detail).toEqual({
      propertyId: 'canyon-house',
      guests: 2,
    });
    await expect(confirmation).toHaveTextContent('Reserved for 2 guests');
  },
};
