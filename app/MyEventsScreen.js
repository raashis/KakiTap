import { useFocusEffect, useRouter } from 'expo-router';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Alert, Dimensions, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import store, { removeRegisteredEvent } from './registeredEventsStore';
import Sidebar from './Sidebar';

const SCREEN_WIDTH = Dimensions.get('window').width;

// Red ChatBox with outlined pointer (customizable direction)
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

  // Find the X position of the withdraw button for precise alignment
  const handleWithdrawBtnLayout = (event) => {
    const { x, width } = event.nativeEvent.layout;
    setWithdrawBtnX(x + width / 2);
  };

  const handleWithdraw = (id, title) => {
    if (Platform.OS === 'web') {
      if (!window.confirm('நீங்கள் இந்த நிகழ்விலிருந்து விலக விரும்புகிறீர்களா?')) return;
      removeRegisteredEvent(id);
      setRegisteredEvents([...store.registeredEventsGlobal]);
      setLastWithdrawnTitle(title);
      setJustWithdrew(true);
    } else {
      Alert.alert(
        'நிகழ்விலிருந்து விலகு',
        'நீங்கள் இந்த நிகழ்விலிருந்து விலக விரும்புகிறீர்களா?',
        [
          { text: 'ரத்து செய்', style: 'cancel' },
          {
            text: 'விலகு',
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
        {/* Logout Button with Red ChatBox pointing right */}
        <View style={{ position: 'absolute', top: 20, right: 12, flexDirection: 'row', alignItems: 'center' }}>
          {showHelp && (
            <View style={{ position: 'absolute', right: -230, top: 0, width: 210, alignItems: 'flex-end', zIndex: 100 }}>
              <RedChatBox pointerDirection="left">
                உங்கள் கணக்கிலிருந்து வெளியேற இங்கே அழுத்தவும்.
              </RedChatBox>
            </View>
          )}
          <TouchableOpacity
            style={styles.logoutButton}
            onPress={handleLogout}
            activeOpacity={0.8}
          >
            <Text style={styles.logoutButtonText}>வெளியேறு</Text>
          </TouchableOpacity>
        </View>

        {/* Header */}
        <View style={{ alignItems: 'center', marginBottom: 10, position: 'relative' }}>
          <Text style={styles.header}>என் நிகழ்வுகள்</Text>
        </View>

        {/* Help ChatBox for all events, above the events card, stretched horizontally */}
        {showHelp && (
          <View style={{
            width: '100%',
            alignItems: 'center',
            marginBottom: 25,
            zIndex: 100,
          }}>
            <RedChatBox pointerDirection="down" style={{ maxWidth: 700, width: '90%' }}>
              நீங்கள் பதிவு செய்த அனைத்து நிகழ்வுகளும் இங்கே காணலாம்!
            </RedChatBox>
          </View>
        )}

        <ScrollView contentContainerStyle={styles.eventsList}>
          {registeredEvents.length === 0 ? (
            <Text style={styles.noEvents}>நீங்கள் எந்த நிகழ்விலும் பதிவு செய்யவில்லை.</Text>
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
                      ? 'நீங்கள் இதற்காக பணம் செலுத்தியுள்ளீர்கள் 🙂'
                      : 'நீங்கள் இதற்காக பணம் செலுத்தவில்லை'}
                  </Text>
                  <TouchableOpacity
                    ref={idx === 0 ? withdrawBtnRef : null}
                    style={styles.withdrawBtn}
                    onPress={() => handleWithdraw(event.id, event.title)}
                    onLayout={idx === 0 ? handleWithdrawBtnLayout : undefined}
                  >
                    <Text style={styles.withdrawText}>விலகு</Text>
                  </TouchableOpacity>
                  {/* Withdraw Button Red ChatBox (first only, just below and pointing up, fits within the card and under the button) */}
                  {showHelp && idx === 0 && withdrawBtnX !== null && (
                    <View
                      style={{
                        position: 'absolute',
                        left: withdrawBtnX - 110, // Centered under the withdraw button, 110 is half the chatbox width (220)
                        top: 90,
                        width: 220,
                        alignItems: 'center',
                        zIndex: 100,
                      }}
                    >
                      <RedChatBox pointerDirection="up" style={{ maxWidth: 220, width: 220 }}>
                        கீழே உள்ள இந்த பொத்தானை அழுத்தவும்{'\n'}
                        நீங்கள் விரும்பாத நிகழ்விலிருந்து{'\n'}
                        விலக விரும்பினால்.
                      </RedChatBox>
                    </View>
                  )}
                </View>
              </View>
            ))
          )}
        </ScrollView>

        {/* Pagination (NO bubble) */}
        <View style={styles.pagination}>
          <Text style={styles.disabledBtn}>முந்தையது</Text>
          <Text style={styles.pageNum}>
            &lt; பக்கம் <Text style={styles.currentPage}>1</Text>/1 &gt;
          </Text>
          <Text style={styles.disabledBtn}>அடுத்தது</Text>
        </View>
      </View>

      {/* Floating Help Button */}
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
  content: { flex: 1, padding: 40, position: 'relative' },
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

  // Help Button Styles
  helpButton: {
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
helpButtonText: {
  color: '#fff',
  fontWeight: 'bold',
  fontSize: 28,
  marginBottom: 2,
},

  // Red ChatBox Styles for help bubbles
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
  // Downward pointer
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
  // Upward pointer for withdraw
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
  // Leftward pointer for logout
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

  // Chat Bubble Styles (for other bubbles)
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
