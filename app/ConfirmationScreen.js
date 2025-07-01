import { useLocalSearchParams, useRouter } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Sidebar from './Sidebar';

const events = [
  {
    id: '1',
    title: 'Science Centre',
    date: '15 March 2025',
    time: '10AM - 1PM',
    price: '$8',
  },
  {
    id: '2',
    title: 'Durian Fiesta',
    date: '26 July 2025',
    time: '5PM - 7PM',
    price: '$15',
  },
  {
    id: '3',
    title: 'Spring Carnival',
    date: '8 Feb 2025',
    time: '11:30AM - 3PM',
    price: 'FREE',
  },
  {
    id: '4',
    title: 'Movie Night',
    date: '14 Jun 2025',
    time: '4PM onwards',
    price: '$5',
  },
];

export default function ConfirmationScreen() {
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
      
      <View style={styles.contentContainer}>
        <Text style={styles.title}>5. CONFIRMATION OF REGISTRATION</Text>
        
        <View style={styles.confirmationContent}>
          <Text style={styles.confirmationText}>
            You have just signed up for the{'\n'}{event.title} outing!
          </Text>
          
          <View style={styles.iconContainer}>
            <Text style={styles.thumbsUpIcon}>👍</Text>
            <Text style={styles.sparkleIcon}>✨</Text>
          </View>
          
          <Text style={styles.seeYouText}>SEE YOU THERE!</Text>
          
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => router.push('/AllEventsScreen')}
          >
            <Text style={styles.backButtonText}>Go back to All Events</Text>
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
    backgroundColor: '#f8f9fa',
  },
  contentContainer: {
    flex: 1,
    padding: 24,
    position: 'relative',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 40,
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
  confirmationContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  confirmationText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2c3e50',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 24,
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  thumbsUpIcon: {
    fontSize: 48,
    marginRight: 10,
  },
  sparkleIcon: {
    fontSize: 24,
    marginLeft: 5,
  },
  seeYouText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 40,
    textAlign: 'center',
  },
  backButton: {
    backgroundColor: '#2c3e50',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  helpIcon: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    fontSize: 24,
    color: '#555',
  },
});
