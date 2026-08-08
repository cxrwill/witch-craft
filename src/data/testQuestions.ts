import { WitchTypeId } from './witchTypes';

export interface TestQuestion {
  id: number;
  question: string;
  options: TestOption[];
}

export interface TestOption {
  text: string;
  description: string;
  scores: Partial<Record<WitchTypeId, number>>;
}

/**
 * 12沉浸式测试题
 * 每道题4个选项，每个选项对不同女巫类型有不同的权重分
 * 类似 MBTI 跳转逻辑
 */
export const TEST_QUESTIONS: TestQuestion[] = [
  {
    id: 1,
    question: '在一个属于自己的夜晚，你最想待在哪里？',
    options: [
      {
        text: '森林深处的小木屋',
        description: '被树木和藤蔓环绕，能听见猫头鹰的低鸣',
        scores: { green: 3, hedge: 2, hereditary: 1 },
      },
      {
        text: '海边悬崖上的灯塔',
        description: '脚下是汹涌的海浪，头顶是漫天的星辰',
        scores: { sea: 3, cosmic: 2, storm: 1 },
      },
      {
        text: '温暖的老厨房里',
        description: '炉火噼啪作响，空气中飘着面包和香料的味道',
        scores: { kitchen: 3, green: 1, hereditary: 1 },
      },
      {
        text: '满月下的古堡塔楼',
        description: '月光透过彩色玻璃洒在地板上',
        scores: { lunar: 3, gray: 2, divination: 1 },
      },
    ],
  },
  {
    id: 2,
    question: '你的桌子上只能放一件物品，你会选？',
    options: [
      {
        text: '一颗晶莹剔透的水晶球',
        description: '映照着未知的画面',
        scores: { crystal: 3, divination: 2, cosmic: 1 },
      },
      {
        text: '一本泛黄的手写笔记',
        description: '页边写满了先祖的注解',
        scores: { hereditary: 3, eclectic: 2, hedge: 1 },
      },
      {
        text: '一束刚采摘的草药',
        description: '还带着晨露的清新',
        scores: { green: 3, kitchen: 2, hedge: 1 },
      },
      {
        text: '一根雕刻着符文的魔杖',
        description: '摸上去微微发烫',
        scores: { eclectic: 3, storm: 2, gray: 1 },
      },
    ],
  },
  {
    id: 3,
    question: '哪种天气最让你感到充满力量？',
    options: [
      {
        text: '雷暴交加的时刻',
        description: '闪电劈开天空，空气里充满电荷',
        scores: { storm: 3, gray: 2, cosmic: 1 },
      },
      {
        text: '绵绵细雨的日子',
        description: '雨滴轻敲窗棂，世界慢下来',
        scores: { sea: 3, lunar: 2, green: 1 },
      },
      {
        text: '晴空万里的正午',
        description: '阳光炽烈，万物都清晰分明',
        scores: { cosmic: 3, crystal: 2, kitchen: 1 },
      },
      {
        text: '大雾弥漫的清晨',
        description: '看不清前方的路，但内心异常清醒',
        scores: { hedge: 3, divination: 2, gray: 1 },
      },
    ],
  },
  {
    id: 4,
    question: '当你需要答案时，你第一反应是什么？',
    options: [
      {
        text: '铺开塔罗牌，让牌面说话',
        description: '符号和图案会告诉我一切',
        scores: { divination: 3, lunar: 2, eclectic: 1 },
      },
      {
        text: '走进大自然，聆听风的低语',
        description: '答案藏在一片落叶的纹理里',
        scores: { green: 3, hedge: 2, sea: 1 },
      },
      {
        text: '闭上眼睛，感受身体的直觉',
        description: '身体从不说谎',
        scores: { crystal: 3, lunar: 2, gray: 1 },
      },
      {
        text: '点一支蜡烛，向先祖和宇宙提问',
        description: '然后在梦境中等待回应',
        scores: { hereditary: 3, hedge: 2, cosmic: 1 },
      },
    ],
  },
  {
    id: 5,
    question: '你最想送给朋友的一样东西是？',
    options: [
      {
        text: '一条亲手编织的水晶手链',
        description: '每颗珠子都有它的祝福',
        scores: { crystal: 3, kitchen: 1, eclectic: 1 },
      },
      {
        text: '一罐自制的魔法草药茶',
        description: '配方是根据她的星盘调配的',
        scores: { green: 3, kitchen: 2, cosmic: 1 },
      },
      {
        text: '一个装满海岸珍宝的小瓶子',
        description: '贝壳、海玻璃和一颗珍珠',
        scores: { sea: 3, eclectic: 1, lunar: 1 },
      },
      {
        text: '一页手写的庇护咒语',
        description: '用古老的文字和月桂叶墨水写成',
        scores: { hereditary: 3, hedge: 2, gray: 1 },
      },
    ],
  },
  {
    id: 6,
    question: '在魔法修行中，什么对你最重要？',
    options: [
      {
        text: '传承与根基——知道我从哪里来',
        description: '魔法通过血脉和故事代代相传',
        scores: { hereditary: 3, green: 1, hedge: 1 },
      },
      {
        text: '自由与创造——不被任何人定义',
        description: '我的魔法是我的艺术',
        scores: { eclectic: 3, storm: 2, gray: 1 },
      },
      {
        text: '平衡与公正——光明与黑暗都要正视',
        description: '片面是最大的不完整',
        scores: { gray: 3, divination: 1, cosmic: 1 },
      },
      {
        text: '连接与体验——真实地感受万物',
        description: '魔法在每一次呼吸和触摸中',
        scores: { green: 2, crystal: 2, kitchen: 1 },
      },
    ],
  },
  {
    id: 7,
    question: '一天之中，哪个时刻让你感到最有魔力？',
    options: [
      {
        text: '黎明破晓，第一缕光照亮露珠',
        description: '新的一天在静谧中苏醒',
        scores: { green: 3, kitchen: 2, eclectic: 1 },
      },
      {
        text: '正午烈日，影子最短的瞬间',
        description: '力量最集中、最清晰的时刻',
        scores: { storm: 3, crystal: 2, cosmic: 1 },
      },
      {
        text: '黄昏时分，日光与暮色交界的刹那',
        description: '两个世界最接近的临界点',
        scores: { hedge: 3, gray: 2, lunar: 1 },
      },
      {
        text: '午夜深处，万物沉眠的寂静',
        description: '月光洒落，梦境开始漫游',
        scores: { lunar: 3, divination: 2, hereditary: 1 },
      },
    ],
  },
  {
    id: 8,
    question: '面对一个困难的决定，你的方式是？',
    options: [
      {
        text: '用塔罗或符文求问宇宙指引',
        description: '更高的视角会告诉我方向',
        scores: { divination: 3, cosmic: 2, lunar: 1 },
      },
      {
        text: '独自在自然中散步，让思绪沉淀',
        description: '大地会吸收我的焦虑并给我答案',
        scores: { green: 3, sea: 2, hedge: 1 },
      },
      {
        text: '做一顿精心准备的饭，在烹饪中理清思路',
        description: '手上的动作让头脑安静下来',
        scores: { kitchen: 3, crystal: 1, eclectic: 1 },
      },
      {
        text: '直接面对，用行动打破困境',
        description: '犹豫不会让风暴变小',
        scores: { storm: 3, gray: 2, eclectic: 1 },
      },
    ],
  },
  {
    id: 9,
    question: '你觉得自己最强大的天赋是什么？',
    options: [
      {
        text: '疗愈——我能感知别人的伤痛并施以抚慰',
        description: '无论是身体、情绪还是灵魂',
        scores: { green: 2, crystal: 2, kitchen: 1, sea: 1 },
      },
      {
        text: '洞察——我能看见事情的本质和因果',
        description: '伪装和幻象都骗不了我',
        scores: { divination: 3, gray: 2, cosmic: 1 },
      },
      {
        text: '转化——我能把困境变成机遇',
        description: '没有什么能量不能被重新引导',
        scores: { storm: 3, eclectic: 2, hedge: 1 },
      },
      {
        text: '守护——我能为在意的人筑起庇护所',
        description: '我的边界就是他们的安全区',
        scores: { kitchen: 3, hereditary: 2, lunar: 1 },
      },
    ],
  },
  {
    id: 10,
    question: '如果你可以拥有一种魔法生物作为伙伴？',
    options: [
      {
        text: '一只智慧的黑猫',
        description: '知晓所有秘密的守护者',
        scores: { lunar: 3, divination: 2, gray: 1 },
      },
      {
        text: '一只闪光的蜂鸟',
        description: '在花丛和草药间飞舞',
        scores: { green: 3, eclectic: 2, crystal: 1 },
      },
      {
        text: '一只古老的海龟',
        description: '壳上刻着海洋的记忆',
        scores: { sea: 3, hereditary: 2, hedge: 1 },
      },
      {
        text: '一只火红的凤凰',
        description: '浴火重生的永恒象征',
        scores: { storm: 3, cosmic: 2, gray: 1 },
      },
    ],
  },
  {
    id: 11,
    question: '一把古老的钥匙出现在你面前，你用它打开什么？',
    options: [
      {
        text: '一座藏在森林深处的石屋',
        description: '里面堆满了古籍和干草药',
        scores: { hedge: 3, green: 2, hereditary: 1 },
      },
      {
        text: '一个海底的水晶洞穴',
        description: '每一面墙壁都镶嵌着发光的宝石',
        scores: { sea: 3, crystal: 2, lunar: 1 },
      },
      {
        text: '一扇通往星空的门',
        description: '背后是无限的天体与可能性',
        scores: { cosmic: 3, eclectic: 2, divination: 1 },
      },
      {
        text: '一个隐藏在壁炉后面的阁楼',
        description: '温暖、安全，藏着家族的记忆',
        scores: { kitchen: 3, hereditary: 2, crystal: 1 },
      },
    ],
  },
  {
    id: 12,
    question: '你希望后人如何记住你？',
    options: [
      {
        text: '那个让所有植物都开花的女人',
        description: '她走过后，大地便有了生机',
        scores: { green: 3, kitchen: 1, sea: 1 },
      },
      {
        text: '那个总能看见真相的智者',
        description: '她的预言从不错，她的判断永远公正',
        scores: { divination: 3, gray: 2, cosmic: 1 },
      },
      {
        text: '那个用风暴重塑了命运的人',
        description: '她从不接受"不可能"这个答案',
        scores: { storm: 3, eclectic: 2, hedge: 1 },
      },
      {
        text: '那个让所有人感到被爱和被保护的灵魂',
        description: '在她的身边，没有人是孤独的',
        scores: { hereditary: 3, crystal: 2, lunar: 1 },
      },
    ],
  },
];
