// app/RewardsScreen.js
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Sidebar from './Sidebar';

const journeyData = [
  {
    date: '10 March 2025',
    description: 'Attended Mahjong Session',
    points: 10,
  },
  {
    date: '26 Feb 2025',
    description: 'Attended Walkathon @ Bishan',
    points: 10,
  },
  {
    date: '14 Jan 2025',
    description: 'Attended Art Jamming',
    points: 20,
  },
  {
    date: '2 Jan 2025',
    description: 'Joined Cooking Class',
    points: 20,
  },
];

const rewardsData = [
  {
    id: 1,
    brand: "FairPrice",
    description: "$5 FairPrice eVoucher",
    points: 20,
  },
  {
    id: 2,
    brand: "SimplyGo",
    description: "SimplyGo (EZ-Link Concession or NETS Flashpay Card)",
    points: 20,
  },
];

const PAGE_SIZE = 2;

export default function RewardsScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('journey');
  const [page, setPage] = useState(1);
  const [userPoints, setUserPoints] = useState(60); // starting points
  const [redeemedRewards, setRedeemedRewards] = useState([]);

  // Pagination logic for journey
  const totalPages = Math.ceil(journeyData.length / PAGE_SIZE);
  const startIdx = (page - 1) * PAGE_SIZE;
  const endIdx = startIdx + PAGE_SIZE;
  const pageData = journeyData.slice(startIdx, endIdx);

  const handleRedeem = (rewardId, points) => {
    if (redeemedRewards.includes(rewardId)) {
      alert('You have already redeemed this reward!');
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
      alert('Not enough points to redeem this reward!');
    }
  };

  return (
    <View style={styles.container}>
      <Sidebar active="rewards" />

      <View style={styles.content}>
        {/* Tabs */}
        <View style={styles.tabs}>
          <TouchableOpacity onPress={() => setActiveTab('journey')}>
            <Text style={[styles.tab, activeTab === 'journey' && styles.activeTab]}>My Journey</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setActiveTab('redeem')}>
            <Text style={[styles.tab, activeTab === 'redeem' && styles.activeTab]}>Redeem Rewards</Text>
          </TouchableOpacity>
        </View>

        {/* Points */}
        <Text style={styles.pointsLabel}>My KakiPoints</Text>
        <Text style={styles.points}>{userPoints} ✧</Text>

        {/* Tab Content */}
        {activeTab === 'journey' ? (
          <>
            <View style={styles.historyBox}>
              <Text style={styles.sectionTitle}>Life Journey History</Text>
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
                <Text style={[styles.pageBtnText, page === 1 && styles.disabledBtnText]}>back</Text>
              </TouchableOpacity>
              <Text style={styles.pageNum}>
                &lt; PAGE <Text style={styles.currentPage}>{page}</Text>/{totalPages} &gt;
              </Text>
              <TouchableOpacity
                style={[styles.pageBtn, page === totalPages && styles.disabledBtn]}
                onPress={() => setPage(page + 1)}
                disabled={page === totalPages}
              >
                <Text style={[styles.pageBtnText, page === totalPages && styles.disabledBtnText]}>next</Text>
              </TouchableOpacity>
            </View>
          </>
        ) : (
          <View style={styles.redeemBox}>
            {rewardsData.map(reward => {
              const isRedeemed = redeemedRewards.includes(reward.id);
              return (
                <View key={reward.id} style={styles.rewardCard}>
                  <Text style={styles.rewardBrand}>{reward.brand}</Text>
                  <Text style={styles.rewardDesc}>{reward.description}</Text>
                  <View style={styles.rewardFooter}>
                    <Text style={styles.rewardPoints}>{reward.points}✧</Text>
                    <TouchableOpacity
                      style={[styles.redeemBtn, isRedeemed && styles.redeemedBtn]}
                      onPress={() => handleRedeem(reward.id, reward.points)}
                      disabled={isRedeemed}
                    >
                      <Text style={styles.redeemBtnText}>
                        {isRedeemed ? 'REDEEMED' : 'REDEEM'}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              );
            })}
          </View>
        )}

        {/* Question Mark Button */}
        <View style={styles.helpIconContainer}>
          <Text style={styles.helpIcon}>?</Text>
        </View>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: { flex: 1, flexDirection: 'row', backgroundColor: '#f8f9fa' },
  content: { flex: 1, padding: 32, position: 'relative' },

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
    backgroundColor: '#fed7aa', // light orange with faded opacity
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
    backgroundColor: '#fed7aa', // light orange with faded opacity
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
  
  // Question Mark Button - exactly the same as HelpScreen
  helpIconContainer: {
    position: 'absolute',
    bottom: 32,
    right: 32,
    width: 64,
    height: 64,
    backgroundColor: '#6b7280',
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 6,
  },
  helpIcon: {
    fontSize: 32,
    color: '#fff',
    fontWeight: 'bold',
  },
});