// app/EventRegistrationScreen.js
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
        <Text>Event not found!</Text>
      </View>
    );
  }

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
            
            <TouchableOpacity 
              style={styles.joinButton}
              onPress={() => router.push({ 
                pathname: '/ConfirmationScreen', 
                params: { eventId: event.id } 
              })}
            >
              <Text style={styles.joinButtonText}>Confirm Join</Text>
            </TouchableOpacity>
          </View>
          
          <Image source={event.image} style={styles.poster} />
        </View>
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
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  closeButton: {
    fontSize: 24,
    color: '#555',
  },
  content: {
    flexDirection: 'row',
    gap: 20,
  },
  detailsContainer: {
    flex: 1,
  },
  poster: {
    width: 150,
    height: 200,
    borderRadius: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 10,
    color: '#2c3e50',
  },
  detailRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  detailLabel: {
    fontWeight: 'bold',
    width: 80,
    color: '#555',
  },
  detailValue: {
    flex: 1,
    color: '#555',
  },
  description: {
    color: '#555',
    lineHeight: 22,
  },
  joinButton: {
    marginTop: 30,
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
  },
  joinButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
});
