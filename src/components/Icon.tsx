import React from 'react';
import Svg, { Path, Circle, G, Rect, Line, Polygon, Ellipse, Defs, LinearGradient, Stop } from 'react-native-svg';
import { View } from 'react-native';

export type IconName =
  | 'hexagram'
  | 'pentagram'
  | 'crescent'
  | 'star'
  | 'sun'
  | 'eye'
  | 'flame'
  | 'leaf'
  | 'wave'
  | 'crystal'
  | 'wand'
  | 'candle'
  | 'feather'
  | 'bell'
  | 'chalice'
  | 'dagger'
  | 'book'
  | 'cards'
  | 'home'
  | 'key'
  | 'moon'
  | 'cloud'
  | 'scales'
  | 'mask'
  | 'gate'
  | 'lightning'
  | 'blood'
  | 'incense'
  | 'herb'
  | 'rune'
  | 'circle'
  | 'triangle'
  | 'square'
  | 'spiral'
  | 'cross'
  | 'arrow-right'
  | 'arrow-left'
  | 'plus'
  | 'close'
  | 'check'
  | 'divider'
  | 'sparkle'
  | 'orb'
  | 'cauldron'
  | 'broom'
  | 'cat'
  | 'owl'
  | 'raven'
  | 'snake'
  | 'flower'
  | 'tree'
  | 'mountain'
  | 'compass';

interface IconProps {
  name: IconName;
  size?: number;
  color?: string;
  strokeWidth?: number;
  fill?: boolean;
}

