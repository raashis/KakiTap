import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { addRegisteredEvent } from './registeredEventsStore';
import Sidebar from './Sidebar';

const events = [
  { id: '1', title: '科学中心', date: '2025年3月15日', time: '上午10点 - 下午1点', price: '$8' },
  { id: '2', title: '榴莲嘉年华', date: '2025年7月26日', time: '下午5点 - 7点', price: '$15' },
  { id: '3', title: '春季嘉年华', date: '2025年2月8日', time: '上午11:30 - 下午3点', price: '免费' },
  { id: '4', title: '电影之夜', date: '2025年6月14日', time: '下午4点起', price: '$5' },
];

export default function ConfirmationScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const eventId = String(params.eventId);
  const event = events.find(e => String(e.id) === eventId);

  const [showHelp, setShowHelp] = useState(false);

  const thumbsUpRef = useRef(null);
  const backBtnRef = useRef(null);
  const [thumbsUpPos, setThumbsUpPos] = useState({ x: 0, y: 0 });
  const [backBtnPos, setBackBtnPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (event) {
      addRegisteredEvent({
        id: event.id,
        date: event.date,
        title: event.title,
        details: `${event.date} ${event.time} @ ${event.title}`,
        paid: false,
      });
    }
  }, [event]);

  useEffect(() => {
    if (showHelp && thumbsUpRef.current) {
      thumbsUpRef.current.measure((fx, fy, width, height, px, py) => {
        setThumbsUpPos({ x: px, y: py });
      });
    }
    if (showHelp && backBtnRef.current) {
      backBtnRef.current.measure((fx, fy, width, height, px, py) => {
        setBackBtnPos({ x: px, y: py });
      });
    }
  }, [showHelp]);

  const handleLogout = () => {
    router.replace('/KakiTapScreen');
  };

  if (!event) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>未找到活动！</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Sidebar active="events" />
      <View style={styles.contentContainer}>
        <TouchableOpacity 
          style={styles.logoutButton}
          onPress={handleLogout}
          activeOpacity={0.8}
        >
          <Text style={styles.logoutButtonText}>退出登录</Text>
        </TouchableOpacity>

        <Text style={styles.title}>报名确认</Text>
        <View style={styles.confirmationCard}>
          <View style={styles.confirmationContent}>
            <Text style={styles.confirmationText}>
              您已成功报名参加
            </Text>
            <Text style={styles.eventTitle}>{event.title} 活动！</Text>
            <View style={styles.iconContainer}>
              <Text style={styles.thumbsUpIcon} ref={thumbsUpRef}>👍</Text>
              <Text style={styles.sparkleIcon}>✨</Text>
            </View>
            <Text style={styles.seeYouText}>到时见！</Text>
            <TouchableOpacity 
              style={styles.backButton}
              onPress={() => router.push('/AllEventsScreen')}
              ref={backBtnRef}
            >
              <Text style={styles.backButtonText}>返回所有活动</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <TouchableOpacity
        style={styles.helpButton}
        onPress={() => setShowHelp(!showHelp)}
        activeOpacity={0.8}
      >
        <Text style={styles.helpButtonText}>？</Text>
      </TouchableOpacity>

      {showHelp && (
        <Pressable
          style={styles.overlay}
          onPress={() => setShowHelp(false)}
        >
          <View style={{
            position: 'absolute',
            left: thumbsUpPos.x - 80,
            top: thumbsUpPos.y - 90,
            zIndex: 100,
          }}>
            <RedChatBox pointerDirection="down" pointerOffset={80}>
              您已成功报名一个活动！
            </RedChatBox>
          </View>
          <View style={{
            position: 'absolute',
            left: backBtnPos.x - 100,
            top: backBtnPos.y - 90,
            zIndex: 100,
          }}>
            <RedChatBox pointerDirection="down" pointerOffset={100}>
              点击这里返回查看更多活动！
            </RedChatBox>
          </View>
        </Pressable>
      )}
    </View>
  );
}

