import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Sidebar from './Sidebar';

const events = [
  {
    id: '1',
    title: 'அறிவியல் மையம்',
    date: '15 மார்ச் 2025',
    time: 'காலை 10 - 1',
    price: '₹8',
    description: 'சிங்கப்பூரின் தலை சிறந்த அறிவியல் அருங்காட்சியகத்தில் இடைமுக அறிவியல் கண்காட்சிகள் மற்றும் நேரடி நிகழ்ச்சிகளை அனுபவிக்கவும். குடும்பங்களுக்கும் அறிவியல் ஆர்வலர்களுக்கும் சிறந்தது!',
    image: require('../assets/posters/poster2.jpg'),
  },
  {
    id: '2',
    title: 'டூரியன் திருவிழா',
    date: '26 ஜூலை 2025',
    time: 'மாலை 5 - 7',
    price: '₹15',
    description: 'மிக சிறந்த மாஓ ஷான் வாங் மற்றும் D24 வகைகளை கொண்ட பிரத்யேக டூரியன் சுவை நிகழ்வில் பங்கேற்கவும். நிபுணர்களிடம் இருந்து டூரியன் வளர்ப்பு குறித்தும் அறியவும்.',
    image: require('../assets/posters/poster5.jpg'),
  },
  {
    id: '3',
    title: 'வசந்த திருவிழா',
    date: '8 பிப்ரவரி 2025',
    time: 'மாலை 11:30 - 3',
    price: 'இலவசம்',
    description: 'நம்முடைய வருடாந்திர திருவிழாவில் விளையாட்டுகள், உணவு கடைகள் மற்றும் நேரடி நிகழ்ச்சிகளுடன் வசந்தத்தின் வருகையை கொண்டாடுங்கள். அனைத்து வயதினருக்கும் மகிழ்ச்சி!',
    image: require('../assets/posters/poster3.jpg'),
  },
  {
    id: '4',
    title: 'திரைப்பட இரவு',
    date: '14 ஜூன் 2025',
    time: 'மாலை 4 மணி முதல்',
    price: '₹5',
    description: 'வானில் நட்சத்திரங்களின் கீழ் கிளாசிக் திரைப்படங்களை வெளிப்புற திரையில் அனுபவிக்கவும். உங்கள் சொந்த போர்வையை கொண்டு வாருங்கள் அல்லது இடத்தில் நாற்காலிகள் வாடகைக்கு கிடைக்கும்.',
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
        <Text style={styles.errorText}>நிகழ்வு கிடைக்கவில்லை!</Text>
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
            <Text style={styles.sectionTitle}>நிகழ்வு விவரங்கள்</Text>

            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>தேதி:</Text>
              <Text style={styles.detailValue}>{event.date}</Text>
            </View>

            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>நேரம்:</Text>
              <Text style={styles.detailValue}>{event.time}</Text>
            </View>

            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>விலை:</Text>
              <Text style={styles.detailValue}>{event.price}</Text>
            </View>

            <Text style={styles.sectionTitle}>விளக்கம்</Text>
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
          <Text style={styles.joinButtonText}>பங்கேற்க உறுதிப்படுத்தவும்</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Floating Question Mark Button */}
      <View style={styles.fabContainer} pointerEvents="box-none">
        <TouchableOpacity
          style={styles.fab}
          onPress={() => setShowHelp(!showHelp)}
          activeOpacity={0.8}
        >
          <Text style={styles.fabText}>?</Text>
        </TouchableOpacity>
        {showHelp && (
          <Pressable style={styles.overlay} onPress={() => setShowHelp(false)}>
            <View style={styles.helpBoxContainer} pointerEvents="box-none">
              <View style={styles.helpBox}>
                <Text style={styles.helpText}>நிகழ்வில் பங்கேற்க இங்கே அழுத்தவும்!</Text>
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
  // Floating Action Button styles
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
  fabText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 28,
    marginBottom: 2,
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
    left: 38, // move arrow further left for alignment
    width: 0,
    height: 0,
    borderLeftWidth: 18,
    borderRightWidth: 18,
    borderTopWidth: 22,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: '#e74c3c', // white border for arrow
    zIndex: 21,
  },
});
