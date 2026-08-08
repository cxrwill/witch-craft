import React, { useEffect, useRef, useMemo } from 'react';
import { View, Animated, Dimensions, Easing } from 'react-native';

const { width: SW, height: SH } = Dimensions.get('window');

interface StarConfig {
  id: number;
  x: number;
  y: number;
  size: number;
  baseOpacity: number;
  twinkleAmp: number;
  speed: number;
  driftY: number;
  glow: boolean;
  color: string;
}

interface ParticleBackgroundProps {
  color?: string;
  density?: number;
}

function generateStars(
  count: number,
  layer: 'tiny' | 'medium' | 'large' | 'drift',
  accentColor: string,
): StarConfig[] {
  const ranges = {
    tiny:   { size: [0.5, 1.5], opacity: [0.08, 0.25], amp: [0.15, 0.35], speed: [4000, 9000], drift: 0 },
    medium: { size: [1.5, 2.8], opacity: [0.15, 0.4],  amp: [0.25, 0.5],  speed: [3000, 7000], drift: 0 },
    large:  { size: [2.5, 5],   opacity: [0.3, 0.65],  amp: [0.3, 0.6],   speed: [2500, 5500], drift: 0 },
    drift:  { size: [1, 2.5],   opacity: [0.08, 0.25], amp: [0.2, 0.4],   speed: [5000, 12000], drift: 1 },
  }[layer];

  return Array.from({ length: count }, (_, i) => {
    const useAccent = layer === 'large' ? Math.random() > 0.4 : Math.random() > 0.7;
    return {
      id: `${layer}-${i}`,
      x: Math.random() * SW,
      y: Math.random() * SH,
      size: ranges.size[0] + Math.random() * (ranges.size[1] - ranges.size[0]),
      baseOpacity: ranges.opacity[0] + Math.random() * (ranges.opacity[1] - ranges.opacity[0]),
      twinkleAmp: ranges.amp[0] + Math.random() * (ranges.amp[1] - ranges.amp[0]),
      speed: ranges.speed[0] + Math.random() * (ranges.speed[1] - ranges.speed[0]),
      driftY: ranges.drift ? 15 + Math.random() * 35 : 0,
      glow: layer === 'large' && Math.random() > 0.45,
      color: useAccent ? accentColor : '#E8E0F0',
    };
  });
}

export function ParticleBackground({ color = '#C9A84C', density = 0.3 }: ParticleBackgroundProps) {
  const starsRef = useRef<StarConfig[]>([]);
  const animValuesRef = useRef<Animated.Value[]>([]);

  // Generate stars once
  if (starsRef.current.length === 0) {
    const d = density;
    const tiny = generateStars(Math.floor(30 + d * 25), 'tiny', color);
    const medium = generateStars(Math.floor(15 + d * 15), 'medium', color);
    const large = generateStars(Math.floor(5 + d * 8), 'large', color);
    const drift = generateStars(Math.floor(10 + d * 12), 'drift', color);
    starsRef.current = [...tiny, ...medium, ...large, ...drift];
    animValuesRef.current = starsRef.current.map(() => new Animated.Value(0));
  }

  const stars = starsRef.current;
  const animValues = animValuesRef.current;

  useEffect(() => {
    const animations = stars.map((star, i) => {
      const val = animValues[i];
      return Animated.loop(
        Animated.sequence([
          Animated.timing(val, {
            toValue: 1,
            duration: star.speed,
            easing: Easing.inOut(Easing.sin),
            useNativeDriver: true,
          }),
          Animated.timing(val, {
            toValue: 0,
            duration: star.speed,
            easing: Easing.inOut(Easing.sin),
            useNativeDriver: true,
          }),
        ]),
      );
    });

    Animated.parallel(animations).start();

    return () => {
      animations.forEach((a) => a.stop());
    };
  }, []);

  // Star sizes for large glow stars
  const renderStar = (star: StarConfig, index: number) => {
    const val = animValues[index];
    const minOpacity = Math.max(0.02, star.baseOpacity - star.twinkleAmp);
    const maxOpacity = Math.min(0.9, star.baseOpacity + star.twinkleAmp);

    const animatedStyle: any = {
      position: 'absolute',
      left: star.x,
      top: star.y,
      width: star.size,
      height: star.size,
      borderRadius: star.size / 2,
      backgroundColor: star.color,
      opacity: val.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: [minOpacity, maxOpacity, minOpacity],
      }),
    };

    if (star.glow) {
      animatedStyle.shadowColor = star.color;
      animatedStyle.shadowOffset = { width: 0, height: 0 };
      animatedStyle.shadowOpacity = 0.6;
      animatedStyle.shadowRadius = star.size * 3;
      animatedStyle.elevation = 2;
    }

    if (star.driftY > 0) {
      animatedStyle.transform = [
        {
          translateY: val.interpolate({
            inputRange: [0, 1],
            outputRange: [0, -star.driftY],
          }),
        },
      ];
    }

    return <Animated.View key={star.id} style={animatedStyle} />;
  };

  return (
    <View
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
      }}
    >
      {/* Nebula gradient background */}
      <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'transparent',
        }}
      >
        {/* Top nebula glow */}
        <View
          style={{
            position: 'absolute',
            top: -SH * 0.15,
            left: -SW * 0.2,
            width: SW * 1.4,
            height: SH * 0.6,
            borderRadius: SW,
            backgroundColor: `${color}`,
            opacity: 0.025,
          }}
        />
        {/* Bottom-left nebula */}
        <View
          style={{
            position: 'absolute',
            bottom: -SH * 0.1,
            left: -SW * 0.3,
            width: SW * 0.9,
            height: SH * 0.5,
            borderRadius: SW * 0.5,
            backgroundColor: '#3B1B54',
            opacity: 0.04,
          }}
        />
        {/* Right nebula */}
        <View
          style={{
            position: 'absolute',
            top: SH * 0.2,
            right: -SW * 0.25,
            width: SW * 0.7,
            height: SH * 0.5,
            borderRadius: SW * 0.4,
            backgroundColor: color,
            opacity: 0.018,
          }}
        />
      </View>

      {/* Stars */}
      {stars.map(renderStar)}
    </View>
  );
}
