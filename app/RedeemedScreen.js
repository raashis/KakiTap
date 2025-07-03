import { useLocalSearchParams, useRouter } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Sidebar from './Sidebar';

export default function RedeemedScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  // You can pass points and reward info as params if needed
  const { points = 40, brand = "FairPrice", reward = "$5 FairPrice eVoucher" } = params;

  return (
    <View style={styles.container}>
      <Sidebar active="rewards" />
      <View style={styles.content}>
        {/* Tabs */}
        <View style={styles.tabs}>
          <Text style={styles.tab}>My Journey</Text>
          <Text style={[styles.tab, styles.activeTab]}>Redeem Rewards</Text>
        </View>

        {/* Points */}
        <Text style={styles.pointsLabel}>My KakiPoints</Text>
        <Text style={styles.points}>{points} ✧</Text>

        {/* Redeemed Card */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.brand}>{brand}</Text>
            <Text style={styles.reward}>{reward}</Text>
          </View>
          <View style={styles.redeemedBox}>
            <Text style={styles.redeemedText}>REDEEMED</Text>
          </View>
          <Text style={styles.instructions}>
            HEAD TO PEK KIO CC TO GET YOUR VOUCHER!
          </Text>
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => router.push('/RewardsScreen')}
          >
            <Text style={styles.backBtnText}>Go Back To Rewards</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.helpIconContainer}>
          <Text style={styles.helpIcon}>?</Text>
        </View>
        {/* For now, but we can link to Singpass etc. */}
        {/* <Text style={styles.note}>
          For now :( but we can link to Singpass etc.
        </Text> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, flexDirection: 'row', backgroundColor: '#f8f9fa' },
  content: { flex: 1, padding: 32, position: 'relative' },
  tabs: { flexDirection: 'row', marginBottom: 24 },
  tab: {
    fontSize: 26,
    fontWeight: 'bold',
    marginRight: 40,
    color: '#aaa',
    borderBottomWidth: 4,
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
    marginBottom: 8,
    textAlign: 'center',
    fontWeight: '600',
  },
  points: {
    fontSize: 52,
    fontWeight: 'bold',
    color: '#008080',
    textAlign: 'center',
    marginBottom: 32,
  },
  card: {
    backgroundColor: 'rgba(144, 238, 144, 0.3)', // Light green faded opacity
    borderRadius: 20,
    padding: 40,
    borderWidth: 2,
    borderColor: '#222',
    marginBottom: 40,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 10,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 16,
  },
  brand: {
    fontWeight: 'bold',
    fontSize: 28,
    color: '#222',
    marginRight: 16,
  },
  reward: {
    fontSize: 24,
    color: '#333',
    fontWeight: '600',
  },
  redeemedBox: {
    backgroundColor: '#222',
    borderRadius: 8,
    paddingHorizontal: 24,
    paddingVertical: 12,
    marginVertical: 20,
  },
  redeemedText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 24,
    letterSpacing: 3,
    textAlign: 'center',
  },
  instructions: {
    fontSize: 22,
    color: '#222',
    fontWeight: 'bold',
    marginBottom: 32,
    textAlign: 'center',
    lineHeight: 28,
  },
  backBtn: {
    backgroundColor: 'rgba(243, 128, 67, 0.75)', // Deep orange faded opacity
    borderWidth: 2,
    borderColor: '#222',
    borderRadius: 10,
    paddingHorizontal: 32,
    paddingVertical: 16,
    marginTop: 8,
  },
  backBtnText: {
    color: '#222',
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
  },
  // Question Mark Button - exactly the same as RewardsScreen
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
  note: {
    color: '#800080',
    fontSize: 18,
    marginTop: 32,
    fontStyle: 'italic',
    textAlign: 'left',
  },
});