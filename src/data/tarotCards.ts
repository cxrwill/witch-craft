export interface TarotCard {
  id: number;
  name: string;
  nameEn: string;
  iconKey: string;
  type: 'major' | 'minor';
  suit?: 'cups' | 'wands' | 'swords' | 'pentacles';
  rank?: string;
  meaningUpright: string;
  meaningReversed: string;
  keywords: string[];
  reversed: boolean;
}

import type { IconName } from '../components/Icon';

/* ==================== 22 Major Arcana ==================== */

const MAJOR_ARCANA: Omit<TarotCard, 'reversed'>[] = [
  { id: 0, name: '愚者', nameEn: 'The Fool', iconKey: 'star', type: 'major',
    meaningUpright: '新的开始，冒险的召唤。信任宇宙的指引，勇敢迈出第一步。不要过度计划——有时最伟大的旅程始于最轻盈的脚步。',
    meaningReversed: '犹豫不决，害怕未知。你可能在逃避一个必要的改变。审视内心，究竟是什么在阻止你起跳？',
    keywords: ['开始', '冒险', '自由', '天真'] },
  { id: 1, name: '魔术师', nameEn: 'The Magician', iconKey: 'wand', type: 'major',
    meaningUpright: '你拥有所有必要的工具和资源。现在是行动的时刻——将你的意图转化为现实。你的意志力与宇宙能量正在对齐，一切皆有可能。',
    meaningReversed: '能量被阻塞或滥用。你可能在使用自己的天赋操纵他人，或对自己的能力缺乏信心。检查你的意图是否纯净。',
    keywords: ['力量', '创造', '意志', '显化'] },
  { id: 2, name: '女祭司', nameEn: 'The High Priestess', iconKey: 'crescent', type: 'major',
    meaningUpright: '相信你的直觉。答案不在外部世界中，而在你内心深处。深入潜意识的领域，那里藏着古老的智慧。保持沉默，倾听内在的声音。',
    meaningReversed: '忽视直觉，被表象迷惑。你可能压抑了自己的内在声音，或过度依赖他人的意见。重新学习倾听自己。',
    keywords: ['直觉', '神秘', '潜意识', '内在智慧'] },
  { id: 3, name: '女皇', nameEn: 'The Empress', iconKey: 'flower', type: 'major',
    meaningUpright: '丰饶与创造的时期。像大地一样滋养自己和他人。创造力正在流动——无论是艺术、关系还是项目，现在都是生长的季节。',
    meaningReversed: '创造力枯竭，过度依赖他人。你可能在忽视自己的需求，或沉迷于物质舒适而忽略了灵魂的成长。',
    keywords: ['丰饶', '母性', '自然', '创造力'] },
  { id: 4, name: '皇帝', nameEn: 'The Emperor', iconKey: 'mountain', type: 'major',
    meaningUpright: '秩序、结构和纪律是你的盟友。建立稳固的基础，掌控你的领地。用理性的力量和坚定的意志引领自己和他人。',
    meaningReversed: '滥用权力或缺乏自律。你可能过于控制或完全失控。找到真正的领导力——它既不是专制也不是软弱。',
    keywords: ['权威', '结构', '掌控', '稳定'] },
  { id: 5, name: '教皇', nameEn: 'The Hierophant', iconKey: 'book', type: 'major',
    meaningUpright: '寻求智慧和传统的指引。现在是学习、教导或接受精神指导的时机。仪式和传统有着深刻的智慧——但它们应该服务于你的成长。',
    meaningReversed: '盲目遵从传统，或被教条所困。你可能需要打破常规，寻找自己的道路。质疑权威，但不为叛逆而叛逆。',
    keywords: ['传统', '智慧', '指引', '仪式'] },
  { id: 6, name: '恋人', nameEn: 'The Lovers', iconKey: 'flame', type: 'major',
    meaningUpright: '重要的选择摆在面前——通常关乎爱、价值观或人际关系。跟随你的心，但也要用头脑。真正的爱是一种选择，不仅是感觉，也是承诺。',
    meaningReversed: '失衡的关系或价值观冲突。你可能在逃避选择，或选择了基于恐惧而非爱。诚实地面对自己的欲望。',
    keywords: ['爱', '选择', '和谐', '关系'] },
  { id: 7, name: '战车', nameEn: 'The Chariot', iconKey: 'dagger', type: 'major',
    meaningUpright: '坚定不移地向前推进。通过自律和决心，你能克服面前的任何障碍。胜利在望——但需要你驾驭内心的对立力量。',
    meaningReversed: '方向迷失，失去控制。你可能在强行推动某件事，或者被内心的矛盾拉扯。停下来，重新对焦再出发。',
    keywords: ['胜利', '决心', '控制', '前进'] },
  { id: 8, name: '力量', nameEn: 'Strength', iconKey: 'orb', type: 'major',
    meaningUpright: '真正的力量不是蛮力，而是内在的勇气、耐心和同情心。你能驯服内心的野兽。用温柔而坚定的方式面对挑战——柔能克刚。',
    meaningReversed: '缺乏自信，或滥用力量。你可能感到脆弱无力，或在用愤怒掩盖恐惧。找回你的内在力量——它从未离开。',
    keywords: ['勇气', '耐心', '内在力量', '同情'] },
  { id: 9, name: '隐士', nameEn: 'The Hermit', iconKey: 'candle', type: 'major',
    meaningUpright: '退隐和内省的时期。独自前行，寻找内在的光明。外界的喧嚣无法给你答案——真正的智慧来自内心的宁静。',
    meaningReversed: '过度孤立，逃避世界。你可能在用孤独作为借口来逃避责任或连接。平衡内省与社交。',
    keywords: ['内省', '孤独', '智慧', '指引'] },
  { id: 10, name: '命运之轮', nameEn: 'Wheel of Fortune', iconKey: 'spiral', type: 'major',
    meaningUpright: '命运正在转动。好运、变化、新的周期即将到来。拥抱命运的起伏——顺境时感恩，逆境时学习。一切都在循环之中。',
    meaningReversed: '抗拒变化，或感到被命运捉弄。你可能在面对不可控的变化时感到无助。记住：轮子还会转动，困境不会永恒。',
    keywords: ['命运', '变化', '周期', '运气'] },
  { id: 11, name: '正义', nameEn: 'Justice', iconKey: 'scales', type: 'major',
    meaningUpright: '公平、真相和责任。你的行为将得到相应的结果。做出正直的选择——因果法则正在运作。这也是签订协议或法律事务的有利时机。',
    meaningReversed: '不公正、偏见或逃避责任。你可能在面对不公平的待遇，或自己在回避真相。诚实是最好的策略。',
    keywords: ['公平', '真相', '因果', '责任'] },
  { id: 12, name: '倒吊人', nameEn: 'The Hanged Man', iconKey: 'cross', type: 'major',
    meaningUpright: '暂停、放手、新的视角。有时候停下来才能看见真相。自愿的牺牲将带来更深的理解。换一个角度看世界——颠倒可能是最大的清醒。',
    meaningReversed: '无意义的停滞或抗拒放手。你可能在拖延或拒绝必要的牺牲。问自己：我为什么害怕停顿？',
    keywords: ['牺牲', '视角', '暂停', '觉醒'] },
  { id: 13, name: '死神', nameEn: 'Death', iconKey: 'raven', type: 'major',
    meaningUpright: '转变、结束和新开始。旧的必须离开，为新的腾出空间。不要害怕这个结束——它是重生的必要前奏。放手，让变化发生。',
    meaningReversed: '抗拒变化，活在过去。你可能在紧抓一段已经结束的关系、工作或身份。让该走的走吧。',
    keywords: ['结束', '转变', '重生', '放手'] },
  { id: 14, name: '节制', nameEn: 'Temperance', iconKey: 'chalice', type: 'major',
    meaningUpright: '平衡、调和与耐心。像炼金术士一样融合对立的力量。你的生活需要更多的中庸之道——既不是放纵也不是压抑，而是和谐地流动。',
    meaningReversed: '失衡、过度或缺乏节制。你可能在某一方面走向极端。找回你的中心——那是平静所在之处。',
    keywords: ['平衡', '调和', '耐心', '中庸'] },
  { id: 15, name: '恶魔', nameEn: 'The Devil', iconKey: 'snake', type: 'major',
    meaningUpright: '面对你的阴影和束缚。你可能被困在某种成瘾、有毒关系或自我限制的信念中。但锁链的钥匙在你手中——只有当你承认被困，才能获得自由。',
    meaningReversed: '打破束缚，觉醒。你正在从阴影中走出来，解除不健康的依恋。自由的曙光已经出现。',
    keywords: ['束缚', '阴影', '成瘾', '解放'] },
  { id: 16, name: '高塔', nameEn: 'The Tower', iconKey: 'lightning', type: 'major',
    meaningUpright: '突然的颠覆和觉醒。一切建立在虚假之上的东西正在崩塌。虽然痛苦，但这是必要的——真相只能从废墟中被看见。',
    meaningReversed: '抗拒崩溃，或正在从震撼中恢复。你可能在推迟一场不可避免的改变。允许旧结构的倒塌——新建筑会更好。',
    keywords: ['颠覆', '觉醒', '崩塌', '真相'] },
  { id: 17, name: '星星', nameEn: 'The Star', iconKey: 'star', type: 'major',
    meaningUpright: '希望、疗愈和灵感。风暴已经过去，现在是治愈的时刻。宇宙正在向你灌输宁静和创造力。相信生命的美好——你被守护着。',
    meaningReversed: '失去希望，感到幻灭。你可能在怀疑自己的价值或宇宙的善意。重新与你的内在之光连接——它只是被暂时遮蔽。',
    keywords: ['希望', '疗愈', '灵感', '宁静'] },
  { id: 18, name: '月亮', nameEn: 'The Moon', iconKey: 'crescent', type: 'major',
    meaningUpright: '幻觉、恐惧和潜意识。前方有不确定性和隐藏的真相。相信你的直觉来导航这片迷雾——不是一切都能被理性解析。',
    meaningReversed: '恐惧消散，真相浮现。混乱正在澄清，你的焦虑逐渐被理解所取代。黑暗中最难的部分已经过去。',
    keywords: ['直觉', '幻象', '潜意识', '恐惧'] },
  { id: 19, name: '太阳', nameEn: 'The Sun', iconKey: 'sun', type: 'major',
    meaningUpright: '喜悦、成功和活力。这是最光明的牌之一——一切都在绽放。享受这段阳光明媚的时期。你的真实自我正在闪闪发光，被所有人看见。',
    meaningReversed: '阴云暂时遮蔽了阳光——但太阳从未真正消失。你可能感到热情减退或信心不足。重新找回你内在孩子的快乐。',
    keywords: ['喜悦', '成功', '活力', '真实'] },
  { id: 20, name: '审判', nameEn: 'Judgement', iconKey: 'bell', type: 'major',
    meaningUpright: '觉醒、重生和内在召唤。你正被召唤到更高的使命。回顾过去，整合经验，然后回应召唤——是时候升入新的存在层次了。',
    meaningReversed: '逃避召唤，自我怀疑。你可能在拒绝成长或害怕被评判。释放过去的愧疚——它们不是你前进的负担。',
    keywords: ['觉醒', '召唤', '重生', '审判'] },
  { id: 21, name: '世界', nameEn: 'The World', iconKey: 'compass', type: 'major',
    meaningUpright: '完成、成就和整合。一个重要的周期已经圆满结束。庆祝你的旅程——你已经走了很远。现在是用你学到的智慧开启新篇章的时候。',
    meaningReversed: '未完成的循环，或害怕结束。你可能在接近目标时停下来，或在抗拒那个最后的收尾步骤。',
    keywords: ['完成', '圆满', '成就', '整合'] },
];

