import { useRouter } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function Sidebar({ active }) {
  const router = useRouter();

  return (
    <View style={styles.sidebar}>
      <Text style={styles.sidebarHeading}>Welcome, Tan!</Text>
      <TouchableOpacity style={styles.sidebarButton} onPress={() => router.push('/')}>
        <Text style={active === 'home' ? styles.activeText : styles.sidebarText}>🏠 Homepage</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.sidebarButton} onPress={() => router.push('/AllEventsScreen')}>
        <Text style={active === 'events' ? styles.activeText : styles.sidebarText}>📅 All Events</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.sidebarButton} onPress={() => router.push('/MyEventsScreen')}>
        <Text style={active === 'myevents' ? styles.activeText : styles.sidebarText}>⭐ My Events</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.sidebarButton} onPress={() => router.push('/RewardsScreen')}>
        <Text style={active === 'rewards' ? styles.activeText : styles.sidebarText}>🎁 Rewards</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.sidebarButton} onPress={() => router.push('/HelpScreen')}>
        <Text style={active === 'help' ? styles.activeText : styles.sidebarText}>Help</Text>
      </TouchableOpacity>
      <Text style={{ fontSize: 24, marginTop: 20 }}>👤</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  sidebar: {
    width: 120,
    padding: 16,
    backgroundColor: '#fff',
    borderRightWidth: 1,
    borderRightColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sidebarHeading: { fontWeight: 'bold', marginBottom: 10, fontSize: 12, textAlign: 'center' },
  sidebarButton: { marginVertical: 8 },
  sidebarText: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
    color: '#2c3e50',
  },
  activeText: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#008080',
    textDecorationLine: 'underline',
  },
});
