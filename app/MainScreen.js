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
        <View style={styles.headerSection}>
          <Text style={styles.welcome}>Welcome, Tan!</Text>
          <Text style={styles.subtitle}>What do you want to do today?</Text>
        </View>

        <View style={styles.buttonGrid}>
          <TouchableOpacity
            style={[styles.bigButton, styles.eventsButton]}
            onPress={() => router.push('/AllEventsScreen')}
          >
            <View style={styles.buttonIcon}>
              <Text style={styles.iconText}>📅</Text>
            </View>
            <Text style={styles.buttonText}>See All Events</Text>
            <Text style={styles.buttonSubtext}>Happening NOW</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.bigButton, styles.myEventsButton]}
            onPress={() => router.push('/MyEventsScreen')}
          >
            <View style={styles.buttonIcon}>
              <Text style={styles.iconText}>⭐</Text>
            </View>
            <Text style={styles.buttonText}>See My Events</Text>
            <Text style={styles.buttonSubtext}>Happening Soon</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.bigButton, styles.rewardsButton]}
            onPress={() => router.push('/RewardsScreen')}
          >
            <View style={styles.buttonIcon}>
              <Text style={styles.iconText}>🎁</Text>
            </View>
            <Text style={styles.buttonText}>Redeem</Text>
            <Text style={styles.buttonSubtext}>Rewards</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.bigButton, styles.helpButton]}
            onPress={() => router.push('/HelpScreen')}
          >
            <View style={styles.buttonIcon}>
              <Text style={styles.iconText}>💬</Text>
            </View>
            <Text style={styles.buttonText}>Help &</Text>
            <Text style={styles.buttonSubtext}>Support</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    minHeight: '100vh',
  },
  mainContent: {
    flex: 1,
    padding: 40,
    justifyContent: 'flex-start',
  },
  headerSection: {
    marginBottom: 60,
    paddingBottom: 30,
    borderBottomWidth: 2,
    borderBottomColor: '#f0f0f0',
  },
  welcome: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 16,
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 26,
    color: '#34495e',
    fontWeight: '500',
    lineHeight: 32,
  },
  buttonGrid: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignContent: 'space-between',
    paddingVertical: 20,
  },
  bigButton: {
    width: '48%',
    height: '45%',
    backgroundColor: '#ffffff',
    borderRadius: 24,
    padding: 32,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 12,
    elevation: 12,
    borderWidth: 3,
    borderColor: '#e0e0e0',
  },
  eventsButton: {
    backgroundColor: '#469d8b',
    borderColor: '#3a8374',
  },
  myEventsButton: {
    backgroundColor: '#73bad3',
    borderColor: '#5fa3c1',
  },
  rewardsButton: {
    backgroundColor: '#ea8933',
    borderColor: '#d4762a',
  },
  helpButton: {
    backgroundColor: '#e8ae3c',
    borderColor: '#d19a2f',
  },
  buttonIcon: {
    marginBottom: 16,
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconText: {
    fontSize: 40,
  },
  buttonText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#ffffff',
    marginBottom: 8,
    lineHeight: 28,
  },
  buttonSubtext: {
    fontSize: 20,
    fontWeight: '500',
    textAlign: 'center',
    color: 'rgba(255, 255, 255, 0.9)',
    lineHeight: 24,
  },
});