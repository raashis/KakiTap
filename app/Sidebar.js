// app/Sidebar.js - Fixed version
import { useRouter } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View, Dimensions } from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

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
      activeColor: '#3a8374'
    },
    { 
      key: 'myevents', 
      label: '⭐ Acara Saya', 
      route: '/MyEventsScreen',
      color: '#73bad3',
      activeColor: '#5fa3c1'
    },
    { 
      key: 'rewards', 
      label: '🎁 Ganjaran', 
      route: '/RewardsScreen',
      color: '#ea8933',
      activeColor: '#d4762a'
    },
    { 
      key: 'help', 
      label: '💬 Bantuan', 
      route: '/HelpScreen',
      color: '#e8ae3c',
      activeColor: '#d19a2f'
    }
  ];

  // Responsive sizing
  const isTablet = SCREEN_WIDTH >= 768 && SCREEN_WIDTH < 1024;

  return (
    <View style={[
      styles.sidebar,
      isTablet && styles.sidebarTablet
    ]}>
      <View style={styles.header}>
        <Text style={[
          styles.appTitle,
          isTablet && styles.appTitleTablet
        ]}>
          KakiTap
        </Text>
        <Text style={[
          styles.welcomeText,
          isTablet && styles.welcomeTextTablet
        ]}>
          Selamat datang, Tan!
        </Text>
      </View>
      
      <View style={styles.menuContainer}>
        {menuItems.map((item) => {
          const isActive = active === item.key;
          return (
            <TouchableOpacity
              key={item.key}
              style={[
                styles.menuCard,
                isTablet && styles.menuCardTablet,
                { backgroundColor: isActive ? item.activeColor : item.color },
                isActive && styles.activeMenuCard
              ]}
              onPress={() => {
                // If it's the homepage and we're already on it, just stay
                if (item.key === 'home' && active === 'home') {
                  return; // Don't navigate, just stay on current page
                }
                router.push(item.route);
              }}
              activeOpacity={0.8}
            >
              <Text style={[
                styles.menuText,
                isTablet && styles.menuTextTablet,
                isActive && styles.activeMenuText
              ]}>
                {item.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
      {/*
      <View style={styles.footer}>
        <Text style={[
          styles.profileIcon,
          isTablet && styles.profileIconTablet
        ]}>
          👤
        </Text>
      </View>
      */}
    </View>
  );
}

const styles = StyleSheet.create({
  sidebar: {
    width: 260,
    padding: 20,
    backgroundColor: '#f8fafc',
    borderRightWidth: 1,
    borderRightColor: '#e2e8f0',
    minHeight: '100vh',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    justifyContent: 'space-between',
  },
  sidebarTablet: {
    width: 220,
    padding: 16,
  },
  header: {
    marginBottom: 32,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
    alignItems: 'flex-start',
  },
  appTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 8,
    letterSpacing: 0.5,
  },
  appTitleTablet: {
    fontSize: 28,
  },
  welcomeText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#64748b',
    lineHeight: 20,
  },
  welcomeTextTablet: {
    fontSize: 14,
  },
  menuContainer: {
    flex: 1,
    paddingTop: 8,
    gap: 12,
  },
  menuCard: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 24,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 4,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 64,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    position: 'relative',
  },
  menuCardTablet: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 20,
    minHeight: 56,
  },
  activeMenuCard: {
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 12,
    elevation: 8,
    transform: [{ scale: 1.02 }],
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  menuText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    textAlign: 'center',
    lineHeight: 20,
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
    zIndex: 10,
  },
  menuTextTablet: {
    fontSize: 14,
    lineHeight: 18,
  },
  activeMenuText: {
    fontSize: 17,
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  footer: {
    marginTop: 'auto',
    paddingTop: 20,
    paddingBottom: 20,
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f8fafc',
    width: '100%',
    position: 'relative',
  },
  profileIcon: {
    fontSize: 32,
    color: '#64748b',
  },
  profileIconTablet: {
    fontSize: 28,
  },
});