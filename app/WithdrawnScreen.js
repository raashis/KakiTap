import { useLocalSearchParams, useRouter } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Sidebar from './Sidebar';

export default function WithdrawnScreen() {
  const router = useRouter();
  const { eventTitle } = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <Sidebar active="myevents" />
      <View style={styles.content}>
        <Text style={styles.header}>Withdrawn from Event</Text>
        <Text style={styles.message}>
          You have successfully withdrawn from:{"\n"}
          <Text style={styles.eventTitle}>{eventTitle}</Text>
        </Text>
<<<<<<< HEAD
=======
        <Text style={styles.emoji}>👍✨</Text>
        <Text style={styles.seeYou}>WE HOPE TO SEE YOU NEXT TIME!</Text>
>>>>>>> 28d785dc52d281921c1d4068edbee39fb5f328a6
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.replace('/MyEventsScreen')}
        >
          <Text style={styles.buttonText}>Back to My Events</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
<<<<<<< HEAD
  container: { flex: 1, flexDirection: 'row', backgroundColor: '#f8f9fa' },
  content: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  header: { fontSize: 28, fontWeight: 'bold', marginBottom: 20, color: '#008080' },
  message: { fontSize: 20, marginBottom: 40, textAlign: 'center', color: '#2c3e50' },
  eventTitle: { fontWeight: 'bold', color: '#d9534f', fontSize: 22 },
  button: {
    backgroundColor: '#008080',
    paddingHorizontal: 30,
    paddingVertical: 14,
    borderRadius: 10,
=======
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#e0f4ff', // light blue
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
    backgroundColor: 'rgba(255, 255, 255, 0.85)', // white with slight transparency
    margin: 48,
    borderRadius: 20,
  },
  message: {
    fontSize: 36,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 24,
    color: '#000',
  },
  eventTitle: {
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#000',
  },
  emoji: {
    fontSize: 60,
    textAlign: 'center',
    marginVertical: 24,
  },
  seeYou: {
    fontSize: 34,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 16,
    color: '#000',
  },
  backBtn: {
    marginTop: 32,
    backgroundColor: '#0077b6', // dark blue (darker than background)
    borderRadius: 12,
    paddingHorizontal: 32,
    paddingVertical: 16,
  },
  backBtnText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    letterSpacing: 1,
  },
  helpIcon: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    fontSize: 30,
    color: '#555',
>>>>>>> 28d785dc52d281921c1d4068edbee39fb5f328a6
  },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 18 },
});
