import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Sidebar from './Sidebar';

const events = [
  {
    id: '1',
    title: '科学中心',
    date: '2025年3月15日',
    time: '上午10点 - 下午1点',
    price: '¥8',
    description: '在新加坡首屈一指的科学馆探索互动展览和现场演示。非常适合家庭和科学爱好者！',
    image: require('../assets/posters/poster2.jpg'),
  },
  {
    id: '2',
    title: '榴莲嘉年华',
    date: '2025年7月26日',
    time: '下午5点 - 7点',
    price: '¥15',
    description: '参加专属榴莲品鉴会，品尝猫山王和D24等优质品种。向专家学习榴莲种植知识。',
    image: require('../assets/posters/poster5.jpg'),
  },
  {
    id: '3',
    title: '春季嘉年华',
    date: '2025年2月8日',
    time: '上午11:30 - 下午3点',
    price: '免费',
    description: '在我们的年度嘉年华中，通过游戏、美食摊位和现场表演庆祝春天的到来。老少皆宜！',
    image: require('../assets/posters/poster3.jpg'),
  },
  {
    id: '4',
    title: '电影之夜',
    date: '2025年6月14日',
    time: '下午4点起',
    price: '¥5',
    description: '在户外影院享受经典电影。可自带毯子或现场租椅。',
    image: require('../assets/posters/poster1.jpg'),
  },
];

export default function EventRegistrationScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const eventId = String(params.eventId);
  const event = events.find(e => String(e.id) === eventId);

  const [showHelp, setShowHelp] = useState(false);

  if (!event) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>未找到活动！</Text>
      </View>
    );
  }

  const handleConfirmJoin = () => {
    router.push({ pathname: '/ConfirmationScreen', params: { eventId: event.id } });
  };

  return (
    <View style={styles.container}>
      <Sidebar active="events" />

      <ScrollView style={styles.contentContainer}>
        <View style={styles.header}>
          <Text style={styles.title}>{event.title}</Text>
          <TouchableOpacity onPress={() => router.back()}>
            <Text style={styles.closeButton}>✕</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          <View style={styles.detailsContainer}>
            <Text style={styles.sectionTitle}>活动详情</Text>

            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>日期：</Text>
              <Text style={styles.detailValue}>{event.date}</Text>
            </View>

            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>时间：</Text>
              <Text style={styles.detailValue}>{event.time}</Text>
            </View>

            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>价格：</Text>
              <Text style={styles.detailValue}>{event.price}</Text>
            </View>

            <Text style={styles.sectionTitle}>活动介绍</Text>
            <Text style={styles.description}>{event.description}</Text>
          </View>

          <View style={styles.posterContainer}>
            <Image source={event.image} style={styles.poster} />
          </View>
        </View>

        <TouchableOpacity 
          style={styles.joinButton}
          onPress={handleConfirmJoin}
        >
          <Text style={styles.joinButtonText}>确认报名</Text>
        </TouchableOpacity>
      </ScrollView>

      <View style={styles.fabContainer} pointerEvents="box-none">
        <TouchableOpacity
          style={styles.fab}
          onPress={() => setShowHelp(!showHelp)}
          activeOpacity={0.8}
        >
          <Text style={styles.fabText}>？</Text>
        </TouchableOpacity>
        {showHelp && (
          <Pressable style={styles.overlay} onPress={() => setShowHelp(false)}>
            <View style={styles.helpBoxContainer} pointerEvents="box-none">
              <View style={styles.helpBox}>
                <Text style={styles.helpText}>点击这里报名参加活动！</Text>
                <View style={styles.arrowDown} />
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
    backgroundColor: '#fff',
  },
  contentContainer: {
    flex: 1,
    padding: 30,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  closeButton: {
    fontSize: 32,
    color: '#555',
    padding: 10,
  },
  content: {
    flexDirection: 'row',
    gap: 40,
    alignItems: 'flex-start',
    marginBottom: 40,
  },
  detailsContainer: {
    flex: 1,
  },
  posterContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  poster: {
    width: '100%',
    height: 500,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 12,
  },
  sectionTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 20,
    color: '#2c3e50',
  },
  detailRow: {
    flexDirection: 'row',
    marginBottom: 15,
    alignItems: 'center',
  },
  detailLabel: {
    fontWeight: 'bold',
    width: 120,
    fontSize: 22,
    color: '#555',
  },
  detailValue: {
    flex: 1,
    fontSize: 22,
    color: '#555',
  },
  description: {
    fontSize: 20,
    color: '#555',
    lineHeight: 32,
    marginBottom: 20,
  },
  joinButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 15,
    padding: 30,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 12,
    marginHorizontal: 50,
  },
  joinButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 28,
  },
  errorText: {
    fontSize: 24,
    color: '#e74c3c',
    textAlign: 'center',
    margin: 20,
  },
  fabContainer: {
    position: 'absolute',
    right: 30,
    bottom: 30,
    alignItems: 'flex-end',
    zIndex: 10,
    width: '100%',
    height: '100%',
    pointerEvents: 'box-none',
  },
  fab: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#e74c3c',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 10,
    position: 'absolute',
    right: 0,
    bottom: 0,
    zIndex: 20,
  },
  fabText: {
    color: 'white',
    fontSize: 36,
    fontWeight: 'bold',
  },
  overlay: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    zIndex: 15,
  },
  helpBoxContainer: {
    position: 'absolute',
    right: 0,
    bottom: 80,
    alignItems: 'flex-end',
    width: 300,
  },
  helpBox: {
    backgroundColor: '#e74c3c', 
    padding: 24,
    borderRadius: 18,
    borderColor: '#b71c1c',         
    borderWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.18,
    shadowRadius: 10,
    elevation: 10,
    maxWidth: 340,
    position: 'relative',
    zIndex: 20,
  },
  helpText: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  arrowDown: {
    position: 'absolute',
    bottom: -22,
    left: 38,
    width: 0,
    height: 0,
    borderLeftWidth: 18,
    borderRightWidth: 18,
    borderTopWidth: 22,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: '#e74c3c',
    zIndex: 21,
  },
});
