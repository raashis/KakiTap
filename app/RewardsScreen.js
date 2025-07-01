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
              <Text style={styles.sectionTitle}>Journey History</Text>
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

        <Text style={styles.helpIcon}>❔</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, flexDirection: 'row', backgroundColor: '#f8f9fa' },
  content: { flex: 1, padding: 24, position: 'relative' },

  tabs: { flexDirection: 'row', marginBottom: 18, marginTop: 8 },
  tab: {
    fontSize: 21,
    fontWeight: 'bold',
    marginRight: 32,
    color: '#aaa',
    borderBottomWidth: 3,
    borderBottomColor: 'transparent',
    paddingBottom: 8,
  },
  activeTab: {
    color: '#008080',
    borderBottomColor: '#008080',
  },

  pointsLabel: {
    fontSize: 18,
    color: '#555',
    marginTop: 8,
    marginBottom: 2,
    textAlign: 'center',
  },
  points: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#008080',
    textAlign: 'center',
    marginBottom: 28,
  },

  historyBox: {
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 28,
    marginBottom: 28,
    borderWidth: 1,
    borderColor: '#ccc',
    minHeight: 260,
    shadowColor: '#000',
    shadowOpacity: 0.07,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 7,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 23,
    fontWeight: 'bold',
    color: '#008080',
    marginBottom: 20,
    textAlign: 'center',
  },
  historyItem: {
    marginBottom: 32,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  historyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 7,
  },
  historyDate: {
    fontWeight: 'bold',
    fontSize: 17,
    color: '#444',
  },
  historyDesc: {
    fontSize: 17,
    color: '#222',
    marginLeft: 2,
    marginTop: 2,
  },
  historyPoints: {
    fontWeight: 'bold',
    fontSize: 17,
    color: '#008080',
  },

  redeemBox: {
    marginTop: 10,
    marginBottom: 30,
  },
  rewardCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 4,
    elevation: 1,
  },
  rewardBrand: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 6,
    color: '#222',
  },
  rewardDesc: {
    fontSize: 16,
    marginBottom: 10,
    color: '#333',
  },
  rewardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rewardPoints: {
    fontWeight: 'bold',
    fontSize: 17,
    color: '#008080',
  },
  redeemBtn: {
    backgroundColor: '#008080',
    borderRadius: 8,
    paddingHorizontal: 18,
    paddingVertical: 8,
  },
  redeemedBtn: {
    backgroundColor: '#999',
  },
  redeemBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },

  pagination: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    gap: 8,
  },
  pageBtn: {
    backgroundColor: '#eee',
    borderRadius: 6,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginHorizontal: 4,
  },
  pageBtnText: {
    color: '#222',
    fontWeight: '600',
    fontSize: 16,
  },
  disabledBtn: {
    backgroundColor: '#f5f5f5',
  },
  disabledBtnText: {
    color: '#aaa',
  },
  pageNum: {
    fontSize: 16,
    color: '#222',
    marginHorizontal: 8,
  },
  currentPage: {
    color: '#008080',
    fontWeight: 'bold',
    fontSize: 17,
  },
  helpIcon: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    fontSize: 24,
    color: '#555',
  },
});
