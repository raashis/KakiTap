import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Sidebar from './Sidebar';

const events = [
  {
    id: '1',
    title: 'Pusat Sains',
    date: '15 Mac 2025',
    time: '10AM - 1PM',
    price: 'RM8',
    description: 'Terokai pameran sains interaktif dan demonstrasi langsung di muzium sains utama Singapura. Sesuai untuk keluarga dan peminat sains!',
    image: require('../assets/posters/poster2.jpg'),
  },
  {
    id: '2',
    title: 'Fiesta Durian',
    date: '26 Julai 2025',
    time: '5PM - 7PM',
    price: 'RM15',
    description: 'Sertai acara merasa durian eksklusif dengan varieti premium Mao Shan Wang dan D24. Ketahui tentang penanaman durian daripada pakar.',
    image: require('../assets/posters/poster5.jpg'),
  },
  {
    id: '3',
    title: 'Karnival Musim Bunga',
    date: '8 Feb 2025',
    time: '11:30AM - 3PM',
    price: 'PERCUMA',
    description: 'Raikan kedatangan musim bunga dengan permainan, gerai makanan, dan persembahan langsung di karnival tahunan kami. Seronok untuk semua peringkat umur!',
    image: require('../assets/posters/poster3.jpg'),
  },
  {
    id: '4',
    title: 'Malam Wayang',
    date: '14 Jun 2025',
    time: '4PM dan seterusnya',
    price: 'RM5',
    description: 'Nikmati filem klasik di bawah bintang di pawagam luar. Bawa selimut sendiri atau sewa kerusi di lokasi.',
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
        <Text style={styles.errorText}>Acara tidak dijumpai!</Text>
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
            <Text style={styles.sectionTitle}>Butiran Acara</Text>

            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Tarikh:</Text>
              <Text style={styles.detailValue}>{event.date}</Text>
            </View>

            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Masa:</Text>
              <Text style={styles.detailValue}>{event.time}</Text>
            </View>

            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Harga:</Text>
              <Text style={styles.detailValue}>{event.price}</Text>
            </View>

            <Text style={styles.sectionTitle}>Penerangan</Text>
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
          <Text style={styles.joinButtonText}>Daftar Sekarang</Text>
        </TouchableOpacity>
      </ScrollView>

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
                <Text style={styles.helpText}>Tekan di sini untuk menyertai acara!</Text>
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
