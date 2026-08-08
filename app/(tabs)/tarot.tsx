import { useState, useRef, useCallback, useEffect } from 'react';
import { View, Text, ScrollView, Pressable, Animated, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '../../src/theme/ThemeContext';
import { ParticleBackground } from '../../src/components/ParticleBackground';
import { Icon, IconName } from '../../src/components/Icon';
import {
  TarotCard,
  drawRandomCard,
  drawThreeCardSpread,
  drawCelticCross,
  getSuitIconKey,
  getSuitColor,
  getSuitElement,
} from '../../src/data/tarotCards';
import { Rune, drawRandomRune, drawThreeRunes } from '../../src/data/runes';

type DivinationMode = 'tarot' | 'rune' | null;
type SpreadType = 'single' | 'three' | 'celtic';

const SPREAD_INFO: Record<SpreadType, { name: string; desc: string; icon: IconName }> = {
  single: { name: '单张指引', desc: '每日一张，明心见性', icon: 'cards' },
  three: { name: '三张牌阵', desc: '过去 · 现在 · 未来', icon: 'crescent' },
  celtic: { name: '凯尔特十字', desc: '十张牌 · 深度揭示', icon: 'cross' },
};

const CELTIC_POSITIONS = ['现状', '挑战', '基础', '过去', '目标', '未来', '自我', '环境', '希望', '结果'];
const { width: SW } = Dimensions.get('window');

/* ============================
   SUIT COLOR MAP
   ============================ */
function getCardColor(card: TarotCard): string {
  if (card.type === 'major') return '#C9A84C';
  return getSuitColor(card.suit);
}

function getElementInfo(card: TarotCard): { name: string; icon: string } {
  if (card.type === 'major') return { name: '大阿尔卡纳', icon: '✦' };
  const s = getSuitElement(card.suit);
  return { name: s.element, icon: s.icon };
}

/* ============================
   SYNTHESIS — Combined Reading
   ============================ */
function generateSynthesis(cards: (TarotCard & { position?: string })[], spread: SpreadType): string {
  const majorCount = cards.filter(c => c.type === 'major').length;
  const reversedCount = cards.filter(c => c.reversed).length;
  const allKeywords = cards.flatMap(c => c.keywords);

  // Count suit distribution
  const suitCounts: Record<string, number> = {};
  cards.forEach(c => {
    if (c.suit) suitCounts[c.suit] = (suitCounts[c.suit] || 0) + 1;
  });
  const dominantSuit = Object.entries(suitCounts).sort((a, b) => b[1] - a[1])[0];

  let parts: string[] = [];

  if (spread === 'three') {
    const past = cards[0];
    const present = cards[1];
    const future = cards[2];
    parts.push(`过去的影响——${past.name}${past.reversed ? '（逆位）' : ''}——${past.reversed ? past.meaningReversed.slice(0, 30) : past.meaningUpright.slice(0, 30)}…`);
    parts.push(`当下的核心——${present.name}${present.reversed ? '（逆位）' : ''}——提醒你${present.reversed ? present.meaningReversed.slice(0, 25) : present.meaningUpright.slice(0, 25)}…`);
    parts.push(`未来的走向——${future.name}${future.reversed ? '（逆位）' : ''}——暗示着${future.reversed ? future.meaningReversed.slice(0, 25) : future.meaningUpright.slice(0, 25)}…`);
  } else if (spread === 'celtic') {
    parts.push(`现状与挑战交织——${cards[0]?.name}面临${cards[1]?.name}的考验。`);
    parts.push(`根基${cards[2]?.name}支撑着你的道路，而${cards[3]?.name}的过去仍在回响。`);
    parts.push(`目标${cards[4]?.name}指引方向，${cards[5]?.name}的未来正在成形。`);
    parts.push(`在${cards[6]?.name}的自我认知与${cards[9]?.name}的最终结果之间，环境与希望共同塑造着命运的轨迹。`);
  } else {
    parts.push(`${cards[0]?.name}作为今日的指引${cards[0]?.reversed ? '（逆位）' : ''}，提醒你${cards[0]?.reversed ? cards[0].meaningReversed.slice(0, 40) : cards[0].meaningUpright.slice(0, 40)}…`);
  }

  // Add energy assessment
  if (majorCount >= 2) {
    parts.push(`牌阵中出现了${majorCount}张大阿尔卡纳牌，暗示这是一个重要的转折时刻，命运的力量正在显现。`);
  }
  if (reversedCount >= cards.length / 2) {
    parts.push(`逆位牌居多，提示你需要向内审视，当前的阻碍可能来自内在而非外在。`);
  } else if (reversedCount === 0) {
    parts.push(`所有牌均为正位，能量流通顺畅，是行动与推进的好时机。`);
  }

  if (dominantSuit && dominantSuit[1] >= 2) {
    const suitMeanings: Record<string, string> = {
      wands: '火元素主导——热情、行动与创造力的能量充沛',
      cups: '水元素主导——情感、直觉与关系是当前的核心主题',
      swords: '风元素主导——思维、沟通与决断需要你的关注',
      pentacles: '土元素主导——物质、稳定与实际事务是当下的重心',
    };
    parts.push(suitMeanings[dominantSuit[0]] || '');
  }

  return parts.join('\n\n');
}

/* ============================
   CARD BACK — Ornate Pattern
   ============================ */
function CardBackFace({ accent, size }: { accent: string; size: { w: number; h: number } }) {
  const isSmall = size.w < 100;
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#120A24' }}>
      {/* Outer frame */}
      <View style={{
        width: isSmall ? size.w * 0.65 : Math.min(130, size.w * 0.7),
        height: isSmall ? size.w * 0.65 : Math.min(130, size.w * 0.7),
        borderWidth: 1, borderColor: `${accent}10`, borderRadius: 3, padding: 4,
      }}>
        {/* Inner frame */}
        <View style={{ flex: 1, borderWidth: 1, borderColor: `${accent}08`, borderRadius: 2, padding: 3, alignItems: 'center', justifyContent: 'center' }}>
          {/* Concentric rings */}
          <View style={{ width: '75%', height: '75%', alignItems: 'center', justifyContent: 'center' }}>
            <View style={{ position: 'absolute', width: '100%', height: '100%', borderRadius: 1000, borderWidth: 1, borderColor: `${accent}06` }} />
            <View style={{ position: 'absolute', width: '72%', height: '72%', borderRadius: 1000, borderWidth: 1, borderColor: `${accent}08` }} />
            <View style={{ position: 'absolute', width: '44%', height: '44%', borderRadius: 1000, borderWidth: 1, borderColor: `${accent}10` }} />
            {/* Cross lines */}
            <View style={{ position: 'absolute', width: '80%', height: 1, backgroundColor: `${accent}05` }} />
            <View style={{ position: 'absolute', width: 1, height: '80%', backgroundColor: `${accent}05` }} />
            {/* Diamond */}
            <View style={{ width: 38, height: 38, borderWidth: 1, borderColor: `${accent}08`, transform: [{ rotate: '45deg' }], alignItems: 'center', justifyContent: 'center' }}>
              <View style={{ width: 24, height: 24, borderWidth: 1, borderColor: `${accent}10`, alignItems: 'center', justifyContent: 'center' }}>
                <Icon name="hexagram" size={isSmall ? 10 : 14} color={`${accent}18`} strokeWidth={1} />
              </View>
            </View>
          </View>
          {/* Corner ornaments */}
          <Text style={{ position: 'absolute', top: 2, left: 4, fontSize: 7, color: `${accent}06` }}>❦</Text>
          <Text style={{ position: 'absolute', top: 2, right: 4, fontSize: 7, color: `${accent}06` }}>❦</Text>
          <Text style={{ position: 'absolute', bottom: 2, left: 4, fontSize: 7, color: `${accent}06` }}>❦</Text>
          <Text style={{ position: 'absolute', bottom: 2, right: 4, fontSize: 7, color: `${accent}06` }}>❦</Text>
        </View>
      </View>
      {!isSmall && (
        <>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 8, width: 80 }}>
            <View style={{ flex: 1, height: 1, backgroundColor: `${accent}06` }} />
            <Text style={{ fontSize: 6, color: `${accent}10` }}>◈</Text>
            <View style={{ flex: 1, height: 1, backgroundColor: `${accent}06` }} />
          </View>
          <Text style={{ color: '#4B3B5B', fontSize: 10, letterSpacing: 4, marginTop: 4 }}>轻触翻开</Text>
        </>
      )}
    </View>
  );
}

