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
        <Text style={styles.emoji}>👍✨</Text>
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
  },
});
