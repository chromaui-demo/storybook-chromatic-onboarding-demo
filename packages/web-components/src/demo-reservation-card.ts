import { LitElement, css, html } from 'lit';

export interface ReservationConfirmedDetail {
  propertyId: string;
  guests: number;
}

export class DemoReservationCard extends LitElement {
  static properties = {
    location: { type: String },
    maxGuests: { type: Number, attribute: 'max-guests' },
    price: { type: String },
    propertyId: { type: String, attribute: 'property-id' },
    title: { type: String },
    guests: { state: true },
    confirmation: { state: true },
  };

  location = 'Boise, Idaho';
  maxGuests = 6;
  price = '$240';
  propertyId = 'canyon-house';
  title = 'Canyon House';
  private guests = 1;
  private confirmation = '';

  private reserve() {
    const detail: ReservationConfirmedDetail = {
      propertyId: this.propertyId,
      guests: this.guests,
    };

    this.dispatchEvent(
      new CustomEvent<ReservationConfirmedDetail>('reservation-confirmed', {
        bubbles: true,
        composed: true,
        detail,
      }),
    );
    this.confirmation = `Reserved for ${this.guests} ${this.guests === 1 ? 'guest' : 'guests'}`;
  }

  render() {
    return html`
      <article class="wc-card" aria-labelledby="wc-card-title">
        <div class="wc-card__visual" aria-hidden="true">
          <span>Web Components</span>
          <strong>&lt;stay-card&gt;</strong>
        </div>

        <div class="wc-card__content">
          <div>
            <p class="wc-card__eyebrow">Portable custom element</p>
            <h2 id="wc-card-title">${this.title}</h2>
            <p class="wc-card__location">${this.location}</p>
          </div>

          <p class="wc-card__price"><strong>${this.price}</strong> / night</p>

          <div class="wc-card__controls">
            <div class="wc-stepper" aria-label="Guest count">
              <button
                type="button"
                aria-label="Decrease guests"
                ?disabled=${this.guests === 1}
                @click=${() => (this.guests = Math.max(1, this.guests - 1))}
              >
                −
              </button>
              <output aria-live="polite">
                ${this.guests} ${this.guests === 1 ? 'guest' : 'guests'}
              </output>
              <button
                type="button"
                aria-label="Increase guests"
                ?disabled=${this.guests === this.maxGuests}
                @click=${() => (this.guests = Math.min(this.maxGuests, this.guests + 1))}
              >
                +
              </button>
            </div>

            <button
              type="button"
              class="wc-card__primary"
              @click=${this.reserve}
            >
              Reserve for ${this.guests}
              ${this.guests === 1 ? 'guest' : 'guests'}
            </button>
          </div>

          <p class="wc-card__confirmation" aria-live="polite">
            ${this.confirmation || 'CustomEvent bubbles across the shadow boundary'}
          </p>
        </div>
      </article>
    `;
  }

  static styles = css`
    :host {
      display: block;
      width: min(760px, calc(100vw - 32px));
      min-width: min(320px, calc(100vw - 32px));
      color: #142732;
      font-family: Inter, ui-sans-serif, system-ui, sans-serif;
    }

    * {
      box-sizing: border-box;
    }

    button {
      font: inherit;
      touch-action: manipulation;
    }

    .wc-card {
      display: grid;
      overflow: hidden;
      border: 1px solid rgb(21 82 112 / 19%);
      border-radius: 24px;
      background: #fff;
      box-shadow: 0 24px 70px rgb(16 66 91 / 16%);
    }

    .wc-card__visual {
      display: grid;
      min-height: 180px;
      align-content: space-between;
      padding: 18px;
      background:
        radial-gradient(
          circle at 15% 88%,
          rgb(255 255 255 / 18%),
          transparent 32%
        ),
        linear-gradient(145deg, #0b7896, #00a59a 57%, #70d28b);
      color: #fff;
    }

    .wc-card__visual span {
      justify-self: start;
      padding: 7px 10px;
      border: 1px solid rgb(255 255 255 / 46%);
      border-radius: 999px;
      font-size: 12px;
      font-weight: 850;
    }

    .wc-card__visual strong {
      overflow-wrap: anywhere;
      font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
      font-size: clamp(26px, 8vw, 50px);
      letter-spacing: -0.06em;
    }

    .wc-card__content {
      display: grid;
      gap: 19px;
      min-width: 0;
      padding: clamp(20px, 5vw, 34px);
    }

    .wc-card__eyebrow {
      margin: 0 0 7px;
      color: #087c79;
      font-size: 12px;
      font-weight: 850;
      letter-spacing: 0.1em;
      text-transform: uppercase;
    }

    h2 {
      margin: 0;
      font-size: clamp(26px, 5vw, 36px);
      line-height: 1.05;
      letter-spacing: -0.04em;
      text-wrap: balance;
    }

    .wc-card__location,
    .wc-card__price,
    .wc-card__confirmation {
      margin: 0;
      color: #617681;
    }

    .wc-card__location {
      margin-top: 8px;
    }

    .wc-card__price {
      font-variant-numeric: tabular-nums;
    }

    .wc-card__price strong {
      color: #142732;
      font-size: 22px;
    }

    .wc-card__controls {
      display: grid;
      gap: 12px;
    }

    .wc-stepper {
      display: grid;
      grid-template-columns: 44px minmax(110px, 1fr) 44px;
      align-items: center;
      overflow: hidden;
      border: 1px solid #cce1e6;
      border-radius: 14px;
    }

    .wc-stepper button {
      min-width: 44px;
      min-height: 44px;
      border: 0;
      background: #eaf8f7;
      color: #087c79;
      cursor: pointer;
      font-size: 22px;
      font-weight: 800;
    }

    .wc-stepper button:disabled {
      color: #aeb9bd;
      cursor: not-allowed;
    }

    .wc-stepper output {
      padding: 0 8px;
      text-align: center;
      font-size: 14px;
      font-weight: 750;
      font-variant-numeric: tabular-nums;
    }

    .wc-card__primary {
      min-height: 48px;
      padding: 12px 18px;
      border: 0;
      border-radius: 14px;
      background: #087c79;
      color: #fff;
      cursor: pointer;
      font-weight: 850;
      box-shadow: 0 10px 24px rgb(8 124 121 / 24%);
    }

    button:focus-visible {
      outline: 3px solid #ff9f43;
      outline-offset: 3px;
    }

    .wc-card__confirmation {
      min-height: 20px;
      font-size: 13px;
    }

    @media (min-width: 640px) {
      .wc-card {
        grid-template-columns: minmax(260px, 0.9fr) minmax(360px, 1.1fr);
      }

      .wc-card__visual {
        min-height: 430px;
      }

      .wc-card__controls {
        grid-template-columns: minmax(190px, 0.8fr) minmax(190px, 1.2fr);
      }
    }
  `;
}

if (!customElements.get('demo-reservation-card')) {
  customElements.define('demo-reservation-card', DemoReservationCard);
}

declare global {
  interface HTMLElementTagNameMap {
    'demo-reservation-card': DemoReservationCard;
  }

  interface HTMLElementEventMap {
    'reservation-confirmed': CustomEvent<ReservationConfirmedDetail>;
  }
}