const PATHS: Record<IconName, (props: { color: string; sw: number; fill: boolean }) => React.ReactElement> = {
  hexagram: ({ color, sw, fill }) => (
    <G>
      {/* Upward triangle */}
      <Polygon points="50,12 88,72 12,72" fill={fill ? color + '15' : 'none'} stroke={color} strokeWidth={sw} strokeLinejoin="round" />
      {/* Downward triangle */}
      <Polygon points="50,88 88,28 12,28" fill={fill ? color + '15' : 'none'} stroke={color} strokeWidth={sw} strokeLinejoin="round" />
    </G>
  ),
  pentagram: ({ color, sw, fill }) => (
    <Path
      d="M50 5 L61 38 L95 38 L67 58 L78 92 L50 72 L22 92 L33 58 L5 38 L39 38 Z"
      fill={fill ? color : 'none'}
      stroke={color}
      strokeWidth={sw}
      strokeLinejoin="round"
    />
  ),
  crescent: ({ color, sw, fill }) => (
    <Path
      d="M65 50 A30 30 0 1 1 35 20 A22 22 0 1 0 65 50 Z"
      fill={fill ? color : 'none'}
      stroke={color}
      strokeWidth={sw}
    />
  ),
  star: ({ color, sw, fill }) => (
    <Path
      d="M50 10 L55 42 L88 45 L60 62 L70 90 L50 72 L30 90 L40 62 L12 45 L45 42 Z"
      fill={fill ? color : 'none'}
      stroke={color}
      strokeWidth={sw}
      strokeLinejoin="round"
    />
  ),
  sun: ({ color, sw, fill }) => (
    <G>
      <Circle cx="50" cy="50" r="18" fill={fill ? color : 'none'} stroke={color} strokeWidth={sw} />
      <G stroke={color} strokeWidth={sw} strokeLinecap="round">
        <Line x1="50" y1="12" x2="50" y2="22" />
        <Line x1="50" y1="78" x2="50" y2="88" />
        <Line x1="12" y1="50" x2="22" y2="50" />
        <Line x1="78" y1="50" x2="88" y2="50" />
        <Line x1="23" y1="23" x2="30" y2="30" />
        <Line x1="70" y1="70" x2="77" y2="77" />
        <Line x1="77" y1="23" x2="70" y2="30" />
        <Line x1="23" y1="77" x2="30" y2="70" />
      </G>
    </G>
  ),
  eye: ({ color, sw, fill }) => (
    <G>
      <Path d="M10 50 Q50 15 90 50 Q50 85 10 50 Z" fill="none" stroke={color} strokeWidth={sw} />
      <Circle cx="50" cy="50" r="12" fill={fill ? color : 'none'} stroke={color} strokeWidth={sw} />
      <Circle cx="50" cy="50" r="5" fill={color} />
    </G>
  ),
  flame: ({ color, sw, fill }) => (
    <Path
      d="M50 10 C58 25 72 35 72 55 C72 75 60 90 50 90 C40 90 28 75 28 55 C28 40 38 35 42 25 C46 35 50 40 50 10 Z"
      fill={fill ? color : 'none'}
      stroke={color}
      strokeWidth={sw}
      strokeLinejoin="round"
    />
  ),
  leaf: ({ color, sw, fill }) => (
    <G>
      <Path
        d="M20 80 Q20 20 80 20 Q80 80 20 80 Z"
        fill={fill ? color : 'none'}
        stroke={color}
        strokeWidth={sw}
        strokeLinejoin="round"
      />
      <Line x1="20" y1="80" x2="80" y2="20" stroke={color} strokeWidth={sw * 0.6} />
    </G>
  ),
  wave: ({ color, sw, fill }) => (
    <G>
      <Path d="M10 35 Q25 15 40 35 Q55 55 70 35 Q80 25 90 35" fill="none" stroke={color} strokeWidth={sw} strokeLinecap="round" />
      <Path d="M10 50 Q25 30 40 50 Q55 70 70 50 Q80 40 90 50" fill="none" stroke={color} strokeWidth={sw} strokeLinecap="round" />
      <Path d="M10 65 Q25 45 40 65 Q55 85 70 65 Q80 55 90 65" fill="none" stroke={color} strokeWidth={sw} strokeLinecap="round" />
    </G>
  ),
  crystal: ({ color, sw, fill }) => (
    <G>
      <Path d="M35 10 L65 10 L85 35 L50 90 L15 35 Z" fill={fill ? color + '30' : 'none'} stroke={color} strokeWidth={sw} strokeLinejoin="round" />
      <Line x1="35" y1="10" x2="50" y2="35" stroke={color} strokeWidth={sw * 0.5} />
      <Line x1="65" y1="10" x2="50" y2="35" stroke={color} strokeWidth={sw * 0.5} />
      <Line x1="15" y1="35" x2="85" y2="35" stroke={color} strokeWidth={sw * 0.5} />
    </G>
  ),
  wand: ({ color, sw, fill }) => (
    <G>
      <Line x1="20" y1="80" x2="80" y2="20" stroke={color} strokeWidth={sw} strokeLinecap="round" />
      <Path d="M70 15 L85 10 L80 25 Z" fill={color} stroke={color} strokeWidth={sw} strokeLinejoin="round" />
      <Circle cx="20" cy="80" r="6" fill="none" stroke={color} strokeWidth={sw * 0.7} />
    </G>
  ),
  candle: ({ color, sw, fill }) => (
    <G>
      <Path d="M47 8 Q50 2 53 8 Q55 13 50 18 Q45 13 47 8 Z" fill={color} />
      <Rect x="38" y="22" width="24" height="60" rx="3" fill={fill ? color + '20' : 'none'} stroke={color} strokeWidth={sw} />
      <Line x1="50" y1="18" x2="50" y2="22" stroke={color} strokeWidth={sw} />
    </G>
  ),
  feather: ({ color, sw, fill }) => (
    <G>
      <Path
        d="M75 15 Q40 20 25 55 Q20 70 25 80 Q35 75 45 68 Q65 55 75 35 Q80 25 75 15 Z"
        fill={fill ? color + '20' : 'none'}
        stroke={color}
        strokeWidth={sw}
        strokeLinejoin="round"
      />
      <Line x1="75" y1="15" x2="25" y2="80" stroke={color} strokeWidth={sw * 0.5} />
      <Line x1="60" y1="20" x2="50" y2="30" stroke={color} strokeWidth={sw * 0.3} />
      <Line x1="55" y1="30" x2="43" y2="42" stroke={color} strokeWidth={sw * 0.3} />
      <Line x1="50" y1="42" x2="37" y2="55" stroke={color} strokeWidth={sw * 0.3} />
    </G>
  ),
  bell: ({ color, sw, fill }) => (
    <G>
      <Path
        d="M35 65 Q35 35 50 25 Q65 35 65 65 Z"
        fill={fill ? color + '20' : 'none'}
        stroke={color}
        strokeWidth={sw}
        strokeLinejoin="round"
      />
      <Line x1="30" y1="65" x2="70" y2="65" stroke={color} strokeWidth={sw} />
      <Circle cx="50" cy="78" r="5" fill="none" stroke={color} strokeWidth={sw * 0.7} />
    </G>
  ),
  chalice: ({ color, sw, fill }) => (
    <G>
      <Path d="M25 20 Q25 40 50 45 Q75 40 75 20 Z" fill={fill ? color + '20' : 'none'} stroke={color} strokeWidth={sw} strokeLinejoin="round" />
      <Line x1="50" y1="45" x2="50" y2="65" stroke={color} strokeWidth={sw} />
      <Path d="M35 80 L65 80 L60 70 L40 70 Z" fill={fill ? color + '20' : 'none'} stroke={color} strokeWidth={sw} strokeLinejoin="round" />
    </G>
  ),
  dagger: ({ color, sw, fill }) => (
    <G>
      <Path d="M50 5 L45 55 L55 55 Z" fill={fill ? color + '30' : 'none'} stroke={color} strokeWidth={sw} strokeLinejoin="round" />
      <Line x1="38" y1="55" x2="62" y2="55" stroke={color} strokeWidth={sw + 1} />
      <Rect x="47" y="55" width="6" height="20" fill={color + '30'} stroke={color} strokeWidth={sw * 0.6} />
      <Circle cx="50" cy="80" r="5" fill="none" stroke={color} strokeWidth={sw * 0.7} />
    </G>
  ),
  book: ({ color, sw, fill }) => (
    <G>
      <Path d="M20 15 Q35 12 50 18 Q65 12 80 15 L80 82 Q65 79 50 85 Q35 79 20 82 Z" fill={fill ? color + '20' : 'none'} stroke={color} strokeWidth={sw} strokeLinejoin="round" />
      <Line x1="50" y1="18" x2="50" y2="85" stroke={color} strokeWidth={sw * 0.5} />
      <Path d="M28 30 L42 28 L42 32 L28 34 Z" fill={color + '40'} />
    </G>
  ),
  cards: ({ color, sw, fill }) => (
    <G>
      <Rect x="18" y="15" width="30" height="55" rx="4" fill={fill ? color + '20' : 'none'} stroke={color} strokeWidth={sw} transform="rotate(-8, 33, 42)" />
      <Rect x="38" y="12" width="30" height="55" rx="4" fill={fill ? color + '20' : 'none'} stroke={color} strokeWidth={sw} />
      <Rect x="58" y="15" width="30" height="55" rx="4" fill={fill ? color + '20' : 'none'} stroke={color} strokeWidth={sw} transform="rotate(8, 73, 42)" />
    </G>
  ),
  home: ({ color, sw, fill }) => (
    <G>
      <Path d="M15 50 L50 18 L85 50 L78 50 L78 85 L22 85 L22 50 Z" fill={fill ? color + '15' : 'none'} stroke={color} strokeWidth={sw} strokeLinejoin="round" />
      <Circle cx="50" cy="48" r="8" fill="none" stroke={color} strokeWidth={sw * 0.6} />
    </G>
  ),
  key: ({ color, sw, fill }) => (
    <G>
      <Circle cx="25" cy="25" r="12" fill="none" stroke={color} strokeWidth={sw} />
      <Circle cx="25" cy="25" r="4" fill={color} />
      <Line x1="33" y1="33" x2="85" y2="85" stroke={color} strokeWidth={sw} strokeLinecap="round" />
      <Line x1="70" y1="70" x2="60" y2="80" stroke={color} strokeWidth={sw} strokeLinecap="round" />
      <Line x1="80" y1="80" x2="70" y2="90" stroke={color} strokeWidth={sw} strokeLinecap="round" />
    </G>
  ),
  moon: ({ color, sw, fill }) => (
    <Path
      d="M70 50 A30 30 0 1 1 30 20 A22 22 0 1 0 70 50 Z"
      fill={fill ? color + '20' : 'none'}
      stroke={color}
      strokeWidth={sw}
    />
  ),
  cloud: ({ color, sw, fill }) => (
    <G>
      <Path
        d="M20 65 Q10 65 10 55 Q10 45 20 45 Q22 32 38 32 Q48 25 58 35 Q72 32 75 48 Q88 48 88 58 Q88 68 78 68 Z"
        fill={fill ? color + '20' : 'none'}
        stroke={color}
        strokeWidth={sw}
        strokeLinejoin="round"
      />
    </G>
  ),
  scales: ({ color, sw, fill }) => (
    <G>
      <Line x1="50" y1="10" x2="50" y2="80" stroke={color} strokeWidth={sw} />
      <Line x1="20" y1="25" x2="80" y2="25" stroke={color} strokeWidth={sw} />
      <Path d="M12 25 L20 50 L28 25" fill="none" stroke={color} strokeWidth={sw} strokeLinejoin="round" />
      <Path d="M72 25 L80 50 L88 25" fill="none" stroke={color} strokeWidth={sw} strokeLinejoin="round" />
      <Line x1="38" y1="80" x2="62" y2="80" stroke={color} strokeWidth={sw} />
    </G>
  ),
  mask: ({ color, sw, fill }) => (
    <G>
      <Path
        d="M15 25 Q15 45 50 55 Q85 45 85 25 Q70 35 50 30 Q30 35 15 25 Z"
        fill={fill ? color + '20' : 'none'}
        stroke={color}
        strokeWidth={sw}
        strokeLinejoin="round"
      />
      <Circle cx="35" cy="30" r="3" fill={color} />
      <Circle cx="65" cy="30" r="3" fill={color} />
    </G>
  ),
  gate: ({ color, sw, fill }) => (
    <G>
      <Path d="M20 85 L20 30 Q50 5 80 30 L80 85" fill="none" stroke={color} strokeWidth={sw} strokeLinejoin="round" />
      <Line x1="20" y1="55" x2="80" y2="55" stroke={color} strokeWidth={sw * 0.7} />
      <Circle cx="50" cy="55" r="6" fill="none" stroke={color} strokeWidth={sw * 0.7} />
    </G>
  ),
  lightning: ({ color, sw, fill }) => (
    <Path
      d="M55 5 L30 50 L45 50 L35 95 L70 42 L52 42 Z"
      fill={fill ? color : 'none'}
      stroke={color}
      strokeWidth={sw}
      strokeLinejoin="round"
    />
  ),
  blood: ({ color, sw, fill }) => (
    <Path
      d="M50 10 C58 25 72 40 72 58 C72 75 62 90 50 90 C38 90 28 75 28 58 C28 40 42 25 50 10 Z"
      fill={fill ? color + '30' : 'none'}
      stroke={color}
      strokeWidth={sw}
      strokeLinejoin="round"
    />
  ),
  incense: ({ color, sw, fill }) => (
    <G>
      <Rect x="42" y="50" width="16" height="35" rx="3" fill={fill ? color + '20' : 'none'} stroke={color} strokeWidth={sw} />
      <Path d="M50 48 Q45 35 50 25 Q55 15 50 5" fill="none" stroke={color} strokeWidth={sw * 0.7} strokeLinecap="round" />
      <Path d="M48 42 Q43 30 48 20" fill="none" stroke={color} strokeWidth={sw * 0.4} strokeLinecap="round" opacity="0.5" />
    </G>
  ),
  herb: ({ color, sw, fill }) => (
    <G>
      <Line x1="50" y1="90" x2="50" y2="30" stroke={color} strokeWidth={sw} strokeLinecap="round" />
      <Path d="M50 40 Q30 35 25 50 Q35 55 50 50" fill={fill ? color + '20' : 'none'} stroke={color} strokeWidth={sw * 0.6} strokeLinejoin="round" />
      <Path d="M50 55 Q70 50 75 65 Q65 70 50 65" fill={fill ? color + '20' : 'none'} stroke={color} strokeWidth={sw * 0.6} strokeLinejoin="round" />
      <Path d="M50 70 Q32 65 28 78 Q38 82 50 78" fill={fill ? color + '20' : 'none'} stroke={color} strokeWidth={sw * 0.6} strokeLinejoin="round" />
    </G>
  ),
  rune: ({ color, sw, fill }) => (
    <G>
      <Line x1="30" y1="15" x2="30" y2="85" stroke={color} strokeWidth={sw} strokeLinecap="round" />
      <Line x1="30" y1="20" x2="65" y2="35" stroke={color} strokeWidth={sw} strokeLinecap="round" />
      <Line x1="30" y1="45" x2="55" y2="60" stroke={color} strokeWidth={sw} strokeLinecap="round" />
      <Line x1="30" y1="70" x2="60" y2="80" stroke={color} strokeWidth={sw} strokeLinecap="round" />
    </G>
  ),
  circle: ({ color, sw, fill }) => (
    <Circle cx="50" cy="50" r="38" fill={fill ? color + '15' : 'none'} stroke={color} strokeWidth={sw} />
  ),
  triangle: ({ color, sw, fill }) => (
    <Path d="M50 12 L88 82 L12 82 Z" fill={fill ? color + '15' : 'none'} stroke={color} strokeWidth={sw} strokeLinejoin="round" />
  ),
  square: ({ color, sw, fill }) => (
    <Rect x="15" y="15" width="70" height="70" rx="4" fill={fill ? color + '15' : 'none'} stroke={color} strokeWidth={sw} />
  ),
  spiral: ({ color, sw, fill }) => (
    <Path
      d="M50 50 m-3 0 a3 3 0 1 1 6 0 a6 6 0 1 1 -12 0 a12 12 0 1 1 24 0 a18 18 0 1 1 -36 0 a24 24 0 1 1 48 0"
      fill="none"
      stroke={color}
      strokeWidth={sw}
      strokeLinecap="round"
    />
  ),
  cross: ({ color, sw, fill }) => (
    <G>
      <Line x1="50" y1="10" x2="50" y2="90" stroke={color} strokeWidth={sw} strokeLinecap="round" />
      <Line x1="25" y1="35" x2="75" y2="35" stroke={color} strokeWidth={sw} strokeLinecap="round" />
    </G>
  ),
  'arrow-right': ({ color, sw }) => (
    <G>
      <Line x1="15" y1="50" x2="80" y2="50" stroke={color} strokeWidth={sw} strokeLinecap="round" />
      <Path d="M65 35 L85 50 L65 65" fill="none" stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" />
    </G>
  ),
  'arrow-left': ({ color, sw }) => (
    <G>
      <Line x1="20" y1="50" x2="85" y2="50" stroke={color} strokeWidth={sw} strokeLinecap="round" />
      <Path d="M35 35 L15 50 L35 65" fill="none" stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" />
    </G>
  ),
  plus: ({ color, sw }) => (
    <G>
      <Line x1="50" y1="20" x2="50" y2="80" stroke={color} strokeWidth={sw + 2} strokeLinecap="round" />
      <Line x1="20" y1="50" x2="80" y2="50" stroke={color} strokeWidth={sw + 2} strokeLinecap="round" />
    </G>
  ),
  close: ({ color, sw }) => (
    <G>
      <Line x1="25" y1="25" x2="75" y2="75" stroke={color} strokeWidth={sw + 1} strokeLinecap="round" />
      <Line x1="75" y1="25" x2="25" y2="75" stroke={color} strokeWidth={sw + 1} strokeLinecap="round" />
    </G>
  ),
  check: ({ color, sw }) => (
    <Path d="M20 50 L40 70 L80 25" fill="none" stroke={color} strokeWidth={sw + 1} strokeLinecap="round" strokeLinejoin="round" />
  ),
  divider: ({ color, sw }) => (
    <G>
      <Line x1="5" y1="50" x2="35" y2="50" stroke={color} strokeWidth={sw * 0.5} strokeLinecap="round" />
      <Path d="M40 50 L50 40 L60 50 L50 60 Z" fill="none" stroke={color} strokeWidth={sw * 0.5} />
      <Line x1="65" y1="50" x2="95" y2="50" stroke={color} strokeWidth={sw * 0.5} strokeLinecap="round" />
    </G>
  ),
  sparkle: ({ color, sw, fill }) => (
    <Path
      d="M50 10 L53 45 L88 50 L53 55 L50 90 L47 55 L12 50 L47 45 Z"
      fill={fill ? color : 'none'}
      stroke={color}
      strokeWidth={sw * 0.6}
      strokeLinejoin="round"
    />
  ),
  orb: ({ color, sw, fill }) => (
    <G>
      <Circle cx="50" cy="50" r="32" fill={fill ? color + '10' : 'none'} stroke={color} strokeWidth={sw} />
      <Circle cx="50" cy="50" r="22" fill="none" stroke={color} strokeWidth={sw * 0.5} opacity="0.6" />
      <Ellipse cx="40" cy="38" rx="10" ry="6" fill={color} opacity="0.2" />
    </G>
  ),
  cauldron: ({ color, sw, fill }) => (
    <G>
      <Path d="M20 45 Q20 80 50 80 Q80 80 80 45 Z" fill={fill ? color + '20' : 'none'} stroke={color} strokeWidth={sw} strokeLinejoin="round" />
      <Line x1="15" y1="45" x2="85" y2="45" stroke={color} strokeWidth={sw} />
      <Path d="M35 25 Q40 18 35 12 M50 25 Q55 18 50 12 M65 25 Q70 18 65 12" fill="none" stroke={color} strokeWidth={sw * 0.5} strokeLinecap="round" opacity="0.5" />
    </G>
  ),
  broom: ({ color, sw, fill }) => (
    <G>
      <Line x1="75" y1="15" x2="30" y2="60" stroke={color} strokeWidth={sw} strokeLinecap="round" />
      <Path d="M15 65 L35 55 L40 65 L45 75 L25 85 Z" fill={fill ? color + '20' : 'none'} stroke={color} strokeWidth={sw} strokeLinejoin="round" />
      <Line x1="20" y1="70" x2="38" y2="62" stroke={color} strokeWidth={sw * 0.4} />
      <Line x1="22" y1="76" x2="40" y2="68" stroke={color} strokeWidth={sw * 0.4} />
    </G>
  ),
  cat: ({ color, sw, fill }) => (
    <G>
      <Path d="M25 30 L20 15 L35 25 Z" fill={fill ? color : 'none'} stroke={color} strokeWidth={sw * 0.6} />
      <Path d="M75 30 L80 15 L65 25 Z" fill={fill ? color : 'none'} stroke={color} strokeWidth={sw * 0.6} />
      <Ellipse cx="50" cy="40" rx="25" ry="22" fill={fill ? color + '20' : 'none'} stroke={color} strokeWidth={sw} />
      <Ellipse cx="42" cy="38" rx="3" ry="5" fill={color} />
      <Ellipse cx="58" cy="38" rx="3" ry="5" fill={color} />
      <Path d="M47 48 L50 52 L53 48" fill="none" stroke={color} strokeWidth={sw * 0.5} />
    </G>
  ),
  owl: ({ color, sw, fill }) => (
    <G>
      <Ellipse cx="50" cy="45" rx="28" ry="30" fill={fill ? color + '20' : 'none'} stroke={color} strokeWidth={sw} />
      <Circle cx="38" cy="40" r="10" fill="none" stroke={color} strokeWidth={sw * 0.5} />
      <Circle cx="62" cy="40" r="10" fill="none" stroke={color} strokeWidth={sw * 0.5} />
      <Circle cx="38" cy="40" r="4" fill={color} />
      <Circle cx="62" cy="40" r="4" fill={color} />
      <Path d="M45 52 L50 58 L55 52" fill={color} stroke={color} strokeWidth={sw * 0.4} />
      <Path d="M35 15 L32 8 L42 15 Z" fill={color} />
      <Path d="M65 15 L68 8 L58 15 Z" fill={color} />
    </G>
  ),
  raven: ({ color, sw, fill }) => (
    <G>
      <Path d="M30 50 Q20 30 40 25 Q50 20 60 25 Q80 30 70 50 Q65 60 50 58 Q35 60 30 50 Z" fill={fill ? color + '20' : 'none'} stroke={color} strokeWidth={sw} strokeLinejoin="round" />
      <Path d="M70 45 L88 35 L75 50" fill={fill ? color + '10' : 'none'} stroke={color} strokeWidth={sw * 0.6} strokeLinejoin="round" />
      <Circle cx="45" cy="35" r="3" fill={color} />
      <Path d="M42 50 L48 55 L42 58 Z" fill={color} />
    </G>
  ),
  snake: ({ color, sw, fill }) => (
    <Path
      d="M20 80 Q20 60 40 60 Q60 60 60 45 Q60 30 40 30 Q25 30 25 20"
      fill="none"
      stroke={color}
      strokeWidth={sw + 1}
      strokeLinecap="round"
    />
  ),
  flower: ({ color, sw, fill }) => (
    <G>
      <Circle cx="50" cy="50" r="8" fill={fill ? color : 'none'} stroke={color} strokeWidth={sw * 0.5} />
      <Ellipse cx="50" cy="25" rx="10" ry="15" fill={fill ? color + '20' : 'none'} stroke={color} strokeWidth={sw * 0.5} />
      <Ellipse cx="50" cy="75" rx="10" ry="15" fill={fill ? color + '20' : 'none'} stroke={color} strokeWidth={sw * 0.5} />
      <Ellipse cx="25" cy="50" rx="15" ry="10" fill={fill ? color + '20' : 'none'} stroke={color} strokeWidth={sw * 0.5} />
      <Ellipse cx="75" cy="50" rx="15" ry="10" fill={fill ? color + '20' : 'none'} stroke={color} strokeWidth={sw * 0.5} />
    </G>
  ),
  tree: ({ color, sw, fill }) => (
    <G>
      <Circle cx="50" cy="35" r="25" fill={fill ? color + '15' : 'none'} stroke={color} strokeWidth={sw} />
      <Rect x="46" y="55" width="8" height="35" fill={fill ? color + '30' : 'none'} stroke={color} strokeWidth={sw * 0.6} />
      <Line x1="40" y1="70" x2="35" y2="80" stroke={color} strokeWidth={sw * 0.4} />
      <Line x1="60" y1="70" x2="65" y2="80" stroke={color} strokeWidth={sw * 0.4} />
    </G>
  ),
  mountain: ({ color, sw, fill }) => (
    <G>
      <Path d="M10 80 L35 30 L55 60 L75 20 L90 80 Z" fill={fill ? color + '15' : 'none'} stroke={color} strokeWidth={sw} strokeLinejoin="round" />
    </G>
  ),
  compass: ({ color, sw, fill }) => (
    <G>
      <Circle cx="50" cy="50" r="38" fill="none" stroke={color} strokeWidth={sw * 0.6} />
      <Path d="M50 15 L55 50 L50 85 L45 50 Z" fill={fill ? color + '30' : 'none'} stroke={color} strokeWidth={sw * 0.6} strokeLinejoin="round" />
      <Path d="M15 50 L50 45 L85 50 L50 55 Z" fill="none" stroke={color} strokeWidth={sw * 0.4} strokeLinejoin="round" />
      <Circle cx="50" cy="50" r="3" fill={color} />
    </G>
  ),
};

export function Icon({ name, size = 24, color = '#C9A84C', strokeWidth = 2, fill = false }: IconProps) {
  const renderPath = PATHS[name];
  if (!renderPath) return null;

  return (
    <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
      <Svg width={size} height={size} viewBox="0 0 100 100">
        {renderPath({ color, sw: strokeWidth, fill })}
      </Svg>
    </View>
  );
}

// Witch type icon mapping
export const WITCH_ICONS: Record<string, IconName> = {
  green: 'leaf',
  sea: 'wave',
  kitchen: 'flame',
  cosmic: 'star',
  crystal: 'crystal',
  lunar: 'crescent',
  divination: 'eye',
  hedge: 'gate',
  hereditary: 'blood',
  storm: 'lightning',
  gray: 'scales',
  eclectic: 'spiral',
};

// Tarot suit icon mapping
export const SUIT_ICONS: Record<string, IconName> = {
  cups: 'chalice',
  wands: 'wand',
  swords: 'dagger',
  pentacles: 'hexagram',
};
