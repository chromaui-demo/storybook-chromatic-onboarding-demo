import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

export interface AngularReservation {
  propertyId: string;
  guests: number;
}

@Component({
  selector: 'demo-reservation-card',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <article class="angular-card" aria-labelledby="angular-card-title">
      <div class="angular-card__visual" aria-hidden="true">
        <span>Angular</span>
        <strong>Signals<br />ready</strong>
      </div>

      <div class="angular-card__content">
        <div>
          <p class="angular-card__eyebrow">Standalone component</p>
          <h2 id="angular-card-title">{{ title }}</h2>
          <p class="angular-card__location">{{ location }}</p>
        </div>

        <p class="angular-card__price">
          <strong>{{ price }}</strong> / night
        </p>

        <div class="angular-card__controls">
          <div class="angular-stepper" aria-label="Guest count">
            <button
              type="button"
              aria-label="Decrease guests"
              [disabled]="guests === 1"
              (click)="decreaseGuests()"
            >
              −
            </button>
            <output aria-live="polite">{{ guests }} {{ guests === 1 ? 'guest' : 'guests' }}</output>
            <button
              type="button"
              aria-label="Increase guests"
              [disabled]="guests === maxGuests"
              (click)="increaseGuests()"
            >
              +
            </button>
          </div>

          <button type="button" class="angular-card__primary" (click)="reserve()">
            Reserve for {{ guests }} {{ guests === 1 ? 'guest' : 'guests' }}
          </button>
        </div>

        <p class="angular-card__confirmation" aria-live="polite">
          {{ confirmation || 'Component output is ready to inspect' }}
        </p>
      </div>
    </article>
  `,
  styles: `
    :host {
      display: block;
      width: min(760px, calc(100vw - 32px));
      min-width: min(320px, calc(100vw - 32px));
      color: #271533;
      font-family: Inter, ui-sans-serif, system-ui, sans-serif;
    }

    * {
      box-sizing: border-box;
    }

    button {
      font: inherit;
      touch-action: manipulation;
    }

    .angular-card {
      display: grid;
      overflow: hidden;
      border: 1px solid rgb(111 37 128 / 18%);
      border-radius: 24px;
      background: #fff;
      box-shadow: 0 24px 70px rgb(89 24 102 / 16%);
    }

    .angular-card__visual {
      display: grid;
      min-height: 180px;
      align-content: space-between;
      padding: 18px;
      background:
        radial-gradient(circle at 90% 15%, rgb(255 255 255 / 30%), transparent 25%),
        linear-gradient(140deg, #8c1bab, #d72d7d 56%, #ff815c);
      color: #fff;
    }

    .angular-card__visual span {
      justify-self: start;
      padding: 7px 10px;
      border: 1px solid rgb(255 255 255 / 42%);
      border-radius: 999px;
      background: rgb(54 13 65 / 28%);
      font-size: 12px;
      font-weight: 800;
    }

    .angular-card__visual strong {
      font-size: clamp(42px, 11vw, 70px);
      line-height: 0.82;
      letter-spacing: -0.07em;
    }

    .angular-card__content {
      display: grid;
      gap: 19px;
      min-width: 0;
      padding: clamp(20px, 5vw, 34px);
    }

    .angular-card__eyebrow {
      margin: 0 0 7px;
      color: #a51e6d;
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

    .angular-card__location,
    .angular-card__price,
    .angular-card__confirmation {
      margin: 0;
      color: #75627d;
    }

    .angular-card__location {
      margin-top: 8px;
    }

    .angular-card__price {
      font-variant-numeric: tabular-nums;
    }

    .angular-card__price strong {
      color: #271533;
      font-size: 22px;
    }

    .angular-card__controls {
      display: grid;
      gap: 12px;
    }

    .angular-stepper {
      display: grid;
      grid-template-columns: 44px minmax(110px, 1fr) 44px;
      align-items: center;
      overflow: hidden;
      border: 1px solid #e2cee7;
      border-radius: 14px;
    }

    .angular-stepper button {
      min-width: 44px;
      min-height: 44px;
      border: 0;
      background: #fff2fa;
      color: #a51e6d;
      cursor: pointer;
      font-size: 22px;
      font-weight: 800;
    }

    .angular-stepper button:disabled {
      color: #b9aebd;
      cursor: not-allowed;
    }

    .angular-stepper output {
      padding: 0 8px;
      text-align: center;
      font-size: 14px;
      font-weight: 750;
      font-variant-numeric: tabular-nums;
    }

    .angular-card__primary {
      min-height: 48px;
      padding: 12px 18px;
      border: 0;
      border-radius: 14px;
      background: #a51e6d;
      color: #fff;
      cursor: pointer;
      font-weight: 850;
      box-shadow: 0 10px 24px rgb(165 30 109 / 24%);
    }

    button:focus-visible {
      outline: 3px solid #ff9f43;
      outline-offset: 3px;
    }

    .angular-card__confirmation {
      min-height: 20px;
      font-size: 13px;
    }

    @media (min-width: 640px) {
      .angular-card {
        grid-template-columns: minmax(260px, 0.9fr) minmax(360px, 1.1fr);
      }

      .angular-card__visual {
        min-height: 430px;
      }

      .angular-card__controls {
        grid-template-columns: minmax(190px, 0.8fr) minmax(190px, 1.2fr);
      }
    }
  `,
})
export class ReservationCardComponent {
  @Input() location = 'Boise, Idaho';
  @Input() maxGuests = 6;
  @Input() price = '$240';
  @Input() propertyId = 'canyon-house';
  @Input() title = 'Canyon House';
  @Output() readonly reserved = new EventEmitter<AngularReservation>();

  guests = 1;
  confirmation = '';

  decreaseGuests() {
    this.guests = Math.max(1, this.guests - 1);
  }

  increaseGuests() {
    this.guests = Math.min(this.maxGuests, this.guests + 1);
  }

  reserve() {
    this.reserved.emit({ propertyId: this.propertyId, guests: this.guests });
    this.confirmation = `Reserved for ${this.guests} ${this.guests === 1 ? 'guest' : 'guests'}`;
  }
}
