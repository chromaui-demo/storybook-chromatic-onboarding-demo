'use client';

import Link from 'next/link';
import { useId, useState } from 'react';

export interface StayCardProps {
  detailsHref: string;
  location: string;
  onFavoriteChange: (favorite: boolean) => void;
  price: string;
  title: string;
}

export function StayCard({
  detailsHref,
  location,
  onFavoriteChange,
  price,
  title,
}: StayCardProps) {
  const headingId = useId();
  const [favorite, setFavorite] = useState(false);

  const toggleFavorite = () => {
    const nextFavorite = !favorite;
    setFavorite(nextFavorite);
    onFavoriteChange(nextFavorite);
  };

  return (
    <article className="next-card" aria-labelledby={headingId}>
      <div className="next-card__visual" aria-hidden="true">
        <span>Next.js</span>
        <strong>App Router</strong>
      </div>

      <div className="next-card__content">
        <div className="next-card__heading-row">
          <div>
            <p className="next-card__eyebrow">Server-ready listing</p>
            <h2 id={headingId}>{title}</h2>
            <p>{location}</p>
          </div>
          <button
            type="button"
            className="next-card__favorite"
            aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'}
            aria-pressed={favorite}
            onClick={toggleFavorite}
          >
            {favorite ? '♥' : '♡'}
          </button>
        </div>

        <div className="next-card__footer">
          <p>
            <strong>{price}</strong> / night
          </p>
          <Link href={detailsHref}>View route details</Link>
        </div>
      </div>
    </article>
  );
}
