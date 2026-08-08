import { useState, useEffect } from 'react';
import { View, Text, ScrollView, Pressable, TextInput, Modal, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '../../src/theme/ThemeContext';
import { Icon, IconName } from '../../src/components/Icon';
import { ParticleBackground } from '../../src/components/ParticleBackground';

// Parse content with [iconName] tags and render mixed text + icons
function renderJournalContent(content: string, accent: string) {
  const parts = content.split(/(\[[\w-]+\])/g);
  return parts.map((part, i) => {
    const match = part.match(/^\[([\w-]+)\]$/);
    if (match) {
      const iconName = match[1] as IconName;
      return (
        <Icon key={i} name={iconName} size={18} color={accent} strokeWidth={1.2} />
      );
    }
    return <Text key={i} style={{ fontSize: 15, lineHeight: 26, color: '#D8D0E8' }}>{part}</Text>;
  });
}

const JOURNAL_KEY = '@witch_journal_entries';

interface JournalEntry {
  id: string;
  title: string;
  content: string;
  date: string;
  timestamp: number;
  mood: IconName;
}

const MOODS: { icon: IconName; label: string }[] = [
  { icon: 'moon', label: '神秘' },
  { icon: 'star', label: '希望' },
  { icon: 'leaf', label: '平静' },
  { icon: 'flame', label: '激情' },
  { icon: 'crystal', label: '专注' },
  { icon: 'wave', label: '流动' },
  { icon: 'crescent', label: '直觉' },
  { icon: 'orb', label: '沉思' },
  { icon: 'cloud', label: '忧郁' },
  { icon: 'lightning', label: '觉醒' },
];

const STICKER_OPTIONS: { icon: IconName; label: string }[] = [
  { icon: 'crescent', label: '新月' },
  { icon: 'star', label: '星辰' },
  { icon: 'pentagram', label: '五芒星' },
  { icon: 'crystal', label: '水晶' },
  { icon: 'flame', label: '火焰' },
  { icon: 'leaf', label: '树叶' },
  { icon: 'feather', label: '羽毛' },
  { icon: 'bell', label: '铜铃' },
  { icon: 'wand', label: '魔杖' },
  { icon: 'candle', label: '蜡烛' },
  { icon: 'chalice', label: '圣杯' },
  { icon: 'wave', label: '海浪' },
  { icon: 'tree', label: '古树' },
  { icon: 'owl', label: '猫头鹰' },
  { icon: 'raven', label: '渡鸦' },
  { icon: 'cat', label: '黑猫' },
  { icon: 'snake', label: '蛇' },
  { icon: 'flower', label: '花' },
  { icon: 'sun', label: '太阳' },
  { icon: 'key', label: '钥匙' },
];

export default function JournalScreen() {
  const { witchType } = useTheme();
  const p = witchType?.palette;
  const accent = p?.accent || '#C9A84C';
  const surface = p?.surface || '#1E1138';
  const primary = p?.primary || '#2D1B4E';

  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [showEditor, setShowEditor] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingTitle, setEditingTitle] = useState('');
  const [editingContent, setEditingContent] = useState('');
  const [editingMood, setEditingMood] = useState<IconName>('moon');
  const [selectedEntry, setSelectedEntry] = useState<JournalEntry | null>(null);
  const [showStickers, setShowStickers] = useState(false);
  const [moodFilter, setMoodFilter] = useState<IconName | null>(null);

  useEffect(() => { loadEntries(); }, []);

  const loadEntries = async () => {
    try {
      const stored = await AsyncStorage.getItem(JOURNAL_KEY);
      if (stored) setEntries(JSON.parse(stored));
    } catch {}
  };

  const saveEntries = async (newEntries: JournalEntry[]) => {
    setEntries(newEntries);
    await AsyncStorage.setItem(JOURNAL_KEY, JSON.stringify(newEntries));
  };

  const handleSave = async () => {
    if (!editingTitle.trim()) return;
    if (editingId) {
      // Update existing entry
      const updated = entries.map(e =>
        e.id === editingId
          ? { ...e, title: editingTitle, content: editingContent, mood: editingMood }
          : e
      );
      await saveEntries(updated);
    } else {
      // Create new entry
      const entry: JournalEntry = {
        id: Date.now().toString(),
        title: editingTitle,
        content: editingContent,
        date: new Date().toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' }),
        timestamp: Date.now(),
        mood: editingMood,
      };
      await saveEntries([entry, ...entries]);
    }
    setEditingId(null);
    setEditingTitle('');
    setEditingContent('');
    setEditingMood('moon');
    setShowEditor(false);
  };

  const handleEdit = (entry: JournalEntry) => {
    setEditingId(entry.id);
    setEditingTitle(entry.title);
    setEditingContent(entry.content);
    setEditingMood(entry.mood);
    setSelectedEntry(null);
    setShowEditor(true);
  };

  const handleDelete = async (id: string) => {
    await saveEntries(entries.filter((e) => e.id !== id));
    setSelectedEntry(null);
  };

  const handleNewEntry = () => {
    setEditingId(null);
    setEditingTitle('');
    setEditingContent('');
    setEditingMood('moon');
    setShowEditor(true);
  };

  const insertStickerIcon = (sticker: IconName) => {
    setEditingContent((prev) => prev + ` [${sticker}] `);
    setShowStickers(false);
  };

  // Filter entries by mood
  const filteredEntries = moodFilter ? entries.filter(e => e.mood === moodFilter) : entries;

  // Group entries by date
  const groupedEntries: { date: string; entries: JournalEntry[] }[] = [];
  filteredEntries.forEach(entry => {
    const lastGroup = groupedEntries[groupedEntries.length - 1];
    if (lastGroup && lastGroup.date === entry.date) {
      lastGroup.entries.push(entry);
    } else {
      groupedEntries.push({ date: entry.date, entries: [entry] });
    }
  });

  return (
    <View style={{ flex: 1, backgroundColor: '#0D0618' }}>
      <ParticleBackground color={accent} density={0.2} />
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 40 }}>
        {/* Header */}
        <View style={{ paddingHorizontal: 24, paddingTop: 64, paddingBottom: 16, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <View>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 4 }}>
              <Icon name="book" size={20} color={accent} strokeWidth={1.2} />
              <Text style={{ fontFamily: 'serif', fontSize: 26, color: accent, letterSpacing: 3 }}>阴影之书</Text>
            </View>
            <Text style={{ color: '#6B5B7B', fontSize: 12, marginLeft: 28 }}>
              {entries.length > 0 ? `${entries.length} 条记录` : '记录你的魔法旅程'}
            </Text>
          </View>
          <Pressable
            onPress={handleNewEntry}
            style={{
              width: 44, height: 44, borderRadius: 22,
              borderWidth: 1, borderColor: `${accent}40`,
              backgroundColor: `${primary}30`,
              alignItems: 'center', justifyContent: 'center',
            }}
          >
            <Icon name="plus" size={20} color={accent} strokeWidth={1.5} />
          </Pressable>
        </View>

        {/* Mood Filter */}
        {entries.length > 0 && (
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 12, paddingLeft: 16 }} contentContainerStyle={{ gap: 6, paddingRight: 16 }}>
            <Pressable
              onPress={() => setMoodFilter(null)}
              style={{
                flexDirection: 'row', alignItems: 'center', gap: 4,
                borderRadius: 20, paddingHorizontal: 12, paddingVertical: 6,
                borderWidth: 1,
                borderColor: moodFilter === null ? accent : 'rgba(201,168,76,0.1)',
                backgroundColor: moodFilter === null ? `${accent}10` : 'transparent',
              }}
            >
              <Text style={{ fontSize: 11, color: moodFilter === null ? accent : '#8B7B9B' }}>全部</Text>
            </Pressable>
            {MOODS.map((mood) => {
              const count = entries.filter(e => e.mood === mood.icon).length;
              if (count === 0) return null;
              return (
                <Pressable
                  key={mood.icon}
                  onPress={() => setMoodFilter(moodFilter === mood.icon ? null : mood.icon)}
                  style={{
                    flexDirection: 'row', alignItems: 'center', gap: 4,
                    borderRadius: 20, paddingHorizontal: 10, paddingVertical: 6,
                    borderWidth: 1,
                    borderColor: moodFilter === mood.icon ? accent : 'rgba(201,168,76,0.1)',
                    backgroundColor: moodFilter === mood.icon ? `${accent}10` : 'transparent',
                  }}
                >
                  <Icon name={mood.icon} size={14} color={moodFilter === mood.icon ? accent : '#8B7B9B'} strokeWidth={1.2} />
                  <Text style={{ fontSize: 10, color: moodFilter === mood.icon ? accent : '#8B7B9B' }}>{mood.label}</Text>
                  <Text style={{ fontSize: 9, color: '#6B5B7B' }}>{count}</Text>
                </Pressable>
              );
            })}
          </ScrollView>
        )}

        {/* Entries grouped by date */}
        {filteredEntries.length === 0 ? (
          <View style={{ alignItems: 'center', justifyContent: 'center', paddingVertical: 60, paddingHorizontal: 32 }}>
            <View style={{ width: 72, height: 72, borderRadius: 36, borderWidth: 1, borderColor: `${accent}15`, alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
              <Icon name="book" size={36} color={`${accent}20`} strokeWidth={1} />
            </View>
            <Text style={{ color: '#D8D0E8', fontSize: 16, textAlign: 'center', marginBottom: 8 }}>
              {moodFilter ? '没有此心情的记录' : '你的阴影之书还是空白的'}
            </Text>
            <Text style={{ color: '#6B5B7B', fontSize: 13, textAlign: 'center', lineHeight: 22 }}>
              {moodFilter ? '试试其他心情筛选' : '点击右上角的 + 开始记录\n你的魔法、梦境、仪式和每日所思'}
            </Text>
          </View>
        ) : (
          <View style={{ paddingHorizontal: 16 }}>
            {groupedEntries.map((group, gi) => (
              <View key={gi}>
                {/* Date header */}
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginVertical: 10, marginLeft: 4 }}>
                  <Icon name="crescent" size={8} color={`${accent}40`} strokeWidth={1} fill />
                  <Text style={{ color: accent, fontSize: 11, fontFamily: 'serif', letterSpacing: 2 }}>{group.date}</Text>
                  <View style={{ flex: 1, height: 1, backgroundColor: `${accent}08` }} />
                  <Text style={{ color: '#6B5B7B', fontSize: 10 }}>{group.entries.length} 篇</Text>
                </View>
                {/* Entries */}
                <View style={{ gap: 10 }}>
                  {group.entries.map((entry) => (
                    <Pressable
                      key={entry.id}
                      onPress={() => setSelectedEntry(entry)}
                      style={({ pressed }) => ({
                        borderRadius: 14,
                        padding: 16,
                        borderWidth: 1,
                        borderColor: pressed ? `${accent}20` : 'rgba(201,168,76,0.06)',
                        backgroundColor: pressed ? `${surface}95` : surface,
                      })}
                    >
                      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, flex: 1 }}>
                          <Icon name={entry.mood} size={22} color={accent} strokeWidth={1.2} />
                          <Text style={{ fontFamily: 'serif', fontSize: 16, color: accent, flex: 1 }} numberOfLines={1}>
                            {entry.title}
                          </Text>
                        </View>
                      </View>
                      <Text style={{ fontSize: 13, lineHeight: 20, color: '#D8D0E8', marginLeft: 32 }} numberOfLines={3}>
                        {entry.content.replace(/\[[\w-]+\]/g, '✦ ')}
                      </Text>
                    </Pressable>
                  ))}
                </View>
              </View>
            ))}
          </View>
        )}
      </ScrollView>

      {/* Editor Modal */}
      <Modal visible={showEditor} animationType="slide" transparent>
        <View style={{ flex: 1, backgroundColor: 'rgba(13,6,24,0.98)' }}>
          <View style={{ flex: 1, paddingHorizontal: 20, paddingTop: 52 }}>
            {/* Editor Header */}
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
              <Pressable onPress={() => { setShowEditor(false); setEditingId(null); }}>
                <Text style={{ color: '#8B7B9B', fontSize: 16 }}>取消</Text>
              </Pressable>
              <Text style={{ fontFamily: 'serif', fontSize: 20, color: accent }}>{editingId ? '编辑记录' : '新记录'}</Text>
              <Pressable onPress={handleSave}>
                <Text style={{ fontFamily: 'serif', fontSize: 16, color: accent }}>保存</Text>
              </Pressable>
            </View>

            {/* Mood Picker */}
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 16 }} contentContainerStyle={{ gap: 6 }}>
              {MOODS.map((mood) => (
                <Pressable
                  key={mood.icon}
                  onPress={() => setEditingMood(mood.icon)}
                  style={{
                    width: 40, height: 40, borderRadius: 20,
                    alignItems: 'center', justifyContent: 'center',
                    borderWidth: 1,
                    borderColor: editingMood === mood.icon ? accent : 'transparent',
                    backgroundColor: editingMood === mood.icon ? `${accent}15` : 'transparent',
                  }}
                >
                  <Icon name={mood.icon} size={20} color={editingMood === mood.icon ? accent : '#6B5B7B'} strokeWidth={1.2} />
                </Pressable>
              ))}
            </ScrollView>

            {/* Title */}
            <TextInput
              value={editingTitle}
              onChangeText={setEditingTitle}
              placeholder="标题..."
              placeholderTextColor="#5C4A7A"
              style={{ fontFamily: 'serif', fontSize: 22, color: accent, marginBottom: 12 }}
            />

            {/* Content */}
            <TextInput
              value={editingContent}
              onChangeText={setEditingContent}
              placeholder="写下你的想法、感受、魔法记录..."
              placeholderTextColor="#5C4A7A"
              multiline
              style={{ flex: 1, color: '#D8D0E8', fontSize: 15, lineHeight: 24, textAlignVertical: 'top' }}
            />

            {/* Sticker Toggle */}
            <View style={{ paddingVertical: 12, borderTopWidth: 1, borderTopColor: 'rgba(201,168,76,0.08)' }}>
              <Pressable onPress={() => setShowStickers(!showStickers)} style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                <Icon name="sparkle" size={12} color="#8B7B9B" strokeWidth={1} />
                <Text style={{ color: '#8B7B9B', fontSize: 12 }}>{showStickers ? '收起贴纸' : '插入魔法符号'}</Text>
              </Pressable>
              {showStickers && (
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginTop: 10 }} contentContainerStyle={{ gap: 6 }}>
                  {STICKER_OPTIONS.map((s) => (
                    <Pressable
                      key={s.icon}
                      onPress={() => insertStickerIcon(s.icon)}
                      style={{ width: 36, height: 36, borderRadius: 8, alignItems: 'center', justifyContent: 'center', backgroundColor: `${accent}08` }}
                    >
                      <Icon name={s.icon} size={18} color="#8B7B9B" strokeWidth={1.2} />
                    </Pressable>
                  ))}
                </ScrollView>
              )}
            </View>
          </View>
        </View>
      </Modal>

      {/* Entry Detail Modal */}
      <Modal visible={!!selectedEntry} animationType="slide" transparent>
        <View style={{ flex: 1, backgroundColor: 'rgba(13,6,24,0.98)' }}>
          {selectedEntry && (
            <ScrollView style={{ flex: 1, paddingHorizontal: 20, paddingTop: 52 }} contentContainerStyle={{ paddingBottom: 40 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                <Pressable onPress={() => setSelectedEntry(null)}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                    <Icon name="arrow-left" size={12} color="#8B7B9B" strokeWidth={1.5} />
                    <Text style={{ color: '#8B7B9B', fontSize: 16 }}>返回</Text>
                  </View>
                </Pressable>
                <View style={{ flexDirection: 'row', gap: 16 }}>
                  <Pressable onPress={() => handleEdit(selectedEntry)}>
                    <Text style={{ color: accent, fontSize: 13 }}>编辑</Text>
                  </Pressable>
                  <Pressable onPress={() => handleDelete(selectedEntry.id)}>
                    <Text style={{ color: '#6B3A5B', fontSize: 13 }}>删除</Text>
                  </Pressable>
                </View>
              </View>
              {/* Decorative mood emblem */}
              <View style={{ alignItems: 'center', marginBottom: 20 }}>
                <View style={{ width: 64, height: 64, borderRadius: 32, borderWidth: 1, borderColor: `${accent}20`, alignItems: 'center', justifyContent: 'center', backgroundColor: `${primary}15` }}>
                  <Icon name={selectedEntry.mood} size={32} color={accent} strokeWidth={1} />
                </View>
              </View>
              <Text style={{ fontFamily: 'serif', fontSize: 26, color: accent, marginBottom: 6, textAlign: 'center' }}>{selectedEntry.title}</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, marginBottom: 24 }}>
                <View style={{ width: 12, height: 1, backgroundColor: `${accent}20` }} />
                <Text style={{ color: '#6B5B7B', fontSize: 12 }}>{selectedEntry.date}</Text>
                <View style={{ width: 12, height: 1, backgroundColor: `${accent}20` }} />
              </View>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap', alignItems: 'flex-start' }}>
                {renderJournalContent(selectedEntry.content, accent)}
              </View>
            </ScrollView>
          )}
        </View>
      </Modal>
    </View>
  );
}
