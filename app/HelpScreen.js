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
            style={[styles.optionBox, styles.optionBoxBlue]}
            onPress={() => router.push('/HelpRequestScreen')}
          >
            <Text style={styles.optionText}>
              Submit a request for{'\n'}a call from Pek Kio CC
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.optionBox, styles.optionBoxGreen]}
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
    padding: 48,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  header: {
    fontSize: 42,
    fontWeight: 'bold',
    fontFamily: 'System',
    marginBottom: 24,
    textAlign: 'center',
    color: '#222',
  },
  divider: {
    height: 6,
    backgroundColor: '#222',
    width: '100%',
    marginVertical: 32,
    borderRadius: 3,
  },
  optionsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 48,
    marginBottom: 48,
    width: '100%',
  },
  optionBox: {
    flex: 1,
    borderRadius: 24,
    borderWidth: 4,
    borderColor: '#222',
    padding: 48,
    marginHorizontal: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 12,
    elevation: 8,
    minHeight: 220,
    justifyContent: 'center',
    maxWidth: 400,
  },
  optionBoxBlue: {
    backgroundColor: '#dbeafe', // light blue
  },
  optionBoxGreen: {
    backgroundColor: '#dcfce7', // light green
  },
  optionText: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    lineHeight: 36,
    fontFamily: 'System',
    color: '#222',
  },
  backBtn: {
    borderWidth: 4,
    borderColor: '#222',
    borderRadius: 16,
    paddingHorizontal: 48,
    paddingVertical: 20,
    backgroundColor: '#fecaca', // light red shade
    marginTop: 24,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 4,
  },
  backBtnText: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    letterSpacing: 1,
    color: '#222',
  },
  helpIconContainer: {
    position: 'absolute',
    bottom: 32,
    right: 32,
    width: 64,
    height: 64,
    backgroundColor: '#6b7280',
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 6,
  },
  helpIcon: {
    fontSize: 32,
    color: '#fff',
    fontWeight: 'bold',
  },
});