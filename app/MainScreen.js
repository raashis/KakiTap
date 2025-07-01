// app/MainScreen.js
import { useRouter } from 'expo-router';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Sidebar from './Sidebar';

export default function MainScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <Sidebar active="home" />

      <View style={styles.mainContent}>
        <Text style={styles.welcome}>Welcome, Tan!</Text>
        <Text style={styles.subtitle}>What do you want to do today?</Text>

        <View style={styles.buttonGrid}>
          <TouchableOpacity
            style={styles.bigButton}
            onPress={() => router.push('/AllEventsScreen')}
          >
            <Text style={styles.buttonText}>See All Events{'\n'}Happening NOW</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.bigButton}
            onPress={() => router.push('/MyEventsScreen')}
          >
            <Text style={styles.buttonText}>See My Events{'\n'}Happening Soon</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.bigButton}
            onPress={() => router.push('/RewardsScreen')}
          >
            <Text style={styles.buttonText}>Redeem{'\n'}Rewards</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.bigButton}
            onPress={() => router.push('/HelpScreen')}
          >
            <Text style={styles.buttonText}>Help &{'\n'}Support</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.helpIcon}>❔</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#f8f9fa',
  },
  mainContent: {
    flex: 1,
    padding: 24,
    justifyContent: 'flex-start',
    position: 'relative',
  },
  welcome: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#34495e',
    marginBottom: 20,
  },
  buttonGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  bigButton: {
    width: '45%',
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 12,
    padding: 16,
    margin: 8,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 4,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    color: '#2c3e50',
  },
  helpIcon: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    fontSize: 24,
    color: '#555',
  },
});
