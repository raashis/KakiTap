import { useFocusEffect, useRouter } from 'expo-router';
import { useCallback, useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Sidebar from './Sidebar';
import store, { removeRegisteredEvent } from './registeredEventsStore';

export default function MyEventsScreen() {
  const [registeredEvents, setRegisteredEvents] = useState([...store.registeredEventsGlobal]);
  const router = useRouter();

  useFocusEffect(
    useCallback(() => {
      setRegisteredEvents([...store.registeredEventsGlobal]);
    }, [])
  );

  const handleWithdraw = (id, title) => {
    Alert.alert(
      'Withdraw from event',
      'Are you sure you want to withdraw from this event?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Withdraw',
          style: 'destructive',
          onPress: () => {
            removeRegisteredEvent(id);
            setRegisteredEvents([...store.registeredEventsGlobal]);
            router.push(`/WithdrawnScreen?eventTitle=${encodeURIComponent(title)}`);
          }
        }
      ]
    );
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
  content: { flex: 1, padding: 32, position: 'relative' },
  header: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 30,
    letterSpacing: 2,
    textAlign: 'center',
    color: '#2c3e50',
  },
  eventsList: { paddingBottom: 40 },
  eventBox: { marginBottom: 35 },
  eventDate: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 15,
    letterSpacing: 1,
    color: '#2c3e50',
  },
  eventDetailsBox: {
    backgroundColor: 'rgba(173, 216, 230, 0.3)',
    borderRadius: 15,
    padding: 25,
    borderWidth: 2,
    borderColor: 'rgba(173, 216, 230, 0.5)',
    marginBottom: 12,
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 6,
  },
  eventTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#008080',
    marginBottom: 12,
  },
  eventDetails: {
    fontSize: 20,
    marginBottom: 15,
    color: '#2c3e50',
    fontWeight: '500',
    lineHeight: 28,
  },
  paymentStatus: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 15,
  },
  withdrawBtn: {
    position: 'absolute',
    right: 20,
    top: 20,
    backgroundColor: 'rgba(220, 53, 69, 0.8)',
    borderWidth: 2,
    borderColor: 'rgba(220, 53, 69, 1)',
    borderRadius: 10,
    paddingHorizontal: 24,
    paddingVertical: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  withdrawText: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#ffffff',
    letterSpacing: 1,
  },
  noEvents: {
    fontSize: 22,
    color: '#888',
    textAlign: 'center',
    marginTop: 50,
  },
  pagination: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    gap: 12,
  },
  disabledBtn: {
    color: '#aaa',
    fontWeight: 'bold',
    fontSize: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
  },
  pageNum: { fontSize: 20, color: '#2c3e50', marginHorizontal: 12 },
  currentPage: { color: '#008080', fontWeight: 'bold', fontSize: 22 },
  helpIcon: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    fontSize: 32,
    color: '#555',
  },
});
