import { useState, useEffect, useRef } from 'react';
import { View, Text, ScrollView, Pressable, Animated, Easing, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { useTheme } from '../../src/theme/ThemeContext';
import { Icon, IconName } from '../../src/components/Icon';
import { ParticleBackground } from '../../src/components/ParticleBackground';
import { getMoonPhase, getNextFullMoon } from '../../src/data/moonPhase';
import { ORACLE_ANSWERS } from '../../src/data/oracleAnswers';
import { TAROT_CARDS, TarotCard, getSuitColor } from '../../src/data/tarotCards';
import { ACHIEVEMENTS, ACHIEVEMENT_KEY, STREAK_KEY, WitchStats } from '../../src/data/achievements';

// Time-based greeting
function getTimeGreeting(): { text: string; icon: IconName; sub: string } {
  const h = new Date().getHours();
  if (h >= 5 && h < 8) return { text: '黎明将至', icon: 'sun', sub: '晨曦中的女巫正苏醒' };
  if (h >= 8 && h < 12) return { text: '日上三竿', icon: 'sun', sub: '阳光为魔法注入活力' };
  if (h >= 12 && h < 17) return { text: '午后时光', icon: 'sparkle', sub: '是时候整理你的思绪' };
  if (h >= 17 && h < 20) return { text: '黄昏降临', icon: 'crescent', sub: '两个世界的边界正在模糊' };
  if (h >= 20 && h < 23) return { text: '夜幕深沉', icon: 'moon', sub: '星辰为你低语' };
  return { text: '子夜时分', icon: 'orb', sub: '魔法的力量在黑暗中最为纯粹' };
}

// Daily guidance based on date seed — deterministic per day
function getDailyGuidance(): string {
  const now = new Date();
  const dayOfYear = Math.floor((now.getTime() - new Date(now.getFullYear(), 0, 0).getTime()) / 86400000);
  const index = dayOfYear % ORACLE_ANSWERS.length;
  return ORACLE_ANSWERS[index];
}

// Daily tarot card based on date seed — deterministic per day
function getDailyCard(): TarotCard {
  const now = new Date();
  const dayOfYear = Math.floor((now.getTime() - new Date(now.getFullYear(), 0, 0).getTime()) / 86400000);
  const cardIdx = (dayOfYear * 7919) % TAROT_CARDS.length;
  const card = TAROT_CARDS[cardIdx];
  // Determine reversed based on day parity
  return { ...card, reversed: dayOfYear % 3 === 0 };
}

// Get moon phases for the next 7 days
function getMoonPhaseWeek(): { date: Date; phase: ReturnType<typeof getMoonPhase>; isToday: boolean }[] {
  const today = new Date();
  const days: { date: Date; phase: ReturnType<typeof getMoonPhase>; isToday: boolean }[] = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(today);
    d.setDate(d.getDate() + i);
    days.push({ date: d, phase: getMoonPhase(d), isToday: i === 0 });
  }
  return days;
}

const JOURNAL_KEY = '@witch_journal_entries';
const SPELL_HISTORY_KEY = '@witch_spell_history';
const DIVINATION_KEY = '@witch_divination_count';
const RUNE_DIVINATION_KEY = '@witch_rune_count';
const CELTIC_USED_KEY = '@witch_celtic_used';
const THREE_RUNE_USED_KEY = '@witch_three_rune_used';

const { width: SW } = Dimensions.get('window');

