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
      <View style={styles.sidebarContainer}>
        <Sidebar active="home" />
        {showHelp && (
          <View style={styles.sidebarChatboxWrapper}>
            <View style={styles.sidebarPointerWrapper}>
              <View style={styles.sidebarPointer} />
            </View>
            <View style={styles.sidebarChatbox}>
              <Text style={styles.sidebarChatboxText}>
                Anda juga boleh ke mana-mana empat halaman ini dari sini!
              </Text>
            </View>
          </View>
        )}
      </View>

      <View style={styles.mainContent}>
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={handleLogout}
          activeOpacity={0.8}
        >
          <Text style={styles.logoutButtonText}>Log Keluar</Text>
        </TouchableOpacity>

        <View style={styles.headerSection}>
          <Text style={styles.welcome}>Selamat datang, Tan!</Text>
          <Text style={styles.subtitle}>Apa yang anda ingin lakukan hari ini?</Text>
        </View>

        {showHelp && (
          <View style={styles.topChatboxWrapper}>
            <View style={styles.topChatbox}>
              <Text style={styles.topChatboxText}>
                Tekan di sini untuk teroka {'\n'}
                salah satu daripada 4 halaman ini!
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
            <Text style={styles.buttonText}>Lihat Semua Acara</Text>
            <Text style={styles.buttonSubtext}>Sedang berlangsung di kawasan anda</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.bigButton, styles.myEventsButton]}
            onPress={() => router.push('/MyEventsScreen')}
          >
            <View style={styles.buttonIcon}>
              <Text style={styles.iconText}>⭐</Text>
            </View>
            <Text style={styles.buttonText}>Lihat Acara Saya</Text>
            <Text style={styles.buttonSubtext}>Akan berlangsung tidak lama lagi</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.bigButton, styles.rewardsButton]}
            onPress={() => router.push('/RewardsScreen')}
          >
            <View style={styles.buttonIcon}>
              <Text style={styles.iconText}>🎁</Text>
            </View>
            <Text style={styles.buttonText}>Mata & Ganjaran</Text>
            <Text style={styles.buttonSubtext}>Tebus ganjaran anda</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.bigButton, styles.helpButton]}
            onPress={() => router.push('/HelpScreen')}
          >
            <View style={styles.buttonIcon}>
              <Text style={styles.iconText}>💬</Text>
            </View>
            <Text style={styles.buttonText}>Bantuan & Sokongan</Text>
            <Text style={styles.buttonSubtext}>Mohon bantuan & sokongan kami</Text>
          </TouchableOpacity>
        </View>

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
    backgroundColor: '#fff',
  },
  sidebarContainer: {
    width: 270,
    backgroundColor: '#f8f8f8',
    paddingVertical: 32,
    paddingHorizontal: 16,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
  },
  mainContent: {
    flex: 1,
    paddingVertical: 48,
    paddingHorizontal: 36,
    justifyContent: 'flex-start',
    position: 'relative',
    backgroundColor: '#fcfcfc',
    borderLeftWidth: 1,
    borderLeftColor: '#ececec',
  },
  logoutButton: {
    position: 'absolute',
    top: 20,
    right: 24,
    backgroundColor: '#e74c3c',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 16,
    zIndex: 10,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 4,
  },
  logoutButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
    letterSpacing: 1,
  },
  headerSection: {
    marginBottom: 48,
    paddingBottom: 24,
    borderBottomWidth: 2,
    borderBottomColor: '#f0f0f0',
  },
  welcome: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 12,
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 24,
    color: '#34495e',
    fontWeight: '500',
    lineHeight: 32,
  },
  buttonGrid: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignContent: 'flex-start',
    gap: 20,
    paddingVertical: 16,
  },
  bigButton: {
    width: '47%',
    minHeight: 160,
    backgroundColor: '#fff',
    borderRadius: 24,
    padding: 28,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.13,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 8,
    borderWidth: 2,
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
    marginBottom: 14,
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(255,255,255,0.22)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconText: {
    fontSize: 36,
  },
  buttonText: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#fff',
    marginBottom: 6,
    lineHeight: 26,
  },
  buttonSubtext: {
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
    color: 'rgba(255,255,255,0.92)',
    lineHeight: 22,
  },
  helpFab: {
    position: 'absolute',
    bottom: 32,
    right: 32,
    backgroundColor: '#e53935',
    width: 54,
    height: 54,
    borderRadius: 27,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 100,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
  },
  helpFabText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 30,
    marginBottom: 2,
  },
  topChatboxWrapper: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 160,
    alignItems: 'center',
    zIndex: 101,
  },
  topChatbox: {
    backgroundColor: '#e53935',
    borderColor: '#b71c1c',
    borderWidth: 2,
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.13,
    shadowRadius: 4,
    elevation: 3,
    alignItems: 'flex-start',
    minWidth: 210,
    maxWidth: 300,
  },
  topChatboxText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
    textAlign: 'left',
    letterSpacing: 0.5,
    lineHeight: 20,
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
    borderLeftWidth: 14,
    borderRightWidth: 14,
    borderTopWidth: 16,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: '#e53935',
  },
  sidebarChatboxWrapper: {
    position: 'absolute',
    left: 0,
    bottom: 24,
    flexDirection: 'column',
    alignItems: 'center',
    zIndex: 200,
    width: 238,
  },
  sidebarPointerWrapper: {
    width: '100%',
    alignItems: 'flex-start',
    marginLeft: 24,
    marginBottom: -2,
    height: 0,
    zIndex: 2,
  },
  sidebarPointer: {
    width: 0,
    height: 0,
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderBottomWidth: 12,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: '#e53935',
  },
  sidebarChatbox: {
    backgroundColor: '#e53935',
    borderColor: '#b71c1c',
    borderWidth: 2,
    borderRadius: 12,
    paddingVertical: 8,
    paddingHorizontal: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.13,
    shadowRadius: 4,
    elevation: 3,
    alignItems: 'center',
    minWidth: 140,
    maxWidth: 200,
  },
  sidebarChatboxText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 13,
    textAlign: 'center',
    letterSpacing: 0.5,
  },
});
