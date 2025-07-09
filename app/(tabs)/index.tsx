// import MainScreen from '../MainScreen';
// export default MainScreen;

// import KakiTapScreen from '../KakiTapScreen';
// export default KakiTapScreen;

// app/index.tsx
import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import { View, Text, StyleSheet } from 'react-native';

export default function Index() {
  const router = useRouter();
  
  useEffect(() => {
    // For now, always start with KakiTapScreen (login/scan screen)
    // Later you can add authentication logic here
    const timer = setTimeout(() => {
      router.replace('/KakiTapScreen');
    }, 100); // Small delay to ensure router is ready

    return () => clearTimeout(timer);
  }, []);

  // Show a simple loading screen while redirecting
  return (
    <View style={styles.container}>
      <Text style={styles.loadingText}>Loading KakiTap...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e0f4ff',
  },
  loadingText: {
    fontSize: 18,
    color: '#008080',
    fontWeight: '600',
  },
});