export default function HomeScreen() {
  const { witchType } = useTheme();
  const [showDailyCard, setShowDailyCard] = useState(false);
  const [energyLevel, setEnergyLevel] = useState(0);
  const [streak, setStreak] = useState(0);
  const [unlockedAchievements, setUnlockedAchievements] = useState<string[]>([]);
  const [showAllAchievements, setShowAllAchievements] = useState(false);
  const breatheAnim = useRef(new Animated.Value(0.8)).current;
  const glowAnim = useRef(new Animated.Value(0.3)).current;
  const energyAnim = useRef(new Animated.Value(0)).current;
  const flameAnim = useRef(new Animated.Value(1)).current;

  const moonPhase = getMoonPhase();
  const dailyGuidance = getDailyGuidance();
  const dailyCard = useRef(getDailyCard()).current;
  const greeting = useRef(getTimeGreeting()).current;
  const moonWeek = useRef(getMoonPhaseWeek()).current;
  const nextFullMoon = useRef(getNextFullMoon()).current;

  // Load energy, streak, and check achievements
  useEffect(() => {
    const loadData = async () => {
      let points = 0;
      const stats: WitchStats = {
        divinationCount: 0,
        runeCount: 0,
        journalCount: 0,
        spellCount: 0,
        celticCrossUsed: false,
        threeRuneUsed: false,
        visitHour: new Date().getHours(),
        moonIllumination: moonPhase.illumination,
        streak: 0,
      };

      try {
        const journal = await AsyncStorage.getItem(JOURNAL_KEY);
        if (journal) {
          const arr = JSON.parse(journal);
          stats.journalCount = arr.length;
          points += arr.length * 3;
        }
        const spells = await AsyncStorage.getItem(SPELL_HISTORY_KEY);
        if (spells) {
          const arr = JSON.parse(spells);
          stats.spellCount = arr.length;
          points += arr.length * 2;
        }
        const div = await AsyncStorage.getItem(DIVINATION_KEY);
        if (div) {
          stats.divinationCount = parseInt(div);
          points += stats.divinationCount * 2;
        }
        const runeDiv = await AsyncStorage.getItem(RUNE_DIVINATION_KEY);
        if (runeDiv) {
          stats.runeCount = parseInt(runeDiv);
        }
        const celticUsed = await AsyncStorage.getItem(CELTIC_USED_KEY);
        stats.celticCrossUsed = celticUsed === 'true';
        const threeRuneUsed = await AsyncStorage.getItem(THREE_RUNE_USED_KEY);
        stats.threeRuneUsed = threeRuneUsed === 'true';

        // Streak tracking
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const todayStr = today.toISOString().split('T')[0];
        const streakData = await AsyncStorage.getItem(STREAK_KEY);
        let newStreak = 1;
        if (streakData) {
          const parsed = JSON.parse(streakData);
          const lastDate = new Date(parsed.lastVisit);
          lastDate.setHours(0, 0, 0, 0);
          const diffDays = Math.round((today.getTime() - lastDate.getTime()) / 86400000);
          if (diffDays === 0) {
            // Already visited today
            newStreak = parsed.count;
          } else if (diffDays === 1) {
            // Consecutive day
            newStreak = parsed.count + 1;
          } else {
            // Streak broken
            newStreak = 1;
          }
        }
        await AsyncStorage.setItem(STREAK_KEY, JSON.stringify({ lastVisit: todayStr, count: newStreak }));
        setStreak(newStreak);
        stats.streak = newStreak;

        // Check achievements
        const existing = await AsyncStorage.getItem(ACHIEVEMENT_KEY);
        const existingIds: string[] = existing ? JSON.parse(existing) : [];
        const newlyUnlocked: string[] = [];
        for (const ach of ACHIEVEMENTS) {
          if (ach.check(stats) && !existingIds.includes(ach.id)) {
            newlyUnlocked.push(ach.id);
          }
        }
        const allUnlocked = [...existingIds, ...newlyUnlocked];
        if (newlyUnlocked.length > 0) {
          await AsyncStorage.setItem(ACHIEVEMENT_KEY, JSON.stringify(allUnlocked));
        }
        setUnlockedAchievements(allUnlocked);
      } catch {}
      setEnergyLevel(Math.min(100, points));
    };
    loadData();
  }, []);

  // Flame animation for streak
  useEffect(() => {
    if (streak > 0) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(flameAnim, { toValue: 1.15, duration: 600, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
          Animated.timing(flameAnim, { toValue: 0.9, duration: 400, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
          Animated.timing(flameAnim, { toValue: 1.1, duration: 500, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
          Animated.timing(flameAnim, { toValue: 1, duration: 300, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
        ]),
      ).start();
    }
  }, [streak]);

  // Animate energy bar
  useEffect(() => {
    Animated.timing(energyAnim, {
      toValue: energyLevel,
      duration: 1200,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: false,
    }).start();
  }, [energyLevel]);

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(breatheAnim, { toValue: 1.05, duration: 3000, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
        Animated.timing(breatheAnim, { toValue: 0.95, duration: 3000, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
      ]),
    ).start();
    Animated.loop(
      Animated.sequence([
        Animated.timing(glowAnim, { toValue: 0.6, duration: 2500, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
        Animated.timing(glowAnim, { toValue: 0.2, duration: 2500, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
      ]),
    ).start();
  }, []);

  if (!witchType) {
    return (
      <View style={{ flex: 1, backgroundColor: '#0D0618', alignItems: 'center', justifyContent: 'center', paddingHorizontal: 32 }}>
        <Icon name="orb" size={48} color="#C9A84C" strokeWidth={1} />
        <Text style={{ color: '#8B7B9B', fontSize: 16, textAlign: 'center', marginTop: 16 }}>
          请先完成女巫测试
        </Text>
        <Pressable
          onPress={() => router.push('/test')}
          style={{ marginTop: 24, paddingVertical: 12, paddingHorizontal: 32, borderRadius: 30, borderWidth: 1, borderColor: 'rgba(201,168,76,0.3)', backgroundColor: 'rgba(201,168,76,0.06)' }}
        >
          <Text style={{ color: '#C9A84C', fontFamily: 'serif', fontSize: 16, letterSpacing: 3 }}>进入测试</Text>
        </Pressable>
      </View>
    );
  }

  const p = witchType.palette;

  const quickActions: { title: string; icon: IconName; route: string }[] = [
    { title: '布置祭坛', icon: 'candle', route: '/altar' },
    { title: '塔罗占卜', icon: 'cards', route: '/tarot' },
    { title: '写手账', icon: 'book', route: '/journal' },
  ];

  const cardColor = dailyCard.type === 'major' ? '#C9A84C' : getSuitColor(dailyCard.suit);
  const energyWidth = energyAnim.interpolate({ inputRange: [0, 100], outputRange: ['0%', '100%'] });
  const fullMoonDays = Math.ceil((nextFullMoon.getTime() - Date.now()) / 86400000);

  return (
    <View style={{ flex: 1, backgroundColor: '#0D0618' }}>
      <ParticleBackground color={p.accent} density={0.15} />
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 56, paddingBottom: 100 }} showsVerticalScrollIndicator={false}>
        {/* Header with greeting + moon phase */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
          <View style={{ flex: 1 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 4 }}>
              <Icon name={greeting.icon} size={14} color={p.muted} strokeWidth={1.2} />
              <Text style={{ color: p.muted, fontSize: 11, letterSpacing: 2 }}>{greeting.text}</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
              <Animated.View style={{ transform: [{ scale: breatheAnim }] }}>
                <View
                  style={{
                    width: 44, height: 44, borderRadius: 22, borderWidth: 1,
                    borderColor: `${p.accent}30`, alignItems: 'center', justifyContent: 'center',
                    backgroundColor: `${p.primary}15`,
                  }}
                >
                  <Icon name={witchType.icon} size={22} color={p.accent} strokeWidth={1.2} />
                </View>
              </Animated.View>
              <View>
                <Text style={{ fontFamily: 'serif', fontSize: 18, color: p.accent, letterSpacing: 2 }}>{witchType.name}</Text>
                <Text style={{ color: p.muted, fontSize: 10, letterSpacing: 1 }}>{witchType.element}</Text>
              </View>
            </View>
          </View>

          {/* Moon phase widget */}
          <View style={{ alignItems: 'center' }}>
            <Animated.View style={{ opacity: glowAnim }}>
              <Icon name={moonPhase.icon} size={28} color={p.accent} strokeWidth={1.2} fill />
            </Animated.View>
            <Text style={{ color: p.muted, fontSize: 9, marginTop: 2, letterSpacing: 1 }}>{moonPhase.name}</Text>
            <Text style={{ color: `${p.accent}80`, fontSize: 8 }}>{moonPhase.illumination}%</Text>
          </View>
        </View>

        {/* Magic Energy Meter + Streak */}
        <View style={{ flexDirection: 'row', gap: 10, marginBottom: 16 }}>
          <View style={{ flex: 1, borderRadius: 14, padding: 14, backgroundColor: p.surface, borderWidth: 1, borderColor: `${p.primary}40` }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                <Icon name="sparkle" size={10} color={p.accent} strokeWidth={1} fill />
                <Text style={{ color: p.muted, fontSize: 11, letterSpacing: 2 }}>魔法能量</Text>
              </View>
              <Text style={{ color: p.accent, fontSize: 12, fontFamily: 'serif' }}>{energyLevel} / 100</Text>
            </View>
            <View style={{ height: 6, borderRadius: 3, backgroundColor: `${p.primary}40`, overflow: 'hidden' }}>
              <Animated.View style={{ height: '100%', width: energyWidth, borderRadius: 3, backgroundColor: p.accent }} />
            </View>
            <Text style={{ color: p.muted, fontSize: 9, marginTop: 6 }}>{greeting.sub}</Text>
          </View>

          {/* Streak counter */}
          <View style={{ borderRadius: 14, padding: 14, backgroundColor: p.surface, borderWidth: 1, borderColor: `${p.accent}20`, alignItems: 'center', justifyContent: 'center', minWidth: 80 }}>
            <Animated.View style={{ transform: [{ scale: flameAnim }] }}>
              <Icon name="flame" size={24} color={streak > 0 ? p.accent : `${p.accent}20`} strokeWidth={1.2} fill={streak > 0} />
            </Animated.View>
            <Text style={{ color: streak > 0 ? p.accent : p.muted, fontSize: 18, fontFamily: 'serif', marginTop: 4 }}>{streak}</Text>
            <Text style={{ color: p.muted, fontSize: 8, letterSpacing: 1 }}>{streak >= 7 ? '七日圆满' : streak >= 3 ? '连续签到' : '每日签到'}</Text>
          </View>
        </View>

        {/* Moon Phase Calendar Strip */}
        <View style={{ marginBottom: 16 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <Icon name="crescent" size={10} color={p.muted} strokeWidth={1.2} />
            <Text style={{ color: p.muted, fontSize: 10, letterSpacing: 2 }}>七日月相</Text>
            <View style={{ flex: 1, height: 1, backgroundColor: `${p.accent}08` }} />
            <Text style={{ color: p.muted, fontSize: 9 }}>
              {fullMoonDays === 0 ? '今夜满月' : `距下次满月 ${fullMoonDays} 天`}
            </Text>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 8, paddingRight: 12 }}>
            {moonWeek.map((day, i) => (
              <View
                key={i}
                style={{
                  alignItems: 'center',
                  width: 42,
                  paddingVertical: 10,
                  borderRadius: 12,
                  borderWidth: 1,
                  borderColor: day.isToday ? `${p.accent}30` : `${p.primary}30`,
                  backgroundColor: day.isToday ? `${p.accent}08` : p.surface,
                }}
              >
                <Text style={{ fontSize: 18, marginBottom: 2 }}>{day.phase.emoji}</Text>
                <Text style={{ color: day.isToday ? p.accent : p.muted, fontSize: 9, fontFamily: 'serif' }}>
                  {day.date.getMonth() + 1}/{day.date.getDate()}
                </Text>
                <Text style={{ color: p.muted, fontSize: 7, marginTop: 1 }}>{day.isToday ? '今日' : day.phase.name}</Text>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* Moon phase meaning card */}
        <View
          style={{
            borderRadius: 14,
            padding: 14,
            marginBottom: 16,
            backgroundColor: `${p.primary}15`,
            borderWidth: 1,
            borderColor: `${p.accent}15`,
            flexDirection: 'row',
            alignItems: 'center',
            gap: 12,
          }}
        >
          <Text style={{ fontSize: 28 }}>{moonPhase.emoji}</Text>
          <View style={{ flex: 1 }}>
            <Text style={{ color: p.accent, fontSize: 12, fontFamily: 'serif', letterSpacing: 2, marginBottom: 2 }}>
              {moonPhase.name} · {moonPhase.nameEn}
            </Text>
            <Text style={{ color: p.text, fontSize: 11, lineHeight: 17 }}>
              {moonPhase.meaning}
            </Text>
          </View>
        </View>

        {/* Daily guidance */}
        <View
          style={{
            borderRadius: 16,
            padding: 20,
            marginBottom: 16,
            backgroundColor: p.surface,
            borderWidth: 1,
            borderColor: `${p.primary}40`,
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Decorative corner */}
          <View style={{ position: 'absolute', top: -20, right: -20, width: 60, height: 60, borderRadius: 30, backgroundColor: p.accent, opacity: 0.03 }} />
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 12 }}>
            <Icon name="crescent" size={12} color={p.accent} strokeWidth={1.5} />
            <Text style={{ color: p.muted, fontSize: 11, letterSpacing: 3 }}>今日引领</Text>
            <View style={{ flex: 1, height: 1, backgroundColor: `${p.accent}10` }} />
          </View>
          <Text style={{ color: p.text, fontSize: 15, lineHeight: 24, fontFamily: 'serif', fontStyle: 'italic' }}>
            "{dailyGuidance}"
          </Text>
        </View>

        {/* Daily Tarot Card */}
        <Pressable
          onPress={() => setShowDailyCard(!showDailyCard)}
          style={{
            borderRadius: 16,
            padding: 18,
            marginBottom: 16,
            backgroundColor: p.surface,
            borderWidth: 1,
            borderColor: `${cardColor}25`,
            flexDirection: 'row',
            alignItems: 'center',
            gap: 14,
          }}
        >
          {/* Mini card visual */}
          <View
            style={{
              width: 44, height: 62, borderRadius: 6, borderWidth: 1,
              borderColor: `${cardColor}30`, backgroundColor: '#120A24',
              alignItems: 'center', justifyContent: 'center',
            }}
          >
            <Icon
              name={dailyCard.type === 'major' ? (dailyCard.iconKey as IconName) : 'cards'}
              size={22}
              color={cardColor}
              strokeWidth={1}
            />
          </View>
          <View style={{ flex: 1 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 3 }}>
              <Icon name="sparkle" size={8} color={p.muted} strokeWidth={1} fill />
              <Text style={{ color: p.muted, fontSize: 10, letterSpacing: 2 }}>每日塔罗</Text>
            </View>
            <Text style={{ fontFamily: 'serif', fontSize: 16, color: cardColor, marginBottom: 2 }}>{dailyCard.name}</Text>
            {showDailyCard ? (
              <Text style={{ color: p.text, fontSize: 11, lineHeight: 16 }}>
                {dailyCard.reversed ? dailyCard.meaningReversed : dailyCard.meaningUpright}
              </Text>
            ) : (
              <Text style={{ color: p.muted, fontSize: 11 }}>轻触查看今日牌意</Text>
            )}
          </View>
          <View style={{ transform: [{ rotate: showDailyCard ? '-90deg' : '90deg' }] }}>
            <Icon name={showDailyCard ? 'arrow-left' : 'arrow-right'} size={12} color={p.muted} strokeWidth={1.5} />
          </View>
        </Pressable>

        {/* Quick actions */}
        <View style={{ flexDirection: 'row', gap: 10, marginBottom: 16 }}>
          {quickActions.map((action) => (
            <Pressable
              key={action.title}
              onPress={() => router.push(action.route as any)}
              style={({ pressed }) => ({
                flex: 1,
                borderRadius: 14,
                paddingVertical: 18,
                alignItems: 'center',
                backgroundColor: pressed ? `${p.primary}30` : p.surface,
                borderWidth: 1,
                borderColor: `${p.primary}30`,
              })}
            >
              <View
                style={{
                  width: 40, height: 40, borderRadius: 20,
                  borderWidth: 1, borderColor: `${p.accent}20`,
                  alignItems: 'center', justifyContent: 'center', marginBottom: 8,
                }}
              >
                <Icon name={action.icon} size={20} color={p.accent} strokeWidth={1.2} />
              </View>
              <Text style={{ fontSize: 12, color: p.text }}>{action.title}</Text>
            </Pressable>
          ))}
        </View>

        {/* Traits */}
        <View style={{ borderRadius: 16, padding: 16, marginBottom: 14, backgroundColor: p.surface, borderWidth: 1, borderColor: `${p.primary}40` }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 10 }}>
            <View style={{ width: 12, height: 1, backgroundColor: `${p.accent}40` }} />
            <Text style={{ color: p.muted, fontSize: 11, letterSpacing: 3 }}>魔法特质</Text>
          </View>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
            {witchType.traits.map((trait) => (
              <View key={trait} style={{ borderRadius: 20, paddingHorizontal: 12, paddingVertical: 5, backgroundColor: `${p.primary}25`, borderWidth: 0.5, borderColor: `${p.accent}15` }}>
                <Text style={{ fontSize: 12, color: p.accent }}>{trait}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Ritual of the day */}
        <View style={{ borderRadius: 16, padding: 16, marginBottom: 14, backgroundColor: `${p.primary}12`, borderWidth: 1, borderColor: `${p.accent}30` }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 10 }}>
            <Icon name="sparkle" size={10} color={p.accent} strokeWidth={1} fill />
            <Text style={{ color: p.muted, fontSize: 11, letterSpacing: 3 }}>入门仪式</Text>
          </View>
          <Text style={{ fontSize: 13, lineHeight: 22, color: p.accent, fontFamily: 'serif', fontStyle: 'italic' }}>
            {witchType.ritual}
          </Text>
        </View>

        {/* Achievements */}
        <View style={{ borderRadius: 16, padding: 16, marginBottom: 14, backgroundColor: p.surface, borderWidth: 1, borderColor: `${p.primary}40` }}>
          <Pressable onPress={() => setShowAllAchievements(!showAllAchievements)}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 12 }}>
              <Icon name="star" size={10} color={p.accent} strokeWidth={1} fill />
              <Text style={{ color: p.muted, fontSize: 11, letterSpacing: 3 }}>女巫成就</Text>
              <View style={{ flex: 1, height: 1, backgroundColor: `${p.accent}08` }} />
              <Text style={{ color: p.accent, fontSize: 10, fontFamily: 'serif' }}>{unlockedAchievements.length} / {ACHIEVEMENTS.length}</Text>
              <Icon name={showAllAchievements ? 'arrow-left' : 'arrow-right'} size={10} color={p.muted} strokeWidth={1.5} />
            </View>
          </Pressable>
          {/* Achievement badges grid */}
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10 }}>
            {(showAllAchievements ? ACHIEVEMENTS : ACHIEVEMENTS.slice(0, 6)).map((ach) => {
              const isUnlocked = unlockedAchievements.includes(ach.id);
              return (
                <View
                  key={ach.id}
                  style={{
                    width: (SW - 72) / 3,
                    alignItems: 'center',
                    paddingVertical: 10,
                    borderRadius: 12,
                    borderWidth: 1,
                    borderColor: isUnlocked ? `${p.accent}25` : `${p.primary}30`,
                    backgroundColor: isUnlocked ? `${p.accent}08` : 'transparent',
                  }}
                >
                  <View
                    style={{
                      width: 36, height: 36, borderRadius: 18,
                      borderWidth: 1,
                      borderColor: isUnlocked ? `${p.accent}30` : `${p.primary}30`,
                      alignItems: 'center', justifyContent: 'center',
                      backgroundColor: isUnlocked ? `${p.accent}10` : 'transparent',
                    }}
                  >
                    <Icon
                      name={ach.icon}
                      size={18}
                      color={isUnlocked ? p.accent : `${p.muted}40`}
                      strokeWidth={1.2}
                      fill={isUnlocked}
                    />
                  </View>
                  <Text style={{
                    fontSize: 9,
                    color: isUnlocked ? p.accent : p.muted,
                    marginTop: 5,
                    textAlign: 'center',
                    fontFamily: 'serif',
                  }} numberOfLines={1}>
                    {ach.name}
                  </Text>
                  {showAllAchievements && (
                    <Text style={{
                      fontSize: 7,
                      color: isUnlocked ? `${p.accent}60` : `${p.muted}30`,
                      textAlign: 'center',
                      marginTop: 1,
                    }} numberOfLines={2}>
                      {ach.desc}
                    </Text>
                  )}
                </View>
              );
            })}
          </View>
        </View>

        {/* Change identity */}
        <Pressable
          onPress={() => router.push('/test')}
          style={{ alignItems: 'center', paddingVertical: 12 }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
            <Icon name="spiral" size={12} color={p.muted} strokeWidth={1.2} />
            <Text style={{ color: p.muted, fontSize: 12 }}>重新探索女巫之路</Text>
          </View>
        </Pressable>
      </ScrollView>
    </View>
  );
}
