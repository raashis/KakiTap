// app/HelpScreen.js
import { useRouter } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Sidebar from './Sidebar';

export default function HelpScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Sidebar active="help" />
      <View style={styles.content}>
        <Text style={styles.header}>What Do You Need Help With?</Text>
        <View style={styles.divider} />
        <View style={styles.optionsRow}>
          <TouchableOpacity
            style={styles.optionBox}
            onPress={() => router.push('/HelpRequestScreen')}
          >
            <Text style={styles.optionText}>
              Submit a request for{'\n'}a call from Pek Kio CC
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.optionBox}
            onPress={() => router.push('/HelpAIBotScreen')}
          >
            <Text style={styles.optionText}>Talk To our{'\n'}AI Friend!</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => router.push('/')}
        >
          <Text style={styles.backBtnText}>Go Back to Homepage</Text>
        </TouchableOpacity>
        <Text style={styles.helpIcon}>?</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, flexDirection: 'row', backgroundColor: '#f8f9fa' },
  content: {
    flex: 1,
    padding: 36,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    fontFamily: 'System', // swap for a handwritten font if available
    marginBottom: 10,
    textAlign: 'center',
  },
  divider: {
    height: 2,
    backgroundColor: '#222',
    width: '100%',
    marginVertical: 14,
  },
  optionsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 32,
    marginBottom: 30,
  },
  optionBox: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#222',
    padding: 28,
    marginHorizontal: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 7,
    elevation: 2,
    minHeight: 140,
    justifyContent: 'center',
  },
  optionText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    lineHeight: 28,
    fontFamily: 'System', // swap for a handwritten font if available
  },
  backBtn: {
    borderWidth: 2,
    borderColor: '#222',
    borderRadius: 8,
    paddingHorizontal: 28,
    paddingVertical: 12,
    backgroundColor: '#fff',
    marginTop: 16,
  },
  backBtnText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    letterSpacing: 1,
  },
  helpIcon: {
    position: 'absolute',
    bottom: 20,
    right: 24,
    fontSize: 28,
    color: '#555',
    fontWeight: 'bold',
  },
});
