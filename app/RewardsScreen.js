import { useRouter } from 'expo-router';
import { useRef, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Sidebar from './Sidebar';

// Data dalam Bahasa Melayu
const journeyData = [
  { date: '10 Mac 2025', description: 'Sertai Sesi Mahjong', points: 10 },
  { date: '26 Feb 2025', description: 'Sertai Jalan Kaki @ Bishan', points: 10 },
  { date: '14 Jan 2025', description: 'Sertai Art Jamming', points: 20 },
  { date: '2 Jan 2025', description: 'Daftar Kelas Memasak', points: 20 },
];

const rewardsData = [
  { id: 1, brand: "FairPrice", description: "Baucar e-FairPrice RM5", points: 20 },
  { id: 2, brand: "SimplyGo", description: "SimplyGo (Kad Konsesi EZ-Link atau NETS Flashpay)", points: 20 },
];

const PAGE_SIZE = 2;

export default function RewardsScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('journey');
  const [page, setPage] = useState(1);
  const [userPoints, setUserPoints] = useState(60);
  const [redeemedRewards, setRedeemedRewards] = useState([]);
  const [showHelp, setShowHelp] = useState(false);

  const firstRedeemBtnRef = useRef(null);
  const [redeemBtnPos, setRedeemBtnPos] = useState({ x: 0, y: 0 });

  const totalPages = Math.ceil(journeyData.length / PAGE_SIZE);
  const startIdx = (page - 1) * PAGE_SIZE;
  const endIdx = startIdx + PAGE_SIZE;
  const pageData = journeyData.slice(startIdx, endIdx);

  const handleRedeem = (rewardId, points) => {
    if (redeemedRewards.includes(rewardId)) {
      alert('Anda telah menebus ganjaran ini!');
      return;
    }
    if (userPoints >= points) {
      setRedeemedRewards([...redeemedRewards, rewardId]);
      const newPoints = userPoints - points;
      setUserPoints(newPoints);

      const redeemedReward = rewardsData.find(r => r.id === rewardId);

      router.push({
        pathname: '/RedeemedScreen',
        params: {
          points: newPoints,
          brand: redeemedReward.brand,
          reward: redeemedReward.description,
        },
      });
    } else {
      alert('Mata tidak mencukupi untuk menebus ganjaran ini!');
    }
  };

  const handleLogout = () => {
    router.replace('/KakiTapScreen');
  };

  const handleRedeemBtnLayout = (event) => {
    const { x, y } = event.nativeEvent.layout;
    setRedeemBtnPos({ x, y });
  };

  return (
    <View style={styles.container}>
      <Sidebar active="rewards" />

      <View style={styles.content}>
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={handleLogout}
          activeOpacity={0.8}
        >
          <Text style={styles.logoutButtonText}>Log Keluar</Text>
        </TouchableOpacity>

        <View style={styles.tabs}>
          <TouchableOpacity onPress={() => setActiveTab('journey')}>
            <Text style={[styles.tab, activeTab === 'journey' && styles.activeTab]}>
              Perjalanan Saya
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setActiveTab('redeem')}>
            <Text style={[styles.tab, activeTab === 'redeem' && styles.activeTab]}>
              Tebus Ganjaran
            </Text>
          </TouchableOpacity>
        </View>

        <View style={{ alignItems: 'center', position: 'relative' }}>
          <Text style={styles.pointsLabel}>KakiPoints Saya</Text>
          <Text style={styles.points}>{userPoints} ✧</Text>
        </View>

        {activeTab === 'journey' ? (
          <>
            <View style={styles.historyBox}>
              <Text style={styles.sectionTitle}>Sejarah Perjalanan Hidup</Text>
              <ScrollView>
                {pageData.map((item, idx) => (
                  <View key={idx} style={styles.historyItem}>
                    <View style={styles.historyHeader}>
                      <Text style={styles.historyDate}>{item.date}</Text>
                      <Text style={styles.historyPoints}>+{item.points}✧</Text>
                    </View>
                    <Text style={styles.historyDesc}>{item.description}</Text>
                  </View>
                ))}
              </ScrollView>
            </View>
            <View style={styles.pagination}>
              <TouchableOpacity
                style={[styles.pageBtn, page === 1 && styles.disabledBtn]}
                onPress={() => setPage(page - 1)}
                disabled={page === 1}
              >
                <Text style={[styles.pageBtnText, page === 1 && styles.disabledBtnText]}>sebelum</Text>
              </TouchableOpacity>
              <Text style={styles.pageNum}>
                &lt; HALAMAN <Text style={styles.currentPage}>{page}</Text>/{totalPages} &gt;
              </Text>
              <TouchableOpacity
                style={[styles.pageBtn, page === totalPages && styles.disabledBtn]}
                onPress={() => setPage(page + 1)}
                disabled={page === totalPages}
              >
                <Text style={[styles.pageBtnText, page === totalPages && styles.disabledBtnText]}>seterusnya</Text>
              </TouchableOpacity>
            </View>
          </>
        ) : (
          <View style={styles.redeemBox}>
            {rewardsData.map((reward, idx) => {
              const isRedeemed = redeemedRewards.includes(reward.id);
              return (
                <View key={reward.id} style={styles.rewardCard}>
                  <Text style={styles.rewardBrand}>{reward.brand}</Text>
                  <Text style={styles.rewardDesc}>{reward.description}</Text>
                  <View style={styles.rewardFooter}>
                    <Text style={styles.rewardPoints}>{reward.points}✧</Text>
                    <TouchableOpacity
                      ref={idx === 0 ? firstRedeemBtnRef : null}
                      onLayout={idx === 0 ? handleRedeemBtnLayout : undefined}
                      style={[styles.redeemBtn, isRedeemed && styles.redeemedBtn]}
                      onPress={() => handleRedeem(reward.id, reward.points)}
                      disabled={isRedeemed}
                    >
                      <Text style={styles.redeemBtnText}>
                        {isRedeemed ? 'TELAH DITEBUS' : 'Tebus'}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              );
            })}
          </View>
        )}

        <TouchableOpacity
          style={styles.helpIconContainer}
          onPress={() => setShowHelp(!showHelp)}
          activeOpacity={0.8}
        >
          <Text style={styles.helpIcon}>?</Text>
        </TouchableOpacity>

        {showHelp && (
          <Pressable
            style={styles.helpOverlay}
            onPress={() => setShowHelp(false)}
          >
            {activeTab === 'journey' && (
              <>
                <View style={[styles.redChatBoxContainer, { position: 'absolute', left: 200, top: 150, maxWidth: 340 }]}>
                  <View style={styles.redChatBox}>
                    <Text style={styles.redChatBoxText}>
                      Mata yang anda dapat dari acara lepas akan dipaparkan di sini
                    </Text>
                    <View style={styles.arrowRight} />
                  </View>
                </View>
                <View style={[styles.redChatBoxContainer, { position: 'absolute', left: 475, top: 5, maxWidth: 260 }]}>
                  <View style={styles.redChatBox}>
                    <Text style={styles.redChatBoxText}>
                      Anda boleh tebus mata untuk ganjaran hebat di sini!
                    </Text>
                    <View style={styles.arrowLeft} />
                  </View>
                </View>
              </>
            )}
            {activeTab === 'redeem' && (
              <View style={[
                styles.redChatBoxContainer,
                {
                  position: 'absolute',
                  left: redeemBtnPos.x - 240,
                  top: redeemBtnPos.y + 365,
                  maxWidth: 260
                }
              ]}>
                <View style={styles.redChatBox}>
                  <Text style={styles.redChatBoxText}>
                    Tekan di sini untuk tebus hadiah dengan mata anda!
                  </Text>
                  <View style={styles.arrowRight} />
                </View>
              </View>
            )}
          </Pressable>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, flexDirection: 'row', backgroundColor: '#f8f9fa' },
  content: { flex: 1, padding: 32, position: 'relative' },

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

  tabs: { flexDirection: 'row', marginBottom: 24, marginTop: 12 },
  tab: {
    fontSize: 26,
    fontWeight: 'bold',
    marginRight: 48,
    color: '#aaa',
    borderBottomWidth: 3,
    borderBottomColor: 'transparent',
    paddingBottom: 12,
  },
  activeTab: {
    color: '#008080',
    borderBottomColor: '#008080',
  },

  pointsLabel: {
    fontSize: 24,
    color: '#555',
    marginTop: 12,
    marginBottom: 6,
    textAlign: 'center',
  },
  points: {
    fontSize: 52,
    fontWeight: 'bold',
    color: '#008080',
    textAlign: 'center',
    marginBottom: 36,
  },

  historyBox: {
    backgroundColor: '#fed7aa', 
    borderRadius: 24,
    padding: 36,
    marginBottom: 36,
    borderWidth: 1,
    borderColor: '#f97316',
    minHeight: 320,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    elevation: 4,
  },
  sectionTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#ea580c',
    marginBottom: 28,
    textAlign: 'center',
  },
  historyItem: {
    marginBottom: 40,
    paddingBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#f97316',
  },
  historyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  historyDate: {
    fontWeight: 'bold',
    fontSize: 22,
    color: '#c2410c',
  },
  historyDesc: {
    fontSize: 22,
    color: '#9a3412',
    marginLeft: 4,
    marginTop: 4,
  },
  historyPoints: {
    fontWeight: 'bold',
    fontSize: 22,
    color: '#ea580c',
  },

  redeemBox: {
    marginTop: 16,
    marginBottom: 40,
  },
  rewardCard: {
    backgroundColor: '#fed7aa', 
    borderRadius: 20,
    padding: 28,
    marginBottom: 28,
    borderWidth: 1,
    borderColor: '#f97316',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 2,
  },
  rewardBrand: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#c2410c',
  },
  rewardDesc: {
    fontSize: 20,
    marginBottom: 16,
    color: '#9a3412',
  },
  rewardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rewardPoints: {
    fontWeight: 'bold',
    fontSize: 22,
    color: '#ea580c',
  },
  redeemBtn: {
    backgroundColor: '#008080',
    borderRadius: 12,
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  redeemedBtn: {
    backgroundColor: '#999',
  },
  redeemBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20,
  },

  pagination: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 28,
    gap: 12,
  },
  pageBtn: {
    backgroundColor: '#eee',
    borderRadius: 8,
    paddingHorizontal: 20,
    paddingVertical: 12,
    marginHorizontal: 6,
  },
  pageBtnText: {
    color: '#222',
    fontWeight: '600',
    fontSize: 20,
  },
  disabledBtn: {
    backgroundColor: '#f5f5f5',
  },
  disabledBtnText: {
    color: '#aaa',
  },
  pageNum: {
    fontSize: 20,
    color: '#222',
    marginHorizontal: 12,
  },
  currentPage: {
    color: '#008080',
    fontWeight: 'bold',
    fontSize: 22,
  },

  helpIconContainer: {
    position: 'absolute',
    bottom: 32,
    right: 32,
    width: 64,
    height: 64,
    backgroundColor: '#e74c3c',
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 6,
    zIndex: 200,
  },
  helpIcon: {
    fontSize: 32,
    color: '#fff',
    fontWeight: 'bold',
  },

  helpOverlay: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    zIndex: 199,
  },

  redChatBoxContainer: {
    alignItems: 'flex-start',
    maxWidth: 340,
  },
  redChatBox: {
    backgroundColor: '#e53935',
    borderColor: '#b71c1c',
    borderWidth: 4,
    borderRadius: 16,
    paddingVertical: 18,
    paddingHorizontal: 26,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 7,
    elevation: 6,
    alignItems: 'center',
    minWidth: 140,
    maxWidth: 320,
    position: 'relative',
  },
  redChatBoxText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  arrowRight: {
    position: 'absolute',
    top: 28, 
    right: -26,
    width: 0,
    height: 0,
    borderTopWidth: 14,
    borderBottomWidth: 14,
    borderLeftWidth: 22,
    borderTopColor: 'transparent',
    borderBottomColor: 'transparent',
    borderLeftColor: '#e53935',
    zIndex: 2,
  },
  arrowLeft: {
    position: 'absolute',
    top: 28,
    left: -26,
    width: 0,
    height: 0,
    borderTopWidth: 14,
    borderBottomWidth: 14,
    borderRightWidth: 22,
    borderTopColor: 'transparent',
    borderBottomColor: 'transparent',
    borderRightColor: '#e53935',
    zIndex: 2,
  },
});