/* ============================
   CARD FACE — Full & Ornate
   ============================ */
function CardFaceContent({ card, size }: { card: TarotCard & { position?: string }; size: { w: number; h: number } }) {
  const color = getCardColor(card);
  const el = getElementInfo(card);
  const rank = card.type === 'major' ? String(card.id) : (card.rank || '');
  const isSmall = size.w < 100;
  const isLarge = size.w > 150;
  const iconSize = isSmall ? 18 : isLarge ? 72 : 32;

  if (isSmall) {
    return (
      <View style={{ flex: 1, margin: 2, borderWidth: 1, borderColor: `${color}20`, borderRadius: 6, position: 'relative', overflow: 'hidden' }}>
        <Text style={{ position: 'absolute', top: 1, left: 2, fontSize: 6, color: `${color}25` }}>✡</Text>
        <Text style={{ position: 'absolute', top: 1, right: 2, fontSize: 6, color: `${color}25` }}>✡</Text>
        <Text style={{ position: 'absolute', bottom: 1, left: 2, fontSize: 6, color: `${color}25` }}>✡</Text>
        <Text style={{ position: 'absolute', bottom: 1, right: 2, fontSize: 6, color: `${color}25` }}>✡</Text>
        <View style={{ flex: 1, margin: 1, borderWidth: 1, borderColor: `${color}12`, borderRadius: 4, alignItems: 'center', justifyContent: 'center', gap: 1, padding: 2 }}>
          <Text style={{ fontFamily: 'serif', fontSize: 9, fontWeight: 'bold', color: `${color}60` }}>{rank}</Text>
          <View style={{ width: 36, height: 36, borderRadius: 18, borderWidth: 1, borderColor: `${color}25`, backgroundColor: `${color}08`, alignItems: 'center', justifyContent: 'center' }}>
            <Icon name={card.type === 'major' ? (card.iconKey as IconName) : getSuitIconKey(card.suit!)} size={18} color={color} strokeWidth={1} />
          </View>
          <Text style={{ fontFamily: 'serif', fontSize: 8, color, textAlign: 'center', lineHeight: 10 }}>{card.name}</Text>
          <Text style={{ fontSize: 7, color: `${color}40`, letterSpacing: 1 }}>{card.position}</Text>
        </View>
      </View>
    );
  }

  /* ---- Full-size card face ---- */
  const ringCount = isLarge ? 5 : 3;
  const centerD = isLarge ? size.w * 0.62 : size.w * 0.58;
  const midD = centerD * 0.72;
  const innerD = centerD * 0.52;
  const coreD = centerD * 0.36;

  return (
    <View style={{ flex: 1, margin: 3, borderWidth: 1, borderColor: `${color}28`, borderRadius: 10, position: 'relative', overflow: 'hidden' }}>
      {/* ===== Outer frame corners ===== */}
      <Text style={{ position: 'absolute', top: 2, left: 3, fontSize: 11, color: `${color}30`, zIndex: 3 }}>✡</Text>
      <Text style={{ position: 'absolute', top: 2, right: 3, fontSize: 11, color: `${color}30`, zIndex: 3 }}>✡</Text>
      <Text style={{ position: 'absolute', bottom: 2, left: 3, fontSize: 11, color: `${color}30`, zIndex: 3 }}>✡</Text>
      <Text style={{ position: 'absolute', bottom: 2, right: 3, fontSize: 11, color: `${color}30`, zIndex: 3 }}>✡</Text>
      {/* Mid-edge ornaments */}
      <Text style={{ position: 'absolute', top: 2, left: '50%', marginLeft: -6, fontSize: 9, color: `${color}20`, zIndex: 3 }}>❦</Text>
      <Text style={{ position: 'absolute', bottom: 2, left: '50%', marginLeft: -6, fontSize: 9, color: `${color}20`, zIndex: 3 }}>❦</Text>
      <Text style={{ position: 'absolute', left: 2, top: '50%', marginTop: -5, fontSize: 9, color: `${color}20`, zIndex: 3 }}>❦</Text>
      <Text style={{ position: 'absolute', right: 2, top: '50%', marginTop: -5, fontSize: 9, color: `${color}20`, zIndex: 3 }}>❦</Text>

      {/* ===== Inner decorative border ===== */}
      <View style={{ flex: 1, margin: 2, borderWidth: 1, borderColor: `${color}15`, borderRadius: 7, position: 'relative', overflow: 'hidden' }}>

        {/* --- Background pattern: concentric rings + rays --- */}
        <View style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center', zIndex: 0 }}>
          {/* Radiating lines */}
          {[0, 30, 60, 90, 120, 150].map((deg) => (
            <View key={deg} style={{ position: 'absolute', width: 1, height: '90%', backgroundColor: `${color}04`, transform: [{ rotate: `${deg}deg` }] }} />
          ))}
          {/* Concentric decorative rings */}
          {Array.from({ length: ringCount }).map((_, i) => (
            <View key={i} style={{ position: 'absolute', width: centerD * (0.35 + i * 0.17), height: centerD * (0.35 + i * 0.17), borderRadius: 1000, borderWidth: 1, borderColor: `${color}${Math.max(4, 14 - i * 3).toString(16).padStart(2, '0')}` }} />
          ))}
          {/* Crosshair */}
          <View style={{ position: 'absolute', width: '70%', height: 1, backgroundColor: `${color}06` }} />
          <View style={{ position: 'absolute', width: 1, height: '70%', backgroundColor: `${color}06` }} />
          {/* Diamond frame behind center */}
          <View style={{ position: 'absolute', width: centerD * 0.7, height: centerD * 0.7, borderWidth: 1, borderColor: `${color}08`, transform: [{ rotate: '45deg' }] }} />
        </View>

        {/* --- TOP SECTION: Rank + Filigree --- */}
        <View style={{ alignItems: 'center', zIndex: 1, paddingTop: 5, paddingBottom: 2 }}>
          {/* Filigree strip */}
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 4, marginBottom: 3 }}>
            <View style={{ width: 20, height: 1, backgroundColor: `${color}18` }} />
            <Text style={{ fontSize: 6, color: `${color}25` }}>◆</Text>
            <View style={{ width: 10, height: 1, backgroundColor: `${color}12` }} />
            <Text style={{ fontSize: 5, color: `${color}20` }}>·</Text>
            <View style={{ width: 10, height: 1, backgroundColor: `${color}12` }} />
            <Text style={{ fontSize: 6, color: `${color}25` }}>◆</Text>
            <View style={{ width: 20, height: 1, backgroundColor: `${color}18` }} />
          </View>
          {/* Rank cartouche */}
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 4 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 2 }}>
              <View style={{ width: 12, height: 1, backgroundColor: `${color}22` }} />
              <View style={{ width: 5, height: 5, borderWidth: 1, borderColor: `${color}28`, transform: [{ rotate: '45deg' }], backgroundColor: `${color}08` }} />
              <View style={{ width: 12, height: 1, backgroundColor: `${color}22` }} />
            </View>
            <View style={{ paddingHorizontal: 10, paddingVertical: 2, borderRadius: 8, borderWidth: 1, borderColor: `${color}32`, backgroundColor: `${color}10` }}>
              <Text style={{ fontFamily: 'serif', fontSize: 12, fontWeight: 'bold', color, lineHeight: 14 }}>{rank}</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 2 }}>
              <View style={{ width: 12, height: 1, backgroundColor: `${color}22` }} />
              <View style={{ width: 5, height: 5, borderWidth: 1, borderColor: `${color}28`, transform: [{ rotate: '45deg' }], backgroundColor: `${color}08` }} />
              <View style={{ width: 12, height: 1, backgroundColor: `${color}22` }} />
            </View>
          </View>
        </View>

        {/* --- CENTER: Big symbol filling the space --- */}
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', position: 'relative', zIndex: 1 }}>
          {/* Outer glow */}
          <View style={{ position: 'absolute', width: centerD * 0.9, height: centerD * 0.9, borderRadius: 1000, backgroundColor: `${color}10` }} />

          {/* Main orbital ring with tick marks */}
          <View style={{ width: centerD, height: centerD, borderRadius: 1000, borderWidth: 1, borderColor: `${color}22`, alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
            {/* Tick marks on outer ring */}
            {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
              <View key={deg} style={{ position: 'absolute', width: 3, height: 1, backgroundColor: `${color}28`, transform: [{ rotate: `${deg}deg` }, { translateX: centerD / 2 - 2 }] }} />
            ))}
            {/* Decorative dots on ring */}
            {[0, 60, 120, 180, 240, 300].map((deg) => (
              <Text key={deg} style={{ position: 'absolute', fontSize: 7, color: `${color}30`, transform: [{ rotate: `${deg}deg` }, { translateX: centerD / 2 - 5 }] }}>·</Text>
            ))}

            {/* Mid ring */}
            <View style={{ width: midD, height: midD, borderRadius: 1000, borderWidth: 1, borderColor: `${color}32`, backgroundColor: `${color}06`, alignItems: 'center', justifyContent: 'center' }}>
              {/* Inner ring */}
              <View style={{ width: innerD, height: innerD, borderRadius: 1000, borderWidth: 1, borderColor: `${color}42`, backgroundColor: `${color}10`, alignItems: 'center', justifyContent: 'center' }}>
                {/* Core circle — the symbol sits here */}
                <View style={{ width: coreD, height: coreD, borderRadius: 1000, borderWidth: 1, borderColor: `${color}55`, backgroundColor: `${color}16`, alignItems: 'center', justifyContent: 'center' }}>
                  <Icon
                    name={card.type === 'major' ? (card.iconKey as IconName) : getSuitIconKey(card.suit!)}
                    size={iconSize}
                    color={color}
                    strokeWidth={1}
                  />
                </View>
              </View>
            </View>
          </View>

          {/* Flanking side ornaments */}
          <Text style={{ position: 'absolute', left: 4, top: '50%', marginTop: -6, fontSize: 12, color: `${color}18` }}>❦</Text>
          <Text style={{ position: 'absolute', right: 4, top: '50%', marginTop: -6, fontSize: 12, color: `${color}18` }}>❦</Text>
          {/* Top/bottom center ornaments */}
          <Text style={{ position: 'absolute', top: 2, left: '50%', marginLeft: -4, fontSize: 10, color: `${color}15` }}>◈</Text>
          <Text style={{ position: 'absolute', bottom: 2, left: '50%', marginLeft: -4, fontSize: 10, color: `${color}15` }}>◈</Text>
        </View>

        {/* --- BOTTOM SECTION: Name + Info --- */}
        <View style={{ alignItems: 'center', zIndex: 1, paddingTop: 2, paddingBottom: 5 }}>
          {/* Divider */}
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4, paddingHorizontal: 8, marginBottom: 3, width: '100%' }}>
            <View style={{ flex: 1, height: 1, backgroundColor: `${color}18` }} />
            <View style={{ width: 14, height: 14, borderRadius: 7, borderWidth: 1, borderColor: `${color}22`, backgroundColor: `${color}08`, alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{ fontSize: 7, color: `${color}32` }}>◈</Text>
            </View>
            <View style={{ flex: 1, height: 1, backgroundColor: `${color}18` }} />
          </View>

          {/* Name banner */}
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 3 }}>
            <View style={{ width: 10, height: 18, borderWidth: 1, borderColor: `${color}22`, borderTopLeftRadius: 8, borderBottomLeftRadius: 8, borderRightWidth: 0, backgroundColor: `${color}06` }} />
            <View style={{ paddingHorizontal: 10, paddingVertical: 2, borderTopWidth: 1, borderBottomWidth: 1, borderColor: `${color}28`, backgroundColor: `${color}08` }}>
              <Text style={{ fontFamily: 'serif', fontSize: 12, color, letterSpacing: 2, lineHeight: 15 }}>{card.name}</Text>
            </View>
            <View style={{ width: 10, height: 18, borderWidth: 1, borderColor: `${color}22`, borderTopRightRadius: 8, borderBottomRightRadius: 8, borderLeftWidth: 0, backgroundColor: `${color}06` }} />
          </View>

          {/* Bottom filigree */}
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 4, marginBottom: 4 }}>
            <View style={{ width: 16, height: 1, backgroundColor: `${color}15` }} />
            <Text style={{ fontSize: 5, color: `${color}20` }}>·</Text>
            <Text style={{ fontSize: 6, color: `${color}25` }}>◆</Text>
            <Text style={{ fontSize: 5, color: `${color}20` }}>·</Text>
            <View style={{ width: 16, height: 1, backgroundColor: `${color}15` }} />
          </View>

          {/* Info tags */}
          <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 4, flexWrap: 'wrap', paddingHorizontal: 4, marginBottom: 3 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 2, paddingHorizontal: 6, paddingVertical: 2, borderRadius: 6, borderWidth: 1, borderColor: `${color}22`, backgroundColor: `${color}08` }}>
              <Text style={{ fontSize: 9, color }}>{el.icon}</Text>
              <Text style={{ fontSize: 8, color: `${color}65`, letterSpacing: 1 }}>{el.name}</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 2, paddingHorizontal: 6, paddingVertical: 2, borderRadius: 6, borderWidth: 1, borderColor: `${color}22`, backgroundColor: `${color}08` }}>
              <Text style={{ fontSize: 9, color }}>◉</Text>
              <Text style={{ fontSize: 8, color: `${color}65`, letterSpacing: 1 }}>{card.position}</Text>
            </View>
            <View style={{
              flexDirection: 'row', alignItems: 'center', gap: 2, paddingHorizontal: 6, paddingVertical: 2, borderRadius: 6, borderWidth: 1,
              borderColor: card.reversed ? `${color}40` : '#4B3B5B30',
              backgroundColor: card.reversed ? `${color}14` : '#4B3B5B08',
            }}>
              <Text style={{ fontSize: 9, color: card.reversed ? color : '#7B6B8B' }}>{card.reversed ? '▼ 逆位' : '▲ 正位'}</Text>
            </View>
          </View>

          {/* Keywords */}
          {card.keywords.length > 0 && (
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 3, paddingHorizontal: 6 }}>
              {card.keywords.slice(0, 3).map((kw, i) => (
                <View key={i} style={{ paddingHorizontal: 6, paddingVertical: 2, borderRadius: 6, borderWidth: 1, borderColor: `${color}18`, backgroundColor: `${color}06` }}>
                  <Text style={{ fontSize: 8, color: `${color}60`, letterSpacing: 1 }}>{kw}</Text>
                </View>
              ))}
            </View>
          )}
        </View>
      </View>
    </View>
  );
}

