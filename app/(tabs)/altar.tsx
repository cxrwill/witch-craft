import { useState, useRef, useEffect } from 'react';
import { View, Text, ScrollView, Pressable, TextInput, Animated, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '../../src/theme/ThemeContext';
import { ParticleBackground } from '../../src/components/ParticleBackground';
import { Icon, IconName } from '../../src/components/Icon';
import { ORACLE_ANSWERS } from '../../src/data/oracleAnswers';

const { width: SW } = Dimensions.get('window');

const ALTAR_KEY = '@witch_altar_items';
const SPELL_HISTORY_KEY = '@witch_spell_history';

type AltarItemCategory = '水晶' | '羽毛' | '蜡烛' | '草药' | '魔杖' | '铜铃' | '熏香' | '法器';

interface AltarItemDef {
  id: string;
  name: string;
  icon: IconName;
  category: AltarItemCategory;
  color: string;
}

const ALTAR_ITEMS: AltarItemDef[] = [
  { id: 'crystal1', name: '紫水晶', icon: 'crystal', category: '水晶', color: '#9B59B6' },
  { id: 'crystal2', name: '玫瑰晶', icon: 'crystal', category: '水晶', color: '#E8A0BF' },
  { id: 'crystal3', name: '黑曜石', icon: 'crystal', category: '水晶', color: '#2C2C3A' },
  { id: 'crystal4', name: '月光石', icon: 'crystal', category: '水晶', color: '#A099B8' },
  { id: 'crystal5', name: '虎眼石', icon: 'crystal', category: '水晶', color: '#C9A84C' },
  { id: 'crystal6', name: '白水晶', icon: 'crystal', category: '水晶', color: '#D8D0E8' },
  { id: 'feather1', name: '乌鸦羽毛', icon: 'feather', category: '羽毛', color: '#1E1E22' },
  { id: 'feather2', name: '孔雀羽毛', icon: 'feather', category: '羽毛', color: '#2E6B8A' },
  { id: 'feather3', name: '鹰羽毛', icon: 'feather', category: '羽毛', color: '#8B6914' },
  { id: 'feather4', name: '猫头鹰羽毛', icon: 'feather', category: '羽毛', color: '#D4C5A9' },
  { id: 'candle1', name: '黑蜡烛', icon: 'candle', category: '蜡烛', color: '#E8E0D8' },
  { id: 'candle2', name: '白蜡烛', icon: 'candle', category: '蜡烛', color: '#F5F0E8' },
  { id: 'candle3', name: '红蜡烛', icon: 'candle', category: '蜡烛', color: '#C0392B' },
  { id: 'candle4', name: '紫蜡烛', icon: 'candle', category: '蜡烛', color: '#8E44AD' },
  { id: 'candle5', name: '金蜡烛', icon: 'candle', category: '蜡烛', color: '#C9A84C' },
  { id: 'candle6', name: '绿蜡烛', icon: 'candle', category: '蜡烛', color: '#2D5A27' },
  { id: 'herb1', name: '鼠尾草', icon: 'herb', category: '草药', color: '#7D8B6F' },
  { id: 'herb2', name: '薰衣草', icon: 'herb', category: '草药', color: '#8B7B9B' },
  { id: 'herb3', name: '迷迭香', icon: 'herb', category: '草药', color: '#5C7048' },
  { id: 'herb4', name: '月桂叶', icon: 'herb', category: '草药', color: '#6B8E4E' },
  { id: 'herb5', name: '艾草', icon: 'herb', category: '草药', color: '#A0A878' },
  { id: 'wand1', name: '橡木魔杖', icon: 'wand', category: '魔杖', color: '#8B6914' },
  { id: 'wand2', name: '紫杉魔杖', icon: 'wand', category: '魔杖', color: '#6B3A5B' },
  { id: 'wand3', name: '水晶魔杖', icon: 'wand', category: '魔杖', color: '#C9A84C' },
  { id: 'wand4', name: '月桂魔杖', icon: 'wand', category: '魔杖', color: '#C9A84C' },
  { id: 'wand5', name: '接骨木魔杖', icon: 'wand', category: '魔杖', color: '#5C4033' },
  { id: 'wand6', name: '玫瑰木魔杖', icon: 'wand', category: '魔杖', color: '#B76E79' },
  { id: 'wand7', name: '黑胡桃魔杖', icon: 'wand', category: '魔杖', color: '#3E2723' },
  { id: 'wand8', name: '檀木魔杖', icon: 'wand', category: '魔杖', color: '#D2B48C' },
  { id: 'bell1', name: '铜铃·风', icon: 'bell', category: '铜铃', color: '#C9A84C' },
  { id: 'bell2', name: '铜铃·月', icon: 'bell', category: '铜铃', color: '#C9A84C' },
  { id: 'bell3', name: '铜铃·星', icon: 'bell', category: '铜铃', color: '#C9A84C' },
  { id: 'incense', name: '白鼠尾草熏香', icon: 'incense', category: '熏香', color: '#D8D0E8' },
  { id: 'chalice', name: '圣杯', icon: 'chalice', category: '法器', color: '#C9A84C' },
  { id: 'athame', name: '仪式匕首', icon: 'dagger', category: '法器', color: '#D8D0E8' },
  { id: 'pentacle', name: '五芒星盘', icon: 'pentagram', category: '法器', color: '#C9A84C' },
];

const CATEGORIES: ('全部' | AltarItemCategory)[] = ['全部', '水晶', '羽毛', '蜡烛', '草药', '魔杖', '铜铃', '法器'];

interface AltarBgOption {
  key: string;
  name: string;
  icon: IconName;
  bg: string;
}

const ALTAR_BG_OPTIONS: AltarBgOption[] = [
  { key: 'wood', name: '古木桌面', icon: 'tree', bg: '#1E1208' },
  { key: 'stone', name: '石板', icon: 'mountain', bg: '#1C1C20' },
  { key: 'moon', name: '月光', icon: 'crescent', bg: '#14142A' },
  { key: 'forest', name: '森林', icon: 'leaf', bg: '#0E1E0C' },
];

interface PlacedItem {
  id: string;
  name: string;
  icon: IconName;
  color: string;
  x: number;
  y: number;
}

interface SpellRecord {
  id: string;
  spell: string;
  oracle: string;
  items: string[];
  date: string;
}

export default function AltarScreen() {
  const { witchType } = useTheme();
  const p = witchType?.palette;
  const [activeCategory, setActiveCategory] = useState<typeof CATEGORIES[number]>('全部');
  const [placedItems, setPlacedItems] = useState<PlacedItem[]>([]);
  const [spellText, setSpellText] = useState('');
  const [oracleMessage, setOracleMessage] = useState<string | null>(null);
  const [isCasting, setIsCasting] = useState(false);
  const [showBgPicker, setShowBgPicker] = useState(false);
  const [altarBg, setAltarBg] = useState(ALTAR_BG_OPTIONS[0]);
  const [spellHistory, setSpellHistory] = useState<SpellRecord[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const castFlashAnim = useRef(new Animated.Value(0)).current;
  const candleFlicker = useRef(new Animated.Value(0.8)).current;
  const accent = p?.accent || '#C9A84C';
  const surface = p?.surface || '#1E1138';
  const primary = p?.primary || '#2D1B4E';

  // Load saved altar items and spell history
  useEffect(() => {
    AsyncStorage.getItem(ALTAR_KEY).then((stored) => {
      if (stored) {
        try {
          const data = JSON.parse(stored);
          setPlacedItems(data.items || []);
          if (data.bg) setAltarBg(ALTAR_BG_OPTIONS.find(b => b.key === data.bg) || ALTAR_BG_OPTIONS[0]);
        } catch {}
      }
    });
    AsyncStorage.getItem(SPELL_HISTORY_KEY).then((stored) => {
      if (stored) {
        try { setSpellHistory(JSON.parse(stored)); } catch {}
      }
    });
  }, []);

  // Candle flicker animation
  useEffect(() => {
    const flicker = Animated.loop(
      Animated.sequence([
        Animated.timing(candleFlicker, { toValue: 1, duration: 200 + Math.random() * 300, useNativeDriver: true }),
        Animated.timing(candleFlicker, { toValue: 0.7, duration: 150 + Math.random() * 200, useNativeDriver: true }),
        Animated.timing(candleFlicker, { toValue: 0.9, duration: 100 + Math.random() * 150, useNativeDriver: true }),
        Animated.timing(candleFlicker, { toValue: 0.6, duration: 200 + Math.random() * 300, useNativeDriver: true }),
      ]),
    );
    flicker.start();
    return () => flicker.stop();
  }, []);

  // Save altar items whenever they change
  const saveAltar = async (items: PlacedItem[], bg: AltarBgOption) => {
    await AsyncStorage.setItem(ALTAR_KEY, JSON.stringify({ items, bg: bg.key }));
  };

  const filteredItems =
    activeCategory === '全部'
      ? ALTAR_ITEMS
      : ALTAR_ITEMS.filter((item) => item.category === activeCategory);

  const handleAddItem = (item: AltarItemDef) => {
    if (!placedItems.find((p) => p.id === item.id)) {
      const count = placedItems.length;
      const cols = 3;
      const col = count % cols;
      const row = Math.floor(count / cols);
      const spacing = 95;
      const newItems = [
        ...placedItems,
        { id: item.id, name: item.name, icon: item.icon, color: item.color, x: 20 + col * spacing, y: 20 + row * spacing },
      ];
      setPlacedItems(newItems);
      saveAltar(newItems, altarBg);
    }
  };

  const handleRemoveItem = (itemId: string) => {
    const newItems = placedItems.filter((item) => item.id !== itemId);
    setPlacedItems(newItems);
    saveAltar(newItems, altarBg);
  };

  const handleClearAltar = () => {
    setPlacedItems([]);
    saveAltar([], altarBg);
  };

  const handleCast = () => {
    if (spellText.trim().length === 0) return;
    setIsCasting(true);
    setOracleMessage(null);
    castFlashAnim.setValue(0);
    Animated.sequence([
      Animated.timing(castFlashAnim, { toValue: 1, duration: 300, useNativeDriver: false }),
      Animated.timing(castFlashAnim, { toValue: 0.3, duration: 400, useNativeDriver: false }),
    ]).start();
    setTimeout(() => {
      const randomAnswer = ORACLE_ANSWERS[Math.floor(Math.random() * ORACLE_ANSWERS.length)];
      setOracleMessage(randomAnswer);
      setIsCasting(false);

      // Save to spell history
      const record: SpellRecord = {
        id: Date.now().toString(),
        spell: spellText.trim(),
        oracle: randomAnswer,
        items: placedItems.map(i => i.name),
        date: new Date().toLocaleDateString('zh-CN', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
      };
      const newHistory = [record, ...spellHistory].slice(0, 20);
      setSpellHistory(newHistory);
      AsyncStorage.setItem(SPELL_HISTORY_KEY, JSON.stringify(newHistory));
    }, 2200);
  };

  const handleBgChange = (bg: AltarBgOption) => {
    setAltarBg(bg);
    setShowBgPicker(false);
    saveAltar(placedItems, bg);
  };

  const hasCandles = placedItems.some(i => i.icon === 'candle');

  return (
    <View style={{ flex: 1, backgroundColor: '#0D0618' }}>
      <ParticleBackground color={accent} density={0.2} />
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 60 }}>
        {/* Header */}
        <View style={{ paddingHorizontal: 24, paddingTop: 56, paddingBottom: 12, alignItems: 'center' }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10, marginBottom: 6 }}>
            <View style={{ width: 20, height: 1, backgroundColor: `${accent}30` }} />
            <Icon name="pentagram" size={16} color={accent} strokeWidth={1} />
            <Text style={{ fontFamily: 'serif', fontSize: 24, color: accent, letterSpacing: 4 }}>神圣祭坛</Text>
            <Icon name="pentagram" size={16} color={accent} strokeWidth={1} />
            <View style={{ width: 20, height: 1, backgroundColor: `${accent}30` }} />
          </View>
          <Text style={{ color: '#6B5B7B', fontSize: 11, letterSpacing: 2 }}>布置你的魔法空间</Text>
        </View>

        {/* Altar Area */}
        <View style={{ marginHorizontal: 16, marginBottom: 16 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8, paddingHorizontal: 4 }}>
            <Text style={{ color: '#6B5B7B', fontSize: 11, letterSpacing: 3 }}>祭坛桌面</Text>
            <View style={{ flexDirection: 'row', gap: 16 }}>
              <Pressable onPress={() => setShowHistory(!showHistory)}>
                <Text style={{ color: showHistory ? accent : '#8B7B9B', fontSize: 11 }}>{showHistory ? '返回祭坛' : '施法记录'}</Text>
              </Pressable>
              <Pressable onPress={() => setShowBgPicker(!showBgPicker)}>
                <Text style={{ color: '#8B7B9B', fontSize: 11 }}>切换背景</Text>
              </Pressable>
              {placedItems.length > 0 && (
                <Pressable onPress={handleClearAltar}>
                  <Text style={{ color: '#8B7B9B', fontSize: 11 }}>清空</Text>
                </Pressable>
              )}
            </View>
          </View>

          {/* Spell History View */}
          {showHistory ? (
            <View style={{ minHeight: 240, borderRadius: 16, borderWidth: 1.5, borderColor: `${primary}80`, backgroundColor: '#0A0510', padding: 16 }}>
              {spellHistory.length === 0 ? (
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingVertical: 40 }}>
                  <Icon name="book" size={32} color={`${accent}20`} strokeWidth={1} />
                  <Text style={{ color: '#6B5B7B', fontSize: 13, textAlign: 'center', marginTop: 12 }}>
                    还没有施法记录{'\n'}写下你的第一个咒语吧
                  </Text>
                </View>
              ) : (
                <ScrollView style={{ maxHeight: 300 }} showsVerticalScrollIndicator={false}>
                  {spellHistory.map((record) => (
                    <View key={record.id} style={{ marginBottom: 14, paddingBottom: 14, borderBottomWidth: 1, borderBottomColor: `${primary}40` }}>
                      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 6 }}>
                        <Icon name="sparkle" size={8} color={accent} strokeWidth={1} fill />
                        <Text style={{ color: accent, fontSize: 11, fontFamily: 'serif' }}>{record.date}</Text>
                        {record.items.length > 0 && (
                          <Text style={{ color: '#6B5B7B', fontSize: 10 }}>· {record.items.join('、')}</Text>
                        )}
                      </View>
                      <Text style={{ color: '#D8D0E8', fontSize: 12, marginBottom: 4, lineHeight: 18 }}>{record.spell}</Text>
                      <Text style={{ color: accent, fontSize: 12, fontStyle: 'italic', lineHeight: 18 }}>→ "{record.oracle}"</Text>
                    </View>
                  ))}
                </ScrollView>
              )}
            </View>
          ) : (
            <>
              {/* Background Picker */}
              {showBgPicker && (
                <View style={{ flexDirection: 'row', gap: 8, marginBottom: 10, flexWrap: 'wrap' }}>
                  {ALTAR_BG_OPTIONS.map((bg) => (
                    <Pressable
                      key={bg.key}
                      onPress={() => handleBgChange(bg)}
                      style={{
                        flexDirection: 'row', alignItems: 'center', gap: 6,
                        borderRadius: 20, paddingHorizontal: 12, paddingVertical: 6,
                        borderWidth: 1,
                        borderColor: altarBg.key === bg.key ? accent : 'rgba(201,168,76,0.1)',
                        backgroundColor: altarBg.key === bg.key ? `${accent}12` : 'transparent',
                      }}
                    >
                      <Icon name={bg.icon} size={14} color={altarBg.key === bg.key ? accent : '#8B7B9B'} strokeWidth={1.2} />
                      <Text style={{ fontSize: 11, color: altarBg.key === bg.key ? accent : '#8B7B9B' }}>{bg.name}</Text>
                    </Pressable>
                  ))}
                </View>
              )}

              {/* Altar Surface */}
              <View
                style={{
                  minHeight: 240,
                  borderRadius: 16,
                  borderWidth: 1.5,
                  borderColor: `${primary}80`,
                  backgroundColor: altarBg.bg,
                  overflow: 'hidden',
                }}
              >
                {/* Texture overlay */}
                <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: '#000', opacity: 0.2 }} />

                {/* Candle glow effect */}
                {hasCandles && (
                  <Animated.View
                    style={{
                      position: 'absolute', top: '20%', left: '30%', right: '30%',
                      height: '60%', borderRadius: 100,
                      backgroundColor: accent,
                      opacity: candleFlicker.interpolate({ inputRange: [0, 1], outputRange: [0.02, 0.08] }),
                    }}
                  />
                )}

                {/* Casting flash */}
                {isCasting && (
                  <Animated.View
                    style={{
                      position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                      backgroundColor: accent,
                      opacity: castFlashAnim.interpolate({ inputRange: [0, 0.5, 1], outputRange: [0, 0.12, 0] }),
                      zIndex: 10,
                    }}
                  />
                )}

                {placedItems.length === 0 ? (
                  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingVertical: 40 }}>
                    <Icon name="pentagram" size={36} color={`${accent}25`} strokeWidth={1} />
                    <Text style={{ color: '#6B5B7B', fontSize: 14, textAlign: 'center', marginTop: 12, lineHeight: 22 }}>
                      从下方道具库中选择物品{'\n'}放置到祭坛桌面
                    </Text>
                  </View>
                ) : (
                  <View style={{ flex: 1, position: 'relative', minHeight: 240 }}>
                    {placedItems.map((item) => (
                      <Pressable
                        key={item.id}
                        onLongPress={() => handleRemoveItem(item.id)}
                        style={{
                          position: 'absolute',
                          left: item.x,
                          top: item.y,
                          alignItems: 'center',
                          padding: 8,
                          borderRadius: 12,
                          backgroundColor: `${primary}30`,
                          zIndex: 1,
                        }}
                      >
                        {/* Candle flame flicker */}
                        {item.icon === 'candle' && (
                          <Animated.View
                            style={{
                              position: 'absolute',
                              top: -2,
                              width: 8,
                              height: 8,
                              borderRadius: 4,
                              backgroundColor: '#F5E8B0',
                              opacity: candleFlicker,
                              shadowColor: '#F5E8B0',
                              shadowOffset: { width: 0, height: 0 },
                              shadowOpacity: 0.8,
                              shadowRadius: 6,
                              elevation: 3,
                            }}
                          />
                        )}
                        <Icon name={item.icon} size={28} color={item.color} strokeWidth={1.2} />
                        <Text style={{ color: '#8B7B9B', fontSize: 9, marginTop: 3 }}>{item.name}</Text>
                      </Pressable>
                    ))}
                  </View>
                )}
              </View>

              {placedItems.length > 0 && (
                <Text style={{ color: '#6B5B7B', fontSize: 10, marginTop: 6, textAlign: 'center' }}>
                  长按道具可移除 · 祭坛布置已保存
                </Text>
              )}
            </>
          )}
        </View>

        {/* Spell Input */}
        {!showHistory && (
          <View style={{ marginHorizontal: 16, marginBottom: 16 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 10, paddingHorizontal: 4 }}>
              <View style={{ width: 12, height: 1, backgroundColor: `${accent}30` }} />
              <Text style={{ color: '#6B5B7B', fontSize: 11, letterSpacing: 3 }}>你的咒语与意图</Text>
            </View>
            <TextInput
              value={spellText}
              onChangeText={setSpellText}
              placeholder="写下你的愿望、意图或咒语..."
              placeholderTextColor="#5C4A7A"
              multiline
              numberOfLines={3}
              style={{
                borderRadius: 14,
                padding: 16,
                color: '#D8D0E8',
                fontSize: 15,
                backgroundColor: surface,
                borderWidth: 1,
                borderColor: `${primary}60`,
                minHeight: 80,
                textAlignVertical: 'top',
                lineHeight: 24,
              }}
            />
            <Pressable
              onPress={handleCast}
              disabled={isCasting || spellText.trim().length === 0}
              style={{
                borderRadius: 30,
                paddingVertical: 16,
                marginTop: 14,
                alignItems: 'center',
                borderWidth: 1,
                borderColor: isCasting ? accent : `${accent}40`,
                backgroundColor: isCasting ? `${accent}12` : `${primary}50`,
                opacity: isCasting || spellText.trim().length === 0 ? 0.5 : 1,
                shadowColor: isCasting ? accent : 'transparent',
                shadowOffset: { width: 0, height: 0 },
                shadowOpacity: 0.3,
                shadowRadius: 20,
                elevation: isCasting ? 5 : 0,
              }}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                <Icon name="sparkle" size={12} color={accent} strokeWidth={1.2} fill />
                <Text style={{ fontFamily: 'serif', fontSize: 18, letterSpacing: 4, color: accent }}>
                  {isCasting ? '施法中...' : '施 法'}
                </Text>
                <Icon name="sparkle" size={12} color={accent} strokeWidth={1.2} fill />
              </View>
            </Pressable>
          </View>
        )}

        {/* Oracle Message */}
        {oracleMessage && !showHistory && (
          <View
            style={{
              marginHorizontal: 16,
              marginBottom: 16,
              borderRadius: 16,
              padding: 24,
              alignItems: 'center',
              borderWidth: 1,
              borderColor: `${accent}40`,
              backgroundColor: surface,
            }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 16 }}>
              <Icon name="crescent" size={10} color={accent} strokeWidth={1.5} />
              <Text style={{ color: '#8B7B9B', fontSize: 11, letterSpacing: 3 }}>宇宙的回应</Text>
              <Icon name="crescent" size={10} color={accent} strokeWidth={1.5} />
            </View>
            <Text style={{ fontFamily: 'serif', fontSize: 17, textAlign: 'center', fontStyle: 'italic', lineHeight: 26, color: accent }}>
              "{oracleMessage}"
            </Text>
            <View style={{ alignItems: 'center', marginTop: 14 }}>
              <Icon name="pentagram" size={14} color={`${accent}20`} strokeWidth={0.8} />
            </View>
          </View>
        )}

        {/* Items Catalog */}
        {!showHistory && (
          <View style={{ paddingHorizontal: 16 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 12, paddingHorizontal: 4 }}>
              <View style={{ width: 12, height: 1, backgroundColor: `${accent}30` }} />
              <Text style={{ color: '#6B5B7B', fontSize: 11, letterSpacing: 3 }}>道具库</Text>
            </View>

            {/* Category Tabs */}
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 14 }} contentContainerStyle={{ gap: 6, paddingHorizontal: 2 }}>
              {CATEGORIES.map((cat) => (
                <Pressable
                  key={cat}
                  onPress={() => setActiveCategory(cat)}
                  style={{
                    borderRadius: 20,
                    paddingHorizontal: 14,
                    paddingVertical: 7,
                    borderWidth: 1,
                    borderColor: activeCategory === cat ? accent : 'rgba(201,168,76,0.1)',
                    backgroundColor: activeCategory === cat ? `${accent}10` : surface,
                  }}
                >
                  <Text style={{ fontSize: 11, color: activeCategory === cat ? accent : '#8B7B9B' }}>{cat}</Text>
                </Pressable>
              ))}
            </ScrollView>

            {/* Items Grid */}
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
              {filteredItems.map((item) => {
                const isPlaced = placedItems.some((p) => p.id === item.id);
                return (
                  <Pressable
                    key={item.id}
                    onPress={() => handleAddItem(item)}
                    disabled={isPlaced}
                    style={{
                      width: (SW - 48) / 3,
                      alignItems: 'center',
                      paddingVertical: 12,
                      paddingHorizontal: 4,
                      borderRadius: 12,
                      backgroundColor: isPlaced ? `${primary}30` : surface,
                      opacity: isPlaced ? 0.35 : 1,
                    }}
                  >
                    <Icon name={item.icon} size={26} color={isPlaced ? '#6B5B7B' : item.color} strokeWidth={1.2} />
                    <Text style={{ color: '#8B7B9B', fontSize: 10, textAlign: 'center', marginTop: 5 }} numberOfLines={1}>
                      {item.name}
                    </Text>
                    {isPlaced && <Text style={{ color: '#6B5B7B', fontSize: 8, marginTop: 2 }}>已放置</Text>}
                  </Pressable>
                );
              })}
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
}
