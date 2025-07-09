import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

const languages = [
  { label: 'English', value: 'en' },
  { label: '中文', value: 'zh' },
  { label: 'Bahasa melayu', value: 'ms' },
  { label: 'தமிழ்', value: 'ta' },
];

const LanguageSettingsScreen = ({ onSelectLanguage }) => {
  const router = useRouter();

  const handleLanguageSelect = (languageValue) => {
    if (onSelectLanguage) {
      onSelectLanguage(languageValue);
    }
    router.push('/(tabs)/main');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>KAKI TAP</Text>
      <Text style={styles.subtitle}>
        Welcome! 欢迎! Selamat datang! வணக்கம்
      </Text>
      <Text style={styles.label}>
        Please Choose Your Language • 请选择您的语言 • Sila Pilih Bahasa Anda • உங்கள் மொழியைத் தேர்ந்தெடுக்கவும்
      </Text>
      <View style={styles.buttonGrid}>
        {languages.map((lang) => (
          <TouchableOpacity
            key={lang.value}
            style={styles.languageButton}
            onPress={() => handleLanguageSelect(lang.value)}
            activeOpacity={0.8}
          >
            <Text style={styles.languageButtonText}>{lang.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: '#e0f4ff',
    padding: 20,
  },
  title: { 
    fontSize: 38, 
    fontWeight: 'bold', 
    color: '#008080',
    marginBottom: 24,
    letterSpacing: 2,
  },
  subtitle: { 
    fontSize: 24, 
    color: '#2c3e50',
    fontWeight: '600',
    marginBottom: 16,
    textAlign: 'center',
  },
  label: { 
    fontSize: 18, 
    color: '#2c3e50',
    fontWeight: '500',
    marginBottom: 40,
    textAlign: 'center',
    paddingHorizontal: 10,
  },
  buttonGrid: {
    width: '100%',
    maxWidth: 600,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  languageButton: {
    backgroundColor: '#008080',
    borderRadius: 20,
    marginVertical: 10,
    width: '48%',
    aspectRatio: 1.2,        // Makes the button rectangular but close to square
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 6,
    borderWidth: 2,
    borderColor: '#006666',
    minHeight: 120,          // Minimum height for larger screens
    maxHeight: 150,          // Maximum height to prevent oversizing
  },
  languageButtonText: {
    color: '#ffffff',
    fontSize: 26,
    fontWeight: 'bold',
    letterSpacing: 0.5,
    textAlign: 'center',
  },
});

export default LanguageSettingsScreen;