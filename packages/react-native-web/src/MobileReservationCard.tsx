import { useState } from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';

export interface MobileReservation {
  propertyId: string;
  guests: number;
}

export interface MobileReservationCardProps {
  location: string;
  maxGuests?: number;
  onReserve: (reservation: MobileReservation) => void;
  price: string;
  propertyId: string;
  title: string;
}

export function MobileReservationCard({
  location,
  maxGuests = 6,
  onReserve,
  price,
  propertyId,
  title,
}: MobileReservationCardProps) {
  const { height, width } = useWindowDimensions();
  const compact = width < 640;
  const [guests, setGuests] = useState(1);
  const [confirmation, setConfirmation] = useState('');

  const reserve = () => {
    onReserve({ propertyId, guests });
    setConfirmation(
      `Reserved for ${guests} ${guests === 1 ? 'guest' : 'guests'}`,
    );
  };

  return (
    <View style={[styles.screen, { minHeight: height }]}>
      <View
        style={[styles.card, compact ? styles.cardCompact : styles.cardWide]}
      >
        <View
          style={[
            styles.visual,
            compact ? styles.visualCompact : styles.visualWide,
          ]}
        >
          <View style={styles.badge}>
            <Text style={styles.badgeText}>React Native Web</Text>
          </View>
          <Text style={styles.visualTitle}>Native primitives</Text>
          <Text style={styles.visualNote}>Browser-rendered demo</Text>
        </View>

        <View style={styles.content}>
          <View>
            <Text style={styles.eyebrow}>Mobile component</Text>
            <Text accessibilityRole="header" style={styles.title}>
              {title}
            </Text>
            <Text style={styles.location}>{location}</Text>
          </View>

          <Text style={styles.price}>
            <Text style={styles.priceStrong}>{price}</Text> / night
          </Text>

          <View
            style={[
              styles.controls,
              compact ? styles.controlsCompact : styles.controlsWide,
            ]}
          >
            <View accessibilityLabel="Guest count" style={styles.stepper}>
              <Pressable
                accessibilityLabel="Decrease guests"
                accessibilityRole="button"
                disabled={guests === 1}
                hitSlop={6}
                onPress={() => setGuests((value) => Math.max(1, value - 1))}
                style={({ pressed }) => [
                  styles.stepperButton,
                  guests === 1 && styles.stepperButtonDisabled,
                  pressed && styles.pressed,
                ]}
              >
                <Text style={styles.stepperButtonText}>−</Text>
              </Pressable>
              <Text accessibilityLiveRegion="polite" style={styles.guestCount}>
                {guests} {guests === 1 ? 'guest' : 'guests'}
              </Text>
              <Pressable
                accessibilityLabel="Increase guests"
                accessibilityRole="button"
                disabled={guests === maxGuests}
                hitSlop={6}
                onPress={() =>
                  setGuests((value) => Math.min(maxGuests, value + 1))
                }
                style={({ pressed }) => [
                  styles.stepperButton,
                  guests === maxGuests && styles.stepperButtonDisabled,
                  pressed && styles.pressed,
                ]}
              >
                <Text style={styles.stepperButtonText}>+</Text>
              </Pressable>
            </View>

            <Pressable
              accessibilityLabel={`Reserve for ${guests} ${guests === 1 ? 'guest' : 'guests'}`}
              accessibilityRole="button"
              onPress={reserve}
              style={({ pressed }) => [
                styles.primary,
                pressed && styles.pressed,
              ]}
            >
              <Text style={styles.primaryText}>
                Reserve for {guests} {guests === 1 ? 'guest' : 'guests'}
              </Text>
            </Pressable>
          </View>

          <Text accessibilityLiveRegion="polite" style={styles.confirmation}>
            {confirmation || 'Viewport coverage uses the web renderer'}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#f2f0ff',
  },
  card: {
    width: '100%',
    maxWidth: 760,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#d8d2f4',
    borderRadius: 24,
    backgroundColor: '#ffffff',
    shadowColor: '#392a7a',
    shadowOpacity: 0.16,
    shadowRadius: 28,
    shadowOffset: { width: 0, height: 16 },
  },
  cardCompact: {
    flexDirection: 'column',
  },
  cardWide: {
    flexDirection: 'row',
  },
  visual: {
    justifyContent: 'space-between',
    padding: 18,
    backgroundColor: '#6251d7',
  },
  visualCompact: {
    minHeight: 180,
  },
  visualWide: {
    width: '38%',
    minHeight: 430,
  },
  badge: {
    alignSelf: 'flex-start',
    paddingVertical: 7,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#a99fff',
    borderRadius: 999,
    backgroundColor: '#3d309d',
  },
  badgeText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '800',
  },
  visualTitle: {
    color: '#ffffff',
    fontSize: 46,
    fontWeight: '900',
    letterSpacing: -3,
    lineHeight: 42,
  },
  visualNote: {
    color: '#ddd8ff',
    fontSize: 13,
    fontWeight: '600',
  },
  content: {
    flex: 1,
    minWidth: 0,
    gap: 19,
    padding: 28,
  },
  eyebrow: {
    marginBottom: 7,
    color: '#6251d7',
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
  },
  title: {
    color: '#201943',
    fontSize: 34,
    fontWeight: '900',
    letterSpacing: -1.2,
    lineHeight: 36,
  },
  location: {
    marginTop: 8,
    color: '#716c84',
    fontSize: 16,
  },
  price: {
    color: '#716c84',
    fontVariant: ['tabular-nums'],
  },
  priceStrong: {
    color: '#201943',
    fontSize: 22,
    fontWeight: '800',
  },
  controls: {
    gap: 12,
  },
  controlsCompact: {
    flexDirection: 'column',
  },
  controlsWide: {
    flexDirection: 'row',
  },
  stepper: {
    flex: 1,
    minWidth: 190,
    minHeight: 48,
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#d8d2f4',
    borderRadius: 14,
  },
  stepperButton: {
    width: 46,
    minHeight: 46,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f2f0ff',
  },
  stepperButtonDisabled: {
    opacity: 0.42,
  },
  stepperButtonText: {
    color: '#6251d7',
    fontSize: 22,
    fontWeight: '800',
  },
  guestCount: {
    flex: 1,
    minWidth: 96,
    color: '#201943',
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '800',
    fontVariant: ['tabular-nums'],
  },
  primary: {
    flex: 1,
    minWidth: 190,
    minHeight: 48,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 14,
    backgroundColor: '#6251d7',
  },
  primaryText: {
    color: '#ffffff',
    fontWeight: '900',
  },
  pressed: {
    opacity: 0.72,
  },
  confirmation: {
    minHeight: 20,
    color: '#716c84',
    fontSize: 13,
  },
});
