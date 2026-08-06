import { useId, useState } from 'react';

export interface Reservation {
  propertyId: string;
  guests: number;
}

export interface ReservationCardProps {
  framework: string;
  location: string;
  maxGuests?: number;
  onReserve: (reservation: Reservation) => void;
  price: string;
  propertyId: string;
  title: string;
}

export function ReservationCard({
  framework,
  location,
  maxGuests = 6,
  onReserve,
  price,
  propertyId,
  title,
}: ReservationCardProps) {
  const headingId = useId();
  const [guests, setGuests] = useState(1);
  const [confirmation, setConfirmation] = useState('');

  const reserve = () => {
    onReserve({ propertyId, guests });
    setConfirmation(
      `Reserved for ${guests} ${guests === 1 ? 'guest' : 'guests'}`,
    );
  };

  return (
    <article className="reservation-card" aria-labelledby={headingId}>
      <div className="reservation-card__visual" aria-hidden="true">
        <span className="reservation-card__badge">{framework}</span>
        <span className="reservation-card__monogram">CH</span>
        <span className="reservation-card__availability">Available now</span>
      </div>

      <div className="reservation-card__content">
        <div>
          <p className="reservation-card__eyebrow">Featured stay</p>
          <h2 id={headingId}>{title}</h2>
          <p className="reservation-card__location">{location}</p>
        </div>

        <p className="reservation-card__price">
          <strong>{price}</strong> / night
        </p>

        <div className="reservation-card__controls">
          <div className="guest-stepper" aria-label="Guest count">
            <button
              type="button"
              aria-label="Decrease guests"
              disabled={guests === 1}
              onClick={() => setGuests((value) => Math.max(1, value - 1))}
            >
              −
            </button>
            <output aria-live="polite">
              {guests} {guests === 1 ? 'guest' : 'guests'}
            </output>
            <button
              type="button"
              aria-label="Increase guests"
              disabled={guests === maxGuests}
              onClick={() =>
                setGuests((value) => Math.min(maxGuests, value + 1))
              }
            >
              +
            </button>
          </div>

          <button
            type="button"
            className="reservation-card__primary"
            onClick={reserve}
          >
            Reserve for {guests} {guests === 1 ? 'guest' : 'guests'}
          </button>
        </div>

        <p className="reservation-card__confirmation" aria-live="polite">
          {confirmation || 'Free cancellation for 48 hours'}
        </p>
      </div>
    </article>
  );
}
