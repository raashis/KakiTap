import { StyleSheet, Text, View } from 'react-native';

const CardScanScreen = () => (
  <View style={styles.container}>
    <Text style={styles.title}>KAKI TAP</Text>
    <View style={styles.cardPlaceholder}>
      {/* Replace with your card scan component */}
      <Text>⬅️ [ ] ➡️</Text>
    </View>
    <Text style={styles.instruction}>
      Please scan your card · 请扫描您的卡 · Sila imbas kad anda
    </Text>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 24 },
  cardPlaceholder: { marginVertical: 32 },
  instruction: { fontSize: 16, textAlign: 'center', color: '#555' },
});

export default CardScanScreen;
