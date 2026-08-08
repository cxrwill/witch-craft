/**
 * 24 Elder Futhark Runes — 符文占卜数据
 * Each rune has upright and reversed meanings
 */

export interface Rune {
  id: number;
  name: string;
  nameEn: string;
  symbol: string;
  meaningUpright: string;
  meaningReversed: string;
  keywords: string[];
  element: string;
  reversed: boolean;
}

const RUNE_DATA: Omit<Rune, 'reversed'>[] = [
  { id: 0, name: '财富', nameEn: 'Fehu', symbol: 'ᚠ', element: '火',
    meaningUpright: '丰饶与财富降临。你的努力正在结出果实，物质和精神上的丰盛都在增长。分享你的富足，让它流动。',
    meaningReversed: '失去或贪婪。财富可能带来束缚——检查你是否被物质所困，或在关系中失去了公平。',
    keywords: ['财富', '丰饶', '成功', '流动'] },
  { id: 1, name: '力量', nameEn: 'Uruz', symbol: 'ᚢ', element: '土',
    meaningUpright: '原始的力量与生命力。你拥有克服任何障碍的内在能量。像野牛一样坚定地站立——你的力量不容忽视。',
    meaningReversed: '力量被误用或枯竭。你可能在强行推进或感到无力。找回你的生命力的源泉。',
    keywords: ['力量', '勇气', '健康', '意志'] },
  { id: 2, name: '沟通', nameEn: 'Thurisaz', symbol: 'ᚦ', element: '火',
    meaningUpright: '保护与防御。荆棘守护着你的边界。某些看似尖锐的挑战实际上是保护你免受更大的伤害。',
    meaningReversed: '内部的冲突或被攻击。审视你的防御是否变成了攻击——真正的力量不需要刺伤别人。',
    keywords: ['保护', '防御', '挑战', '觉醒'] },
  { id: 3, name: '神圣', nameEn: 'Ansuz', symbol: 'ᚨ', element: '风',
    meaningUpright: '智慧与神圣的讯息。一扇理解之门正在打开。倾听长者的建议、内心的声音或宇宙的密语。',
    meaningReversed: '误解或被操纵。你可能在忽视一个重要的信息，或被虚假的权威所误导。回归你自己的判断力。',
    keywords: ['智慧', '讯息', '沟通', '灵感'] },
  { id: 4, name: '旅程', nameEn: 'Raidho', symbol: 'ᚱ', element: '火',
    meaningUpright: '旅程与节奏。你正在正确的道路上。无论是物理的旅行还是灵魂的探索，相信旅途本身——每一步都有意义。',
    meaningReversed: '偏离方向或被迫改变计划。你可能在抗拒必要的调整。有时候绕路才是通往目的地的最佳路径。',
    keywords: ['旅程', '节奏', '方向', '流动'] },
  { id: 5, name: '火炬', nameEn: 'Kenaz', symbol: 'ᚲ', element: '火',
    meaningUpright: '启示与创造力。火炬照亮了黑暗中的道路。你的灵感正在燃烧——现在是用它创造的时候。',
    meaningReversed: '黑暗或失去方向。创造力的火焰暂时减弱。不要恐慌——退入黑暗中休息，光会再次点燃。',
    keywords: ['启示', '创造', '知识', '热情'] },
  { id: 6, name: '礼物', nameEn: 'Gebo', symbol: 'ᚷ', element: '风',
    meaningUpright: '给予与接受的平衡。一份礼物或伙伴关系正在到来。真正的礼物不附条件——它创造了一种神圣的交换。',
    meaningReversed: '失衡的交换。你可能在过度给予或过度接受。检查关系中的天平——真正的平衡需要双方的投入。',
    keywords: ['礼物', '平衡', '伙伴', '交换'] },
  { id: 7, name: '喜悦', nameEn: 'Wunjo', symbol: 'ᚹ', element: '土',
    meaningUpright: '喜悦与和谐。你正在与正确的频率对齐。快乐不是目标，而是正确生活的副产品——你做对了。',
    meaningReversed: '疏离或不满。你可能与自己的真实渴望脱节。是什么在消耗你的快乐？诚实面对它。',
    keywords: ['喜悦', '和谐', '满足', '归属'] },
  { id: 8, name: '冰雹', nameEn: 'Hagalaz', symbol: 'ᚺ', element: '水',
    meaningUpright: '不可控的力量与必要的破坏。风暴来了，但它打破了旧的为新的让路。你无法控制天气，但你可以选择如何面对。',
    meaningReversed: 'Hagalaz没有逆位——破坏是宇宙中性力量。接受它带来的改变，在废墟中寻找新的可能。',
    keywords: ['破坏', '转变', '命运', '重生'] },
  { id: 9, name: '需求', nameEn: 'Nauthiz', symbol: 'ᚾ', element: '火',
    meaningUpright: '需求与忍耐。匮乏感揭示了什么对你真正重要。耐心等待——限制会教你最深刻的智慧。',
    meaningReversed: '被需求所困或压抑欲望。你可能在用"需要"代替"想要"。审视什么是真正的必需。',
    keywords: ['需求', '耐心', '限制', '智慧'] },
  { id: 10, name: '冰', nameEn: 'Isa', symbol: 'ᛁ', element: '水',
    meaningUpright: '静止与暂停。一切凝固了。这不是停滞，而是酝酿。像冬天的种子一样——表面安静，内在在积蓄力量。',
    meaningReversed: 'Isa没有逆位——冰就是冰。接受这份静止，不要强求变化。春天终会到来。',
    keywords: ['静止', '暂停', '积蓄', '等待'] },
  { id: 11, name: '丰收', nameEn: 'Jera', symbol: 'ᛃ', element: '土',
    meaningUpright: '丰收与循环。你种下的种子正在成熟。好事物需要时间——耐心等待，收获终将到来。',
    meaningReversed: 'Jera没有逆位——自然法则不可逆转。检查你是否在正确的季节播种，或者是否需要更长的等待。',
    keywords: ['丰收', '循环', '耐心', '回报'] },
  { id: 12, name: '紫杉', nameEn: 'Eihwaz', symbol: 'ᛇ', element: '所有',
    meaningUpright: '转变与忍耐。紫杉树连接生与死、过去与未来。你正在经历一次深刻的转变——相信这个过程。',
    meaningReversed: 'Eihwaz没有逆位——它是宇宙的中轴。面对转变，不要抗拒。紫杉是最坚韧的树。',
    keywords: ['转变', '忍耐', '连接', '坚韧'] },
  { id: 13, name: '秘密', nameEn: 'Perthro', symbol: 'ᛈ', element: '水',
    meaningUpright: '命运的秘密与惊喜。命运之杯中藏着未知。一些隐藏的事物即将浮现——保持开放和好奇。',
    meaningReversed: '失望或不被接受的秘密。你可能在揭开不该揭开的帷幕。尊重神秘——不是所有事都需要被知道。',
    keywords: ['秘密', '命运', '神秘', '惊喜'] },
  { id: 14, name: '保护', nameEn: 'Algiz', symbol: 'ᛉ', element: '风',
    meaningUpright: '保护与屏蔽。你的守护力量正在工作。像伸展的鹿角一样——防御不需要攻击，只需要坚定的存在。',
    meaningReversed: '脆弱或过度防御。你可能暴露了不该暴露的地方，或筑起了太高的墙。找到真正的安全感。',
    keywords: ['保护', '屏蔽', '守护', '连接'] },
  { id: 15, name: '太阳', nameEn: 'Sowilo', symbol: 'ᛋ', element: '火',
    meaningUpright: '胜利与生命力。太阳的能量在你体内燃烧。你正走在正确的道路上——成功和清晰都在指引你。',
    meaningReversed: 'Sowilo没有逆位——太阳永远照耀。如果你感到阴影，那只是因为你背对着光。转过身来。',
    keywords: ['胜利', '能量', '清晰', '成功'] },
  { id: 16, name: '白桦', nameEn: 'Berkana', symbol: 'ᛒ', element: '土',
    meaningUpright: '新生与成长。白桦是春天的树——新的开始正在萌芽。温柔地呵护这个新生命，它需要你的耐心。',
    meaningReversed: '停滞或新生受阻。某些应该成长的事情被卡住了。检查土壤——是否有足够的养分和光照？',
    keywords: ['新生', '成长', '孕育', '温柔'] },
  { id: 17, name: '马', nameEn: 'Ehwaz', symbol: 'ᛖ', element: '土',
    meaningUpright: '伙伴与进步。骑士与马之间的信任——这是真正的合作。你与某人或某种力量的协作正在带你前进。',
    meaningReversed: '不信任或停滞。合作关系出现了裂缝。沟通是关键——你的"马"需要知道你信任它。',
    keywords: ['伙伴', '信任', '进步', '协作'] },
  { id: 18, name: '人类', nameEn: 'Mannaz', symbol: 'ᛗ', element: '风',
    meaningUpright: '自我与社群。你正在理解自己在更大图景中的位置。他人的镜子映照出你的真相——不要回避。',
    meaningReversed: '孤立或迷失自我。你可能在人群中感到孤独，或为了融入而失去了自己。回归你的核心。',
    keywords: ['自我', '社群', '反思', '归属'] },
  { id: 19, name: '水', nameEn: 'Laguz', symbol: 'ᛚ', element: '水',
    meaningUpright: '直觉与流动。水的智慧在你体内流淌。信任你的感受——它们比理性更早知道真相。随波而行。',
    meaningReversed: '迷失在情绪中或阻塞直觉。你可能被情绪淹没，或切断了与内在感受的连接。找到你的流动。',
    keywords: ['直觉', '流动', '情感', '潜意识'] },
  { id: 20, name: '火把', nameEn: 'Ingwaz', symbol: 'ᛜ', element: '火',
    meaningUpright: '完成与释放。一个阶段圆满结束。像种子落入土壤——旧的形态消解，新的潜能正在酝酿。休息。',
    meaningReversed: '未完成的循环或无法放手。你可能在拖延一个必要的结束。完成它——新的开始正在等待。',
    keywords: ['完成', '释放', '过渡', '休憩'] },
  { id: 21, name: '日子', nameEn: 'Dagaz', symbol: 'ᛞ', element: '火',
    meaningUpright: '突破与觉醒。黎明破晓，黑暗消散。你正在经历一次意识的跃迁——一切突然变得清晰。',
    meaningReversed: 'Dagaz没有逆位——黎明总是到来。如果你还看不到光，你正处于黎明前最暗的时刻。坚持住。',
    keywords: ['觉醒', '突破', '希望', '转变'] },
  { id: 22, name: '家园', nameEn: 'Othala', symbol: 'ᛟ', element: '土',
    meaningUpright: '传承与归属。你的根在召唤你。无论是家族、传统还是你创造的家——回归你的根基会给你力量。',
    meaningReversed: '割裂或被过去束缚。你可能与根源断联，或被传统所困。辨别什么该传承，什么该释放。',
    keywords: ['传承', '归属', '根源', '家园'] },
];

export const RUNES: Rune[] = RUNE_DATA.map(r => ({ ...r, reversed: false }));

export function drawRandomRune(): Rune {
  const rune = RUNE_DATA[Math.floor(Math.random() * RUNE_DATA.length)];
  return { ...rune, reversed: Math.random() > 0.6 };
}

export function drawThreeRunes(): Rune[] {
  const pool = [...RUNE_DATA];
  const drawn: Rune[] = [];
  const used = new Set<number>();
  while (drawn.length < 3) {
    const idx = Math.floor(Math.random() * pool.length);
    if (!used.has(idx)) {
      used.add(idx);
      drawn.push({ ...pool[idx], reversed: Math.random() > 0.6 });
    }
  }
  return drawn;
}
