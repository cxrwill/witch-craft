import type { IconName } from '../components/Icon';

/**
 * 12 Witch Types — complete definitions
 * Each type has a unique color palette, description, and visual identity
 */

export type WitchTypeId =
  | 'green'
  | 'sea'
  | 'kitchen'
  | 'cosmic'
  | 'crystal'
  | 'lunar'
  | 'divination'
  | 'hedge'
  | 'hereditary'
  | 'storm'
  | 'gray'
  | 'eclectic';

export interface WitchTypePalette {
  primary: string;
  secondary: string;
  accent: string;
  surface: string;
  text: string;
  muted: string;
  glow: string;
}

export interface WitchType {
  id: WitchTypeId;
  code: string; // A-L
  name: string;
  nameEn: string;
  icon: IconName;
  element: string;
  planet: string;
  palette: WitchTypePalette;
  description: string;
  traits: string[];
  strengths: string[];
  path: string;
  ritual: string;
}

export const WITCH_TYPES: Record<WitchTypeId, WitchType> = {
  green: {
    id: 'green',
    code: 'A',
    name: '绿女巫',
    nameEn: 'Green Witch',
    icon: 'leaf',
    element: '土 · Earth',
    planet: '地球 · Earth',
    palette: {
      primary: '#2D5A27',
      secondary: '#4A8B3F',
      accent: '#A8D5A2',
      surface: '#1A2E16',
      text: '#D4E8D0',
      muted: '#6B8B63',
      glow: 'rgba(45, 90, 39, 0.4)',
    },
    description:
      '你是大地的孩子，与草木同呼吸。绿女巫的力量来自自然界的每一片叶子、每一朵花、每一寸土壤。你不需要华丽的法器，你的魔杖是一株植物，你的咒语是生长的低语。你懂得疗愈的奥秘，知道如何在最贫瘠的土地上种出希望。森林是你的圣殿，花园是你的祭坛，草药是你的盟友。你的魔法缓慢而坚定，像树根一样深入大地，像藤蔓一样攀向光明。',
    traits: ['与植物深度连接', '草药疗愈天赋', '自然循环感知', '安静而坚定的力量'],
    strengths: ['草药调配', '自然疗愈', '生态和谐', '四季仪式'],
    path: '走进森林，聆听树木的低语；在花园中赤脚行走，感受大地的脉搏。你的成长之路在于学会辨识每一种植物的灵魂，用自然的力量疗愈自己和他人。',
    ritual: '满月之夜，在自家花园或窗台的盆栽前点燃绿色蜡烛，将你的意图写在树叶上埋入土壤。',
  },
  sea: {
    id: 'sea',
    code: 'B',
    name: '海女巫',
    nameEn: 'Sea Witch',
    icon: 'wave',
    element: '水 · Water',
    planet: '海王星 · Neptune',
    palette: {
      primary: '#1B3A5C',
      secondary: '#2E6B9E',
      accent: '#7EC8E3',
      surface: '#0F2238',
      text: '#C5E3F0',
      muted: '#5B8AA8',
      glow: 'rgba(27, 58, 92, 0.4)',
    },
    description:
      '你的灵魂属于海洋，潮汐在你的血管中流淌。海女巫的力量深邃而广阔，如同大海本身——时而温柔如镜，时而汹涌澎湃。你收集贝壳不是为了装饰，而是因为它们承载着海洋的记忆；你凝视潮汐不是为了欣赏，而是在读取月亮的密语。你的情绪像海浪一样有起有落，而你早已学会在风暴中保持内心的平静。水是你的镜像，在你的魔法中照见万物真相。',
    traits: ['情绪深度感知', '潮汐能量运用', '水的流动性智慧', '深邃的直觉力'],
    strengths: ['水元素仪式', '情绪疗愈', '梦境解读', '净化与释放'],
    path: '靠近水源——海洋、湖泊、河流，让水的流动带你进入冥想状态。收集贝壳、漂流木和海玻璃，它们是你与海洋之间的信物。',
    ritual: '在海边或水盆旁，将你的烦恼写在可溶解的纸上，看着它被水带走。每一滴海水都带走一份沉重。',
  },
  kitchen: {
    id: 'kitchen',
    code: 'C',
    name: '厨房女巫',
    nameEn: 'Kitchen Witch',
    icon: 'flame',
    element: '火 · Fire',
    planet: '灶神星 · Vesta',
    palette: {
      primary: '#8B4513',
      secondary: '#C67B4B',
      accent: '#F4C07A',
      surface: '#2E1A0A',
      text: '#F0D9C0',
      muted: '#A67B5B',
      glow: 'rgba(139, 69, 19, 0.4)',
    },
    description:
      '你的魔法在厨房里沸腾。厨房女巫知道，一锅汤不只是食物——它是爱的炼金术，一撮香料不只是调味——它是意图的催化剂。你的灶台就是祭坛，你的木勺就是魔杖，你的食谱就是咒语书。你把祝福揉进面团，把保护煮进羹汤，把喜悦烤进面包。家是你的圣域，每一个走进你厨房的人都会被你的温暖魔法所庇护。',
    traits: ['烹饪即魔法', '家庭守护者', '温暖而包容', '日常的神圣化'],
    strengths: ['厨房炼金术', '家庭保护咒', '滋养与疗愈', '丰盛吸引'],
    path: '将厨房视为你的圣殿。在烹饪时保持觉知——每一刀、每一搅、每一撒都是仪式。种植自己的香草，建立与食材的深层连接。',
    ritual: '新月之夜，烘焙一个圆形面包，在揉面时将你的愿望注入其中。面包膨胀的过程就是你的愿望在宇宙中生长的过程。',
  },
  cosmic: {
    id: 'cosmic',
    code: 'D',
    name: '星辰女巫',
    nameEn: 'Cosmic Witch',
    icon: 'star',
    element: '以太 · Aether',
    planet: '天王星 · Uranus',
    palette: {
      primary: '#3B1B54',
      secondary: '#6B3FA0',
      accent: '#C4A1FF',
      surface: '#1A0C28',
      text: '#DDD0F0',
      muted: '#8B6BB8',
      glow: 'rgba(59, 27, 84, 0.4)',
    },
    description:
      '你的目光永远望向星空。星辰女巫的力量来自宇宙的韵律——行星的轨迹、星座的排列、银河的呼吸。你不仅是占星师，更是天体能量的翻译者。每当你出生星图中的行星移动，你便感知到命运的涟漪。你的魔法与宇宙时钟同步，在新月播种意图，在满月收获成果。你相信每一颗星星都是一个故事，而你的任务是将这些故事带回人间。',
    traits: ['天体能量感知', '占星天赋', '宇宙视角', '模式识别力'],
    strengths: ['星盘解读', '行星时仪式', '宇宙能量引导', '天命洞察'],
    path: '学习你的出生星盘，追踪月相变化。在重要的行星过境时进行仪式，将天体能量锚定在你的日常生活中。',
    ritual: '新月之夜，在窗口或户外写下未来一个月的意图清单，对着新月朗读。将清单放在月光下过夜，让星辰为它充能。',
  },
  crystal: {
    id: 'crystal',
    code: 'E',
    name: '水晶女巫',
    nameEn: 'Crystal Witch',
    icon: 'crystal',
    element: '土 · Earth',
    planet: '土星 · Saturn',
    palette: {
      primary: '#C88EA7',
      secondary: '#E8B4CD',
      accent: '#FDE2EE',
      surface: '#2E1A23',
      text: '#F5E0E8',
      muted: '#B88A9B',
      glow: 'rgba(200, 142, 167, 0.4)',
    },
    description:
      '你能听见石头的歌唱。水晶女巫的双手触碰每一块晶石时，都能感知到它独特的振动频率。你不是在收藏石头——你是在编织一张能量的网络。紫晶是你的冥想导师，玫瑰晶是你的心灵疗愈师，黑曜石是你的保护者。你懂得如何用水晶搭建能量网格，将大地的脉动引入日常生活。每一条水晶手链都是你随身携带的微型祭坛。',
    traits: ['晶石频率感知', '能量网格构建', '美的直觉', '耐心的观察者'],
    strengths: ['水晶疗愈', '能量空间净化', '脉轮平衡', '水晶网格仪式'],
    path: '从基础水晶开始建立你的收藏。学习每一种晶石的独特频率，学会清洁、充能、编程你的水晶。让它们成为你日常修行的伙伴。',
    ritual: '在新月之夜，用月光清洁你的水晶。将它们排列成你直觉中的图案，坐在中间冥想，感受晶石的能量振动。',
  },
  lunar: {
    id: 'lunar',
    code: 'F',
    name: '月女巫',
    nameEn: 'Lunar Witch',
    icon: 'crescent',
    element: '水 · Water',
    planet: '月球 · Moon',
    palette: {
      primary: '#A099B8',
      secondary: '#C5BFD8',
      accent: '#E8E4F0',
      surface: '#1E1A28',
      text: '#EAE6F0',
      muted: '#8B85A0',
      glow: 'rgba(160, 153, 184, 0.4)',
    },
    description:
      '你随月亮的圆缺而呼吸。月女巫的力量与月相同步——在新月中播种，在盈月中成长，在满月中绽放，在残月中释放。你的直觉如水中的月光，敏锐而流动。夜晚是你的领地，梦境是你的信使。你懂得黑暗不是需要恐惧的东西，而是孕育一切的子宫。你的魔法优雅而沉静，像月光一样不声张地照亮一切。',
    traits: ['月相感知', '梦境解读', '直觉导航', '暗影工作'],
    strengths: ['月相仪式', '梦境魔法', '直觉开发', '阴影整合'],
    path: '追踪每一个月相，记录你在不同月相下的感受和梦境。在满月时充电，在新月时设定意图。让月亮的节奏成为你的内在时钟。',
    ritual: '每个满月之夜，将你的水晶和愿望清单放在窗台上接受月光洗礼。在月光下冥想，让月亮的银辉洗涤你的能量场。',
  },
  divination: {
    id: 'divination',
    code: 'G',
    name: '占卜女巫',
    nameEn: 'Divination Witch',
    icon: 'eye',
    element: '风 · Air',
    planet: '水星 · Mercury',
    palette: {
      primary: '#C9A84C',
      secondary: '#E4CA6D',
      accent: '#F5E8B0',
      surface: '#2E2610',
      text: '#F5F0D0',
      muted: '#A09050',
      glow: 'rgba(201, 168, 76, 0.4)',
    },
    description:
      '你站在已知与未知的十字路口。占卜女巫的力量在于解读——塔罗牌的图案、茶叶的沉淀、符文的排列，在你眼中都是宇宙的密信。你不是在预测未来，而是在翻译现在。每一张翻开的牌都是一面镜子，映照出问卜者内心早已知道却不敢承认的真相。你的天赋在于洞察因果的脉络，在混乱中发现秩序，在符号中看见意义。',
    traits: ['符号解读天赋', '直觉与逻辑的平衡', '洞察因果', '镇定而锐利'],
    strengths: ['塔罗占卜', '符文解读', '预知直觉', '模式识别'],
    path: '选择你的占卜工具——塔罗牌、卢恩符文、占星骰子或茶叶。与它们建立深层关系，每天抽一张牌或一枚符文，记录你的解读。',
    ritual: '每周选择一个安静的时刻，点燃紫色蜡烛，将你的占卜工具放在面前。提出一个问题，用直觉选择解读方式，将答案记录在你的影子之书中。',
  },
  hedge: {
    id: 'hedge',
    code: 'H',
    name: '篱笆女巫',
    nameEn: 'Hedge Witch',
    icon: 'gate',
    element: '灵 · Spirit',
    planet: '冥王星 · Pluto',
    palette: {
      primary: '#5C4033',
      secondary: '#8B6B4F',
      accent: '#C4A882',
      surface: '#1E1410',
      text: '#E0D0C0',
      muted: '#8B7B6B',
      glow: 'rgba(92, 64, 51, 0.4)',
    },
    description:
      '你行走在两个世界之间。篱笆女巫的名字来自村庄边缘的树篱——那是文明与荒野、已知与未知的边界。你的魔法在阈限空间中诞生：黎明与黄昏、入睡与清醒之间、生与死的交界。你能穿越意识的面纱，与灵界沟通，带回另一个世界的智慧和疗愈。你独自修行，不问教条，不随流派。你的魔法是野生的、直觉的、深植于土地与灵魂的。',
    traits: ['灵界穿行者', '阈限感知', '野生智慧', '独立而深沉'],
    strengths: ['萨满旅程', '灵性沟通', '草药制作', '阈限仪式'],
    path: '学习冥想和意识状态的转换技巧。在黎明或黄昏时分进行仪式，这是两个世界最接近的时刻。记录你的梦境和灵境体验。',
    ritual: '在黄昏时分（昼夜交替的时刻），点燃一支蜡烛放在窗台上。静静地坐着，让意识游走在清醒与睡眠的边缘，记录下浮现的任何画面或信息。',
  },
  hereditary: {
    id: 'hereditary',
    code: 'I',
    name: '血统女巫',
    nameEn: 'Hereditary Witch',
    icon: 'blood',
    element: '灵 · Spirit',
    planet: '土星 · Saturn',
    palette: {
      primary: '#722F37',
      secondary: '#A04B55',
      accent: '#D4A0A8',
      surface: '#281018',
      text: '#F0D0D5',
      muted: '#A07078',
      glow: 'rgba(114, 47, 55, 0.4)',
    },
    description:
      '魔法的血脉在你的体内流淌。血统女巫的力量来自家族传承——也许你的祖母懂得植物的秘密，也许你的曾祖母曾是一位疗愈者。你不只是一个人在修行，你的身后站着一整条先祖的河流。古老的智慧通过血液、故事和本能传递给你。你尊重传统，但不被传统束缚——你知道魔法像河流一样，既遵循古老的河床，也冲刷出新的路径。',
    traits: ['先祖连接', '家族智慧传承', '传统守护者', '血脉记忆'],
    strengths: ['先祖仪式', '家族保护魔法', '血缘疗愈', '传统复兴'],
    path: '追溯你的家族历史，寻找那些被遗忘的女性故事。建立先祖祭坛，与血脉中的智慧重新连接。你也可以创造属于你自己的家族魔法传统。',
    ritual: '在先祖祭坛前（可以是一张照片、一件传家宝或一支代表家族的蜡烛），写下你想传承的品质和你想释放的家族负担。',
  },
  storm: {
    id: 'storm',
    code: 'J',
    name: '风暴女巫',
    nameEn: 'Storm Witch',
    icon: 'lightning',
    element: '火 · Fire',
    planet: '火星 · Mars',
    palette: {
      primary: '#4A4A5A',
      secondary: '#6E6E82',
      accent: '#B0B0C8',
      surface: '#1A1A22',
      text: '#D8D8E8',
      muted: '#7A7A90',
      glow: 'rgba(74, 74, 90, 0.4)',
    },
    description:
      '你驾驭风暴的力量。风暴女巫的魔法激烈而不可预测——闪电在你的指尖跳跃，雷声在你召唤时轰鸣。你被自然中最狂暴的力量所吸引：暴风雨、飓风、火山喷发。但这不意味着你是破坏者——风暴来临时清除腐朽，雷电劈开黑暗，飓风重塑地貌。你的魔法是关于转化、释放和不可阻挡的改变。当别人在风暴中躲藏时，你张开双臂迎接。',
    traits: ['风暴能量', '激烈的转化力', '无畏', '动荡中的平静中心'],
    strengths: ['天气魔法', '能量净化', '突破障碍', '释放与转化'],
    path: '学习在风暴中冥想——无论是在真实的暴风雨中还是在生活的动荡中。将激荡的能量转化为创造的动力。学会驾驭力量而不是被力量驾驭。',
    ritual: '当暴风雨来临时，在安全的地方燃起一支红色蜡烛。感受风暴的能量，将它引导到你想突破的困境上。风暴过后，你将是崭新的。',
  },
  gray: {
    id: 'gray',
    code: 'K',
    name: '灰女巫',
    nameEn: 'Gray Witch',
    icon: 'scales',
    element: '以太 · Aether',
    planet: '冥王星 · Pluto',
    palette: {
      primary: '#6B5B7B',
      secondary: '#8B7B9B',
      accent: '#BBAACB',
      surface: '#1E1828',
      text: '#E0D8F0',
      muted: '#9B8BAB',
      glow: 'rgba(107, 91, 123, 0.4)',
    },
    description:
      '你站在光明与黑暗之间，不被任何一方定义。灰女巫的魔法超越了善恶的二元对立——你知道光明需要阴影来定义，疗愈需要正视伤口，正义有时需要不那么温柔的手段。你是平衡的守护者，懂得在恰当的时机使用恰当的力量。你不会回避黑暗，因为你知道黑暗也是完整的一部分。你的魔法清醒、成熟、不受道德幻象的束缚。',
    traits: ['超越二元对立', '平衡正义', '清醒的旁观者', '善用阴影力量'],
    strengths: ['平衡魔法', '正义咒语', '阴影整合', '破除幻象'],
    path: '拥抱你的完整光谱——承认你的光明面，也接纳你的阴暗面。学习辨别什么时候需要温柔，什么时候需要锋利。真正的平衡不是静止，而是动态的调和。',
    ritual: '点燃两支蜡烛——一支黑色、一支白色。让它们同时燃烧，在两者之间冥想。反思你生命中需要平衡的事物，写下你需要整合的对立面。',
  },
  eclectic: {
    id: 'eclectic',
    code: 'L',
    name: '折衷女巫',
    nameEn: 'Eclectic Witch',
    icon: 'spiral',
    element: '以太 · Aether',
    planet: '水星 · Mercury',
    palette: {
      primary: '#5B2C6E',
      secondary: '#8B4DA0',
      accent: '#C8A0D8',
      surface: '#1E1028',
      text: '#E8D8F5',
      muted: '#9B70B0',
      glow: 'rgba(91, 44, 110, 0.4)',
    },
    description:
      '你不属于任何一个盒子——而这正是你最大的力量。折衷女巫的魔法是拼贴画、是万花筒、是管弦乐。你从各种传统中汲取灵感：东方的冥想、西方的仪式、南方的草药、北方的符文。你的祭坛上没有教条，只有对你有意义的东西。你永远在探索、实验、重新组合。别人可能说你是半吊子，但他们看不见——你在广度中发现了别人在深度中错过的连接。',
    traits: ['跨传统融合', '无限好奇心', '创造力爆棚', '不受标签约束'],
    strengths: ['跨文化仪式', '创意魔法', '灵活应变', '个性化修行'],
    path: '跟随你的好奇心。今天研究草药，明天学习符文，后天尝试曼陀罗。不要担心"不够纯粹"——你的纯粹恰恰在于你的多元。建立你自己的影子之书，它不需要符合任何人的标准。',
    ritual: '自由创造属于你自己的仪式——没有对错。可以是用香薰、音乐、绘画和舞蹈组合成的即时魔法。你的意图就是你唯一需要的指南。',
  },
};

// Helper: get witch type by code (A-L)
export function getWitchTypeByCode(code: string): WitchType | undefined {
  return Object.values(WITCH_TYPES).find((w) => w.code === code);
}

// Helper: get witch type by id
export function getWitchTypeById(id: WitchTypeId): WitchType {
  return WITCH_TYPES[id];
}
