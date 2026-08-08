import { IconName } from '../components/Icon';

export interface Achievement {
  id: string;
  name: string;
  nameEn: string;
  desc: string;
  icon: IconName;
  check: (stats: WitchStats) => boolean;
}

export interface WitchStats {
  divinationCount: number;
  runeCount: number;
  journalCount: number;
  spellCount: number;
  celticCrossUsed: boolean;
  threeRuneUsed: boolean;
  visitHour: number;
  moonIllumination: number;
  streak: number;
}

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'first_divination',
    name: '初次占卜',
    nameEn: 'First Divination',
    desc: '完成你的第一次塔罗占卜',
    icon: 'cards',
    check: (s) => s.divinationCount >= 1,
  },
  {
    id: 'first_rune',
    name: '符文低语',
    nameEn: 'Rune Whisper',
    desc: '投掷你的第一枚符文',
    icon: 'rune',
    check: (s) => s.runeCount >= 1,
  },
  {
    id: 'first_journal',
    name: '执笔之夜',
    nameEn: 'First Night',
    desc: '在阴影之书中写下第一篇记录',
    icon: 'book',
    check: (s) => s.journalCount >= 1,
  },
  {
    id: 'first_spell',
    name: '初次施法',
    nameEn: 'First Spell',
    desc: '在祭坛上完成第一次施法',
    icon: 'wand',
    check: (s) => s.spellCount >= 1,
  },
  {
    id: 'celtic_master',
    name: '十字大师',
    nameEn: 'Cross Master',
    desc: '使用凯尔特十字牌阵',
    icon: 'cross',
    check: (s) => s.celticCrossUsed,
  },
  {
    id: 'rune_master',
    name: '符文大师',
    nameEn: 'Rune Master',
    desc: '投掷三枚符文进行占卜',
    icon: 'sparkle',
    check: (s) => s.threeRuneUsed,
  },
  {
    id: 'journal_keeper',
    name: '记录者',
    nameEn: 'The Scribe',
    desc: '在阴影之书中写下5篇记录',
    icon: 'feather',
    check: (s) => s.journalCount >= 5,
  },
  {
    id: 'spell_caster',
    name: '施法者',
    nameEn: 'Spell Caster',
    desc: '在祭坛上施法5次',
    icon: 'flame',
    check: (s) => s.spellCount >= 5,
  },
  {
    id: 'diviner',
    name: '占卜师',
    nameEn: 'The Diviner',
    desc: '完成10次占卜',
    icon: 'eye',
    check: (s) => s.divinationCount >= 10,
  },
  {
    id: 'moon_watcher',
    name: '赏月者',
    nameEn: 'Moon Watcher',
    desc: '在满月之夜访问应用',
    icon: 'moon',
    check: (s) => s.moonIllumination >= 95,
  },
  {
    id: 'night_owl',
    name: '夜枭',
    nameEn: 'Night Owl',
    desc: '在子夜时分（0-4点）访问应用',
    icon: 'orb',
    check: (s) => s.visitHour >= 0 && s.visitHour < 4,
  },
  {
    id: 'early_bird',
    name: '晨曦行者',
    nameEn: 'Dawn Walker',
    desc: '在黎明时分（4-7点）访问应用',
    icon: 'sun',
    check: (s) => s.visitHour >= 4 && s.visitHour < 7,
  },
  {
    id: 'streak_3',
    name: '三日之约',
    nameEn: 'Three Day Pact',
    desc: '连续3天访问应用',
    icon: 'candle',
    check: (s) => s.streak >= 3,
  },
  {
    id: 'streak_7',
    name: '七日之环',
    nameEn: 'Seven Day Circle',
    desc: '连续7天访问应用',
    icon: 'pentagram',
    check: (s) => s.streak >= 7,
  },
];

export const ACHIEVEMENT_KEY = '@witch_achievements';
export const STREAK_KEY = '@witch_streak';
