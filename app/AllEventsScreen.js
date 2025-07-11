import { useRouter } from 'expo-router';
import { useRef, useState } from 'react';
import { Dimensions, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Sidebar from './Sidebar';

const screenWidth = Dimensions.get('window').width;
const SIDEBAR_WIDTH = 250;
const MAIN_CONTENT_WIDTH = screenWidth - SIDEBAR_WIDTH;

const CARD_WIDTH = MAIN_CONTENT_WIDTH * 0.3;
const CARD_HEIGHT = CARD_WIDTH * 1.4;
const CARD_SPACING = 30;

const events = [
  {
    id: '1',
    title: '科学中心',
    date: '2025年3月15日',
    time: '上午10点 - 下午1点',
    price: '¥8',
    image: require('../assets/posters/poster2.jpg'),
  },
  {
    id: '2',
    title: '榴莲嘉年华',
    date: '2025年7月26日',
    time: '下午5点 - 7点',
    price: '¥15',
    image: require('../assets/posters/poster5.jpg'),
  },
  {
    id: '3',
    title: '春季嘉年华',
    date: '2025年2月8日',
    time: '上午11:30 - 下午3点',
    price: '免费',
    image: require('../assets/posters/poster3.jpg'),
  },
  {
    id: '4',
    title: '电影之夜',
    date: '2025年6月14日',
    time: '下午4点起',
    price: '¥5',
    image: require('../assets/posters/poster1.jpg'),
  },
];

// 红色气泡，带上方指针
const RedChatBox = ({
  style,
  pointerDirection = 'up',
  children,
}) => (
  <View style={[styles.redChatBoxContainer, style]}>
    {pointerDirection === 'up' && (
      <View style={styles.redPointerWrapperUp}>
        <View style={styles.redChatBoxPointerFillUp} />
      </View>
    )}
    <View style={styles.redChatBox}>
      <Text style={styles.redChatBoxText}>{children}</Text>
    </View>
  </View>
);

export default function AllEventsScreen() {
  const router = useRouter();
  const flatListRef = useRef(null);
  const [scrollX, setScrollX] = useState(0);
  const [showHelp, setShowHelp] = useState(false);
  const seeMoreBtnRefs = useRef({});

  const handleLogout = () => {
    router.replace('/KakiTapScreen');
  };

  const scrollToIndex = (direction) => {
    const newOffset =
      direction === 'left'
        ? Math.max(0, scrollX - (CARD_WIDTH + CARD_SPACING))
        : scrollX + (CARD_WIDTH + CARD_SPACING);

    flatListRef.current?.scrollToOffset({
      offset: newOffset,
      animated: true,
    });
  };

  const onScroll = (event) => {
    const newScrollX = event.nativeEvent.contentOffset.x;
    setScrollX(newScrollX);
  };

  const getItemLayout = (data, index) => ({
    length: CARD_WIDTH + CARD_SPACING,
    offset: (CARD_WIDTH + CARD_SPACING) * index,
    index,
  });

  const renderItem = ({ item, index }) => {
    const screenCenter = MAIN_CONTENT_WIDTH / 2;
    const cardCenter =
      (CARD_WIDTH + CARD_SPACING) * index +
      CARD_WIDTH / 2 -
      scrollX +
      (MAIN_CONTENT_WIDTH - CARD_WIDTH) / 2;
    const distance = Math.abs(cardCenter - screenCenter);
    const maxDistance = (CARD_WIDTH + CARD_SPACING) * 1.5;
    const scale = Math.max(0.7, 1 - (distance / maxDistance) * 0.3);
    const opacity = Math.max(0.3, 1 - (distance / maxDistance) * 0.7);

    return (
      <View
        style={[
          styles.card,
          {
            transform: [{ scale }],
            opacity,
            marginHorizontal: CARD_SPACING / 2,
          },
        ]}
      >
        <Image source={item.image} style={styles.image} />
        <Text style={styles.eventTitle}>{item.title}</Text>
        <Text style={styles.eventDetails}>{item.date}</Text>
        <Text style={styles.eventDetails}>
          {item.time} | {item.price}
        </Text>
        <View style={{ width: '100%', alignItems: 'flex-end', position: 'relative' }}>
          <TouchableOpacity
            ref={ref => (seeMoreBtnRefs.current[index] = ref)}
            style={styles.moreButton}
            onPress={() =>
              router.push({
                pathname: '/EventRegistrationScreen',
                params: { eventId: item.id },
              })
            }
          >
            <Text style={styles.moreButtonText}>查看详情</Text>
          </TouchableOpacity>
          {/* 气泡提示 */}
          {showHelp && (
            <View
              style={{
                position: 'absolute',
                right: 0,
                top: 38,
                width: 220,
                alignItems: 'flex-end',
                zIndex: 10,
              }}
            >
              <RedChatBox pointerDirection="up" style={{ width: 220, minHeight: 32 }}>
                点击此处查看活动详情
              </RedChatBox>
            </View>
          )}
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Sidebar active="events" />

      <View style={styles.main}>
        {/* 退出登录按钮 */}
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={handleLogout}
          activeOpacity={0.8}
        >
          <Text style={styles.logoutButtonText}>退出登录</Text>
        </TouchableOpacity>

        <View style={styles.carouselContainer}>
          <TouchableOpacity
            onPress={() => scrollToIndex('left')}
            style={styles.arrow}
          >
            <Text style={styles.arrowText}>◀</Text>
          </TouchableOpacity>

          <View style={styles.flatListContainer}>
            <FlatList
              ref={flatListRef}
              data={events}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{
                paddingLeft: 8,
                paddingRight: (MAIN_CONTENT_WIDTH - CARD_WIDTH) / 2,
                paddingVertical: 20,
              }}
              onScroll={onScroll}
              scrollEventThrottle={16}
              decelerationRate="fast"
              snapToInterval={CARD_WIDTH + CARD_SPACING}
              snapToAlignment="center"
              getItemLayout={getItemLayout}
              initialScrollIndex={0}
            />
          </View>

          <TouchableOpacity
            onPress={() => scrollToIndex('right')}
            style={styles.arrow}
          >
            <Text style={styles.arrowText}>▶</Text>
          </TouchableOpacity>
        </View>

        {/* 页面指示器 */}
        <View style={styles.indicators}>
          {events.map((_, index) => {
            const centerIndex = Math.round(scrollX / (CARD_WIDTH + CARD_SPACING));
            return (
              <TouchableOpacity
                key={index}
                style={[
                  styles.indicator,
                  {
                    backgroundColor:
                      index === centerIndex ? '#2c3e50' : '#bdc3c7',
                  },
                ]}
                onPress={() => {
                  const targetOffset = index * (CARD_WIDTH + CARD_SPACING);
                  flatListRef.current?.scrollToOffset({
                    offset: targetOffset,
                    animated: true,
                  });
                }}
              />
            );
          })}
        </View>

        {/* 帮助按钮 */}
        <TouchableOpacity
          style={styles.helpFab}
          onPress={() => setShowHelp((prev) => !prev)}
        >
          <Text style={styles.helpFabText}>？</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#f8f9fa',
  },
  main: {
    flex: 1,
    padding: 24,
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
  carouselContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  flatListContainer: {
    flex: 1,
    height: CARD_HEIGHT + 80,
  },
  arrow: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(44, 62, 80, 0.1)',
    borderRadius: 20,
    marginHorizontal: 10,
  },
  arrowText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 8,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 8,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  image: {
    width: '100%',
    height: '70%',
    borderRadius: 6,
    resizeMode: 'cover',
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
    textAlign: 'center',
    marginBottom: 2,
  },
  eventDetails: {
    fontSize: 12,
    color: '#555',
    textAlign: 'center',
    lineHeight: 14,
  },
  moreButton: {
    marginTop: 4,
    paddingHorizontal: 10,
    paddingVertical: 6,
    backgroundColor: '#2c3e50',
    borderRadius: 4,
  },
  moreButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
  },
  indicators: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    gap: 8,
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  helpFab: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    backgroundColor: '#e53935',
    width: 52,
    height: 52,
    borderRadius: 26,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 100,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
  },
  helpFabText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 28,
    marginBottom: 2,
  },

  redChatBoxContainer: {
    alignItems: 'center',
    width: '100%',
    maxWidth: 220,
  },
  redChatBox: {
    backgroundColor: '#e53935',
    borderColor: '#b71c1c',
    borderWidth: 3,
    borderRadius: 14,
    paddingVertical: 6,
    paddingHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
    alignItems: 'center',
    minWidth: 180,
    maxWidth: 220,
    minHeight: 32,
    justifyContent: 'center',
  },
  redChatBoxText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  redPointerWrapperUp: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 15,
    height: 0,
    paddingRight: 28,
  },
  redChatBoxPointerFillUp: {
    width: 0,
    height: 0,
    borderLeftWidth: 12,
    borderRightWidth: 12,
    borderBottomWidth: 14,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: '#e53935',
  },
});