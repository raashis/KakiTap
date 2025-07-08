import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { addRegisteredEvent } from './registeredEventsStore';
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
  const eventId = String(params.eventId);
  const event = events.find(e => String(e.id) === eventId);

  // Debug logs (inside the function, after variables are defined)
  console.log('eventId param:', eventId);
  console.log('events array:', events);
  console.log('event found:', event);

  useEffect(() => {
    if (event) {
      addRegisteredEvent({
        id: event.id,
        date: event.date,
        title: event.title,
        details: `${event.date} ${event.time} @ ${event.title}`,
        paid: false,
      });
    }
  }, [event]);

  const handleLogout = () => {
    // TODO: Replace with your logout logic
    alert('Logged out!');
  };

  if (!event) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Event not found!</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Sidebar active="events" />
      <View style={styles.contentContainer}>
        {/* Logout Button */}
        <TouchableOpacity 
          style={styles.logoutButton}
          onPress={handleLogout}
          activeOpacity={0.8}
        >
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>

        <Text style={styles.title}>CONFIRMATION OF REGISTRATION</Text>
        <View style={styles.confirmationCard}>
          <View style={styles.confirmationContent}>
            <Text style={styles.confirmationText}>
              You have just signed up for the
            </Text>
            <Text style={styles.eventTitle}>{event.title} outing!</Text>
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
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, flexDirection: 'row', backgroundColor: '#f8f9fa' },
  contentContainer: { flex: 1, padding: 40, justifyContent: 'center', alignItems: 'center', position: 'relative' },

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
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 60,
    textAlign: 'center',
    textDecorationLine: 'underline',
    letterSpacing: 1,
  },
  confirmationCard: {
    backgroundColor: 'rgba(220, 53, 69, 0.08)',
    borderRadius: 20,
    padding: 50,
    width: '90%',
    maxWidth: 700,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 10,
    borderWidth: 2,
    borderColor: 'rgba(220, 53, 69, 0.2)',
  },
  confirmationContent: { alignItems: 'center', justifyContent: 'center' },
  confirmationText: {
    fontSize: 28,
    fontWeight: '600',
    color: '#2c3e50',
    textAlign: 'center',
    marginBottom: 15,
    lineHeight: 36,
  },
  eventTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#dc3545',
    textAlign: 'center',
    marginBottom: 40,
    lineHeight: 40,
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40,
  },
  thumbsUpIcon: { fontSize: 72, marginRight: 20 },
  sparkleIcon: { fontSize: 48, marginLeft: 10 },
  seeYouText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 50,
    textAlign: 'center',
    letterSpacing: 2,
  },
  backButton: {
    backgroundColor: '#2c3e50',
    paddingHorizontal: 40,
    paddingVertical: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  errorText: {
    fontSize: 28,
    color: '#e74c3c',
    textAlign: 'center',
    margin: 20,
  },
});