/* ============================
   ANIMATED CARD — 3D Flip Effect
   ============================ */
function AnimatedCard({
  card, index, isRevealed, onReveal, size, accent,
}: {
  card: TarotCard & { position?: string };
  index: number;
  isRevealed: boolean;
  onReveal: (i: number) => void;
  size: { w: number; h: number };
  accent: string;
}) {
  const color = getCardColor(card);
  const flipAnim = useRef(new Animated.Value(0)).current;
  const glowAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isRevealed) {
      Animated.spring(flipAnim, {
        toValue: 1,
        friction: 7,
        tension: 50,
        useNativeDriver: true,
      }).start();
      // Glow pulse on reveal
      glowAnim.setValue(0);
      Animated.sequence([
        Animated.timing(glowAnim, { toValue: 1, duration: 300, useNativeDriver: true }),
        Animated.timing(glowAnim, { toValue: 0, duration: 600, useNativeDriver: true }),
      ]).start();
    } else {
      Animated.spring(flipAnim, {
        toValue: 0,
        friction: 7,
        tension: 50,
        useNativeDriver: true,
      }).start();
    }
  }, [isRevealed]);

  const frontRotate = flipAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });
  const backRotate = flipAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['180deg', '360deg'],
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
    <Pressable
      onPress={() => onReveal(index)}
      style={{
        width: size.w,
        height: size.h,
        borderRadius: 14,
        overflow: 'hidden',
        backgroundColor: '#120A24',
      }}
    >
      {/* Reveal glow */}
      <Animated.View
        style={{
          position: 'absolute',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: color,
          opacity: glowAnim.interpolate({ inputRange: [0, 0.5, 1], outputRange: [0, 0.15, 0] }),
          zIndex: 5,
        }}
      />
      {/* Card back (shown first, flips away) */}
      <Animated.View
        style={{
          position: 'absolute',
          top: 0, left: 0, right: 0, bottom: 0,
          transform: [{ perspective: 1000 }, { rotateY: frontRotate }],
          opacity: frontOpacity,
          borderWidth: 1,
          borderColor: `${accent}30`,
          borderRadius: 14,
        }}
      >
        <CardBackFace accent={accent} size={size} />
      </Animated.View>
      {/* Card face (hidden initially, flips in) */}
      <Animated.View
        style={{
          position: 'absolute',
          top: 0, left: 0, right: 0, bottom: 0,
          transform: [{ perspective: 1000 }, { rotateY: backRotate }],
          opacity: backOpacity,
          borderWidth: 1,
          borderColor: `${color}30`,
          borderRadius: 14,
          overflow: 'hidden',
        }}
      >
        <CardFaceContent card={card} size={size} />
      </Animated.View>
    </Pressable>
  );
}

