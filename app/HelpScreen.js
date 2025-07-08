import { useRouter } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Sidebar from './Sidebar';

export default function HelpScreen() {
  const router = useRouter();

  const handleLogout = () => {
    // TODO: Replace with your logout logic
    alert('Logged out!');
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
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>

        <Text style={styles.header}>What Do You Need Help With?</Text>
        <View style={styles.divider} />
        <View style={styles.optionsRow}>
          <TouchableOpacity
            style={[styles.optionBox, styles.optionBoxYellow]}
            onPress={() => router.push('/HelpRequestScreen')}
          >
            <Text style={styles.optionText}>
              Submit a request for{'\n'}a call from Pek Kio CC
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.optionBox, styles.optionBoxYellow]}
            onPress={() => router.push('/HelpAIBotScreen')}
          >
            <Text style={styles.optionText}>Talk To Our{'\n'}AI Friend!</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => router.push('/')}
        >
          <Text style={styles.backBtnText}>Go Back to Homepage</Text>
        </TouchableOpacity>
        <View style={styles.helpIconContainer}>
          <Text style={styles.helpIcon}>?</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    flexDirection: 'row', 
    backgroundColor: '#f8f9fa' 
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  // Logout button styles (consistent with other screens)
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
    fontSize: 52,
    fontWeight: 'bold',
    fontFamily: 'System',
    marginBottom: 20,
    textAlign: 'center',
    color: '#222',
  },
  divider: {
    height: 8,
    backgroundColor: '#222',
    width: '100%',
    marginVertical: 24,
    borderRadius: 4,
  },
  optionsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 32,
    marginBottom: 32,
    width: '100%',
    flex: 1,
  },
  optionBox: {
    flex: 1,
    borderRadius: 32,
    borderWidth: 6,
    borderColor: '#222',
    padding: 60,
    marginHorizontal: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 16,
    elevation: 10,
    justifyContent: 'center',
    maxWidth: 500,
    minHeight: 300,
  },
  optionBoxYellow: {
    backgroundColor: '#fef3c7',
  },
  optionText: {
    fontSize: 36,
    fontWeight: 'bold',
    textAlign: 'center',
    lineHeight: 44,
    fontFamily: 'System',
    color: '#222',
  },
  backBtn: {
    borderWidth: 6,
    borderColor: '#222',
    borderRadius: 20,
    paddingHorizontal: 64,
    paddingVertical: 28,
    backgroundColor: '#fecaca',
    marginTop: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 12,
    elevation: 6,
  },
  backBtnText: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    letterSpacing: 1,
    color: '#222',
  },
  helpIconContainer: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    width: 80,
    height: 80,
    backgroundColor: '#6b7280',
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    elevation: 8,
  },
  helpIcon: {
    fontSize: 40,
    color: '#fff',
    fontWeight: 'bold',
  },
});

