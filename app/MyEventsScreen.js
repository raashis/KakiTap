import { useFocusEffect, useRouter } from 'expo-router';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Alert, Dimensions, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import store, { removeRegisteredEvent } from './registeredEventsStore';
import Sidebar from './Sidebar';

const SCREEN_WIDTH = Dimensions.get('window').width;

const RedChatBox = ({
  style,
  pointerDirection = 'down',
  pointerOffset = 0,
  children,
}) => (
  <View style={[styles.redChatBoxContainer, style]}>
    {pointerDirection === 'left' && (
      <View style={[styles.redPointerWrapper, { left: -18, top: '50%', transform: [{ translateY: -10 }] }]}>
        <View style={styles.redChatBoxPointerBorderLeft} />
        <View style={styles.redChatBoxPointerFillLeft} />
      </View>
    )}
    {pointerDirection === 'up' && (
      <View style={[styles.redPointerWrapper, { marginLeft: pointerOffset }]}>
        <View style={styles.redChatBoxPointerBorderUp} />
        <View style={styles.redChatBoxPointerFillUp} />
      </View>
    )}
    <View style={styles.redChatBox}>
      <Text style={styles.redChatBoxText}>{children}</Text>
    </View>
    {pointerDirection === 'down' && (
      <View style={[styles.redPointerWrapper, { marginLeft: pointerOffset }]}>
        <View style={styles.redChatBoxPointerBorder} />
        <View style={styles.redChatBoxPointerFill} />
      </View>
    )}
  </View>
);

