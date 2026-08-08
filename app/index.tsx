import { useEffect, useRef } from 'react';
import { View, Text, Pressable, Animated, Easing } from 'react-native';
import { router } from 'expo-router';
import { useTheme } from '../src/theme/ThemeContext';
import { Icon } from '../src/components/Icon';
import { ParticleBackground } from '../src/components/ParticleBackground';

// Runic circle characters (Elder Futhark)
const RUNE_CHARS = ['ᚠ', 'ᚢ', 'ᚦ', 'ᚨ', 'ᚱ', 'ᚲ', 'ᚷ', 'ᚹ', 'ᚺ', 'ᚾ', 'ᛁ', 'ᛃ', 'ᛇ', 'ᛈ', 'ᛉ', 'ᛊ', 'ᛏ', 'ᛒ', 'ᛖ', 'ᛗ', 'ᛚ', 'ᛜ', 'ᛞ', 'ᛟ'];

export default function IndexPage() {
  const { isTestCompleted } = useTheme();

  // Animations
  const glowAnim = useRef(new Animated.Value(0.3)).current;
  const breatheAnim = useRef(new Animated.Value(0.8)).current;
  const circleRotate = useRef(new Animated.Value(0)).current;
  const ringRotate = useRef(new Animated.Value(0)).current;
  const emblemScale = useRef(new Animated.Value(0)).current;
  const titleOpacity = useRef(new Animated.Value(0)).current;
  const titleSlide = useRef(new Animated.Value(20)).current;
  const subtitleOpacity = useRef(new Animated.Value(0)).current;
  const dividerOpacity = useRef(new Animated.Value(0)).current;
  const descOpacity = useRef(new Animated.Value(0)).current;
  const buttonOpacity = useRef(new Animated.Value(0)).current;
  const buttonSlide = useRef(new Animated.Value(20)).current;
  const footerOpacity = useRef(new Animated.Value(0)).current;
  const starOpacity1 = useRef(new Animated.Value(0)).current;
  const starOpacity2 = useRef(new Animated.Value(0)).current;
  const starOpacity3 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Continuous loops
    Animated.loop(
      Animated.sequence([
        Animated.timing(glowAnim, { toValue: 0.8, duration: 2500, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
        Animated.timing(glowAnim, { toValue: 0.3, duration: 2500, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
      ]),
    ).start();
    Animated.loop(
      Animated.sequence([
        Animated.timing(breatheAnim, { toValue: 1.05, duration: 3000, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
        Animated.timing(breatheAnim, { toValue: 0.95, duration: 3000, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
      ]),
    ).start();
    // Rotate outer circle clockwise
    Animated.loop(
      Animated.timing(circleRotate, { toValue: 1, duration: 60000, easing: Easing.linear, useNativeDriver: true }),
    ).start();
    // Rotate inner ring counter-clockwise
    Animated.loop(
      Animated.timing(ringRotate, { toValue: 1, duration: 40000, easing: Easing.linear, useNativeDriver: true }),
    ).start();
    // Twinkling stars
    Animated.loop(
      Animated.sequence([
        Animated.timing(starOpacity1, { toValue: 1, duration: 1500, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
        Animated.timing(starOpacity1, { toValue: 0.2, duration: 2000, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
      ]),
    ).start();
    Animated.loop(
      Animated.sequence([
        Animated.timing(starOpacity2, { toValue: 0.8, duration: 1800, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
        Animated.timing(starOpacity2, { toValue: 0.1, duration: 2200, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
      ]),
    ).start();
    Animated.loop(
      Animated.sequence([
        Animated.timing(starOpacity3, { toValue: 0.9, duration: 1200, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
        Animated.timing(starOpacity3, { toValue: 0.15, duration: 2500, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
      ]),
    ).start();

    // Entrance sequence
    const seq = Animated.sequence([
      // Emblem appears with spring
      Animated.spring(emblemScale, { toValue: 1, friction: 5, tension: 40, useNativeDriver: true }),
      // Title fades in and slides up
      Animated.parallel([
        Animated.timing(titleOpacity, { toValue: 1, duration: 600, useNativeDriver: true }),
        Animated.timing(titleSlide, { toValue: 0, duration: 600, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
      ]),
      // Subtitle
      Animated.timing(subtitleOpacity, { toValue: 1, duration: 500, useNativeDriver: true }),
      // Divider
      Animated.timing(dividerOpacity, { toValue: 1, duration: 400, useNativeDriver: true }),
      // Description
      Animated.timing(descOpacity, { toValue: 1, duration: 500, useNativeDriver: true }),
      // Button
      Animated.parallel([
        Animated.timing(buttonOpacity, { toValue: 1, duration: 500, useNativeDriver: true }),
        Animated.timing(buttonSlide, { toValue: 0, duration: 500, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
      ]),
      // Footer
      Animated.timing(footerOpacity, { toValue: 1, duration: 400, useNativeDriver: true }),
    ]);
    seq.start();
  }, []);

  const handleBegin = () => {
    if (isTestCompleted) {
      router.replace('/(tabs)/home');
    } else {
      router.push('/test');
    }
  };

  const circleSpin = circleRotate.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '360deg'] });
  const ringSpin = ringRotate.interpolate({ inputRange: [0, 1], outputRange: ['360deg', '0deg'] });

  return (
    <View style={{ flex: 1, backgroundColor: '#0D0618', alignItems: 'center', justifyContent: 'center', paddingHorizontal: 32 }}>
      <ParticleBackground color="#C9A84C" density={0.3} />

      {/* Ambient glow layers */}
      <Animated.View
        style={{
          position: 'absolute',
          width: 320,
          height: 320,
          borderRadius: 200,
          backgroundColor: '#3B1B54',
          opacity: glowAnim,
          transform: [{ scale: breatheAnim }],
        }}
      />
      <Animated.View
        style={{
          position: 'absolute',
          width: 200,
          height: 200,
          borderRadius: 100,
          backgroundColor: '#C9A84C',
          opacity: glowAnim.interpolate({ inputRange: [0.3, 0.8], outputRange: [0.02, 0.06] }),
        }}
      />

      {/* Twinkling stars */}
      <Animated.View style={{ position: 'absolute', top: 80, right: 50, opacity: starOpacity1 }}>
        <Icon name="star" size={8} color="#C9A84C" strokeWidth={0.5} fill />
      </Animated.View>
      <Animated.View style={{ position: 'absolute', top: 140, left: 40, opacity: starOpacity2 }}>
        <Icon name="star" size={6} color="#D8D0E8" strokeWidth={0.5} fill />
      </Animated.View>
      <Animated.View style={{ position: 'absolute', bottom: 180, right: 60, opacity: starOpacity3 }}>
        <Icon name="star" size={10} color="#C9A84C" strokeWidth={0.5} fill />
      </Animated.View>
      <Animated.View style={{ position: 'absolute', top: 200, right: 80, opacity: starOpacity2 }}>
        <Icon name="star" size={5} color="#D8D0E8" strokeWidth={0.5} fill />
      </Animated.View>
      <Animated.View style={{ position: 'absolute', bottom: 220, left: 50, opacity: starOpacity1 }}>
        <Icon name="star" size={7} color="#C9A84C" strokeWidth={0.5} fill />
      </Animated.View>

      {/* Magical Circle — rotating rune ring */}
      <Animated.View style={{ marginBottom: 28, transform: [{ scale: emblemScale }] }}>
        <View style={{ width: 160, height: 160, alignItems: 'center', justifyContent: 'center' }}>
          {/* Outer rotating ring with runes */}
          <Animated.View
            style={{
              position: 'absolute',
              width: 160,
              height: 160,
              transform: [{ rotate: circleSpin }],
            }}
          >
            {/* Outer circle border */}
            <View style={{ position: 'absolute', width: 160, height: 160, borderRadius: 80, borderWidth: 1, borderColor: 'rgba(201,168,76,0.2)' }} />
            {/* Rune characters around the circle */}
            {RUNE_CHARS.map((rune, i) => {
              const angle = (i / RUNE_CHARS.length) * 360;
              const radius = 72;
              const x = Math.cos((angle - 90) * Math.PI / 180) * radius;
              const y = Math.sin((angle - 90) * Math.PI / 180) * radius;
              return (
                <Text
                  key={i}
                  style={{
                    position: 'absolute',
                    left: 80 + x - 6,
                    top: 80 + y - 6,
                    fontSize: 10,
                    color: `rgba(201,168,76,${0.15 + (i % 3) * 0.08})`,
                    textAlign: 'center',
                  }}
                >
                  {rune}
                </Text>
              );
            })}
            {/* Tick marks */}
            {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => {
              const x = Math.cos((deg - 90) * Math.PI / 180) * 78;
              const y = Math.sin((deg - 90) * Math.PI / 180) * 78;
              return (
                <View
                  key={deg}
                  style={{
                    position: 'absolute',
                    left: 80 + x - 1,
                    top: 80 + y - 3,
                    width: 2,
                    height: 6,
                    backgroundColor: 'rgba(201,168,76,0.25)',
                    transform: [{ rotate: `${deg}deg` }],
                  }}
                />
              );
            })}
          </Animated.View>

          {/* Inner counter-rotating ring */}
          <Animated.View
            style={{
              position: 'absolute',
              width: 120,
              height: 120,
              transform: [{ rotate: ringSpin }],
            }}
          >
            <View style={{ position: 'absolute', width: 120, height: 120, borderRadius: 60, borderWidth: 1, borderColor: 'rgba(201,168,76,0.15)' }} />
            {/* Diamond markers */}
            {[0, 90, 180, 270].map((deg) => {
              const x = Math.cos((deg - 90) * Math.PI / 180) * 56;
              const y = Math.sin((deg - 90) * Math.PI / 180) * 56;
              return (
                <View
                  key={deg}
                  style={{
                    position: 'absolute',
                    left: 60 + x - 3,
                    top: 60 + y - 3,
                    width: 6,
                    height: 6,
                    borderWidth: 1,
                    borderColor: 'rgba(201,168,76,0.3)',
                    transform: [{ rotate: '45deg' }],
                    backgroundColor: 'rgba(201,168,76,0.05)',
                  }}
                />
              );
            })}
          </Animated.View>

          {/* Static inner circle with pentagram */}
          <Animated.View style={{ transform: [{ scale: breatheAnim }] }}>
            <View
              style={{
                width: 84,
                height: 84,
                borderRadius: 42,
                borderWidth: 1,
                borderColor: 'rgba(201,168,76,0.3)',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'rgba(201,168,76,0.04)',
              }}
            >
              <Icon name="pentagram" size={48} color="#C9A84C" strokeWidth={1.2} />
            </View>
          </Animated.View>

          {/* Center glow */}
          <Animated.View
            style={{
              position: 'absolute',
              width: 60,
              height: 60,
              borderRadius: 30,
              backgroundColor: '#C9A84C',
              opacity: glowAnim.interpolate({ inputRange: [0.3, 0.8], outputRange: [0.03, 0.08] }),
            }}
          />
        </View>
      </Animated.View>

      {/* Title */}
      <Animated.View style={{ opacity: titleOpacity, transform: [{ translateY: titleSlide }] }}>
        <Text
          style={{
            color: '#C9A84C',
            fontFamily: 'serif',
            fontSize: 36,
            textAlign: 'center',
            marginBottom: 4,
            letterSpacing: 6,
            textShadowColor: 'rgba(201,168,76,0.25)',
            textShadowRadius: 20,
          }}
        >
          WitchCraft
        </Text>
      </Animated.View>

      {/* Subtitle */}
      <Animated.View style={{ opacity: subtitleOpacity }}>
        <Text style={{ color: '#8B7B9B', fontSize: 13, letterSpacing: 8, marginBottom: 12, textAlign: 'center' }}>
          赛博女巫日记
        </Text>
      </Animated.View>

      {/* Ornamental divider */}
      <Animated.View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16, gap: 12, opacity: dividerOpacity }}>
        <View style={{ width: 40, height: 1, backgroundColor: 'rgba(201,168,76,0.3)' }} />
        <Icon name="sparkle" size={12} color="#C9A84C" strokeWidth={1} />
        <View style={{ width: 40, height: 1, backgroundColor: 'rgba(201,168,76,0.3)' }} />
      </Animated.View>

      {/* Description */}
      <Animated.View style={{ opacity: descOpacity }}>
        <Text style={{ color: '#8B7B9B', fontSize: 15, textAlign: 'center', lineHeight: 26, marginBottom: 48, maxWidth: 260 }}>
          {isTestCompleted
            ? '欢迎回来，女巫。秘境之门为你敞开。'
            : '探寻你的魔法本源\n找到属于你的女巫之路'}
        </Text>
      </Animated.View>

      {/* Begin button */}
      <Animated.View style={{ opacity: buttonOpacity, transform: [{ translateY: buttonSlide }] }}>
        <Pressable
          onPress={handleBegin}
          style={({ pressed }) => ({
            backgroundColor: pressed ? 'rgba(201,168,76,0.15)' : 'rgba(201,168,76,0.08)',
            borderWidth: 1,
            borderColor: 'rgba(201,168,76,0.35)',
            borderRadius: 40,
            paddingVertical: 16,
            paddingHorizontal: 48,
            flexDirection: 'row',
            alignItems: 'center',
            gap: 12,
          })}
        >
          <Text style={{ color: '#C9A84C', fontFamily: 'serif', fontSize: 18, letterSpacing: 4 }}>
            {isTestCompleted ? '进入秘境' : '开始探索'}
          </Text>
          <Icon name="arrow-right" size={16} color="#C9A84C" strokeWidth={1.5} />
        </Pressable>
      </Animated.View>

      {/* Bottom decoration */}
      <Animated.View style={{ position: 'absolute', bottom: 48, alignItems: 'center', opacity: footerOpacity }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
          <View style={{ width: 20, height: 1, backgroundColor: 'rgba(107,91,123,0.3)' }} />
          <Text style={{ color: '#6B5B7B', fontSize: 10, letterSpacing: 3 }}>
            FOR ENTERTAINMENT ONLY
          </Text>
          <View style={{ width: 20, height: 1, backgroundColor: 'rgba(107,91,123,0.3)' }} />
        </View>
      </Animated.View>
    </View>
  );
}
