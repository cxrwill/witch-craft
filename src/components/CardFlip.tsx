import React, { useRef, useEffect } from 'react';
import { Animated, Pressable, StyleSheet } from 'react-native';

interface CardFlipProps {
  isFlipped: boolean;
  onFlip: () => void;
  front: React.ReactNode;
  back: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
}

const SIZE_MAP = {
  sm: { w: 80, h: 120 },
  md: { w: 120, h: 180 },
  lg: { w: 200, h: 300 },
};

export function CardFlip({ isFlipped, onFlip, front, back, size = 'md' }: CardFlipProps) {
  const flipAnim = useRef(new Animated.Value(0)).current;
  const { w, h } = SIZE_MAP[size];

  useEffect(() => {
    Animated.spring(flipAnim, {
      toValue: isFlipped ? 1 : 0,
      friction: 6,
      tension: 40,
      useNativeDriver: true,
    }).start();
  }, [isFlipped]);

  const frontInterpolate = flipAnim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: ['0deg', '90deg', '180deg'],
  });

  const backInterpolate = flipAnim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: ['180deg', '90deg', '0deg'],
  });

  const frontOpacity = flipAnim.interpolate({
    inputRange: [0, 0.45, 0.5],
    outputRange: [1, 1, 0],
  });

  const backOpacity = flipAnim.interpolate({
    inputRange: [0.5, 0.55, 1],
    outputRange: [0, 1, 1],
  });

  return (
    <Pressable onPress={onFlip} style={[styles.container, { width: w, height: h }]}>
      <Animated.View
        style={[
          styles.face,
          { width: w, height: h },
          {
            transform: [{ perspective: 800 }, { rotateY: frontInterpolate }],
            opacity: frontOpacity,
          },
        ]}
      >
        {back}
      </Animated.View>
      <Animated.View
        style={[
          styles.face,
          { width: w, height: h },
          {
            transform: [{ perspective: 800 }, { rotateY: backInterpolate }],
            opacity: backOpacity,
          },
        ]}
      >
        {front}
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  face: {
    position: 'absolute',
    backfaceVisibility: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
  },
});
