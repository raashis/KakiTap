import { useRouter } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Sidebar from './Sidebar';

export default function HelpRequestScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Sidebar active="help" />
      <View style={styles.content}>
        <Text style={styles.question}>What Do You Need Help With?</Text>
        <View style={styles.divider} />
        <Text style={styles.info}>
          Pek Kio CC will call you{'\n'}
          shortly during our working hours.{'\n'}
          Thank you for your patience <Text style={styles.heart}>♥</Text>
        </Text>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => router.push('/HelpScreen')}
        >
          <Text style={styles.backBtnText}>Go Back to HELP page</Text>
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
  question: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  divider: {
    height: 2,
    backgroundColor: '#222',
    width: '100%',
    marginVertical: 12,
  },
  info: {
    fontSize: 22,
    textAlign: 'center',
    marginBottom: 30,
    fontWeight: '500',
    lineHeight: 34,
  },
  heart: {
    color: '#c33',
    fontSize: 24,
    fontWeight: 'bold',
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
