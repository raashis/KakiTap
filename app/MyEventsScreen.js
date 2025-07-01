// app/MyEventsScreen.js
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Sidebar from './Sidebar';

// Persistent events storage (survives navigation)
let registeredEventsGlobal = [
  {
    id: '1',
    date: '15 March 2025',
    title: 'Science Centre',
    details: 'Saturday 10AM - 1PM @ Science Centre\nPick up @ Pek Kio CC',
    paid: false,
  },
  {
    id: '2',
    date: '5 May 2025',
    title: 'Spring Carnival',
    details: 'Sunday 12PM - 4PM @ Community Park',
    paid: true,
  },
];

export default function MyEventsScreen() {
  const [registeredEvents, setRegisteredEvents] = useState(registeredEventsGlobal);
  const router = useRouter();

  // const handleWithdraw = (id, title) => {
  //   Alert.alert(
  //     'Withdraw from Event',
  //     'Are you sure you want to withdraw from this event?',
  //     [
  //       { text: 'Cancel', style: 'cancel' },
  //       {
  //         text: 'Withdraw',
  //         style: 'destructive',
  //         onPress: () => {
  //           // Update global storage
  //           registeredEventsGlobal = registeredEventsGlobal.filter(event => event.id !== id);
  //           // Update local state
  //           setRegisteredEvents(registeredEventsGlobal);
  //           // Navigate to confirmation
  //           router.push(`/WithdrawnScreen?eventTitle=${encodeURIComponent(title)}`);
  //         }
  //       },
  //     ]
  //   );
  // };

  const handleWithdraw = (id, title) => {
  if (window.confirm('Are you sure you want to withdraw from this event?')) {
    registeredEventsGlobal = registeredEventsGlobal.filter(event => event.id !== id);
    setRegisteredEvents(registeredEventsGlobal);
    router.push(`/WithdrawnScreen?eventTitle=${encodeURIComponent(title)}`);
  }
};

  return (
    <View style={styles.container}>
      <Sidebar active="myevents" />

      <View style={styles.content}>
        <Text style={styles.header}>MY EVENTS</Text>
        <ScrollView contentContainerStyle={styles.eventsList}>
          {registeredEvents.length === 0 ? (
            <Text style={styles.noEvents}>You have not registered for any events.</Text>
          ) : (
            registeredEvents.map(event => (
              <View key={event.id} style={styles.eventBox}>
                <Text style={styles.eventDate}>{event.date}</Text>
                <View style={styles.eventDetailsBox}>
                  <Text style={styles.eventTitle}>{event.title}</Text>
                  {event.details ? (
                    <Text style={styles.eventDetails}>{event.details}</Text>
                  ) : null}
                  <Text style={styles.paymentStatus}>
                    {event.paid
                      ? 'You HAVE PAID FOR THIS 🙂'
                      : 'You HAVE NOT PAID FOR THIS'}
                  </Text>
                  <TouchableOpacity
                    style={styles.withdrawBtn}
                    onPress={() => handleWithdraw(event.id, event.title)}
                  >
                    <Text style={styles.withdrawText}>WITHDRAW</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))
          )}
        </ScrollView>
        <View style={styles.pagination}>
          <Text style={styles.disabledBtn}>back</Text>
          <Text style={styles.pageNum}>&lt; PAGE <Text style={styles.currentPage}>1</Text>/1 &gt;</Text>
          <Text style={styles.disabledBtn}>next</Text>
        </View>
        <Text style={styles.helpIcon}>❔</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, flexDirection: 'row', backgroundColor: '#f8f9fa' },
  content: { flex: 1, padding: 24, position: 'relative' },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 18,
    letterSpacing: 2,
    textAlign: 'center',
  },
  eventsList: {
    paddingBottom: 30,
  },
  eventBox: {
    marginBottom: 28,
  },
  eventDate: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 8,
    letterSpacing: 1,
  },
  eventDetailsBox: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 18,
    borderWidth: 1,
    borderColor: '#222',
    marginBottom: 8,
    position: 'relative',
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#008080',
    marginBottom: 6,
  },
  eventDetails: {
    fontSize: 16,
    marginBottom: 10,
    color: '#222',
    fontWeight: '500',
    lineHeight: 22,
  },
  paymentStatus: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 8,
  },
  withdrawBtn: {
    position: 'absolute',
    right: 16,
    top: 16,
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#222',
    borderRadius: 6,
    paddingHorizontal: 18,
    paddingVertical: 6,
  },
  withdrawText: {
    fontWeight: 'bold',
    fontSize: 15,
    color: '#222',
    letterSpacing: 1,
  },
  noEvents: {
    fontSize: 17,
    color: '#888',
    textAlign: 'center',
    marginTop: 32,
  },
  pagination: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    gap: 8,
  },
  disabledBtn: {
    color: '#aaa',
    fontWeight: 'bold',
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 6,
    backgroundColor: '#f5f5f5',
    borderRadius: 6,
  },
  pageNum: {
    fontSize: 16,
    color: '#222',
    marginHorizontal: 8,
  },
  currentPage: {
    color: '#008080',
    fontWeight: 'bold',
    fontSize: 17,
  },
  helpIcon: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    fontSize: 24,
    color: '#555',
  },
});
