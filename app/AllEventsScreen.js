import { useRouter } from 'expo-router';
import { useRef } from 'react';
import { Dimensions, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Sidebar from './Sidebar';

const screenWidth = Dimensions.get('window').width;
const CARD_WIDTH = screenWidth * 0.6;

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

  const scrollToIndex = (direction) => {
    flatListRef.current?.scrollToOffset({
      offset: direction === 'left' ? 0 : CARD_WIDTH,
      animated: true,
    });
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
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

  return (
    <View style={styles.container}>
      <Sidebar active="events" />
      
      <View style={styles.main}>
        <View style={styles.carouselContainer}>
          <TouchableOpacity onPress={() => scrollToIndex('left')} style={styles.arrow}>
            <Text style={styles.arrowText}>◀</Text>
          </TouchableOpacity>

          <FlatList
            ref={flatListRef}
            data={events}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ gap: 12 }}
          />

          <TouchableOpacity onPress={() => scrollToIndex('right')} style={styles.arrow}>
            <Text style={styles.arrowText}>▶</Text>
          </TouchableOpacity>
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
  },
  arrow: {
    width: 30,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrowText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  card: {
    width: CARD_WIDTH,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 5,
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 120,
    borderRadius: 8,
    marginBottom: 12,
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 4,
  },
  eventDetails: {
    fontSize: 14,
    color: '#555',
  },
  moreButton: {
    marginTop: 12,
    padding: 10,
    backgroundColor: '#2c3e50',
    borderRadius: 6,
  },
  moreButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  helpIcon: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    fontSize: 24,
  },
});
