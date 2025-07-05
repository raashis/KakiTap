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
  },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 18 },
});
