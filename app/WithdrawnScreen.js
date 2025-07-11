import { useLocalSearchParams, useRouter } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Sidebar from './Sidebar';

export default function WithdrawnScreen() {
  const router = useRouter();
  const { eventTitle } = useLocalSearchParams();

  const handleLogout = () => {
    router.replace('/KakiTapScreen');
  };

  return (
    <View style={styles.container}>
      <Sidebar active="myevents" />
      <View style={styles.content}>
        {/* Logout Button */}
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={handleLogout}
          activeOpacity={0.8}
        >
          <Text style={styles.logoutButtonText}>வெளியேறு</Text>
        </TouchableOpacity>

        <Text style={styles.header}>நிகழ்விலிருந்து விலகப்பட்டது</Text>
        <Text style={styles.message}>
          நீங்கள் வெற்றிகரமாக விலகிய நிகழ்வு:{"\n"}
          <Text style={styles.eventTitle}>{eventTitle}</Text>
        </Text>
        <Text style={styles.emoji}>👍✨</Text>
        <Text style={styles.seeYou}>அடுத்த முறையில் உங்களை சந்திக்க நாங்கள் எதிர்பார்க்கிறோம்!</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.replace('/MyEventsScreen')}
        >
          <Text style={styles.buttonText}>என் நிகழ்வுகளுக்கு திரும்பவும்</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#e0f4ff',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    margin: 48,
    borderRadius: 20,
    position: 'relative', 
  },
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
  header: {
    fontSize: 38,
    fontWeight: 'bold',
    marginBottom: 24,
    color: '#008080',
    textAlign: 'center',
  },
  message: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 24,
    color: '#000',
  },
  eventTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#008080',
  },
  emoji: {
    fontSize: 60,
    textAlign: 'center',
    marginVertical: 24,
  },
  seeYou: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 16,
    color: '#000',
  },
  button: {
    marginTop: 32,
    backgroundColor: '#0077b6',
    borderRadius: 12,
    paddingHorizontal: 32,
    paddingVertical: 16,
  },
  buttonText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    letterSpacing: 1,
  },
});
