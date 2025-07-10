import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Sidebar from './Sidebar';

export default function HelpScreen() {
  const router = useRouter();
  const [showHelp, setShowHelp] = useState(false);

  const handleLogout = () => {
    router.replace('/KakiTapScreen');
  };

  const handleGoBackToHomepage = () => {
    router.push('/MainScreen');
  };

  return (
    <View style={styles.container}>
      <Sidebar active="help" />
      <View style={styles.content}>
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={handleLogout}
          activeOpacity={0.8}
        >
          <Text style={styles.logoutButtonText}>退出登录</Text>
        </TouchableOpacity>

        <Text style={styles.header}>您需要什么帮助？</Text>
        <View style={styles.divider} />

        <View style={styles.optionsRow}>
          <TouchableOpacity
            style={[styles.optionBox, styles.optionBoxYellow]}
            onPress={() => router.push('/HelpRequestScreen')}
          >
            <Text style={styles.optionText}>
              提交回电请求{'\n'}（白桥民众俱乐部）
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.optionBox, styles.optionBoxYellow]}
            onPress={() => router.push('/HelpAIBotScreen')}
          >
            <Text style={styles.optionText}>与我们的{'\n'}AI小助手对话！</Text>
          </TouchableOpacity>
        </View>
        
        <TouchableOpacity
          style={styles.backBtn}
          onPress={handleGoBackToHomepage}
        >
          <Text style={styles.backBtnText}>返回主页</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.helpIconContainer}
          onPress={() => setShowHelp(!showHelp)}
          activeOpacity={0.8}
        >
          <Text style={styles.helpIcon}>？</Text>
        </TouchableOpacity>

        {showHelp && (
          <Pressable
            style={styles.helpOverlay}
            onPress={() => setShowHelp(false)}
          >
            <View style={styles.redChatBoxContainer}>
              <View style={styles.redChatBox}>
                <Text style={styles.redChatBoxText}>
                  点击其中一个按钮获取帮助！
                </Text>
                <View style={styles.arrowRow}>
                  <View style={styles.arrowDownLeft} />
                  <View style={styles.arrowDownRight} />
                </View>
              </View>
            </View>
          </Pressable>
        )}
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
    backgroundColor: '#e74c3c',
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    elevation: 8,
    zIndex: 100,
  },
  helpIcon: {
    fontSize: 40,
    color: '#fff',
    fontWeight: 'bold',
  },
  helpOverlay: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    zIndex: 99,
  },
  redChatBoxContainer: {
    position: 'absolute',
    top: 195,
    left: '25%',
    width: 600,
    alignItems: 'center',
    zIndex: 100,
  },
  redChatBox: {
    backgroundColor: '#e53935',
    borderColor: '#b71c1c',
    borderWidth: 4,
    borderRadius: 18,
    paddingVertical: 10,
    paddingHorizontal: 38,
    alignItems: 'center',
    minWidth: 320,
    maxWidth: 600,
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 6,
  },
  redChatBoxText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 26,
    textAlign: 'center',
    marginBottom: 6,
    letterSpacing: 0.5,
  },
  arrowRow: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    marginTop: 0,
    position: 'relative',
  },
  arrowDownLeft: {
    marginLeft: 60,
    width: 0,
    height: 0,
    borderLeftWidth: 18,
    borderRightWidth: 18,
    borderTopWidth: 26,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: '#e53935',
  },
  arrowDownRight: {
    marginRight: 60,
    width: 0,
    height: 0,
    borderLeftWidth: 18,
    borderRightWidth: 18,
    borderTopWidth: 26,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: '#e53935',
  },
});