/* ==================== 56 Minor Arcana ==================== */

type MinorArcanaCard = Omit<TarotCard, 'reversed'> & { type: 'minor'; suit: 'cups' | 'wands' | 'swords' | 'pentacles'; rank: string };

const MINOR_ARCANA: MinorArcanaCard[] = [
  /* --- Cups (圣杯·水元素·情感与关系) --- */
  { id: 22, name: '圣杯王牌', nameEn: 'Ace of Cups', iconKey: 'chalice', type: 'minor', suit: 'cups', rank: 'Ace',
    meaningUpright: '新的感情、直觉的涌动、灵性的觉醒。情感的圣杯满溢——敞开你的心扉，迎接爱的新篇章。',
    meaningReversed: '情感枯竭、压抑感受、错失爱的机会。你可能在关闭自己的心。',
    keywords: ['新感情', '直觉', '丰盈', '爱'] },
  { id: 23, name: '圣杯二', nameEn: 'Two of Cups', iconKey: 'chalice', type: 'minor', suit: 'cups', rank: '2',
    meaningUpright: '灵魂伴侣的连接、深度合作、互相吸引。两个灵魂的共鸣——平等、尊重与深刻的联结正在形成。',
    meaningReversed: '关系失衡、沟通破裂、信任瓦解。检查这段关系是否真正双向付出。',
    keywords: ['伴侣', '合作', '共鸣', '吸引'] },
  { id: 24, name: '圣杯三', nameEn: 'Three of Cups', iconKey: 'chalice', type: 'minor', suit: 'cups', rank: '3',
    meaningUpright: '庆祝、友谊、团体欢聚。与姐妹们分享喜悦的时光——表达感激，享受此刻的丰盛。',
    meaningReversed: '过度放纵、社交疲惫、友谊中的暗流。注意是否有人在团体中感到被排斥。',
    keywords: ['庆祝', '友谊', '欢聚', '分享'] },
  { id: 25, name: '圣杯四', nameEn: 'Four of Cups', iconKey: 'chalice', type: 'minor', suit: 'cups', rank: '4',
    meaningUpright: '沉思、不满、错过机会。你沉浸在自己的思绪中，忽视了宇宙伸出的手。抬起头——新的可能正在等待。',
    meaningReversed: '觉醒、新的动力、接受机遇。你开始看到之前忽略的事物，重新发现生活的色彩。',
    keywords: ['沉思', '倦怠', '机会', '觉醒'] },
  { id: 26, name: '圣杯五', nameEn: 'Five of Cups', iconKey: 'chalice', type: 'minor', suit: 'cups', rank: '5',
    meaningUpright: '失去、悲伤、遗憾。你专注于倒下的杯子，却忽略了身后还有两个立着的。哀悼是必要的，但不要沉浸其中。',
    meaningReversed: '接纳、疗愈、向前看。悲伤正在转化——你开始看见希望和仍然拥有的东西。',
    keywords: ['悲伤', '失去', '希望', '接纳'] },
  { id: 27, name: '圣杯六', nameEn: 'Six of Cups', iconKey: 'chalice', type: 'minor', suit: 'cups', rank: '6',
    meaningUpright: '怀旧、纯真、童年的记忆。过去的美好正在温柔地造访你——也许是故人重逢，也许是对初心的回归。',
    meaningReversed: '困在过去、无法成长、沉溺回忆。不要把过去浪漫化到失去现在。',
    keywords: ['怀旧', '纯真', '回忆', '初心'] },
  { id: 28, name: '圣杯七', nameEn: 'Seven of Cups', iconKey: 'chalice', type: 'minor', suit: 'cups', rank: '7',
    meaningUpright: '幻想、多种选择、迷惑。面前有太多诱人的选项——但哪个是真实的，哪个是幻影？用直觉筛选。',
    meaningReversed: '清晰、做出选择、脚踏实地。迷雾散去，你终于看清了真正重要的方向。',
    keywords: ['幻想', '选择', '迷惑', '清晰'] },
  { id: 29, name: '圣杯八', nameEn: 'Eight of Cups', iconKey: 'chalice', type: 'minor', suit: 'cups', rank: '8',
    meaningUpright: '离开、寻找更高意义、告别舒适区。你转身离开已经不再滋养你的地方——这不是逃避，而是勇敢的追寻。',
    meaningReversed: '徘徊不定、害怕改变、无法放手。你知道该走了，但脚还钉在原地。',
    keywords: ['离开', '追寻', '告别', '勇气'] },
  { id: 30, name: '圣杯九', nameEn: 'Nine of Cups', iconKey: 'chalice', type: 'minor', suit: 'cups', rank: '9',
    meaningUpright: '愿望实现、满足、幸福。这张牌被称为"愿望牌"——你的心愿正在实现的道路上。享受这份满足感。',
    meaningReversed: '不满足、表面幸福、内在空虚。外面的杯子摆得漂亮，但里面的酒已经变味。',
    keywords: ['愿望', '满足', '幸福', '实现'] },
  { id: 31, name: '圣杯十', nameEn: 'Ten of Cups', iconKey: 'chalice', type: 'minor', suit: 'cups', rank: '10',
    meaningUpright: '圆满的家庭、持久的幸福、情感成就。彩虹下的圆满——爱、归属和深层的情感满足已经达成。',
    meaningReversed: '家庭冲突、破碎的梦想、疏离。表面和谐但内在有未解决的问题。',
    keywords: ['圆满', '家庭', '幸福', '归属'] },
  { id: 32, name: '圣杯侍从', nameEn: 'Page of Cups', iconKey: 'chalice', type: 'minor', suit: 'cups', rank: 'Page',
    meaningUpright: '创意灵感、情感讯息、年轻的直觉。一条好奇的鱼从圣杯中探出——新的艺术灵感或情感告白正在来临。',
    meaningReversed: '情绪幼稚、创意阻塞、不成熟的爱。你可能在逃避成熟的情感责任。',
    keywords: ['灵感', '讯息', '创意', '纯真'] },
  { id: 33, name: '圣杯骑士', nameEn: 'Knight of Cups', iconKey: 'chalice', type: 'minor', suit: 'cups', rank: 'Knight',
    meaningUpright: '浪漫的追求、理想的追寻者、艺术的使者。一位带着情感使命的骑士正在靠近——跟随你的心。',
    meaningReversed: '情绪波动、不切实际的幻想、欺骗性的魅力。不要被华丽的告白迷惑双眼。',
    keywords: ['浪漫', '追求', '理想', '魅力'] },
  { id: 34, name: '圣杯王后', nameEn: 'Queen of Cups', iconKey: 'chalice', type: 'minor', suit: 'cups', rank: 'Queen',
    meaningUpright: '情感智慧、同理心、直觉力。你是情感领域的女王——温柔而深邃，能用直觉照见他人看不见的深处。',
    meaningReversed: '情绪依赖、过度敏感、失去边界。你的杯子太满了，溢出的是别人的情绪。',
    keywords: ['同理心', '直觉', '温柔', '智慧'] },
  { id: 35, name: '圣杯国王', nameEn: 'King of Cups', iconKey: 'chalice', type: 'minor', suit: 'cups', rank: 'King',
    meaningUpright: '情感的掌控者、成熟的同理心、创造力的大师。你已学会驾驭情绪的海洋——既不被淹没，也不压制。',
    meaningReversed: '情绪控制、操纵、压抑。你可能在用"冷静"的外壳掩盖内心的风暴。',
    keywords: ['掌控', '成熟', '创造', '平衡'] },

  /* --- Wands (权杖·火元素·行动与激情) --- */
  { id: 36, name: '权杖王牌', nameEn: 'Ace of Wands', iconKey: 'wand', type: 'minor', suit: 'wands', rank: 'Ace',
    meaningUpright: '新的灵感火花、创造力的爆发、行动的时刻。宇宙递给你一根燃烧的权杖——抓住它，开始你的创造。',
    meaningReversed: '拖延、灵感枯竭、错失时机。火花在熄灭——是什么阻碍了你点燃行动？',
    keywords: ['灵感', '创造', '行动', '开始'] },
  { id: 37, name: '权杖二', nameEn: 'Two of Wands', iconKey: 'wand', type: 'minor', suit: 'wands', rank: '2',
    meaningUpright: '规划、远见、选择方向。手握地球，眺望远方——现在是制定宏大计划的时候。',
    meaningReversed: '选择恐惧、缺乏规划、害怕未知。你站在原地太久，需要迈出一步。',
    keywords: ['规划', '远见', '选择', '探索'] },
  { id: 38, name: '权杖三', nameEn: 'Three of Wands', iconKey: 'wand', type: 'minor', suit: 'wands', rank: '3',
    meaningUpright: '扩张、远航、已见成效。你的船已经出海——回头看看海岸线，你已经走了很远。继续前进。',
    meaningReversed: '挫折、计划受阻、返乡的渴望。可能遭遇瓶颈——但这是重新审视路线的信号。',
    keywords: ['扩张', '远航', '进展', '信心'] },
  { id: 39, name: '权杖四', nameEn: 'Four of Wands', iconKey: 'wand', type: 'minor', suit: 'wands', rank: '4',
    meaningUpright: '稳定、庆祝、家园。基础的搭建已经完成——现在是庆祝和享受成果的时刻。',
    meaningReversed: '不稳定、缺乏归属感、庆祝延期。地基还在摇晃——先解决底层问题。',
    keywords: ['稳定', '庆祝', '家园', '基础'] },
  { id: 40, name: '权杖五', nameEn: 'Five of Wands', iconKey: 'wand', type: 'minor', suit: 'wands', rank: '5',
    meaningUpright: '竞争、冲突、观点的碰撞。五根权杖在空中交锋——这是健康的竞争，还是在浪费能量？',
    meaningReversed: '回避冲突、和解、内化的压力。你在逃避必要的对抗——有时冲突才能带来突破。',
    keywords: ['竞争', '冲突', '碰撞', '成长'] },
  { id: 41, name: '权杖六', nameEn: 'Six of Wands', iconKey: 'wand', type: 'minor', suit: 'wands', rank: '6',
    meaningUpright: '胜利、公众认可、凯旋。你的努力得到了认可——享受掌声，但保持谦逊。',
    meaningReversed: '自大、失败、不被认可。你可能在期待别人的赞美，却失落而归。真正的胜利不需要喝彩。',
    keywords: ['胜利', '认可', '凯旋', '成就'] },
  { id: 42, name: '权杖七', nameEn: 'Seven of Wands', iconKey: 'wand', type: 'minor', suit: 'wands', rank: '7',
    meaningUpright: '坚守阵地、捍卫立场、孤军奋战。你站在高处，独自面对挑战——你的信念是正确的，坚持住。',
    meaningReversed: '放弃抵抗、被压倒、自我怀疑。你可能觉得撑不下去了——请求帮助不是软弱。',
    keywords: ['坚守', '捍卫', '勇气', '信念'] },
  { id: 43, name: '权杖八', nameEn: 'Eight of Wands', iconKey: 'wand', type: 'minor', suit: 'wands', rank: '8',
    meaningUpright: '快速进展、消息传来、势不可挡。八根权杖划破长空——事情正在飞速推进，准备接收大量讯息。',
    meaningReversed: '延迟、停滞、方向混乱。能量被堵塞——检查是什么在拖慢你的进程。',
    keywords: ['快速', '讯息', '进展', '动力'] },
  { id: 44, name: '权杖九', nameEn: 'Nine of Wands', iconKey: 'wand', type: 'minor', suit: 'wands', rank: '9',
    meaningUpright: '最后的坚守、韧性、接近终点。你可能已经筋疲力尽，但终点就在前方——再撑一会儿。',
    meaningReversed: '放弃、精力耗尽、过度防御。是时候休息，但不要彻底认输。',
    keywords: ['韧性', '坚持', '疲惫', '终点'] },
  { id: 45, name: '权杖十', nameEn: 'Ten of Wands', iconKey: 'wand', type: 'minor', suit: 'wands', rank: '10',
    meaningUpright: '负担过重、责任压身、需要放手。你扛着十根权杖——太多了。学会委托、拒绝和放下。',
    meaningReversed: '释放负担、学会说不、解脱。你终于卸下了不属于你的重担——深呼吸，自由了。',
    keywords: ['负担', '压力', '放手', '解脱'] },
  { id: 46, name: '权杖侍从', nameEn: 'Page of Wands', iconKey: 'wand', type: 'minor', suit: 'wands', rank: 'Page',
    meaningUpright: '探索新领域、热情的消息、冒险的开始。一位年轻人手持权杖望向远方——新的冒险正在召唤。',
    meaningReversed: '半途而废、缺乏方向、过度兴奋后的倦怠。热情来得快去得也快。',
    keywords: ['探索', '热情', '冒险', '消息'] },
  { id: 47, name: '权杖骑士', nameEn: 'Knight of Wands', iconKey: 'wand', type: 'minor', suit: 'wands', rank: 'Knight',
    meaningUpright: '行动派、冒险精神、追求激情。骑士策马飞驰——你是不可阻挡的力量，带着火焰般的热情冲向目标。',
    meaningReversed: '冲动、急躁、半途而废。你的马跑得太快了——慢下来看清方向。',
    keywords: ['行动', '冒险', '激情', '速度'] },
  { id: 48, name: '权杖王后', nameEn: 'Queen of Wands', iconKey: 'wand', type: 'minor', suit: 'wands', rank: 'Queen',
    meaningUpright: '自信、魅力、领导力。王后坐在宝座上，手持向日葵——她光芒四射，既温暖又强大。你就是她。',
    meaningReversed: '嫉妒、控制欲、自我怀疑的伪装。表面的强大可能是在掩盖内在的不安。',
    keywords: ['自信', '魅力', '领导', '光芒'] },
  { id: 49, name: '权杖国王', nameEn: 'King of Wands', iconKey: 'wand', type: 'minor', suit: 'wands', rank: 'King',
    meaningUpright: '远见者、企业家精神、天生领袖。你拥有将愿景变为现实的力量——大胆领导，宇宙支持你。',
    meaningReversed: '专制、过度野心、滥用权力。你在用权力压制他人，而非激励他们。',
    keywords: ['远见', '领导', '创业', '力量'] },

  /* --- Swords (宝剑·风元素·思想与冲突) --- */
  { id: 50, name: '宝剑王牌', nameEn: 'Ace of Swords', iconKey: 'dagger', type: 'minor', suit: 'swords', rank: 'Ace',
    meaningUpright: '清晰的思维、真相的突破、决断力。双刃剑劈开迷雾——真理浮现，你必须依据它做出决定。',
    meaningReversed: '思维混乱、错误判断、滥用智慧。你的逻辑可能有盲点——多听不同意见。',
    keywords: ['清晰', '真相', '决断', '突破'] },
  { id: 51, name: '宝剑二', nameEn: 'Two of Swords', iconKey: 'dagger', type: 'minor', suit: 'swords', rank: '2',
    meaningUpright: '僵局、逃避决定、内心的矛盾。你蒙着眼睛坐在两把剑之间——拒绝看见不等于问题不存在。',
    meaningReversed: '释放真相、做出选择、打破沉默。眼罩终于落下——是时候面对现实了。',
    keywords: ['僵局', '逃避', '矛盾', '选择'] },
  { id: 52, name: '宝剑三', nameEn: 'Three of Swords', iconKey: 'dagger', type: 'minor', suit: 'swords', rank: '3',
    meaningUpright: '心碎、悲伤、痛苦的真相。三把剑刺穿心脏——这是必要的痛，让你释放积压的情绪。',
    meaningReversed: '恢复、原谅、释怀。伤口在愈合——你已经熬过最痛的部分。',
    keywords: ['心碎', '悲伤', '痛苦', '愈合'] },
  { id: 53, name: '宝剑四', nameEn: 'Four of Swords', iconKey: 'dagger', type: 'minor', suit: 'swords', rank: '4',
    meaningUpright: '休息、恢复、冥想。战斗过后，骑士需要躺在墓穴中静修。让思维暂停——休整是战略的一部分。',
    meaningReversed: '焦躁、无法休息、重返战场。你太早起身了——身心还没准备好迎接下一场战斗。',
    keywords: ['休息', '恢复', '冥想', '休整'] },
  { id: 54, name: '宝剑五', nameEn: 'Five of Swords', iconKey: 'dagger', type: 'minor', suit: 'swords', rank: '5',
    meaningUpright: '冲突、屈辱的胜利、伤敌一千自损八百。你赢了争论但输了关系——这种胜利值得吗？',
    meaningReversed: '和解、放下争执、从冲突中学习。你开始看到争执背后的真实需求——修复裂痕。',
    keywords: ['冲突', '胜利', '代价', '和解'] },
  { id: 55, name: '宝剑六', nameEn: 'Six of Swords', iconKey: 'dagger', type: 'minor', suit: 'swords', rank: '6',
    meaningUpright: '过渡、离开困境、平稳前行。一艘船载着你驶离风暴——虽然伤感，但前方是平静的水域。',
    meaningReversed: '抗拒转变、被困、无法离开。你可能在拒绝登船——是什么让你留恋风暴？',
    keywords: ['过渡', '离开', '平静', '前行'] },
  { id: 56, name: '宝剑七', nameEn: 'Seven of Swords', iconKey: 'dagger', type: 'minor', suit: 'swords', rank: '7',
    meaningUpright: '策略、偷跑、不诚实。有人在耍小聪明——也许是你在偷偷绕过规则，也许是别人在算计你。',
    meaningReversed: '被发现、坦白、策略曝光。隐藏的计划被识破——不如主动坦诚。',
    keywords: ['策略', '狡猾', '欺骗', '真相'] },
  { id: 57, name: '宝剑八', nameEn: 'Eight of Swords', iconKey: 'dagger', type: 'minor', suit: 'swords', rank: '8',
    meaningUpright: '被困、自我限制、无助感。你被蒙着眼绑在剑阵中——但束缚你的其实是你自己的信念。',
    meaningReversed: '自我解放、挣脱束缚、新的视角。你终于意识到——那些锁链从未真正锁住你。',
    keywords: ['被困', '限制', '无助', '解放'] },
  { id: 58, name: '宝剑九', nameEn: 'Nine of Swords', iconKey: 'dagger', type: 'minor', suit: 'swords', rank: '9',
    meaningUpright: '焦虑、噩梦、过度思虑。深夜惊醒，九把剑悬在墙��——你的恐惧在大脑中制造了最坏的场景。',
    meaningReversed: '释怀、焦虑缓解、看见光明。最暗的夜已经过去——天亮后你会发现恐惧被夸大了。',
    keywords: ['焦虑', '噩梦', '恐惧', '释怀'] },
  { id: 59, name: '宝剑十', nameEn: 'Ten of Swords', iconKey: 'dagger', type: 'minor', suit: 'swords', rank: '10',
    meaningUpright: '彻底结束、触底、无法更糟。十把剑刺入后背——这是终点，但也是转折的开始。黎明前最黑暗。',
    meaningReversed: '反弹、幸存、从废墟中爬起。你已经到底了——唯一的出路是向上。',
    keywords: ['结束', '触底', '转折', '幸存'] },
  { id: 60, name: '宝剑侍从', nameEn: 'Page of Swords', iconKey: 'dagger', type: 'minor', suit: 'swords', rank: 'Page',
    meaningUpright: '好奇心、智力探索、新想法。年轻的侍从举着剑观察——智力上的新发现正在风中飘荡。',
    meaningReversed: '肤浅、八卦、口无遮拦。你的言语可能伤人——说话前先过脑。',
    keywords: ['好奇', '探索', '想法', '言语'] },
  { id: 61, name: '宝剑骑士', nameEn: 'Knight of Swords', iconKey: 'dagger', type: 'minor', suit: 'swords', rank: 'Knight',
    meaningUpright: '果断、快速行动、智力上的冲锋。骑士拔剑冲锋——思维敏捷、言辞犀利，是时候果断出击。',
    meaningReversed: '鲁莽、冲动、不考虑后果。你的刀锋太快，可能伤及无辜——慢下来。',
    keywords: ['果断', '快速', '犀利', '出击'] },
  { id: 62, name: '宝剑王后', nameEn: 'Queen of Swords', iconKey: 'dagger', type: 'minor', suit: 'swords', rank: 'Queen',
    meaningUpright: '清晰的判断、独立、理性智慧。她手举宝剑、目光锐利——看清一切幻象，做出公正的判断。',
    meaningReversed: '冷漠、苛刻、情感隔离。你在用理性作为盾牌，挡住了伤害也挡住了爱。',
    keywords: ['判断', '独立', '理性', '洞察'] },
  { id: 63, name: '宝剑国王', nameEn: 'King of Swords', iconKey: 'dagger', type: 'minor', suit: 'swords', rank: 'King',
    meaningUpright: '权威、真理、知性领导力。他是思维领域的主宰——用逻辑和真相统治，不偏不倚。',
    meaningReversed: '独裁、操纵、道德上的盲点。你可能在用"逻辑"合理化自己的偏见。',
    keywords: ['权威', '真理', '理性', '公正'] },

  /* --- Pentacles (星币·土元素·物质与现实) --- */
  { id: 64, name: '星币王牌', nameEn: 'Ace of Pentacles', iconKey: 'pentagram', type: 'minor', suit: 'pentacles', rank: 'Ace',
    meaningUpright: '新的财富机会、物质的开始、扎根。一只手从云中伸出，递给你一枚金币——新的事业或收入即将到来。',
    meaningReversed: '错失财务机会、浪费、不稳定。金币就在眼前但你没抓住——重新审视你的金钱观。',
    keywords: ['财富', '机会', '扎根', '物质'] },
  { id: 65, name: '星币二', nameEn: 'Two of Pentacles', iconKey: 'pentagram', type: 'minor', suit: 'pentacles', rank: '2',
    meaningUpright: '平衡、灵活应对、多任务处理。你正在杂耍两枚金币——保持节奏，你能同时处理所有事情。',
    meaningReversed: '失去平衡、财务混乱、捉襟见肘。球快要落地了——优先排序，简化你的生活。',
    keywords: ['平衡', '灵活', '多任务', '节奏'] },
  { id: 66, name: '星币三', nameEn: 'Three of Pentacles', iconKey: 'pentagram', type: 'minor', suit: 'pentacles', rank: '3',
    meaningUpright: '团队合作、技艺精进、规划。工匠们在教堂中协作——你的技能正在他人的反馈中日益精湛。',
    meaningReversed: '缺乏合作、技艺粗糙、团队矛盾。单打独斗或团队摩擦正在拖慢进度。',
    keywords: ['合作', '技艺', '规划', '成长'] },
  { id: 67, name: '星币四', nameEn: 'Four of Pentacles', iconKey: 'pentagram', type: 'minor', suit: 'pentacles', rank: '4',
    meaningUpright: '储蓄、掌控、安全感。你紧紧抱住四枚金币——财务安全感来自谨慎规划，但不要变成吝啬。',
    meaningReversed: '贪婪、对物质过度执着、害怕失去。你在用金钱筑墙——墙保护了你，也隔离了你。',
    keywords: ['储蓄', '掌控', '安全', '谨慎'] },
  { id: 68, name: '星币五', nameEn: 'Five of Pentacles', iconKey: 'pentagram', type: 'minor', suit: 'pentacles', rank: '5',
    meaningUpright: '财务困难、被排斥、匮乏感。两个人在雪中从教堂窗边走过——帮助就在眼前，但你选择视而不见。',
    meaningReversed: '转机、寻求帮助、匮乏感的终结。温暖的光已经在教堂里亮着——走进去。',
    keywords: ['困难', '匮乏', '帮助', '转机'] },
  { id: 69, name: '星币六', nameEn: 'Six of Pentacles', iconKey: 'pentagram', type: 'minor', suit: 'pentacles', rank: '6',
    meaningUpright: '给予与接受、慈善、公平分配。一只手在慷慨施舍——检查权力动态：你是给予者还是接受者？',
    meaningReversed: '施舍带条件、债务、不公平的资源分配。表面的慷慨可能隐藏着不平等的权力关系。',
    keywords: ['给予', '接受', '慈善', '公平'] },
  { id: 70, name: '星币七', nameEn: 'Seven of Pentacles', iconKey: 'pentagram', type: 'minor', suit: 'pentacles', rank: '7',
    meaningUpright: '等待收获、评估进展、耐心。你停下来审视你的果树——投入的时间和精力是否值得？调整你的策略。',
    meaningReversed: '不耐烦、投资失误、缺乏回报。等太久不见成效——重新评估方向。',
    keywords: ['等待', '评估', '收获', '耐心'] },
  { id: 71, name: '星币八', nameEn: 'Eight of Pentacles', iconKey: 'pentagram', type: 'minor', suit: 'pentacles', rank: '8',
    meaningUpright: '勤奋、技艺打磨、专注工作。工匠在一枚一枚地雕刻金币——深度投入和重复练习将带来真正的精进。',
    meaningReversed: '倦怠、工作狂、重复无意义。你太努力了却看不到意义——需要重新找到工作的灵魂。',
    keywords: ['勤奋', '技艺', '专注', '精进'] },
  { id: 72, name: '星币九', nameEn: 'Nine of Pentacles', iconKey: 'pentagram', type: 'minor', suit: 'pentacles', rank: '9',
    meaningUpright: '自给自足、优雅独立、享受成果。一位优雅的女性站在自己的花园中——你的努力换来了丰裕和自由。',
    meaningReversed: '财务依赖、表面的成功、内在空虚。物质丰富但心灵匮乏——真正的丰盛包含内在的满足。',
    keywords: ['独立', '丰裕', '优雅', '自由'] },
  { id: 73, name: '星币十', nameEn: 'Ten of Pentacles', iconKey: 'pentagram', type: 'minor', suit: 'pentacles', rank: '10',
    meaningUpright: '财富传承、家族昌盛、长期的安全。三代人聚在城堡拱门下——物质与精神的遗产正在代代相传。',
    meaningReversed: '家族纠纷、财务损失、传承断裂。财富可能成为争执的根源——检查家庭中的金钱关系。',
    keywords: ['传承', '家族', '安全', '财富'] },
  { id: 74, name: '星币侍从', nameEn: 'Page of Pentacles', iconKey: 'pentagram', type: 'minor', suit: 'pentacles', rank: 'Page',
    meaningUpright: '学习新技能、务实、机会的种子。年轻的侍从专注地凝视金币——新的学习机会或实习正在到来。',
    meaningReversed: '缺乏动力、不切实际、学习停滞。你可能在拖延那个应该开始的技能学习。',
    keywords: ['学习', '务实', '机会', '技能'] },
  { id: 75, name: '星币骑士', nameEn: 'Knight of Pentacles', iconKey: 'pentagram', type: 'minor', suit: 'pentacles', rank: 'Knight',
    meaningUpright: '稳重、可靠、坚持不懈。骑士骑着一匹沉重的马缓慢前行——虽不快，但每一步都坚实无比。',
    meaningReversed: '顽固、停滞、过于保守。你的"稳重"变成了"僵化"——该动一动了。',
    keywords: ['稳重', '可靠', '坚持', '扎实'] },
  { id: 76, name: '星币王后', nameEn: 'Queen of Pentacles', iconKey: 'pentagram', type: 'minor', suit: 'pentacles', rank: 'Queen',
    meaningUpright: '滋养、物质安全感、大地母亲。她怀抱金币、坐在繁花满园的王座上——你是丰盛与滋养的化身。',
    meaningReversed: '物质主义、忽视情感、过度付出。你在照顾所有人，却忘了照顾自己。',
    keywords: ['滋养', '丰盛', '务实', '关怀'] },
  { id: 77, name: '星币国王', nameEn: 'King of Pentacles', iconKey: 'pentagram', type: 'minor', suit: 'pentacles', rank: 'King',
    meaningUpright: '财务大师、稳定的成功、慷慨的守护者。他坐在葡萄藤王座上——物质王国已经建成，现在是用它来滋养世界的时候。',
    meaningReversed: '贪婪、物质主义、滥用财富。金钱成了主人而非仆人——重新审视你与财富的关系。',
    keywords: ['成功', '财务', '慷慨', '掌控'] },
];

