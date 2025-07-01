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
          <Text style={[styles.tab, styles.activeTab]}>My Journey</Text>
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
        <Text style={styles.helpIcon}>❔</Text>
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
  content: { flex: 1, padding: 24, position: 'relative' },
  tabs: { flexDirection: 'row', marginBottom: 16 },
  tab: {
    fontSize: 20,
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
    marginBottom: 24,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 28,
    borderWidth: 2,
    borderColor: '#222',
    marginBottom: 32,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.07,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 7,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    gap: 10,
  },
  brand: {
    fontWeight: 'bold',
    fontSize: 22,
    color: '#222',
    marginRight: 12,
  },
  reward: {
    fontSize: 18,
    color: '#333',
  },
  redeemedBox: {
    backgroundColor: '#222',
    borderRadius: 6,
    paddingHorizontal: 18,
    paddingVertical: 8,
    marginVertical: 16,
  },
  redeemedText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
    letterSpacing: 2,
    textAlign: 'center',
  },
  instructions: {
    fontSize: 17,
    color: '#222',
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  backBtn: {
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#222',
    borderRadius: 8,
    paddingHorizontal: 24,
    paddingVertical: 12,
    marginTop: 6,
  },
  backBtnText: {
    color: '#222',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
  helpIcon: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    fontSize: 24,
    color: '#555',
  },
  note: {
    color: '#800080',
    fontSize: 15,
    marginTop: 24,
    fontStyle: 'italic',
    textAlign: 'left',
  },
});
