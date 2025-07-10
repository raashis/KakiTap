import { useRouter } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function Sidebar({ active }) {
  const router = useRouter();

  const menuItems = [
    { 
      key: 'home', 
      label: '🏠 Laman Utama', 
      route: '/MainScreen',
      color: '#d31a38',
      activeColor: '#90021f'
    },
    { 
      key: 'events', 
      label: '📅 Semua Acara', 
      route: '/AllEventsScreen',
      color: '#469d8b',
      activeColor: '#2d6b5f'
    },
    { 
      key: 'myevents', 
      label: '⭐ Acara Saya', 
      route: '/MyEventsScreen',
      color: '#73bad3',
      activeColor: '#4a9fc1'
    },
    { 
      key: 'rewards', 
      label: '🎁 Ganjaran', 
      route: '/RewardsScreen',
      color: '#ea8933',
      activeColor: '#c8702a'
    },
    { 
      key: 'help', 
      label: '💬 Bantuan', 
      route: '/HelpScreen',
      color: '#e8ae3c',
      activeColor: '#cc9429'
    }
  ];

  return (
    <View style={styles.sidebar}>
      <View style={styles.header}>
        <Text style={styles.appTitle}>KakiTap</Text>
        <Text style={styles.welcomeText}>Selamat datang, Tan!</Text>
      </View>
      
      <View style={styles.menuContainer}>
        {menuItems.map((item) => {
          const isActive = active === item.key;
          return (
            <TouchableOpacity
              key={item.key}
              style={[
                styles.menuCard,
                { backgroundColor: isActive ? item.activeColor : item.color },
                isActive && styles.activeMenuCard
              ]}
              onPress={() => {
                if (item.key === 'home' && active === 'home') {
                  return;
                }
                router.push(item.route);
              }}
            >
              <Text style={[
                styles.menuText,
                isActive && styles.activeMenuText
              ]}>
                {item.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <View style={styles.footer}>
        <Text style={styles.profileIcon}>👤</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  sidebar: {
    width: 240,
    padding: 24,
    backgroundColor: '#f8f9fa',
    borderRightWidth: 2,
    borderRightColor: '#e0e0e0',
    justifyContent: 'space-between',
    minHeight: '100vh',
  },
  header: {
    marginBottom: 40,
    paddingBottom: 24,
    borderBottomWidth: 2,
    borderBottomColor: '#e0e0e0',
    alignItems: 'center',
  },
  appTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 8,
    letterSpacing: 1,
  },
  welcomeText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#34495e',
    textAlign: 'center',
  },
  menuContainer: {
    flex: 1,
    paddingTop: 20,
    gap: 20,
  },
  menuCard: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 6,
    alignItems: 'center',
  },
  activeMenuCard: {
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 12,
    elevation: 10,
    transform: [{ scale: 1.05 }],
  },
  menuText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
    textAlign: 'center',
    lineHeight: 22,
  },
  activeMenuText: {
    fontSize: 20,
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  footer: {
    paddingTop: 24,
    borderTopWidth: 2,
    borderTopColor: '#e0e0e0',
    alignItems: 'center',
  },
  profileIcon: {
    fontSize: 32,
    color: '#34495e',
  },
});
