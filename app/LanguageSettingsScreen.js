import { Button, StyleSheet, Text, View } from 'react-native';

const languages = [
  { label: 'English', value: 'en' },
  { label: 'Chinese', value: 'zh' },
  { label: 'Malay', value: 'ms' },
  { label: 'Tamil', value: 'ta' },
];

const LanguageSettingsScreen = ({ onSelectLanguage }) => (
  <View style={styles.container}>
    <Text style={styles.title}>KAKI TAP</Text>
    <Text style={styles.subtitle}>Welcome! · 欢迎!</Text>
    <Text style={styles.label}>Choose your language</Text>
    <View style={styles.buttonGroup}>
      {languages.map(lang => (
        <Button
          key={lang.value}
          title={lang.label}
          onPress={() => onSelectLanguage && onSelectLanguage(lang.value)}
        />
      ))}
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 16 },
  subtitle: { fontSize: 18, marginBottom: 8 },
  label: { fontSize: 16, marginBottom: 16 },
  buttonGroup: { width: '80%', gap: 12 },
});

export default LanguageSettingsScreen;