/* ==================== Deck & Helpers ==================== */

export const TAROT_CARDS: TarotCard[] = [
  ...MAJOR_ARCANA.map((c) => ({ ...c, reversed: false })),
  ...MINOR_ARCANA.map((c) => ({ ...c, reversed: false })),
];

export function drawRandomCard(): TarotCard {
  const all = [...MAJOR_ARCANA, ...MINOR_ARCANA];
  const card = all[Math.floor(Math.random() * all.length)];
  return { ...card, reversed: Math.random() > 0.5 };
}

export function drawThreeCardSpread(): TarotCard[] {
  const pool = [...MAJOR_ARCANA, ...MINOR_ARCANA];
  const drawn: TarotCard[] = [];
  const used = new Set<number>();
  while (drawn.length < 3) {
    const idx = Math.floor(Math.random() * pool.length);
    if (!used.has(idx)) {
      used.add(idx);
      drawn.push({ ...pool[idx], reversed: Math.random() > 0.5 });
    }
  }
  return drawn;
}

export function drawCelticCross(): TarotCard[] {
  const pool = [...MAJOR_ARCANA, ...MINOR_ARCANA];
  const drawn: TarotCard[] = [];
  const used = new Set<number>();
  while (drawn.length < 10) {
    const idx = Math.floor(Math.random() * pool.length);
    if (!used.has(idx)) {
      used.add(idx);
      drawn.push({ ...pool[idx], reversed: Math.random() > 0.5 });
    }
  }
  return drawn;
}

export function getSuitName(suit: TarotCard['suit']): string {
  switch (suit) {
    case 'cups': return '圣杯';
    case 'wands': return '权杖';
    case 'swords': return '宝剑';
    case 'pentacles': return '星币';
    default: return '';
  }
}

export function getSuitColor(suit: TarotCard['suit']): string {
  switch (suit) {
    case 'cups': return '#5B8ED0';
    case 'wands': return '#D46838';
    case 'swords': return '#A0A0A8';
    case 'pentacles': return '#C9A84C';
    default: return '#C9A84C';
  }
}

export function getSuitElement(suit: TarotCard['suit']): { element: string; icon: string } {
  switch (suit) {
    case 'cups': return { element: '水', icon: '💧' };
    case 'wands': return { element: '火', icon: '🔥' };
    case 'swords': return { element: '风', icon: '💨' };
    case 'pentacles': return { element: '土', icon: '🏔' };
    default: return { element: '', icon: '' };
  }
}

export function getSuitIconKey(suit: TarotCard['suit']): IconName {
  switch (suit) {
    case 'cups': return 'chalice';
    case 'wands': return 'wand';
    case 'swords': return 'dagger';
    case 'pentacles': return 'hexagram';
    default: return 'hexagram';
  }
}