/* ============================
   MAIN SCREEN
   ============================ */
export default function TarotScreen() {
  const { witchType } = useTheme();
  const p = witchType?.palette;
  const accent = p?.accent || '#C9A84C';
  const surface = p?.surface || '#1E1138';
  const primary = p?.primary || '#2D1B4E';

  const [divinationMode, setDivinationMode] = useState<DivinationMode>(null);
  const [selectedSpread, setSelectedSpread] = useState<SpreadType | null>(null);
  const [drawnCards, setDrawnCards] = useState<(TarotCard & { position?: string })[]>([]);
  const [revealedIndices, setRevealedIndices] = useState<number[]>([]);
  const [isShuffling, setIsShuffling] = useState(false);
  const shuffleAnim = useRef(new Animated.Value(0)).current;

  // Rune state
  const [drawnRunes, setDrawnRunes] = useState<(Rune & { position?: string })[]>([]);
  const [revealedRunes, setRevealedRunes] = useState<number[]>([]);
  const [isCastingRunes, setIsCastingRunes] = useState(false);

  const handleSelectSpread = (spread: SpreadType) => {
    setSelectedSpread(spread);
    setDrawnCards([]);
    setRevealedIndices([]);
  };

  const handleShuffle = useCallback(() => {
    setIsShuffling(true);
    setRevealedIndices([]);
    shuffleAnim.setValue(0);
    Animated.loop(
      Animated.sequence([
        Animated.timing(shuffleAnim, { toValue: 1, duration: 150, useNativeDriver: true }),
        Animated.timing(shuffleAnim, { toValue: 0, duration: 150, useNativeDriver: true }),
      ]),
      { iterations: 4 },
    ).start();
    setTimeout(() => {
      if (selectedSpread === 'single') {
        setDrawnCards([{ ...drawRandomCard(), position: '今日指引' }]);
      } else if (selectedSpread === 'three') {
        const cards = drawThreeCardSpread();
        setDrawnCards([
          { ...cards[0], position: '过去' },
          { ...cards[1], position: '现在' },
          { ...cards[2], position: '未来' },
        ]);
      } else {
        setDrawnCards(drawCelticCross().map((c, i) => ({ ...c, position: CELTIC_POSITIONS[i] })));
        AsyncStorage.setItem('@witch_celtic_used', 'true');
      }
      setIsShuffling(false);
      // Track divination count for energy meter
      AsyncStorage.getItem('@witch_divination_count').then((stored) => {
        const count = parseInt(stored || '0') + 1;
        AsyncStorage.setItem('@witch_divination_count', String(count));
      });
    }, 1200);
  }, [selectedSpread]);

  const handleReveal = (index: number) => {
    if (!revealedIndices.includes(index)) {
      setRevealedIndices([...revealedIndices, index]);
    }
  };

  const handleReset = () => {
    setSelectedSpread(null);
    setDrawnCards([]);
    setRevealedIndices([]);
  };

  // Rune casting
  const handleCastRunes = useCallback((count: 1 | 3) => {
    setIsCastingRunes(true);
    setRevealedRunes([]);
    setTimeout(() => {
      if (count === 1) {
        setDrawnRunes([{ ...drawRandomRune(), position: '今日指引' }]);
      } else {
        const runes = drawThreeRunes();
        setDrawnRunes([
          { ...runes[0], position: '过去' },
          { ...runes[1], position: '现在' },
          { ...runes[2], position: '未来' },
        ]);
        AsyncStorage.setItem('@witch_three_rune_used', 'true');
      }
      setIsCastingRunes(false);
      // Track rune and divination count
      AsyncStorage.getItem('@witch_rune_count').then((stored) => {
        const c = parseInt(stored || '0') + 1;
        AsyncStorage.setItem('@witch_rune_count', String(c));
      });
      AsyncStorage.getItem('@witch_divination_count').then((stored) => {
        const c = parseInt(stored || '0') + 1;
        AsyncStorage.setItem('@witch_divination_count', String(c));
      });
    }, 1500);
  }, []);

  const handleRevealRune = (index: number) => {
    if (!revealedRunes.includes(index)) {
      setRevealedRunes([...revealedRunes, index]);
    }
  };

  const handleResetRunes = () => {
    setDrawnRunes([]);
    setRevealedRunes([]);
  };

  const handleBackToMode = () => {
    setDivinationMode(null);
    setSelectedSpread(null);
    setDrawnCards([]);
    setRevealedIndices([]);
    setDrawnRunes([]);
    setRevealedRunes([]);
  };

  const cardSize =
    selectedSpread === 'single'
      ? { w: SW * 0.55, h: SW * 0.85 }
      : selectedSpread === 'three'
      ? { w: SW * 0.28, h: SW * 0.46 }
      : { w: SW * 0.18, h: SW * 0.27 };

  return (
    <View style={{ flex: 1, backgroundColor: '#0D0618' }}>
      <ParticleBackground color={accent} density={0.25} />
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 60 }}>
        {/* Header */}
        <View style={{ paddingHorizontal: 24, paddingTop: 56, paddingBottom: 16, alignItems: 'center' }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10, marginBottom: 8 }}>
            <View style={{ width: 20, height: 1, backgroundColor: `${accent}30` }} />
            <Icon name="eye" size={16} color={accent} strokeWidth={1} />
            <Text style={{ fontFamily: 'serif', fontSize: 24, color: accent, letterSpacing: 4 }}>占卜之屋</Text>
            <Icon name="eye" size={16} color={accent} strokeWidth={1} />
            <View style={{ width: 20, height: 1, backgroundColor: `${accent}30` }} />
          </View>
          <Text style={{ color: '#6B5B7B', fontSize: 12, letterSpacing: 2 }}>
            {divinationMode === 'tarot' ? '选择牌阵，让命运发声' : divinationMode === 'rune' ? '投掷符文，聆听低语' : '选择你的占卜方式'}
          </Text>
        </View>

        {/* Mode Selection */}
        {!divinationMode ? (
          <View style={{ paddingHorizontal: 16, gap: 12 }}>
            {/* Tarot Mode */}
            <Pressable
              onPress={() => setDivinationMode('tarot')}
              style={({ pressed }) => ({
                borderRadius: 16,
                padding: 20,
                borderWidth: 1,
                borderColor: pressed ? `${accent}40` : 'rgba(201,168,76,0.08)',
                backgroundColor: pressed ? `${surface}90` : surface,
              })}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>
                <View style={{ width: 52, height: 52, borderRadius: 26, borderWidth: 1, borderColor: `${accent}20`, alignItems: 'center', justifyContent: 'center', backgroundColor: `${primary}20` }}>
                  <Icon name="cards" size={26} color={accent} strokeWidth={1.2} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontFamily: 'serif', fontSize: 18, color: accent, marginBottom: 4 }}>塔罗占卜</Text>
                  <Text style={{ fontSize: 13, color: '#8B7B9B' }}>78张牌 · 三种牌阵 · 深度解读</Text>
                </View>
                <Icon name="arrow-right" size={16} color="#6B5B7B" strokeWidth={1.5} />
              </View>
            </Pressable>

            {/* Rune Mode */}
            <Pressable
              onPress={() => setDivinationMode('rune')}
              style={({ pressed }) => ({
                borderRadius: 16,
                padding: 20,
                borderWidth: 1,
                borderColor: pressed ? `${accent}40` : 'rgba(201,168,76,0.08)',
                backgroundColor: pressed ? `${surface}90` : surface,
              })}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>
                <View style={{ width: 52, height: 52, borderRadius: 26, borderWidth: 1, borderColor: `${accent}20`, alignItems: 'center', justifyContent: 'center', backgroundColor: `${primary}20` }}>
                  <Icon name="rune" size={26} color={accent} strokeWidth={1.2} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontFamily: 'serif', fontSize: 18, color: accent, marginBottom: 4 }}>符文占卜</Text>
                  <Text style={{ fontSize: 13, color: '#8B7B9B' }}>24枚古弗萨克 · 北欧智慧</Text>
                </View>
                <Icon name="arrow-right" size={16} color="#6B5B7B" strokeWidth={1.5} />
              </View>
            </Pressable>
          </View>
        ) : divinationMode === 'rune' ? (
          /* ==================== RUNE DIVINATION ==================== */
          <View style={{ paddingHorizontal: 16 }}>
            {/* Back */}
            <Pressable onPress={handleBackToMode} style={{ alignSelf: 'flex-start', marginBottom: 20 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                <Icon name="arrow-left" size={12} color="#8B7B9B" strokeWidth={1.5} />
                <Text style={{ color: '#8B7B9B', fontSize: 13 }}>选择占卜方式</Text>
              </View>
            </Pressable>

            {drawnRunes.length === 0 ? (
              /* Rune Casting Options */
              <View style={{ alignItems: 'center', paddingTop: 20 }}>
                <View style={{ width: 100, height: 100, borderRadius: 50, borderWidth: 1, borderColor: `${accent}25`, alignItems: 'center', justifyContent: 'center', marginBottom: 24 }}>
                  <Icon name="rune" size={48} color={accent} strokeWidth={1} />
                </View>
                <Text style={{ color: '#D8D0E8', fontSize: 15, textAlign: 'center', lineHeight: 24, marginBottom: 28, maxWidth: 260 }}>
                  古老的符文承载着北欧诸神的智慧。{'\n'}选择投掷方式，让符文为你揭示答案。
                </Text>

                {isCastingRunes ? (
                  <View style={{ alignItems: 'center', paddingVertical: 30 }}>
                    <Animated.Text style={{ fontSize: 40, color: accent, marginBottom: 16 }}>ᚦ</Animated.Text>
                    <Text style={{ color: '#8B7B9B', fontSize: 14 }}>符文正在显现...</Text>
                  </View>
                ) : (
                  <View style={{ gap: 12, width: '100%' }}>
                    <Pressable
                      onPress={() => handleCastRunes(1)}
                      style={{ borderRadius: 30, paddingVertical: 16, alignItems: 'center', borderWidth: 1, borderColor: `${accent}40`, backgroundColor: `${primary}40` }}
                    >
                      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                        <Icon name="sparkle" size={12} color={accent} strokeWidth={1.2} fill />
                        <Text style={{ fontFamily: 'serif', fontSize: 18, letterSpacing: 4, color: accent }}>单枚符文</Text>
                      </View>
                      <Text style={{ color: '#6B5B7B', fontSize: 11, marginTop: 4 }}>今日指引</Text>
                    </Pressable>
                    <Pressable
                      onPress={() => handleCastRunes(3)}
                      style={{ borderRadius: 30, paddingVertical: 16, alignItems: 'center', borderWidth: 1, borderColor: `${accent}40`, backgroundColor: `${primary}40` }}
                    >
                      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                        <Icon name="sparkle" size={12} color={accent} strokeWidth={1.2} fill />
                        <Text style={{ fontFamily: 'serif', fontSize: 18, letterSpacing: 4, color: accent }}>三枚符文</Text>
                      </View>
                      <Text style={{ color: '#6B5B7B', fontSize: 11, marginTop: 4 }}>过去 · 现在 · 未来</Text>
                    </Pressable>
                  </View>
                )}
              </View>
            ) : (
              /* Rune Results */
              <>
                {/* Runes Display */}
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 16, justifyContent: 'center', marginBottom: 20 }}>
                  {drawnRunes.map((rune, index) => {
                    const isRevealed = revealedRunes.includes(index);
                    return (
                      <Pressable
                        key={`${rune.id}-${index}`}
                        onPress={() => handleRevealRune(index)}
                        style={{
                          width: drawnRunes.length === 1 ? 120 : 90,
                          height: drawnRunes.length === 1 ? 150 : 120,
                          borderRadius: 14,
                          borderWidth: 1,
                          borderColor: isRevealed ? `${accent}30` : `${accent}25`,
                          backgroundColor: '#120A24',
                          alignItems: 'center',
                          justifyContent: 'center',
                          overflow: 'hidden',
                        }}
                      >
                        {isRevealed ? (
                          <View style={{ alignItems: 'center', padding: 8 }}>
                            <Text style={{ fontSize: drawnRunes.length === 1 ? 56 : 40, color: accent, marginBottom: 6 }}>
                              {rune.reversed ? '⌖' : rune.symbol}
                            </Text>
                            <Text style={{ fontFamily: 'serif', fontSize: drawnRunes.length === 1 ? 16 : 12, color: accent, marginBottom: 2 }}>{rune.name}</Text>
                            <Text style={{ fontSize: 9, color: '#6B5B7B' }}>{rune.nameEn}</Text>
                            {rune.reversed && <Text style={{ fontSize: 8, color: '#8B7B9B', marginTop: 2 }}>逆位</Text>}
                            <Text style={{ fontSize: 8, color: '#6B5B7B', marginTop: 2 }}>{rune.position}</Text>
                          </View>
                        ) : (
                          <View style={{ alignItems: 'center' }}>
                            <Icon name="rune" size={28} color={`${accent}15`} strokeWidth={1} />
                            <Text style={{ color: '#4B3B5B', fontSize: 10, letterSpacing: 3, marginTop: 6 }}>翻开</Text>
                          </View>
                        )}
                      </Pressable>
                    );
                  })}
                </View>

                {/* Actions */}
                <View style={{ flexDirection: 'row', gap: 12, marginBottom: 20 }}>
                  {revealedRunes.length < drawnRunes.length && (
                    <Pressable
                      onPress={() => setRevealedRunes(drawnRunes.map((_, i) => i))}
                      style={{ flex: 1, borderRadius: 25, paddingVertical: 12, alignItems: 'center', borderWidth: 1, borderColor: `${accent}20`, backgroundColor: surface }}
                    >
                      <Text style={{ color: '#D8D0E8', fontSize: 13, letterSpacing: 2 }}>全部翻开</Text>
                    </Pressable>
                  )}
                  <Pressable
                    onPress={handleResetRunes}
                    style={{ flex: 1, borderRadius: 25, paddingVertical: 12, alignItems: 'center', borderWidth: 1, borderColor: `${accent}20`, backgroundColor: surface }}
                  >
                    <Text style={{ color: '#D8D0E8', fontSize: 13, letterSpacing: 2 }}>重新投掷</Text>
                  </Pressable>
                </View>

                {/* Rune Interpretations */}
                {revealedRunes.length > 0 && (
                  <View style={{ gap: 14 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                      <Icon name="sparkle" size={10} color={accent} strokeWidth={1} fill />
                      <Text style={{ color: '#6B5B7B', fontSize: 11, letterSpacing: 3 }}>符 文 解 读</Text>
                      <Icon name="sparkle" size={10} color={accent} strokeWidth={1} fill />
                    </View>
                    {revealedRunes.map((idx) => {
                      const rune = drawnRunes[idx];
                      return (
                        <View key={`rune-interp-${idx}`} style={{ borderRadius: 16, padding: 0, borderWidth: 1, borderColor: `${primary}60`, backgroundColor: surface, overflow: 'hidden' }}>
                          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, padding: 14, borderBottomWidth: 1, borderBottomColor: `${accent}10` }}>
                            <View style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 3, backgroundColor: accent }} />
                            <Text style={{ fontSize: 28, color: accent }}>{rune.reversed ? '⌖' : rune.symbol}</Text>
                            <View style={{ flex: 1 }}>
                              <Text style={{ fontFamily: 'serif', fontSize: 16, color: accent }}>{rune.name} · {rune.nameEn}</Text>
                              <Text style={{ color: '#6B5B7B', fontSize: 10 }}>{rune.position} · {rune.element}{rune.reversed ? ' · 逆位' : ''}</Text>
                            </View>
                          </View>
                          <Text style={{ fontSize: 14, lineHeight: 24, color: '#D8D0E8', padding: 14 }}>
                            {rune.reversed ? rune.meaningReversed : rune.meaningUpright}
                          </Text>
                          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 6, paddingHorizontal: 14, paddingBottom: 12 }}>
                            {rune.keywords.map((kw, ki) => (
                              <View key={ki} style={{ paddingHorizontal: 8, paddingVertical: 3, borderRadius: 8, borderWidth: 1, borderColor: `${accent}12`, backgroundColor: `${accent}04` }}>
                                <Text style={{ fontSize: 10, color: `${accent}50` }}>{kw}</Text>
                              </View>
                            ))}
                          </View>
                        </View>
                      );
                    })}
                  </View>
                )}
              </>
            )}
          </View>
        ) : (
          /* ==================== TAROT DIVINATION (existing) ==================== */
          <View style={{ paddingHorizontal: 16 }}>
            {/* Back to mode selection */}
            <Pressable onPress={handleBackToMode} style={{ alignSelf: 'flex-start', marginBottom: 20 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                <Icon name="arrow-left" size={12} color="#8B7B9B" strokeWidth={1.5} />
                <Text style={{ color: '#8B7B9B', fontSize: 13 }}>选择占卜方式</Text>
              </View>
            </Pressable>

            {/* Spread Selection */}
            {!selectedSpread ? (
              <View style={{ gap: 12 }}>
                {(Object.keys(SPREAD_INFO) as SpreadType[]).map((type) => {
              const spread = SPREAD_INFO[type];
              return (
                <Pressable
                  key={type}
                  onPress={() => handleSelectSpread(type)}
                  style={({ pressed }) => ({
                    borderRadius: 16,
                    padding: 20,
                    borderWidth: 1,
                    borderColor: pressed ? `${accent}40` : 'rgba(201,168,76,0.08)',
                    backgroundColor: pressed ? `${surface}90` : surface,
                  })}
                >
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>
                    <View
                      style={{
                        width: 52, height: 52, borderRadius: 26, borderWidth: 1,
                        borderColor: `${accent}20`, alignItems: 'center', justifyContent: 'center',
                        backgroundColor: `${primary}20`,
                      }}
                    >
                      <Icon name={spread.icon} size={26} color={accent} strokeWidth={1.2} />
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text style={{ fontFamily: 'serif', fontSize: 18, color: accent, marginBottom: 4 }}>{spread.name}</Text>
                      <Text style={{ fontSize: 13, color: '#8B7B9B' }}>{spread.desc}</Text>
                    </View>
                    <Icon name="arrow-right" size={16} color="#6B5B7B" strokeWidth={1.5} />
                  </View>
                </Pressable>
              );
            })}
          </View>
        ) : (
          <View>
            {/* Back */}
            <Pressable onPress={handleReset} style={{ alignSelf: 'flex-start', marginBottom: 20 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                <Icon name="arrow-left" size={12} color="#8B7B9B" strokeWidth={1.5} />
                <Text style={{ color: '#8B7B9B', fontSize: 13 }}>重新选择牌阵</Text>
              </View>
            </Pressable>

            {/* Spread Title */}
            <View style={{ alignItems: 'center', marginBottom: 24 }}>
              <Text style={{ fontFamily: 'serif', fontSize: 22, color: accent, marginBottom: 4 }}>
                {SPREAD_INFO[selectedSpread].name}
              </Text>
              <Text style={{ color: '#6B5B7B', fontSize: 12 }}>{SPREAD_INFO[selectedSpread].desc}</Text>
            </View>

            {/* Shuffle Button */}
            {drawnCards.length === 0 ? (
              <Pressable
                onPress={handleShuffle}
                disabled={isShuffling}
                style={{
                  borderRadius: 30, paddingVertical: 18, alignItems: 'center',
                  borderWidth: 1, borderColor: accent,
                  backgroundColor: isShuffling ? `${primary}20` : `${primary}50`,
                  marginBottom: 24,
                }}
              >
                <Animated.View
                  style={{
                    flexDirection: 'row', alignItems: 'center', gap: 8,
                    transform: [{ translateX: shuffleAnim.interpolate({ inputRange: [0, 1], outputRange: [-8, 8] }) }],
                  }}
                >
                  <Icon name="sparkle" size={12} color={accent} strokeWidth={1.2} fill />
                  <Text style={{ fontFamily: 'serif', fontSize: 20, letterSpacing: 4, color: accent }}>
                    {isShuffling ? '洗牌中...' : '开始抽牌'}
                  </Text>
                  <Icon name="sparkle" size={12} color={accent} strokeWidth={1.2} fill />
                </Animated.View>
              </Pressable>
            ) : (
              <>
                {/* Card Layout */}
                {selectedSpread === 'celtic' ? (
                  <CelticCrossLayout
                    cards={drawnCards}
                    revealedIndices={revealedIndices}
                    onReveal={handleReveal}
                    accent={accent}
                  />
                ) : (
                  <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 14, justifyContent: 'center', marginBottom: 20 }}>
                    {drawnCards.map((card, index) => (
                      <AnimatedCard
                        key={`${card.id}-${index}`}
                        card={card}
                        index={index}
                        isRevealed={revealedIndices.includes(index)}
                        onReveal={handleReveal}
                        size={cardSize}
                        accent={accent}
                      />
                    ))}
                  </View>
                )}

                {/* Actions */}
                <View style={{ flexDirection: 'row', gap: 12, marginBottom: 24 }}>
                  {revealedIndices.length < drawnCards.length && (
                    <Pressable
                      onPress={() => setRevealedIndices(drawnCards.map((_, i) => i))}
                      style={{ flex: 1, borderRadius: 25, paddingVertical: 12, alignItems: 'center', borderWidth: 1, borderColor: `${accent}20`, backgroundColor: surface }}
                    >
                      <Text style={{ color: '#D8D0E8', fontSize: 13, letterSpacing: 2 }}>✡ 全部翻开</Text>
                    </Pressable>
                  )}
                  <Pressable
                    onPress={() => { setDrawnCards([]); setRevealedIndices([]); }}
                    style={{ flex: 1, borderRadius: 25, paddingVertical: 12, alignItems: 'center', borderWidth: 1, borderColor: `${accent}20`, backgroundColor: surface }}
                  >
                    <Text style={{ color: '#D8D0E8', fontSize: 13, letterSpacing: 2 }}>↻ 重新抽牌</Text>
                  </Pressable>
                </View>

                {/* Interpretations */}
                {revealedIndices.length > 0 && (
                  <View style={{ gap: 14 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                      <Icon name="sparkle" size={10} color={accent} strokeWidth={1} fill />
                      <Text style={{ color: '#6B5B7B', fontSize: 11, letterSpacing: 3 }}>牌 面 解 读</Text>
                      <Icon name="sparkle" size={10} color={accent} strokeWidth={1} fill />
                    </View>
                    {revealedIndices.map((idx) => {
                      const card = drawnCards[idx];
                      const cColor = getCardColor(card);
                      return (
                        <View key={`interp-${idx}`} style={{ borderRadius: 16, padding: 0, borderWidth: 1, borderColor: `${primary}60`, backgroundColor: surface, overflow: 'hidden' }}>
                          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, padding: 12, borderBottomWidth: 1, borderBottomColor: `${cColor}15`, position: 'relative' }}>
                            <View style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 3, backgroundColor: cColor }} />
                            <Icon name={card.type === 'major' ? (card.iconKey as IconName) : getSuitIconKey(card.suit!)} size={20} color={cColor} strokeWidth={1} />
                            <View style={{ flex: 1 }}>
                              <Text style={{ fontFamily: 'serif', fontSize: 15, color: cColor }}>{card.name}</Text>
                              <Text style={{ color: '#6B5B7B', fontSize: 10 }}>{card.position}</Text>
                            </View>
                            <View style={{ paddingHorizontal: 10, paddingVertical: 3, borderRadius: 10, borderWidth: 1, borderColor: card.reversed ? `${cColor}25` : '#4B3B5B20', backgroundColor: card.reversed ? `${cColor}08` : '#4B3B5B06' }}>
                              <Text style={{ fontSize: 10, color: card.reversed ? cColor : '#6B5B7B' }}>{card.reversed ? '逆位' : '正位'}</Text>
                            </View>
                          </View>
                          <Text style={{ fontSize: 14, lineHeight: 24, color: '#D8D0E8', padding: 14 }}>
                            {card.reversed ? card.meaningReversed : card.meaningUpright}
                          </Text>
                          {card.keywords.length > 0 && (
                            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 6, paddingHorizontal: 14, paddingBottom: 12 }}>
                              {card.keywords.map((kw, ki) => (
                                <View key={ki} style={{ paddingHorizontal: 8, paddingVertical: 3, borderRadius: 8, borderWidth: 1, borderColor: `${cColor}12`, backgroundColor: `${cColor}04` }}>
                                  <Text style={{ fontSize: 10, color: `${cColor}50` }}>{kw}</Text>
                                </View>
                              ))}
                            </View>
                          )}
                        </View>
                      );
                    })}

                    {/* Synthesis — appears when all cards revealed */}
                    {revealedIndices.length === drawnCards.length && drawnCards.length > 1 && (
                      <View style={{ borderRadius: 16, padding: 18, borderWidth: 1, borderColor: `${accent}30`, backgroundColor: `${primary}20`, marginTop: 4 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                          <Icon name="eye" size={12} color={accent} strokeWidth={1.2} />
                          <Text style={{ color: accent, fontSize: 12, fontFamily: 'serif', letterSpacing: 3 }}>综 合 解 读</Text>
                          <View style={{ flex: 1, height: 1, backgroundColor: `${accent}15` }} />
                        </View>
                        <Text style={{ color: '#D8D0E8', fontSize: 14, lineHeight: 24, fontStyle: 'italic' }}>
                          {generateSynthesis(drawnCards, selectedSpread!)}
                        </Text>
                        {/* Keyword cloud from all cards */}
                        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginTop: 14 }}>
                          {Array.from(new Set(drawnCards.flatMap(c => c.keywords))).slice(0, 8).map((kw, i) => (
                            <View key={i} style={{ paddingHorizontal: 8, paddingVertical: 3, borderRadius: 8, borderWidth: 1, borderColor: `${accent}15`, backgroundColor: `${accent}06` }}>
                              <Text style={{ fontSize: 10, color: `${accent}60` }}>{kw}</Text>
                            </View>
                          ))}
                        </View>
                      </View>
                    )}
                  </View>
                )}
              </>
            )}
          </View>
        )}
          </View>
        )}
      </ScrollView>
    </View>
  );
}