export default function MyEventsScreen() {
  const [registeredEvents, setRegisteredEvents] = useState([...store.registeredEventsGlobal]);
  const [justWithdrew, setJustWithdrew] = useState(false);
  const [lastWithdrawnTitle, setLastWithdrawnTitle] = useState('');
  const [showHelp, setShowHelp] = useState(false);
  const router = useRouter();
  const withdrawBtnRef = useRef(null);
  const [withdrawBtnX, setWithdrawBtnX] = useState(null);

  useFocusEffect(
    useCallback(() => {
      setRegisteredEvents([...store.registeredEventsGlobal]);
    }, [])
  );

  useEffect(() => {
    if (justWithdrew) {
      router.push(`/WithdrawnScreen?eventTitle=${encodeURIComponent(lastWithdrawnTitle)}`);
      setJustWithdrew(false);
    }
  }, [registeredEvents, justWithdrew]);

  const handleWithdrawBtnLayout = (event) => {
    const { x, width } = event.nativeEvent.layout;
    setWithdrawBtnX(x + width / 2);
  };

  const handleWithdraw = (id, title) => {
    if (Platform.OS === 'web') {
      if (!window.confirm('Adakah anda pasti mahu menarik diri daripada acara ini?')) return;
      removeRegisteredEvent(id);
      setRegisteredEvents([...store.registeredEventsGlobal]);
      setLastWithdrawnTitle(title);
      setJustWithdrew(true);
    } else {
      Alert.alert(
        'Tarik diri dari acara',
        'Adakah anda pasti mahu menarik diri daripada acara ini?',
        [
          { text: 'Batal', style: 'cancel' },
          {
            text: 'Tarik Diri',
            style: 'destructive',
            onPress: () => {
              removeRegisteredEvent(id);
              setRegisteredEvents([...store.registeredEventsGlobal]);
              setLastWithdrawnTitle(title);
              setJustWithdrew(true);
            }
          }
        ]
      );
    }
  };

  const handleLogout = () => {
    router.replace('/KakiTapScreen');
  };

  return (
    <View style={styles.container}>
      <Sidebar active="myevents" />
      <View style={styles.content}>
        <View style={{ position: 'absolute', top: 20, right: 12, flexDirection: 'row', alignItems: 'center' }}>
          {showHelp && (
            <View style={{ position: 'absolute', right: -230, top: 0, width: 210, alignItems: 'flex-end', zIndex: 100 }}>
              <RedChatBox pointerDirection="left">
                Tekan di sini untuk log keluar dari akaun anda.
              </RedChatBox>
            </View>
          )}
          <TouchableOpacity
            style={styles.logoutButton}
            onPress={handleLogout}
            activeOpacity={0.8}
          >
            <Text style={styles.logoutButtonText}>Log Keluar</Text>
          </TouchableOpacity>
        </View>

        <View style={{ alignItems: 'center', marginBottom: 10, position: 'relative' }}>
          <Text style={styles.header}>Acara Saya</Text>
        </View>

        {showHelp && (
          <View style={{
            width: '100%',
            alignItems: 'center',
            marginBottom: 25,
            zIndex: 100,
          }}>
            <RedChatBox pointerDirection="down" style={{ maxWidth: 700, width: '90%' }}>
              Semua acara yang anda telah daftar akan dipaparkan di sini!
            </RedChatBox>
          </View>
        )}

        <ScrollView contentContainerStyle={styles.eventsList}>
          {registeredEvents.length === 0 ? (
            <Text style={styles.noEvents}>Anda belum mendaftar untuk sebarang acara.</Text>
          ) : (
            registeredEvents.map((event, idx) => (
              <View key={event.id} style={styles.eventBox}>
                <Text style={styles.eventDate}>{event.date}</Text>
                <View style={styles.eventDetailsBox}>
                  <Text style={styles.eventTitle}>{event.title}</Text>
                  {event.details ? (
                    <Text style={styles.eventDetails}>{event.details}</Text>
                  ) : null}
                  <Text style={styles.paymentStatus}>
                    {event.paid
                      ? 'Anda SUDAH BAYAR 🙂'
                      : 'Anda BELUM BAYAR'}
                  </Text>
                  <TouchableOpacity
                    ref={idx === 0 ? withdrawBtnRef : null}
                    style={styles.withdrawBtn}
                    onPress={() => handleWithdraw(event.id, event.title)}
                    onLayout={idx === 0 ? handleWithdrawBtnLayout : undefined}
                  >
                    <Text style={styles.withdrawText}>Tarik Diri</Text>
                  </TouchableOpacity>
                  {showHelp && idx === 0 && withdrawBtnX !== null && (
                    <View
                      style={{
                        position: 'absolute',
                        left: withdrawBtnX - 110,
                        top: 90,
                        width: 220,
                        alignItems: 'center',
                        zIndex: 100,
                      }}
                    >
                      <RedChatBox pointerDirection="up" style={{ maxWidth: 220, width: 220 }}>
                        Tekan butang ini di bawah{'\n'}
                        jika anda ingin menarik diri{'\n'}
                        daripada acara yang anda{'\n'}
                        tidak mahu sertai lagi.
                      </RedChatBox>
                    </View>
                  )}
                </View>
              </View>
            ))
          )}
        </ScrollView>

        <View style={styles.pagination}>
          <Text style={styles.disabledBtn}>sebelum</Text>
          <Text style={styles.pageNum}>
            &lt; HALAMAN <Text style={styles.currentPage}>1</Text>/1 &gt;
          </Text>
          <Text style={styles.disabledBtn}>seterusnya</Text>
        </View>
      </View>

      <TouchableOpacity
        style={styles.helpButton}
        onPress={() => setShowHelp(!showHelp)}
        activeOpacity={0.8}
      >
        <Text style={styles.helpButtonText}>?</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, flexDirection: 'row', backgroundColor: '#f8f9fa' },
  content: { flex: 1, padding: 32, position: 'relative' },
  logoutButton: {
    backgroundColor: '#e74c3c',
    paddingHorizontal: 28,
    paddingVertical: 14,
    borderRadius: 18,
    zIndex: 10,
    elevation: 10,
  },
  logoutButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20,
    letterSpacing: 1,
  },
  header: {
    fontSize: 36,
    fontWeight: 'bold',
    letterSpacing: 2,
    textAlign: 'center',
    color: '#2c3e50',
  },
  eventsList: { paddingBottom: 40 },
  eventBox: { marginBottom: 95, position: 'relative' },
  eventDate: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 15,
    letterSpacing: 1,
    color: '#2c3e50',
  },
  eventDetailsBox: {
    backgroundColor: '#ffe0b2',
    borderRadius: 18,
    padding: 25,
    borderWidth: 3,
    borderColor: '#ffb300',
    marginBottom: 12,
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.13,
    shadowRadius: 8,
    elevation: 6,
  },
  eventTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#008080',
    marginBottom: 12,
  },
  eventDetails: {
    fontSize: 22,
    marginBottom: 15,
    color: '#2c3e50',
    fontWeight: '500',
    lineHeight: 30,
  },
  paymentStatus: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 15,
  },
  withdrawBtn: {
    position: 'absolute',
    right: 20,
    top: 20,
    backgroundColor: '#ff7043',
    borderWidth: 3,
    borderColor: '#d84315',
    borderRadius: 14,
    paddingHorizontal: 30,
    paddingVertical: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  withdrawText: {
    fontWeight: 'bold',
    fontSize: 22,
    color: '#fff',
    letterSpacing: 1,
  },
  noEvents: {
    fontSize: 24,
    color: '#888',
    textAlign: 'center',
    marginTop: 50,
  },
  pagination: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    gap: 12,
    position: 'relative',
  },
  disabledBtn: {
    color: '#aaa',
    fontWeight: 'bold',
    fontSize: 22,
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
  },
  pageNum: { fontSize: 22, color: '#2c3e50', marginHorizontal: 12 },
  currentPage: { color: '#008080', fontWeight: 'bold', fontSize: 24 },

  helpButton: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    backgroundColor: '#e53935',
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 100,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.18,
    shadowRadius: 8,
  },
  helpButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 32,
  },

  redChatBoxContainer: {
    alignItems: 'center',
    width: '100%',
    maxWidth: 700,
  },
  redChatBox: {
    backgroundColor: '#e53935',
    borderColor: '#b71c1c',
    borderWidth: 3,
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
    alignItems: 'center',
    minWidth: 160,
    maxWidth: 350,
  },
  redChatBoxText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  redPointerWrapper: {
    height: 22,
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: -2,
    position: 'relative',
  },
  redChatBoxPointerBorder: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    width: 0,
    height: 0,
    borderLeftWidth: 15,
    borderRightWidth: 15,
    borderTopWidth: 18,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: '#b71c1c',
    zIndex: 1,
  },
  redChatBoxPointerFill: {
    position: 'absolute',
    top: 3,
    left: 0,
    right: 0,
    width: 0,
    height: 0,
    borderLeftWidth: 12,
    borderRightWidth: 12,
    borderTopWidth: 14,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: '#e53935',
    zIndex: 2,
  },
  redChatBoxPointerBorderUp: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    width: 0,
    height: 0,
    borderLeftWidth: 15,
    borderRightWidth: 15,
    borderBottomWidth: 18,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: '#b71c1c',
    zIndex: 1,
  },
  redChatBoxPointerFillUp: {
    position: 'absolute',
    bottom: 3,
    left: 0,
    right: 0,
    width: 0,
    height: 0,
    borderLeftWidth: 12,
    borderRightWidth: 12,
    borderBottomWidth: 14,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: '#e53935',
    zIndex: 2,
  },
  redChatBoxPointerBorderLeft: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: 0,
    height: 0,
    borderTopWidth: 15,
    borderBottomWidth: 15,
    borderRightWidth: 18,
    borderTopColor: 'transparent',
    borderBottomColor: 'transparent',
    borderRightColor: '#b71c1c',
    zIndex: 1,
  },
  redChatBoxPointerFillLeft: {
    position: 'absolute',
    left: 3,
    top: 3,
    width: 0,
    height: 0,
    borderTopWidth: 12,
    borderBottomWidth: 12,
    borderRightWidth: 14,
    borderTopColor: 'transparent',
    borderBottomColor: 'transparent',
    borderRightColor: '#e53935',
    zIndex: 2,
  },
  chatBubble: {
    backgroundColor: '#fff',
    borderRadius: 18,
    paddingVertical: 4,
    paddingHorizontal: 14,
    borderWidth: 2,
    borderColor: '#008080',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.10,
    shadowRadius: 6,
    elevation: 4,
    zIndex: 999,
  },
  chatBubbleText: {
    fontSize: 15,
    color: '#008080',
    fontWeight: '500',
    textAlign: 'center',
  },
});
