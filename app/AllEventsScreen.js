import { useRouter } from 'expo-router';
import { useRef, useState } from 'react';
import { Dimensions, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Sidebar from './Sidebar';

const screenWidth = Dimensions.get('window').width;
const CARD_WIDTH = screenWidth * 0.25; // Much narrower for A4 portrait ratio
const CARD_HEIGHT = CARD_WIDTH * 1.4; // A4-like ratio (height = 1.4 * width)
const CARD_SPACING = 30;

const events = [
  {
    id: '1',
    title: 'Science Centre',
    date: '15 March 2025',
    time: '10AM - 1PM',
    price: '$8',
    image: require('../assets/posters/poster2.jpg'),
  },
  {
    id: '2',
    title: 'Durian Fiesta',
    date: '26 July 2025',
    time: '5PM - 7PM',
    price: '$15',
    image: require('../assets/posters/poster5.jpg'),
  },
  {
    id: '3',
    title: 'Spring Carnival',
    date: '8 Feb 2025',
    time: '11:30AM - 3PM',
    price: 'FREE',
    image: require('../assets/posters/poster3.jpg'),
  },
  {
    id: '4',
    title: 'Movie Night',
    date: '14 Jun 2025',
    time: '4PM onwards',
    price: '$5',
    image: require('../assets/posters/poster1.jpg'),
  },
];

export default function AllEventsScreen() {
  const router = useRouter();
  const flatListRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const [scrollX, setScrollX] = useState(0);

  const scrollToIndex = (direction) => {
    const newOffset = direction === 'left' 
      ? Math.max(0, scrollX - (CARD_WIDTH + CARD_SPACING))
      : scrollX + (CARD_WIDTH + CARD_SPACING);
    
    flatListRef.current?.scrollToOffset({
      offset: newOffset,
      animated: true,
    });
  };

  const onScroll = (event) => {
    const newScrollX = event.nativeEvent.contentOffset.x;
    setScrollX(newScrollX);
  };

  const getItemLayout = (data, index) => ({
    length: CARD_WIDTH + CARD_SPACING,
    offset: (CARD_WIDTH + CARD_SPACING) * index,
    index,
  });

  const renderItem = ({ item, index }) => {
    // Calculate the center position of the screen
    const screenCenter = screenWidth / 2;
    
    // Calculate the center position of this card
    const cardCenter = (CARD_WIDTH + CARD_SPACING) * index + CARD_WIDTH / 2 - scrollX + (screenWidth - CARD_WIDTH) / 2;
    
    // Calculate distance from screen center
    const distance = Math.abs(cardCenter - screenCenter);
    
    // Maximum distance for scaling calculations
    const maxDistance = (CARD_WIDTH + CARD_SPACING) * 1.5;
    
    // Scale and opacity based on distance from center
    const scale = Math.max(0.7, 1 - (distance / maxDistance) * 0.3);
    const opacity = Math.max(0.3, 1 - (distance / maxDistance) * 0.7);
    
    return (
      <View style={[
        styles.card,
        {
          transform: [{ scale }],
          opacity,
          marginHorizontal: CARD_SPACING / 2,
        }
      ]}>
        <Image source={item.image} style={styles.image} />
        <Text style={styles.eventTitle}>{item.title}</Text>
        <Text style={styles.eventDetails}>{item.date}</Text>
        <Text style={styles.eventDetails}>{item.time} | {item.price}</Text>
        
        <TouchableOpacity 
          style={styles.moreButton}
          onPress={() => router.push({ 
            pathname: '/EventRegistrationScreen', 
            params: { eventId: item.id } 
          })}
        >
          <Text style={styles.moreButtonText}>See More</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Sidebar active="events" />
      
      <View style={styles.main}>
        <View style={styles.carouselContainer}>
          <TouchableOpacity onPress={() => scrollToIndex('left')} style={styles.arrow}>
            <Text style={styles.arrowText}>◀</Text>
          </TouchableOpacity>

          <View style={styles.flatListContainer}>
            <FlatList
              ref={flatListRef}
              data={events}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{
                paddingHorizontal: (screenWidth - CARD_WIDTH) / 2,
                paddingVertical: 20,
              }}
              onScroll={onScroll}
              scrollEventThrottle={16}
              decelerationRate="fast"
              snapToInterval={CARD_WIDTH + CARD_SPACING}
              snapToAlignment="center"
            />
          </View>

          <TouchableOpacity onPress={() => scrollToIndex('right')} style={styles.arrow}>
            <Text style={styles.arrowText}>▶</Text>
          </TouchableOpacity>
        </View>
        
        {/* Page indicators */}
        <View style={styles.indicators}>
          {events.map((_, index) => {
            const centerIndex = Math.round(scrollX / (CARD_WIDTH + CARD_SPACING));
            return (
              <TouchableOpacity
                key={index}
                style={[
                  styles.indicator,
                  { backgroundColor: index === centerIndex ? '#2c3e50' : '#bdc3c7' }
                ]}
                onPress={() => {
                  const targetOffset = index * (CARD_WIDTH + CARD_SPACING);
                  flatListRef.current?.scrollToOffset({
                    offset: targetOffset,
                    animated: true,
                  });
                }}
              />
            );
          })}
        </View>
        
        <Text style={styles.helpIcon}>❔</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    flexDirection: 'row', 
    backgroundColor: '#f8f9fa' 
  },
  main: { 
    flex: 1, 
    padding: 24, 
    position: 'relative' 
  },
  carouselContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  flatListContainer: {
    flex: 1,
    height: CARD_HEIGHT + 80, // Extra space for poster height
  },
  arrow: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(44, 62, 80, 0.1)',
    borderRadius: 20,
    marginHorizontal: 10,
  },
  arrowText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 8,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 8,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  image: {
    width: '100%',
    height: '70%', // Takes up most of the card for poster effect
    borderRadius: 6,
    resizeMode: 'cover',
  },
  eventTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2c3e50',
    textAlign: 'center',
    marginBottom: 2,
  },
  eventDetails: {
    fontSize: 10,
    color: '#555',
    textAlign: 'center',
    lineHeight: 12,
  },
  moreButton: {
    marginTop: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: '#2c3e50',
    borderRadius: 4,
  },
  moreButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 10,
  },
  indicators: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    gap: 8,
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  helpIcon: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    fontSize: 24,
  },
});