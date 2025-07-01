// app/WithdrawnScreen.js
import { useLocalSearchParams, useRouter } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Sidebar from './Sidebar';

export default function WithdrawnScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { eventTitle = "the event" } = params;

  return (
    <View style={styles.container}>
      <Sidebar active="myevents" />
      <View style={styles.content}>
        <Text style={styles.message}>
          YOU HAVE JUST WITHDRAWN FROM THE{"\n"}
          <Text style={styles.eventTitle}>{eventTitle.toUpperCase()} OUTING!</Text>
        </Text>
        <Text style={styles.emoji}>👎✨</Text>
        <Text style={styles.seeYou}>WE HOPE TO SEE YOU NEXT TIME!</Text>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => router.push('/MyEventsScreen')}
        >
          <Text style={styles.backBtnText}>GO BACK TO MY EVENTS</Text>
        </TouchableOpacity>
        <Text style={styles.helpIcon}>❔</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, flexDirection: 'row', backgroundColor: '#f8f9fa' },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    position: 'relative',
  },
  message: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  eventTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 4,
    marginBottom: 4,
  },
  emoji: {
    fontSize: 48,
    textAlign: 'center',
    marginVertical: 16,
  },
  seeYou: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 8,
  },
  backBtn: {
    marginTop: 24,
    borderWidth: 2,
    borderColor: '#222',
    borderRadius: 8,
    paddingHorizontal: 24,
    paddingVertical: 12,
    backgroundColor: '#fff',
  },
  backBtnText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    letterSpacing: 1,
  },
  helpIcon: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    fontSize: 24,
    color: '#555',
  },
});
