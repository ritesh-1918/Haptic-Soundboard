import { Audio } from 'expo-av';
import * as Haptics from 'expo-haptics';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Dimensions, Platform, StyleSheet, Text, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withSpring,
  withTiming
} from 'react-native-reanimated';

// --- Constants & Types ---

const { width } = Dimensions.get('window');
const PAD_SIZE = (width - 60) / 2; // 2 columns, padding

type SoundPad = {
  id: string;
  label: string;
  color: string;
  soundFile: any;
};

const SOUND_KIT: SoundPad[] = [
  { id: '1', label: 'KICK', color: '#F72585', soundFile: require('../../assets/sounds/kick.wav') },
  { id: '2', label: 'SNARE', color: '#4CC9F0', soundFile: require('../../assets/sounds/snare.wav') },
  { id: '3', label: 'HI-HAT', color: '#F72585', soundFile: require('../../assets/sounds/hihat.wav') },
  { id: '4', label: 'CLAP', color: '#4361EE', soundFile: require('../../assets/sounds/clap.wav') },
  { id: '5', label: 'BASS', color: '#7209B7', soundFile: require('../../assets/sounds/bass.wav') },
  { id: '6', label: 'VOX', color: '#3A0CA3', soundFile: require('../../assets/sounds/vox.wav') },
];

// --- Components ---

const Pad = ({ pad }: { pad: SoundPad }) => {
  const scale = useSharedValue(1);
  const borderColor = useSharedValue('transparent');
  // Removed unused glowOpacity

  const playSound = useCallback(async () => {
    try {
      // Polyphony: Create a new sound object for every tap
      const { sound } = await Audio.Sound.createAsync(
        pad.soundFile,
        { shouldPlay: true }
      );
      // Auto-cleanup sound object after playback
      sound.setOnPlaybackStatusUpdate(async (status) => {
        if (status.isLoaded && status.didJustFinish) {
          await sound.unloadAsync();
        }
      });
    } catch (error) {
      console.log('Error playing sound:', error);
    }
  }, [pad.soundFile]);

  const handlePress = useCallback(() => {
    // 1. Haptics
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);

    // 2. Audio
    playSound();

    // 3. Animations
    scale.value = withSequence(
      withTiming(0.95, { duration: 50 }),
      withSpring(1, { damping: 10, stiffness: 100 })
    );

    // Flash border bright
    borderColor.value = withSequence(
      withTiming('#FFFFFF', { duration: 50 }),
      withTiming('transparent', { duration: 300 })
    );

  }, [playSound, scale, borderColor]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    borderColor: borderColor.value,
  }));

  return (
    <Animated.View
      style={[
        styles.padContainer,
        animatedStyle,
        { shadowColor: pad.color } // Static shadow base
      ]}
      onTouchStart={handlePress} // Simple touch handler for responsiveness
    >
      <LinearGradient
        colors={[pad.color + '40', pad.color + '10']} // Transparent version of color
        style={styles.padGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Text style={[styles.padText, { textShadowColor: pad.color }]}>{pad.label}</Text>
        <View style={[styles.indicator, { backgroundColor: pad.color }]} />
      </LinearGradient>
    </Animated.View>
  );
};

export default function HapticSoundboard() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Enable audio execution in silent mode
    Audio.setAudioModeAsync({
      playsInSilentModeIOS: true,
      shouldDuckAndroid: true,
      playThroughEarpieceAndroid: false,
    });

    // Simulate Asset Loading (or actually preload if local)
    // For remote URLs, we technically wait for them on demand in this simple architecture,
    // but we show a loading screen to simulate the "System Boot" effect.
    setTimeout(() => {
      setIsReady(true);
    }, 1500);
  }, []);

  if (!isReady) {
    return (
      <View style={styles.loadingContainer}>
        <LinearGradient
          colors={['#1a1a2e', '#000000']}
          style={StyleSheet.absoluteFill}
        />
        <ActivityIndicator size="large" color="#F72585" />
        <Text style={styles.loadingText}>INITIALIZING HAPTIC ENGINE...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Background */}
      <LinearGradient
        colors={['#1a1a2e', '#16213e']}
        style={StyleSheet.absoluteFill}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.logoTitle}>HAPTIC // DRUMS</Text>
        <Text style={styles.logoSubtitle}>v1.0 PREMIUM</Text>
      </View>

      {/* Grid */}
      <View style={styles.grid}>
        {SOUND_KIT.map((pad) => (
          <Pad key={pad.id} pad={pad} />
        ))}
      </View>
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    alignItems: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1a1a2e',
  },
  loadingText: {
    marginTop: 20,
    color: '#4CC9F0',
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
    letterSpacing: 2,
    fontSize: 12,
  },
  header: {
    marginBottom: 40,
    alignItems: 'center',
  },
  logoTitle: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: '900',
    letterSpacing: 4,
    textShadowColor: 'rgba(76, 201, 240, 0.8)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 20,
  },
  logoSubtitle: {
    color: '#F72585',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 2,
    marginTop: 5,
    opacity: 0.8,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 20,
    width: '100%',
    paddingHorizontal: 20,
  },
  padContainer: {
    width: PAD_SIZE,
    height: PAD_SIZE * 1.2,
    borderRadius: 24,
    borderWidth: 2,
    overflow: 'hidden',
    backgroundColor: 'rgba(255,255,255,0.03)', // Glass effect base

    // Default Shadow
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  padGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  padText: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '800',
    letterSpacing: 2,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  indicator: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginTop: 12,
    opacity: 0.8,
    shadowColor: '#FFF',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 5,
  },
});
