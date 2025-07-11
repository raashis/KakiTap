import { useRouter } from 'expo-router';
import { useRef, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Sidebar from './Sidebar';

const journeyData = [
  { date: '10 மார்ச் 2025', description: 'மாஜாங் அமர்வில் கலந்துகொண்டேன்', points: 10 },
  { date: '26 பிப்ரவரி 2025', description: 'பிஷானில் நடந்த நடைப்போட்டியில் கலந்துகொண்டேன்', points: 10 },
  { date: '14 ஜனவரி 2025', description: 'கலை ஜேமிங்கில் கலந்துகொண்டேன்', points: 20 },
  { date: '2 ஜனவரி 2025', description: 'சமையல் வகுப்பில் சேர்ந்தேன்', points: 20 },
];

const rewardsData = [
  { id: 1, brand: "FairPrice", description: "$5 FairPrice eவவுச்சர்", points: 20 },
  { id: 2, brand: "SimplyGo", description: "SimplyGo (EZ-Link Concession அல்லது NETS Flashpay கார்டு)", points: 20 },
];

const PAGE_SIZE = 2;

export default function RewardsScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('journey');
  const [page, setPage] = useState(1);
  const [userPoints, setUserPoints] = useState(60);
  const [redeemedRewards, setRedeemedRewards] = useState([]);
  const [showHelp, setShowHelp] = useState(false);

  // For pointing to the first redeem button
  const firstRedeemBtnRef = useRef(null);
  const [redeemBtnPos, setRedeemBtnPos] = useState({ x: 0, y: 0 });

  // Pagination logic for journey
  const totalPages = Math.ceil(journeyData.length / PAGE_SIZE);
  const startIdx = (page - 1) * PAGE_SIZE;
  const endIdx = startIdx + PAGE_SIZE;
  const pageData = journeyData.slice(startIdx, endIdx);

  const handleRedeem = (rewardId, points) => {
    if (redeemedRewards.includes(rewardId)) {
      alert('நீங்கள் ஏற்கனவே இந்த பரிசை பெற்றுள்ளீர்கள்!');
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
      alert('இந்த பரிசை பெற போதுமான பாயிண்ட்ஸ் இல்லை!');
    }
  };

  const handleLogout = () => {
    router.replace('/KakiTapScreen');
  };

  // For measuring the redeem button position
  const handleRedeemBtnLayout = (event) => {
    const { x, y } = event.nativeEvent.layout;
    setRedeemBtnPos({ x, y });
  };

  return (
    <View style={styles.container}>
      <Sidebar active="rewards" />

      <View style={styles.content}>
        {/* Logout Button */}
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={handleLogout}
          activeOpacity={0.8}
        >
          <Text style={styles.logoutButtonText}>வெளியேறு</Text>
        </TouchableOpacity>

        {/* Tabs */}
        <View style={styles.tabs}>
          <TouchableOpacity onPress={() => setActiveTab('journey')}>
            <Text style={[styles.tab, activeTab === 'journey' && styles.activeTab]}>
              என் பயணம்
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setActiveTab('redeem')}>
            <Text style={[styles.tab, activeTab === 'redeem' && styles.activeTab]}>
              பரிசுகளை பெறுங்கள்
            </Text>
          </TouchableOpacity>
        </View>

        {/* Points */}
        <View style={{ alignItems: 'center', position: 'relative' }}>
          <Text style={styles.pointsLabel}>என் காக்கி பாயிண்ட்ஸ்</Text>
          <Text style={styles.points}>{userPoints} ✧</Text>
        </View>

        {/* Tab Content */}
        {activeTab === 'journey' ? (
          <>
            <View style={styles.historyBox}>
              <Text style={styles.sectionTitle}>வாழ்க்கை பயண வரலாறு</Text>
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
            {/* Pagination */}
            <View style={styles.pagination}>
              <TouchableOpacity
                style={[styles.pageBtn, page === 1 && styles.disabledBtn]}
                onPress={() => setPage(page - 1)}
                disabled={page === 1}
              >
                <Text style={[styles.pageBtnText, page === 1 && styles.disabledBtnText]}>முந்தையது</Text>
              </TouchableOpacity>
              <Text style={styles.pageNum}>
                &lt; பக்கம் <Text style={styles.currentPage}>{page}</Text>/{totalPages} &gt;
              </Text>
              <TouchableOpacity
                style={[styles.pageBtn, page === totalPages && styles.disabledBtn]}
                onPress={() => setPage(page + 1)}
                disabled={page === totalPages}
              >
                <Text style={[styles.pageBtnText, page === totalPages && styles.disabledBtnText]}>அடுத்தது</Text>
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
                        {isRedeemed ? 'பெறப்பட்டது' : 'பெறு'}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              );
            })}
          </View>
        )}

        {/* Floating Help Button & Red Chatboxes */}
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
                {/* Chatbox 1: Points area (arrow now points right) */}
                <View style={[styles.redChatBoxContainer, { position: 'absolute', left: 200, top: 150, maxWidth: 340 }]}>
                  <View style={styles.redChatBox}>
                    <Text style={styles.redChatBoxText}>
                      கடந்த நிகழ்வுகளிலிருந்து நீங்கள் பெற்ற பாயிண்ட்ஸ் இங்கே காணலாம்
                    </Text>
                    <View style={styles.arrowRight} />
                  </View>
                </View>
                {/* Chatbox 2: Redeem Rewards tab */}
                <View style={[styles.redChatBoxContainer, { position: 'absolute', left: 475, top: 5, maxWidth: 260 }]}>
                  <View style={styles.redChatBox}>
                    <Text style={styles.redChatBoxText}>
                      உங்கள் பாயிண்ட்ஸை அற்புதமான பரிசுகளுக்கு இங்கே பெறலாம்!
                    </Text>
                    <View style={styles.arrowLeft} />
                  </View>
                </View>
              </>
            )}
            {activeTab === 'redeem' && (
              // Chatbox for the redeem button (points to the first redeem button)
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
                    உங்கள் பாயிண்ட்ஸுடன் பரிசுகளை பெற இங்கே அழுத்தவும்!
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

// --- Styles ---
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

  // Floating Help Button
  helpIconContainer: {
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
helpIcon: {
  color: '#fff',
  fontWeight: 'bold',
  fontSize: 28,
  marginBottom: 2,
},

  // Help Overlay
  helpOverlay: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    zIndex: 199,
  },

  // Red ChatBox Styles
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
  // Right-pointing arrow for chatbox
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
  // Left-pointing arrow for chatbox
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