const RedChatBox = ({ children, pointerDirection = 'down', pointerOffset = 0 }) => (
  <View style={[styles.redChatBoxContainer]}>
    <View style={styles.redChatBox}>
      <Text style={styles.redChatBoxText}>{children}</Text>
    </View>
    {pointerDirection === 'down' && (
      <View style={[styles.redPointerWrapper, { marginLeft: pointerOffset }]}>
        <View style={styles.redChatBoxPointerBorder} />
        <View style={styles.redChatBoxPointerFill} />
      </View>
    )}
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, flexDirection: 'row', backgroundColor: '#f8f9fa' },
  contentContainer: { flex: 1, padding: 40, justifyContent: 'center', alignItems: 'center', position: 'relative' },
  logoutButton: {
    position: 'absolute', top: 20, right: 12,
    backgroundColor: '#e74c3c',
    paddingHorizontal: 20, paddingVertical: 10,
    borderRadius: 16, zIndex: 10, elevation: 10,
  },
  logoutButtonText: {
    color: '#fff', fontWeight: 'bold', fontSize: 14, letterSpacing: 1,
  },
  title: {
    fontSize: 32, fontWeight: 'bold', color: '#2c3e50',
    marginBottom: 60, textAlign: 'center', textDecorationLine: 'underline', letterSpacing: 1,
  },
  confirmationCard: {
    backgroundColor: 'rgba(220, 53, 69, 0.08)',
    borderRadius: 20, padding: 50, width: '90%', maxWidth: 700,
    shadowColor: '#000', shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1, shadowRadius: 10, elevation: 10,
    borderWidth: 2, borderColor: 'rgba(220, 53, 69, 0.2)',
  },
  confirmationContent: { alignItems: 'center', justifyContent: 'center' },
  confirmationText: {
    fontSize: 28, fontWeight: '600', color: '#2c3e50',
    textAlign: 'center', marginBottom: 15, lineHeight: 36,
  },
  eventTitle: {
    fontSize: 32, fontWeight: 'bold', color: '#dc3545',
    textAlign: 'center', marginBottom: 40, lineHeight: 40,
  },
  iconContainer: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 40,
  },
  thumbsUpIcon: { fontSize: 72, marginRight: 20 },
  sparkleIcon: { fontSize: 48, marginLeft: 10 },
  seeYouText: {
    fontSize: 36, fontWeight: 'bold', color: '#2c3e50',
    marginBottom: 50, textAlign: 'center', letterSpacing: 2,
  },
  backButton: {
    backgroundColor: '#2c3e50', paddingHorizontal: 40, paddingVertical: 20,
    borderRadius: 12, shadowColor: '#000', shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3, shadowRadius: 6, elevation: 8,
  },
  backButtonText: {
    color: '#fff', fontSize: 24, fontWeight: 'bold', textAlign: 'center',
  },
  errorText: {
    fontSize: 28, color: '#e74c3c', textAlign: 'center', margin: 20,
  },
  helpButton: {
    position: 'absolute', bottom: 30, right: 30,
    backgroundColor: '#e74c3c',
    width: 60, height: 60, borderRadius: 30,
    alignItems: 'center', justifyContent: 'center',
    zIndex: 100, elevation: 10,
    shadowColor: '#000', shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.18, shadowRadius: 8,
  },
  helpButtonText: {
    color: '#fff', fontWeight: 'bold', fontSize: 32,
  },
  overlay: {
    position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
    zIndex: 99,
  },
  redChatBoxContainer: {
    alignItems: 'center', width: '100%', maxWidth: 350,
  },
  redChatBox: {
    backgroundColor: '#e53935',
    borderColor: '#b71c1c',
    borderWidth: 3,
    borderRadius: 14,
    paddingVertical: 16,
    paddingHorizontal: 22,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
    alignItems: 'center',
    minWidth: 160,
    maxWidth: 350,
  },
  redChatBoxText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  redPointerWrapper: {
    height: 22,
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: -2,
    position: 'relative',
  },
  redChatBoxPointerBorder: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    width: 0,
    height: 0,
    borderLeftWidth: 15,
    borderRightWidth: 15,
    borderTopWidth: 18,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: '#b71c1c',
    zIndex: 1,
  },
  redChatBoxPointerFill: {
    position: 'absolute',
    top: 3,
    left: 0,
    right: 0,
    width: 0,
    height: 0,
    borderLeftWidth: 12,
    borderRightWidth: 12,
    borderTopWidth: 14,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: '#e53935',
    zIndex: 2,
  },
});
