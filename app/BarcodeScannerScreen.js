import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Alert, TouchableOpacity } from 'react-native';
import { CameraView, Camera } from 'expo-camera';
import { useRouter } from 'expo-router';

export default function BarcodeScannerScreen() {
  const router = useRouter();
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const cameraRef = useRef(null);
  const processingTimeoutRef = useRef(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  // Enhanced barcode handler that accepts ANY barcode
  const handleBarCodeScanned = ({ type, data }) => {
    if (scanned || isProcessing) return;
    
    setScanned(true);
    setIsProcessing(true);
    
    console.log('Barcode detected:', { type, data });
    
    // Navigate immediately to language settings
    setTimeout(() => {
      router.push('/languages');
    }, 500);
  };

  // Object detection function for black/white objects
  const detectBlackWhiteObjects = async () => {
    if (!cameraRef.current || scanned || isProcessing) return;

    try {
      // Take a picture to analyze
      const photo = await cameraRef.current.takePictureAsync({
        quality: 0.3,
        base64: true,
        skipProcessing: true,
      });

      if (photo && photo.base64) {
        // Simple color analysis - check for predominant black/white areas
        const hasBlackWhiteObject = analyzeImageForBlackWhite(photo.base64);
        
        if (hasBlackWhiteObject) {
          setScanned(true);
          setIsProcessing(true);
          
          console.log('Black/white object detected');
          
          setTimeout(() => {
            router.push('/languages');
          }, 500);
        }
      }
    } catch (error) {
      console.log('Object detection error:', error);
    }
  };

  // Simple black/white detection algorithm
  const analyzeImageForBlackWhite = (base64Image) => {
    try {
      // This is a simplified approach - in a real app, you'd use more sophisticated image processing
      // For now, we'll use a timeout-based trigger as a demonstration
      
      // Create a canvas to analyze the image (web-based approach)
      // Note: This is a simplified version - you might need expo-image-manipulator for better results
      
      // For demonstration, we'll trigger on any significant contrast
      // You can enhance this with actual image processing libraries
      
      return Math.random() > 0.7; // Simulate detection for demo purposes
    } catch (error) {
      console.log('Image analysis error:', error);
      return false;
    }
  };

  // Continuous object detection
  useEffect(() => {
    if (hasPermission && !scanned && !isProcessing) {
      const interval = setInterval(() => {
        detectBlackWhiteObjects();
      }, 1000); // Check every second

      return () => clearInterval(interval);
    }
  }, [hasPermission, scanned, isProcessing]);

  // Alternative: Touch-based trigger for manual detection
  const handleManualDetection = () => {
    if (scanned || isProcessing) return;
    
    setScanned(true);
    setIsProcessing(true);
    
    console.log('Manual detection triggered');
    
    setTimeout(() => {
      router.push('/languages');
    }, 500);
  };

  const resetScanner = () => {
    setScanned(false);
    setIsProcessing(false);
    if (processingTimeoutRef.current) {
      clearTimeout(processingTimeoutRef.current);
    }
  };

  if (hasPermission === null) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>Requesting camera permission...</Text>
      </View>
    );
  }

  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>No access to camera</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.back()}
        >
          <Text style={styles.buttonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>KAKI TAP</Text>
        <Text style={styles.subtitle}>Scan Any Code or Object</Text>
      </View>

      <View style={styles.cameraContainer}>
        <CameraView
          ref={cameraRef}
          style={styles.camera}
          facing="back"
          onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
          barcodeScannerSettings={{
            barcodeTypes: [
              'qr',
              'pdf417',
              'aztec',
              'ean13',
              'ean8',
              'upc_e',
              'code39',
              'code93',
              'code128',
              'codabar',
              'itf14',
              'datamatrix',
              'interleaved2of5'
            ],
          }}
        >
          <View style={styles.overlay}>
            <View style={styles.unfocusedContainer}></View>
            <View style={styles.middleContainer}>
              <View style={styles.unfocusedContainer}></View>
              <View style={styles.focusedContainer}>
                <TouchableOpacity 
                  style={styles.scanFrame}
                  onPress={handleManualDetection}
                  activeOpacity={0.7}
                >
                  <View style={[styles.corner, styles.topLeft]} />
                  <View style={[styles.corner, styles.topRight]} />
                  <View style={[styles.corner, styles.bottomLeft]} />
                  <View style={[styles.corner, styles.bottomRight]} />
                  
                  {isProcessing && (
                    <View style={styles.processingOverlay}>
                      <Text style={styles.processingText}>Processing...</Text>
                    </View>
                  )}
                </TouchableOpacity>
              </View>
              <View style={styles.unfocusedContainer}></View>
            </View>
            <View style={styles.unfocusedContainer}>
              <Text style={styles.scanText}>
                Position the barcode on your card within the frame
              </Text>
              <Text style={styles.scanSubtext}>
                Tap the frame to manually detect objects
              </Text>
            </View>
          </View>
        </CameraView>
      </View>

      <View style={styles.bottomContainer}>
        {scanned && (
          <TouchableOpacity
            style={styles.button}
            onPress={resetScanner}
          >
            <Text style={styles.buttonText}>Scan Again</Text>
          </TouchableOpacity>
        )}
        
        <TouchableOpacity
          style={[styles.button, styles.detectButton]}
          onPress={handleManualDetection}
        >
          <Text style={styles.buttonText}>Manual Detect</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.button, styles.backButton]}
          onPress={() => router.back()}
        >
          <Text style={styles.buttonText}>Back</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e0f4ff',
  },
  header: {
    alignItems: 'center',
    paddingVertical: 30,
    paddingTop: 60,
  },
  title: {
    fontSize: 38,
    fontWeight: 'bold',
    color: '#008080',
    marginBottom: 8,
    letterSpacing: 2,
  },
  subtitle: {
    fontSize: 22,
    color: '#2c3e50',
    fontWeight: '600',
  },
  cameraContainer: {
    flex: 1,
    margin: 20,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: '#000',
  },
  camera: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  unfocusedContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  middleContainer: {
    flexDirection: 'row',
    flex: 1.5,
  },
  focusedContainer: {
    flex: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanFrame: {
    width: 250,
    height: 250,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  corner: {
    position: 'absolute',
    width: 30,
    height: 30,
    borderColor: '#00ff00',
    borderWidth: 4,
  },
  topLeft: {
    top: 0,
    left: 0,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  topRight: {
    top: 0,
    right: 0,
    borderLeftWidth: 0,
    borderBottomWidth: 0,
  },
  bottomLeft: {
    bottom: 0,
    left: 0,
    borderRightWidth: 0,
    borderTopWidth: 0,
  },
  bottomRight: {
    bottom: 0,
    right: 0,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  processingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 255, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  processingText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  scanText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 20,
  },
  scanSubtext: {
    color: '#cccccc',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 10,
  },
  bottomContainer: {
    paddingHorizontal: 40,
    paddingBottom: 60,
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#008080',
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 25,
    marginVertical: 10,
    minWidth: 200,
    alignItems: 'center',
  },
  detectButton: {
    backgroundColor: '#f39c12',
  },
  backButton: {
    backgroundColor: '#e74c3c',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  message: {
    fontSize: 18,
    color: '#2c3e50',
    textAlign: 'center',
    marginBottom: 20,
  },
});