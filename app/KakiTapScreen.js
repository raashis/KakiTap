import { BlurView } from 'expo-blur'; // Use expo-blur for Expo projects
import { useRouter } from 'expo-router'; // Use Expo Router
import { useRef } from 'react';
import { Animated, Dimensions, Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native';

const CARD_WIDTH = 260;
const CARD_HEIGHT = 360;
const CARD_MARGIN = 16;

const baseEvents = [
  { key: '1', image: require('../assets/posters/poster2.jpg') },
  { key: '2', image: require('../assets/posters/poster5.jpg') },
  { key: '3', image: require('../assets/posters/poster3.jpg') },
  { key: '4', image: require('../assets/posters/poster1.jpg') },
];

// Repeat posters for looping effect
const LOOP_COUNT = 3;
const events = Array(LOOP_COUNT)
  .fill(baseEvents)
  .flat()
  .map((event, idx) => ({ ...event, key: `${event.key}-${idx}` }));

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CENTER_OFFSET = (SCREEN_WIDTH - CARD_WIDTH) / 2;

export default function KakiTapScreen() {
  const router = useRouter(); // Use Expo Router hook
  const scrollX = useRef(new Animated.Value(0)).current;

  const handleScanCard = () => {
    // Navigate using Expo Router to the barcodescanner route
    router.push('/barcodescanner');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>KAKI TAP</Text>
      <View style={styles.carouselRow}>
        <Text style={styles.arrow}>{'<'}</Text>
        <Animated.ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          snapToInterval={CARD_WIDTH + CARD_MARGIN}
          decelerationRate="fast"
          contentContainerStyle={{
            paddingHorizontal: CENTER_OFFSET,
          }}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: true }
          )}
          scrollEventThrottle={16}
        >
          {events.map((event, index) => {
            const inputRange = [
              (CARD_WIDTH + CARD_MARGIN) * (index - 1),
              (CARD_WIDTH + CARD_MARGIN) * index,
              (CARD_WIDTH + CARD_MARGIN) * (index + 1),
            ];

            const scale = scrollX.interpolate({
              inputRange,
              outputRange: [0.85, 1, 0.85],
              extrapolate: 'clamp',
            });

            const blurOpacity = scrollX.interpolate({
              inputRange,
              outputRange: [0.8, 0, 0.8], // More blur on sides, none in center
              extrapolate: 'clamp',
            });

            return (
              <Animated.View
                key={event.key}
                style={[
                  styles.card,
                  { transform: [{ scale }] },
                ]}
              >
                <Image source={event.image} style={styles.cardImage} />
                <Animated.View
                  pointerEvents="none"
                  style={[
                    StyleSheet.absoluteFill,
                    { opacity: blurOpacity },
                  ]}
                >
                  <BlurView
                    style={StyleSheet.absoluteFill}
                    tint="light"
                    intensity={40}
                  />
                </Animated.View>
              </Animated.View>
            );
          })}
        </Animated.ScrollView>
        <Text style={styles.arrow}>{'>'}</Text>
      </View>
      
      <View style={styles.instructions}>
        <Text style={styles.instructionText}>Please scan your Card  •  请扫描您的卡</Text>
        <Text style={styles.instructionText}>Sila imbas kad anda  •  sila imbas oii</Text>
      </View>

      {/* Scan Card Button - positioned at bottom */}
      <View style={styles.bottomSection}>
        <TouchableOpacity
          style={styles.scanButton}
          onPress={handleScanCard}
          activeOpacity={0.8}
        >
          <Text style={styles.scanButtonText}>📱 TAP TO SCAN CARD</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e0f4ff',
    padding: 32,
  },
  title: {
    fontSize: 38,
    fontWeight: 'bold',
    color: '#008080',
    marginBottom: 48,
    letterSpacing: 2,
    textAlign: 'center',
    marginTop: 40,
  },
  carouselRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 36,
  },
  arrow: {
    fontSize: 44,
    color: '#008080',
    fontWeight: 'bold',
    marginHorizontal: 6,
  },
  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    backgroundColor: '#fff',
    borderRadius: 18,
    marginRight: CARD_MARGIN,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 12,
    elevation: 8,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    padding: 0,
  },
  cardImage: {
    width: '100%',
    height: '100%',
    borderRadius: 18,
    resizeMode: 'cover',
  },
  instructions: {
    marginTop: 24,
    alignItems: 'center',
    marginBottom: 40,
  },
  instructionText: {
    fontSize: 20,
    color: '#2c3e50',
    fontWeight: '600',
    marginVertical: 2,
    textAlign: 'center',
  },
  bottomSection: {
    position: 'absolute',
    bottom: 60,
    left: 32,
    right: 32,
    alignItems: 'center',
  },
  scanButton: {
    backgroundColor: '#008080',
    paddingHorizontal: 60,
    paddingVertical: 20,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 8,
    borderWidth: 3,
    borderColor: '#006666',
    width: '100%',
    maxWidth: 400,
  },
  scanButtonText: {
    color: '#ffffff',
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    letterSpacing: 1,
  },
});