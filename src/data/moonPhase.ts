import type { IconName } from '../components/Icon';

export interface MoonPhase {
  name: string;
  nameEn: string;
  icon: IconName;
  illumination: number; // 0-100
  emoji: string;
  meaning: string;
}

/**
 * Calculate the moon phase for a given date.
 * Based on a known new moon date (2000-01-06 18:14 UTC) and the synodic month length.
 */
export function getMoonPhase(date: Date = new Date()): MoonPhase {
  // Known new moon: January 6, 2000, 18:14 UTC
  const knownNewMoon = new Date(Date.UTC(2000, 0, 6, 18, 14, 0));
  const synodicMonth = 29.53058867; // days

  const diffMs = date.getTime() - knownNewMoon.getTime();
  const diffDays = diffMs / (1000 * 60 * 60 * 24);
  const phase = ((diffDays % synodicMonth) + synodicMonth) % synodicMonth;
  const phaseFraction = phase / synodicMonth;

  // Illumination: 0 at new moon, 1 at full moon
  // Using a cosine curve: cos(2π * (phase - 0.5)) gives -1 at new moon, 1 at full moon
  const illumination = Math.round((0.5 * (1 - Math.cos(2 * Math.PI * phaseFraction))) * 100);

  // Determine phase name
  if (phaseFraction < 0.03 || phaseFraction > 0.97) {
    return { name: '新月', nameEn: 'New Moon', icon: 'orb', illumination, emoji: '🌑', meaning: '新的开始，播种意图的时机。设定你的目标，让它们在月光中生长。' };
  } else if (phaseFraction < 0.22) {
    return { name: '蛾眉月', nameEn: 'Waxing Crescent', icon: 'crescent', illumination, emoji: '🌒', meaning: '萌芽与成长。你的意图正在扎根，保持耐心和信念。' };
  } else if (phaseFraction < 0.28) {
    return { name: '上弦月', nameEn: 'First Quarter', icon: 'crescent', illumination, emoji: '🌓', meaning: '行动与决断。是时候迈出关键一步，克服路上的障碍。' };
  } else if (phaseFraction < 0.47) {
    return { name: '盈凸月', nameEn: 'Waxing Gibbous', icon: 'crescent', illumination, emoji: '🌔', meaning: '调整与完善。回顾你的进展，微调方向，为丰收做准备。' };
  } else if (phaseFraction < 0.53) {
    return { name: '满月', nameEn: 'Full Moon', icon: 'moon', illumination, emoji: '🌕', meaning: '圆满与显现。能量达到顶峰，是充电、释放和庆祝的时刻。' };
  } else if (phaseFraction < 0.72) {
    return { name: '亏凸月', nameEn: 'Waning Gibbous', icon: 'moon', illumination, emoji: '🌖', meaning: '感恩与分享。收获已经到来，表达感激，分享你的丰盛。' };
  } else if (phaseFraction < 0.78) {
    return { name: '下弦月', nameEn: 'Last Quarter', icon: 'crescent', illumination, emoji: '🌗', meaning: '释放与放下。清理不再需要的东西，为新的循环腾出空间。' };
  } else {
    return { name: '残月', nameEn: 'Waning Crescent', icon: 'crescent', illumination, emoji: '🌘', meaning: '休息与内省。安静地反思这个月循环，倾听内在的智慧。' };
  }
}

/**
 * Get the next full moon date
 */
export function getNextFullMoon(date: Date = new Date()): Date {
  const knownNewMoon = new Date(Date.UTC(2000, 0, 6, 18, 14, 0));
  const synodicMonth = 29.53058867;
  const diffMs = date.getTime() - knownNewMoon.getTime();
  const diffDays = diffMs / (1000 * 60 * 60 * 24);
  const currentPhase = ((diffDays % synodicMonth) + synodicMonth) % synodicMonth;
  const daysToFullMoon = (0.5 * synodicMonth - currentPhase + synodicMonth) % synodicMonth;
  return new Date(date.getTime() + daysToFullMoon * 24 * 60 * 60 * 1000);
}
