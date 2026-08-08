import { useState, useEffect, useRef } from 'react';
import { View, Text, ScrollView, Pressable, Animated, Easing } from 'react-native';
import { router } from 'expo-router';
import { useTheme } from '../../src/theme/ThemeContext';
import { useTest } from '../../src/theme/TestContext';
import { WitchType, WITCH_TYPES } from '../../src/data/witchTypes';
import { ParticleBackground } from '../../src/components/ParticleBackground';
import { Icon } from '../../src/components/Icon';

export default function TestResultScreen() {
  const { completeTest } = useTheme();
  const { getResults } = useTest();
  const [result, setResult] = useState<WitchType | null>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const cardScale = useRef(new Animated.Value(0.5)).current;
  const cardOpacity = useRef(new Animated.Value(0)).current;
  const detailsOpacity = useRef(new Animated.Value(0)).current;
  const glowAnim = useRef(new Animated.Value(0)).current;
  const orbPulse = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    const typeId = getResults();
    const witch = typeId ? WITCH_TYPES[typeId] : WITCH_TYPES['green'];
    setResult(witch);

    const t1 = setTimeout(() => {
      setIsRevealed(true);
      Animated.parallel([
        Animated.spring(cardScale, { toValue: 1, friction: 3, tension: 40, useNativeDriver: true }),
        Animated.timing(cardOpacity, { toValue: 1, duration: 700, useNativeDriver: true }),
        Animated.timing(glowAnim, { toValue: 1, duration: 1200, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
      ]).start(() => {
        setShowDetails(true);
        Animated.timing(detailsOpacity, { toValue: 1, duration: 600, useNativeDriver: true }).start();
      });
    }, 500);

    Animated.loop(
      Animated.sequence([
        Animated.timing(orbPulse, { toValue: 0.8, duration: 2000, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
        Animated.timing(orbPulse, { toValue: 0.3, duration: 2000, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
      ]),
    ).start();

    return () => clearTimeout(t1);
  }, []);

  const handleEnter = async () => {
    if (result) {
      await completeTest(result.id);
      router.replace('/(tabs)/home');
    }
  };

  if (!result) {
    return (
      <View style={{ flex: 1, backgroundColor: '#0D0618', alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ color: '#8B7B9B', fontSize: 16 }}>水晶球正在显现...</Text>
      </View>
    );
  }

  const p = result.palette;

  return (
    <View style={{ flex: 1, backgroundColor: '#0D0618' }}>
      <ParticleBackground color={p.accent} density={0.4} />

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 60 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ alignItems: 'center', paddingTop: 64, paddingHorizontal: 24 }}>
          {!isRevealed ? (
            <View style={{ alignItems: 'center', justifyContent: 'center', minHeight: 400 }}>
              <Animated.View style={{ opacity: orbPulse }}>
                <View
                  style={{
                    width: 100,
                    height: 100,
                    borderRadius: 50,
                    borderWidth: 1,
                    borderColor: `${p.accent}40`,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Icon name="orb" size={56} color={p.accent} strokeWidth={1} />
                </View>
              </Animated.View>
              <Text style={{ color: p.accent, fontFamily: 'serif', fontSize: 20, textAlign: 'center', lineHeight: 32, marginTop: 24 }}>
                水晶球正在显现{'\n'}你的魔法本质
              </Text>
              <View style={{ flexDirection: 'row', gap: 6, marginTop: 20 }}>
                {[0, 1, 2].map((i) => (
                  <Animated.View
                    key={i}
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: 3,
                      backgroundColor: p.accent,
                      opacity: orbPulse,
                    }}
                  />
                ))}
              </View>
            </View>
          ) : (
            <>
              {/* Card reveal */}
              <Animated.View
                style={{
                  opacity: cardOpacity,
                  transform: [{ scale: cardScale }],
                  alignItems: 'center',
                  marginBottom: 24,
                }}
              >
                {/* Top ornament */}
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 16 }}>
                  <View style={{ width: 24, height: 1, backgroundColor: `${p.accent}40` }} />
                  <Icon name="sparkle" size={10} color={p.accent} strokeWidth={1} />
                  <View style={{ width: 24, height: 1, backgroundColor: `${p.accent}40` }} />
                </View>

                {/* Emblem circle */}
                <Animated.View style={{ opacity: glowAnim }}>
                  <View
                    style={{
                      width: 96,
                      height: 96,
                      borderRadius: 48,
                      borderWidth: 1.5,
                      borderColor: `${p.accent}50`,
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: `${p.primary}15`,
                    }}
                  >
                    <Animated.View
                      style={{
                        position: 'absolute',
                        width: 80,
                        height: 80,
                        borderRadius: 40,
                        backgroundColor: p.accent,
                        opacity: glowAnim.interpolate({
                          inputRange: [0, 1],
                          outputRange: [0, 0.06],
                        }),
                      }}
                    />
                    <Icon name={result.icon} size={48} color={p.accent} strokeWidth={1.2} />
                  </View>
                </Animated.View>

                {/* Name */}
                <Text
                  style={{
                    fontFamily: 'serif',
                    fontSize: 34,
                    textAlign: 'center',
                    marginTop: 20,
                    marginBottom: 8,
                    letterSpacing: 4,
                    color: p.accent,
                    textShadowColor: `${p.accent}30`,
                    textShadowRadius: 16,
                  }}
                >
                  {result.name}
                </Text>

                <Text style={{ color: p.muted, fontSize: 13, marginBottom: 16, letterSpacing: 2 }}>
                  {result.nameEn}  ·  {result.element}
                </Text>

                {/* Divider */}
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                  <View style={{ width: 20, height: 1, backgroundColor: `${p.accent}30` }} />
                  <Icon name="sparkle" size={8} color={`${p.accent}80`} strokeWidth={1} />
                  <View style={{ width: 20, height: 1, backgroundColor: `${p.accent}30` }} />
                </View>
              </Animated.View>

              {showDetails && (
                <Animated.View style={{ opacity: detailsOpacity, width: '100%' }}>
                  {/* Description */}
                  <SectionCard palette={p} label="魔法本质">
                    <Text style={{ fontSize: 14, lineHeight: 24, color: p.text }}>
                      {result.description}
                    </Text>
                  </SectionCard>

                  {/* Traits */}
                  <SectionCard palette={p} label="天赋特质">
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
                      {result.traits.map((trait) => (
                        <View
                          key={trait}
                          style={{
                            borderRadius: 20,
                            paddingHorizontal: 12,
                            paddingVertical: 6,
                            backgroundColor: `${p.primary}25`,
                            borderWidth: 0.5,
                            borderColor: `${p.accent}20`,
                          }}
                        >
                          <Text style={{ fontSize: 12, color: p.accent }}>{trait}</Text>
                        </View>
                      ))}
                    </View>
                  </SectionCard>

                  {/* Strengths */}
                  <SectionCard palette={p} label="核心能力">
                    {result.strengths.map((s, i) => (
                      <View key={s} style={{ flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: i < result.strengths.length - 1 ? 8 : 0 }}>
                        <Icon name="sparkle" size={8} color={p.accent} strokeWidth={1} fill />
                        <Text style={{ fontSize: 13, color: p.text }}>{s}</Text>
                      </View>
                    ))}
                  </SectionCard>

                  {/* Path */}
                  <SectionCard palette={p} label="成长之路">
                    <Text style={{ fontSize: 13, lineHeight: 22, color: p.text }}>
                      {result.path}
                    </Text>
                  </SectionCard>

                  {/* Ritual */}
                  <View
                    style={{
                      borderRadius: 16,
                      padding: 20,
                      marginBottom: 24,
                      backgroundColor: `${p.primary}15`,
                      borderWidth: 1.5,
                      borderColor: `${p.accent}60`,
                    }}
                  >
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                      <Icon name="sparkle" size={10} color={p.accent} strokeWidth={1} fill />
                      <Text style={{ color: p.muted, fontSize: 11, letterSpacing: 3 }}>入门仪式</Text>
                    </View>
                    <Text style={{ fontSize: 14, lineHeight: 24, fontFamily: 'serif', color: p.accent, fontStyle: 'italic' }}>
                      {result.ritual}
                    </Text>
                  </View>

                  {/* Enter button */}
                  <Pressable
                    onPress={handleEnter}
                    style={({ pressed }) => ({
                      borderRadius: 40,
                      paddingVertical: 18,
                      alignItems: 'center',
                      borderWidth: 1,
                      borderColor: p.accent,
                      backgroundColor: pressed ? `${p.primary}40` : `${p.primary}25`,
                      shadowColor: p.accent,
                      shadowOffset: { width: 0, height: 0 },
                      shadowOpacity: 0.2,
                      shadowRadius: 16,
                      elevation: 3,
                      marginBottom: 12,
                    })}
                  >
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                      <Text style={{ fontFamily: 'serif', fontSize: 17, letterSpacing: 3, color: p.accent }}>
                        以 {result.name} 身份进入秘境
                      </Text>
                      <Icon name="arrow-right" size={14} color={p.accent} strokeWidth={1.5} />
                    </View>
                  </Pressable>

                  <Pressable onPress={() => router.replace('/test')} style={{ paddingVertical: 12 }}>
                    <Text style={{ color: p.muted, fontSize: 13, textAlign: 'center' }}>
                      重新测试
                    </Text>
                  </Pressable>
                </Animated.View>
              )}
            </>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

function SectionCard({ palette, label, children }: { palette: any; label: string; children: React.ReactNode }) {
  const p = palette;
  return (
    <View
      style={{
        borderRadius: 16,
        padding: 20,
        marginBottom: 16,
        backgroundColor: p.surface,
        borderWidth: 1,
        borderColor: `${p.primary}50`,
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 12 }}>
        <View style={{ width: 14, height: 1, backgroundColor: `${p.accent}40` }} />
        <Text style={{ color: p.muted, fontSize: 11, letterSpacing: 3 }}>{label}</Text>
        <View style={{ flex: 1, height: 1, backgroundColor: `${p.accent}15` }} />
      </View>
      {children}
    </View>
  );
}
