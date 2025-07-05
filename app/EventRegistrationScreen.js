import { useLocalSearchParams, useRouter } from 'expo-router';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Sidebar from './Sidebar';

const events = [
  {
    id: '1',
    title: 'Science Centre',
    date: '15 March 2025',
    time: '10AM - 1PM',
    price: '$8',
    description: 'Explore interactive science exhibits and live demonstrations at Singapore\'s premier science museum. Perfect for families and science enthusiasts!',
    image: require('../assets/posters/poster2.jpg'),
  },
  {
    id: '2',
    title: 'Durian Fiesta',
    date: '26 July 2025',
    time: '5PM - 7PM',
    price: '$15',
    description: 'Join us for an exclusive durian tasting event featuring premium Mao Shan Wang and D24 varieties. Learn about durian cultivation from experts.',
    image: require('../assets/posters/poster5.jpg'),
  },
  {
    id: '3',
    title: 'Spring Carnival',
    date: '8 Feb 2025',
    time: '11:30AM - 3PM',
    price: 'FREE',
    description: 'Celebrate the arrival of spring with games, food stalls, and live performances at our annual carnival. Fun for all ages!',
    image: require('../assets/posters/poster3.jpg'),
  },
  {
    id: '4',
    title: 'Movie Night',
    date: '14 Jun 2025',
    time: '4PM onwards',
    price: '$5',
    description: 'Enjoy classic films under the stars at our outdoor cinema. Bring your own blanket or rent chairs on site.',
    image: require('../assets/posters/poster1.jpg'),
  },
];

export default function EventRegistrationScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const eventId = params.eventId;
  
  const event = events.find(e => e.id === eventId);

  if (!event) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Event not found!</Text>
      </View>
    );
  }

  const handleConfirmJoin = () => {
    // Only navigate to confirmation screen, don't add to MyEvents yet
    router.push({ pathname: '/ConfirmationScreen', params: { eventId: event.id } });
  };

  return (
    <View style={styles.container}>
      <Sidebar active="events" />
      
      <ScrollView style={styles.contentContainer}>
        <View style={styles.header}>
          <Text style={styles.title}>{event.title}</Text>
          <TouchableOpacity onPress={() => router.back()}>
            <Text style={styles.closeButton}>✕</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.content}>
          <View style={styles.detailsContainer}>
            <Text style={styles.sectionTitle}>Event Details</Text>
            
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Date:</Text>
              <Text style={styles.detailValue}>{event.date}</Text>
            </View>
            
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Time:</Text>
              <Text style={styles.detailValue}>{event.time}</Text>
            </View>
            
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Price:</Text>
              <Text style={styles.detailValue}>{event.price}</Text>
            </View>
            
            <Text style={styles.sectionTitle}>Description</Text>
            <Text style={styles.description}>{event.description}</Text>
          </View>
          
          <View style={styles.posterContainer}>
            <Image source={event.image} style={styles.poster} />
          </View>
        </View>
        
        <TouchableOpacity 
          style={styles.joinButton}
          onPress={handleConfirmJoin}
        >
          <Text style={styles.joinButtonText}>Confirm Join</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#fff',
  },
  contentContainer: {
    flex: 1,
    padding: 30,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  closeButton: {
    fontSize: 32,
    color: '#555',
    padding: 10,
  },
  content: {
    flexDirection: 'row',
    gap: 40,
    alignItems: 'flex-start',
    marginBottom: 40,
  },
  detailsContainer: {
    flex: 1,
  },
  posterContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  poster: {
    width: '100%',
    height: 500,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 12,
  },
  sectionTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 20,
    color: '#2c3e50',
  },
  detailRow: {
    flexDirection: 'row',
    marginBottom: 15,
    alignItems: 'center',
  },
  detailLabel: {
    fontWeight: 'bold',
    width: 120,
    fontSize: 22,
    color: '#555',
  },
  detailValue: {
    flex: 1,
    fontSize: 22,
    color: '#555',
  },
  description: {
    fontSize: 20,
    color: '#555',
    lineHeight: 32,
    marginBottom: 20,
  },
  joinButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 15,
    padding: 30,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 12,
    marginHorizontal: 50,
  },
  joinButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 28,
  },
  errorText: {
    fontSize: 24,
    color: '#e74c3c',
    textAlign: 'center',
    margin: 20,
  },
});
