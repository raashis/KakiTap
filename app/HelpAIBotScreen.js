import { useRouter } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Sidebar from './Sidebar';

export default function HelpAIBotScreen() {
  const router = useRouter();

  const handleLogout = () => {
    router.replace('/KakiTapScreen');
  };

  return (
    <View style={styles.container}>
      <Sidebar active="help" />
      <View style={styles.content}>
        {/* Logout Button */}
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={handleLogout}
          activeOpacity={0.8}
        >
          <Text style={styles.logoutButtonText}>வெளியேறு</Text>
        </TouchableOpacity>

        <View style={styles.card}>
          <Text style={styles.question}>உங்களது கருத்தை கேட்க விரும்புகிறோம்!</Text>
          <View style={styles.divider} />
          <Text style={styles.info}>அஹ் போட்-ஐ பேச இங்கே அழுத்தவும்</Text>
          <TouchableOpacity style={styles.micCircle} onPress={() => alert('வாய்ஸ் போட் விரைவில் வருகிறது!')}>
            <Text style={styles.micIcon}>🎤</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => router.push('/HelpScreen')}
        >
          <Text style={styles.backBtnText}>மீண்டும் உதவி பக்கம் செல்லவும்</Text>
        </TouchableOpacity>
        {/* <Text style={styles.helpIcon}>?</Text> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    flexDirection: 'row', 
    backgroundColor: '#fef3c7'
  },
  content: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
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
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    borderRadius: 32,
    padding: 60,
    marginBottom: 40,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 24,
    elevation: 8,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    width: '90%',
    maxWidth: 800,
    alignItems: 'center',
  },
  question: {
    fontSize: 48,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
    color: '#222',
    fontFamily: 'System',
  },
  divider: {
    height: 6,
    backgroundColor: '#222',
    width: '100%',
    marginVertical: 32,
    borderRadius: 3,
  },
  info: {
    fontSize: 32,
    textAlign: 'center',
    marginBottom: 40,
    fontWeight: '600',
    lineHeight: 42,
    color: '#222',
    fontFamily: 'System',
    letterSpacing: 1,
  },
  micCircle: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderWidth: 4,
    borderColor: '#222',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 16,
    elevation: 8,
  },
  micIcon: {
    fontSize: 72,
    color: '#222',
  },
  backBtn: {
    borderWidth: 4,
    borderColor: '#222',
    borderRadius: 20,
    paddingHorizontal: 48,
    paddingVertical: 20,
    backgroundColor: '#f59e0b',
    marginTop: 24,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 12,
    elevation: 6,
  },
  backBtnText: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    letterSpacing: 1,
    color: '#222',
    fontFamily: 'System',
  },
  helpIcon: {
    position: 'absolute',
    bottom: 32,
    right: 32,
    fontSize: 40,
    color: '#6b7280',
    fontWeight: 'bold',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    width: 80,
    height: 80,
    borderRadius: 40,
    textAlign: 'center',
    lineHeight: 80,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 4,
  },
});
