import { useRouter } from 'expo-router';
import { useRef, useState } from 'react';
import { Dimensions, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Sidebar from './Sidebar';

const screenWidth = Dimensions.get('window').width;
const SIDEBAR_WIDTH = 250;
const MAIN_CONTENT_WIDTH = screenWidth - SIDEBAR_WIDTH;

// Responsive card sizing based on screen width
const getCardWidth = () => {
  if (screenWidth >= 1200) {
    return MAIN_CONTENT_WIDTH * 0.28; // Laptop - smaller percentage for bigger screens
  } else if (screenWidth >= 768) {
    return MAIN_CONTENT_WIDTH * 0.35; // iPad - larger percentage for smaller screens
  } else {
    return MAIN_CONTENT_WIDTH * 0.4; // Small screens
  }
};

const CARD_WIDTH = getCardWidth();
const CARD_HEIGHT = CARD_WIDTH * 1.2; // Keep A4 ratio
const CARD_SPACING = 40;

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

// Red ChatBox with pointer above the chatbox, shifted right and pointing up
const RedChatBox = ({
  style,
  pointerDirection = 'up',
  children,
}) => (
  <View style={[styles.redChatBoxContainer, style]}>
    {pointerDirection === 'up' && (
      <View style={styles.redPointerWrapperUp}>
        <View style={styles.redChatBoxPointerFillUp} />
      </View>
    )}
    <View style={styles.redChatBox}>
      <Text style={styles.redChatBoxText}>{children}</Text>
    </View>
  </View>
);

export default function AllEventsScreen() {
  const router = useRouter();
  const flatListRef = useRef(null);
  const [scrollX, setScrollX] = useState(0);
  const [showHelp, setShowHelp] = useState(false);
  const seeMoreBtnRefs = useRef({});

  const handleLogout = () => {
  router.replace('/KakiTapScreen');
  };

  const scrollToIndex = (direction) => {
    const newOffset =
      direction === 'left'
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
    const screenCenter = MAIN_CONTENT_WIDTH / 2;
    const cardCenter =
      (CARD_WIDTH + CARD_SPACING) * index +
      CARD_WIDTH / 2 -
      scrollX +
      (MAIN_CONTENT_WIDTH - CARD_WIDTH) / 2;
    const distance = Math.abs(cardCenter - screenCenter);
    const maxDistance = (CARD_WIDTH + CARD_SPACING) * 1.5;
    const scale = Math.max(0.7, 1 - (distance / maxDistance) * 0.3);
    const opacity = Math.max(0.3, 1 - (distance / maxDistance) * 0.7);

    return (
      <View
        style={[
          styles.card,
          {
            transform: [{ scale }],
            opacity,
            marginHorizontal: CARD_SPACING / 2,
          },
        ]}
      >
        <Image source={item.image} style={styles.image} />
        <Text style={styles.eventTitle}>{item.title}</Text>
        <Text style={styles.eventDetails}>{item.date}</Text>
        <Text style={styles.eventDetails}>
          {item.time} | {item.price}
        </Text>
        
        {/* Centered See More Button Container */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            ref={ref => (seeMoreBtnRefs.current[index] = ref)}
            style={styles.moreButton}
            onPress={() =>
              router.push({
                pathname: '/EventRegistrationScreen',
                params: { eventId: item.id },
              })
            }
          >
            <Text style={styles.moreButtonText}>See More</Text>
          </TouchableOpacity>
          
          {/* Chatbox for See More button - positioned relative to centered button */}
          {showHelp && (
            <View style={styles.chatboxContainer}>
              <RedChatBox pointerDirection="up" style={{ width: 220, minHeight: 32 }}>
                Press here for event details
              </RedChatBox>
            </View>
          )}
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Sidebar active="events" />

      <View style={styles.main}>
        {/* Logout Button */}
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={handleLogout}
          activeOpacity={0.8}
        >
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>

        <View style={styles.carouselContainer}>
          <TouchableOpacity
            onPress={() => scrollToIndex('left')}
            style={styles.arrow}
          >
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
                paddingLeft: 8,
                paddingRight: (MAIN_CONTENT_WIDTH - CARD_WIDTH) / 2,
                paddingVertical: 20,
              }}
              onScroll={onScroll}
              scrollEventThrottle={16}
              decelerationRate="fast"
              snapToInterval={CARD_WIDTH + CARD_SPACING}
              snapToAlignment="center"
              getItemLayout={getItemLayout}
              initialScrollIndex={0}
            />
          </View>

          <TouchableOpacity
            onPress={() => scrollToIndex('right')}
            style={styles.arrow}
          >
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
                  {
                    backgroundColor:
                      index === centerIndex ? '#2c3e50' : '#bdc3c7',
                  },
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

        {/* Help Button to toggle chatboxes */}
        <TouchableOpacity
          style={styles.helpFab}
          onPress={() => setShowHelp((prev) => !prev)}
        >
          <Text style={styles.helpFabText}>?</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#f8f9fa',
  },
  main: {
    flex: 1,
    padding: 24,
    position: 'relative',
  },
  logoutButton: {
    position: 'absolute',
    top: 20,
    right: 12,
    backgroundColor: '#e74c3c',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 16,
    zIndex: 10,
    elevation: 10,
  },
  logoutButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
    letterSpacing: 1,
  },
  carouselContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  flatListContainer: {
    flex: 1,
    height: CARD_HEIGHT + 80,
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
    borderRadius: 12, // Slightly larger border radius for bigger cards
    padding: 12, // Increased padding from 8
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
    height: '65%', // Reduced from 70% to give more space for text
    borderRadius: 6,
    resizeMode: 'cover',
  },
  eventTitle: {
    fontSize: 16, // Increased back from 14 for bigger cards
    fontWeight: 'bold',
    color: '#2c3e50',
    textAlign: 'center',
    marginBottom: 4, // Increased from 2
  },
  eventDetails: {
    fontSize: 13, // Increased from 11
    color: '#555',
    textAlign: 'center',
    lineHeight: 16, // Increased from 13
  },
  
  // Centered button container
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    position: 'relative',
    marginTop: 12, // Increased from 8
  },
  moreButton: {
    paddingHorizontal: 28, // Increased from 20
    paddingVertical: 14, // Increased from 10
    backgroundColor: '#469d8b',
    borderRadius: 10, // Slightly larger radius
  },
  moreButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16, // Increased from 15
    textAlign: 'center',
  },
  
  // Chatbox positioned relative to centered button
  chatboxContainer: {
    position: 'absolute',
    top: 50, // Below the button
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 10,
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
  helpFab: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    backgroundColor: '#e53935',
    width: 52,
    height: 52,
    borderRadius: 26,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 100,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
  },
  helpFabText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 28,
    marginBottom: 2,
  },

  
  redChatBoxContainer: {
    alignItems: 'center',
    width: '100%',
    maxWidth: 220,
  },
  redChatBox: {
    backgroundColor: '#e53935',
    borderColor: '#b71c1c',
    borderWidth: 3,
    borderRadius: 14,
    paddingVertical: 6,
    paddingHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
    alignItems: 'center',
    minWidth: 180,
    maxWidth: 220,
    minHeight: 32,
    justifyContent: 'center',
  },
  redChatBoxText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  redPointerWrapperUp: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 15,
    height: 0,
  },
  redChatBoxPointerFillUp: {
    width: 0,
    height: 0,
    borderLeftWidth: 12,
    borderRightWidth: 12,
    borderBottomWidth: 14, 
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: '#e53935',
  },
});