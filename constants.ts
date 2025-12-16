import { PlanetData } from './types';

// Relative scale for visualization purposes (not astronomically accurate to ensure visibility)
export const PLANETS: PlanetData[] = [
  {
    id: 'mercury',
    name: '水星',
    nameEn: 'Mercury',
    color: 'bg-stone-400',
    size: 12,
    distance: 60,
    speed: 4.1,
    description: '水星是太阳系中最小的行星，也是最接近太阳的行星。'
  },
  {
    id: 'venus',
    name: '金星',
    nameEn: 'Venus',
    color: 'bg-orange-300',
    size: 18,
    distance: 90,
    speed: 1.6,
    description: '金星是离太阳第二近的行星，拥有浓厚的大气层。'
  },
  {
    id: 'earth',
    name: '地球',
    nameEn: 'Earth',
    color: 'bg-blue-500',
    size: 20,
    distance: 130,
    speed: 1,
    description: '地球是我们共同的家园，目前已知唯一孕育生命的星球。'
  },
  {
    id: 'mars',
    name: '火星',
    nameEn: 'Mars',
    color: 'bg-red-500',
    size: 14,
    distance: 170,
    speed: 0.53,
    description: '火星被称为“红色星球”，是人类未来探索的重点。'
  },
  {
    id: 'jupiter',
    name: '木星',
    nameEn: 'Jupiter',
    color: 'bg-orange-200',
    size: 45,
    distance: 240,
    speed: 0.08,
    description: '木星是太阳系中最大的行星，是一颗巨大的气态巨行星。'
  },
  {
    id: 'saturn',
    name: '土星',
    nameEn: 'Saturn',
    color: 'bg-yellow-200',
    size: 38,
    distance: 310,
    speed: 0.03,
    description: '土星以其壮观的行星环系统而闻名。'
  },
  {
    id: 'uranus',
    name: '天王星',
    nameEn: 'Uranus',
    color: 'bg-cyan-300',
    size: 28,
    distance: 370,
    speed: 0.01,
    description: '天王星是一颗冰巨星，其自转轴倾斜角度极大。'
  },
  {
    id: 'neptune',
    name: '海王星',
    nameEn: 'Neptune',
    color: 'bg-blue-700',
    size: 26,
    distance: 420,
    speed: 0.006,
    description: '海王星是已知离太阳最远的行星，风暴极其猛烈。'
  }
];