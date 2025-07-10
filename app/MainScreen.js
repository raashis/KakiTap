// app/MainScreen.js
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Sidebar from './Sidebar';

export default function MainScreen() {
  const router = useRouter();
  const [showHelp, setShowHelp] = useState(false);

  const handleLogout = () => {
    router.replace('/KakiTapScreen'); 
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Sidebar with chatbox below, shown only when showHelp is true */}
      <View style={{ position: 'relative' }}>
        <Sidebar active="home" />
        {showHelp && (
          <View style={styles.sidebarChatboxWrapper}>
            <View style={styles.sidebarPointerWrapper}>
              <View style={styles.sidebarPointer} />
            </View>
            <View style={styles.sidebarChatbox}>
              <Text style={styles.sidebarChatboxText}>
                You can also always go to these 4 pages from here!
              </Text>
            </View>
          </View>
        )}
      </View>

      <View style={styles.mainContent}>
        {/* Logout Button */}
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={handleLogout}
          activeOpacity={0.8}
        >
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>

        <View style={styles.headerSection}>
          <Text style={styles.welcome}>Welcome, Tan!</Text>
          <Text style={styles.subtitle}>What do you want to do today?</Text>
        </View>

        {/* Chatbox above the event grid, arrow points down toward buttons */}
        {showHelp && (
          <View style={styles.topChatboxWrapper}>
            <View style={styles.topChatbox}>
              <Text style={styles.topChatboxText}>
                Press here to Explore {'\n'}
                one of these 4 pages!
              </Text>
            </View>
            <View style={styles.topPointerWrapper}>
              <View style={styles.topPointer} />
            </View>
          </View>
        )}

        <View style={styles.buttonGrid}>
          <TouchableOpacity
            style={[styles.bigButton, styles.eventsButton]}
            onPress={() => router.push('/AllEventsScreen')}
          >
            <View style={styles.buttonIcon}>
              <Text style={styles.iconText}>📅</Text>
            </View>
            <Text style={styles.buttonText}>See All Events</Text>
            <Text style={styles.buttonSubtext}>Happening NOW in your area</Text>
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
            <Text style={styles.buttonText}>Points & Rewards</Text>
            <Text style={styles.buttonSubtext}>Redeem Your Rewards</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.bigButton, styles.helpButton]}
            onPress={() => router.push('/HelpScreen')}
          >
            <View style={styles.buttonIcon}>
              <Text style={styles.iconText}>💬</Text>
            </View>
            <Text style={styles.buttonText}>Help & Support</Text>
            <Text style={styles.buttonSubtext}>Request for our Help & Support</Text>
          </TouchableOpacity>
        </View>

        {/* Floating Help Button */}
        <TouchableOpacity
          style={styles.helpFab}
          onPress={() => setShowHelp((prev) => !prev)}
          activeOpacity={0.8}
        >
          <Text style={styles.helpFabText}>?</Text>
        </TouchableOpacity>
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

  // Floating Help Button
  helpFab: {
  position: 'absolute',
  bottom: 24,
  right: 24,
  backgroundColor: '#e53935',
  width: 52,
  height: 52,
  borderRadius: 26,
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 100,
  elevation: 10,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 3 },
  shadowOpacity: 0.15,
  shadowRadius: 6,
},
helpFabText: {
  color: '#fff',
  fontWeight: 'bold',
  fontSize: 28,
  marginBottom: 2,
},

  // Chatbox above event grid, arrow points down
  topChatboxWrapper: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 180,
    alignItems: 'center',
    zIndex: 101,
  },
  topChatbox: {
    backgroundColor: '#e53935',
    borderColor: '#b71c1c',
    borderWidth: 3,
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
    alignItems: 'flex-start',
    minWidth: 230,
    maxWidth: 320,
  },
  topChatboxText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
    textAlign: 'left',
    letterSpacing: 0.5,
    lineHeight: 22,
  },
  topPointerWrapper: {
    width: '100%',
    alignItems: 'center',
    marginTop: -2,
    height: 0,
    zIndex: 2,
  },
  topPointer: {
    width: 0,
    height: 0,
    borderLeftWidth: 16,
    borderRightWidth: 16,
    borderTopWidth: 18,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: '#e53935',
  },

  // Sidebar Chatbox below sidebar, arrow above and points up
  sidebarChatboxWrapper: {
    position: 'absolute',
    left: 0,
    top: 575, // Adjust for your sidebar height
    flexDirection: 'column',
    alignItems: 'center',
    zIndex: 200,
    width: 270,
  },
  sidebarPointerWrapper: {
    width: '100%',
    alignItems: 'flex-start',
    marginLeft: 32, // Adjust to align arrow with sidebar edge
    marginBottom: -2,
    height: 0,
    zIndex: 2,
  },
  sidebarPointer: {
    width: 0,
    height: 0,
    borderLeftWidth: 12,
    borderRightWidth: 12,
    borderBottomWidth: 14, // Arrow points UP
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: '#e53935',
  },
  sidebarChatbox: {
    backgroundColor: '#e53935',
    borderColor: '#b71c1c',
    borderWidth: 3,
    borderRadius: 14,
    paddingVertical: 10,
    paddingHorizontal: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
    alignItems: 'center',
    minWidth: 180,
    maxWidth: 260,
  },
  sidebarChatboxText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
    textAlign: 'center',
    letterSpacing: 0.5,
  },
});