/* ============================
   CELTIC CROSS — Ornate Layout
   ============================ */
function CelticCrossLayout({
  cards, revealedIndices, onReveal, accent,
}: {
  cards: (TarotCard & { position?: string })[];
  revealedIndices: number[];
  onReveal: (i: number) => void;
  accent: string;
}) {
  const CelticMiniCard = ({ index, w = 56, h = 78, rotated = false }: { index: number; w?: number; h?: number; rotated?: boolean }) => {
    const card = cards[index];
    if (!card) return null;
    const isRevealed = revealedIndices.includes(index);
    const color = getCardColor(card);
    return (
      <Pressable
        onPress={() => onReveal(index)}
        style={{
          width: w, height: h, borderRadius: 8, borderWidth: 1,
          borderColor: isRevealed ? `${color}30` : `${accent}25`,
          overflow: 'hidden', backgroundColor: '#120A24',
          transform: rotated ? [{ rotate: '90deg' }] : [],
        }}
      >
        {isRevealed ? (
          <CardFaceContent card={card} size={{ w, h }} />
        ) : (
          <CardBackFace accent={accent} size={{ w, h }} />
        )}
      </Pressable>
    );
  };

  const PositionLabel = ({ text, style }: { text: string; style?: any }) => (
    <View style={{ position: 'absolute', ...style }}>
      <Text style={{ color: '#6B5B7B', fontSize: 8, textAlign: 'center', letterSpacing: 1 }}>{text}</Text>
    </View>
  );

  return (
    <View style={{ alignItems: 'center', marginBottom: 20 }}>
      <View style={{ position: 'relative', width: 300, height: 360 }}>
        {/* Position labels */}
        <PositionLabel text="⑥ 目标" style={{ left: 122, top: -2 }} />
        <PositionLabel text="③ 基础" style={{ left: 122, top: 286 }} />
        <PositionLabel text="④ 过去" style={{ left: 6, top: 132 }} />
        <PositionLabel text="⑤ 未来" style={{ left: 230, top: 132 }} />

        {/* Center cross — Card 0 (现状) with Card 1 (挑战) rotated on top */}
        <View style={{ position: 'absolute', left: 122, top: 104, zIndex: 2 }}>
          <CelticMiniCard index={0} />
        </View>
        <View style={{ position: 'absolute', left: 122, top: 104, zIndex: 1 }}>
          <CelticMiniCard index={1} rotated />
        </View>

        {/* Vertical staff: above center (目标/6) and below center (基础/3) */}
        <View style={{ position: 'absolute', left: 122, top: 10 }}>
          <CelticMiniCard index={2} />
        </View>
        <View style={{ position: 'absolute', left: 122, top: 198 }}>
          <CelticMiniCard index={3} />
        </View>

        {/* Horizontal arms: left (过去/4) and right (未来/5) */}
        <View style={{ position: 'absolute', left: 38, top: 110 }}>
          <CelticMiniCard index={4} />
        </View>
        <View style={{ position: 'absolute', left: 206, top: 110 }}>
          <CelticMiniCard index={5} />
        </View>

        {/* Staff column (right side): 7-10 */}
        {[6, 7, 8, 9].map((i, si) => (
          <View key={`staff-${i}`} style={{ position: 'absolute', left: 238, top: si * 82 + 8 }}>
            <View style={{ marginBottom: 4 }}>
              <Text style={{ color: '#6B5B7B', fontSize: 7, textAlign: 'center', letterSpacing: 1 }}>
                {['⑦ 自我', '⑧ 环境', '⑨ 希望', '⑩ 结果'][si]}
              </Text>
            </View>
            <CelticMiniCard index={i} w={52} h={68} />
          </View>
        ))}
      </View>

      {/* Legend */}
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 4, justifyContent: 'center', marginTop: 8, paddingHorizontal: 16 }}>
        {CELTIC_POSITIONS.map((pos, i) => (
          <View key={i} style={{ flexDirection: 'row', alignItems: 'center', gap: 3 }}>
            <View style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: revealedIndices.includes(i) ? accent : `${accent}20` }} />
            <Text style={{ fontSize: 8, color: revealedIndices.includes(i) ? accent : '#6B5B7B' }}>{pos}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}
