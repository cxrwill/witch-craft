import { View, Text, Pressable, ScrollView, Animated, Easing } from 'react-native';
import { router } from 'expo-router';
import { useRef, useEffect } from 'react';
import { Icon } from '../../src/components/Icon';
import { ParticleBackground } from '../../src/components/ParticleBackground';

export default function TestIntroScreen() {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;
  const glowAnim = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 800, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 800, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
    ]).start();
    Animated.loop(
      Animated.sequence([
        Animated.timing(glowAnim, { toValue: 0.7, duration: 2500, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
        Animated.timing(glowAnim, { toValue: 0.3, duration: 2500, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
      ]),
    ).start();
  }, []);

  const rules = [
    { text: '每题只选第一直觉', desc: '不要犹豫，相信你的感受' },
    { text: '没有对错之分', desc: '每个选择都指向不同的女巫之路' },
    { text: '12题后揭晓你的女巫类型', desc: '伴随三百字深度解读' },
    { text: '享受进入魔法世界的过程', desc: '这是一场与自己的对话' },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: '#0D0618' }}>
      <ParticleBackground color="#C9A84C" density={0.3} />
      <ScrollView contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 28, paddingBottom: 48 }} showsVerticalScrollIndicator={false}>
        <Animated.View
          style={{
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
            alignItems: 'center',
            paddingTop: 80,
          }}
        >
          {/* Emblem */}
          <Animated.View style={{ marginBottom: 28 }}>
            <View
              style={{
                width: 100,
                height: 100,
                borderRadius: 50,
                borderWidth: 1,
                borderColor: 'rgba(201,168,76,0.25)',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Animated.View style={{ opacity: glowAnim, position: 'absolute' }}>
                <View style={{ width: 80, height: 80, borderRadius: 40, backgroundColor: 'rgba(201,168,76,0.08)' }} />
              </Animated.View>
              <Icon name="orb" size={52} color="#C9A84C" strokeWidth={1} />
            </View>
          </Animated.View>

          {/* Title */}
          <Text style={{ color: '#C9A84C', fontFamily: 'serif', fontSize: 32, textAlign: 'center', letterSpacing: 4, marginBottom: 8 }}>
            寻找你的魔法本源
          </Text>

          {/* Ornamental divider */}
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20, gap: 8 }}>
            <View style={{ width: 30, height: 1, backgroundColor: 'rgba(201,168,76,0.3)' }} />
            <Icon name="sparkle" size={10} color="#C9A84C" strokeWidth={1} />
            <View style={{ width: 30, height: 1, backgroundColor: 'rgba(201,168,76,0.3)' }} />
          </View>

          <Text style={{ color: '#8B7B9B', fontSize: 14, textAlign: 'center', lineHeight: 24, marginBottom: 36, maxWidth: 280 }}>
            12道沉浸式问题，引你走向属于自己的女巫之路。跟随直觉，选择最吸引你的答案——每个人的魔法道路都独一无二。
          </Text>

          {/* Rules card */}
          <View
            style={{
              width: '100%',
              borderRadius: 16,
              padding: 24,
              marginBottom: 36,
              backgroundColor: 'rgba(30,17,56,0.4)',
              borderWidth: 1,
              borderColor: 'rgba(201,168,76,0.12)',
            }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 20, gap: 8 }}>
              <View style={{ width: 16, height: 1, backgroundColor: 'rgba(201,168,76,0.3)' }} />
              <Text style={{ color: '#C9A84C', fontFamily: 'serif', fontSize: 14, letterSpacing: 3 }}>
                测 试 指 引
              </Text>
              <View style={{ width: 16, height: 1, backgroundColor: 'rgba(201,168,76,0.3)' }} />
            </View>

            {rules.map((rule, i) => (
              <View key={i} style={{ flexDirection: 'row', marginBottom: i < rules.length - 1 ? 16 : 0, gap: 12 }}>
                <View style={{ marginTop: 4 }}>
                  <Icon name="sparkle" size={10} color="#C9A84C" strokeWidth={1} fill />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={{ color: '#D8D0E8', fontSize: 14, lineHeight: 20, marginBottom: 2 }}>
                    {rule.text}
                  </Text>
                  <Text style={{ color: '#6B5B7B', fontSize: 12, lineHeight: 18 }}>
                    {rule.desc}
                  </Text>
                </View>
              </View>
            ))}
          </View>

          {/* Start button */}
          <Pressable
            onPress={() => router.push('/test/1')}
            style={({ pressed }) => ({
              flexDirection: 'row',
              alignItems: 'center',
              gap: 12,
              paddingVertical: 16,
              paddingHorizontal: 56,
              borderRadius: 40,
              borderWidth: 1,
              borderColor: 'rgba(201,168,76,0.4)',
              backgroundColor: pressed ? 'rgba(201,168,76,0.12)' : 'rgba(201,168,76,0.06)',
            })}
          >
            <Text style={{ color: '#C9A84C', fontFamily: 'serif', fontSize: 18, letterSpacing: 4 }}>
              开始测试
            </Text>
            <Icon name="arrow-right" size={14} color="#C9A84C" strokeWidth={1.5} />
          </Pressable>

          <Text style={{ color: '#6B5B7B', fontSize: 11, marginTop: 16, letterSpacing: 1 }}>
            预计用时 3-5 分钟
          </Text>
        </Animated.View>
      </ScrollView>
    </View>
  );
}
