import {
  IconZodiacLeo,
  IconZodiacAquarius,
  IconZodiacPisces,
  IconZodiacAries,
  IconZodiacTaurus,
  IconZodiacGemini,
  IconZodiacCancer,
  IconZodiacVirgo,
  IconZodiacLibra,
  IconZodiacScorpio,
  IconZodiacSagittarius,
  IconZodiacCapricorn,
} from '@tabler/icons-react'

type zodiacType = {
  id: number
  name: string
  icon: JSX.Element
  value: string
  color: string
}

export const iconSize = (size?: number): number => {
  return size || 24
}

export const zodiacData: zodiacType[] = [
  {
    id: 1,
    name: 'Bạch Dương',
    icon: <IconZodiacAries size={iconSize()} />,
    value: 'aries',
    color: '#5e0101',
  },
  {
    id: 2,
    name: 'Kim Ngưu',
    icon: <IconZodiacTaurus size={iconSize()} />,
    value: 'taurus',
    color: '#2d024b',
  },
  {
    id: 3,
    name: 'Song Tử',
    icon: <IconZodiacGemini size={iconSize()} />,
    value: 'gemini',
    color: '#ffb100',
  },
  {
    id: 4,
    name: 'Cự Giải',
    icon: <IconZodiacCancer size={iconSize()} />,
    value: 'cancer',
    color: '#100c3e',
  },
  {
    id: 5,
    name: 'Sư Tử',
    icon: <IconZodiacLeo size={iconSize()} />,
    value: 'leo',
    color: '#d7d827',
  },
  {
    id: 6,
    name: 'Xử Nữ',
    icon: <IconZodiacVirgo size={iconSize()} />,
    value: 'virgo',
    color: '#421b04',
  },
  {
    id: 7,
    name: 'Thiên Bình',
    icon: <IconZodiacLibra size={iconSize()} />,
    value: 'libra',
    color: '#cec9c9',
  },
  {
    id: 8,
    name: 'Bọ Cạp',
    icon: <IconZodiacScorpio size={iconSize()} />,
    value: 'scorpio',
    color: '#510a0a',
  },
  {
    id: 9,
    name: 'Nhân Mã',
    icon: <IconZodiacSagittarius size={iconSize()} />,
    value: 'sagittarius',
    color: '#c4afec',
  },
  {
    id: 10,
    name: 'Ma Kết',
    icon: <IconZodiacCapricorn size={iconSize()} />,
    value: 'capricorn',
    color: '#dcd7e1',
  },
  {
    id: 11,
    name: 'Bảo Bình',
    icon: <IconZodiacAquarius size={iconSize()} />,
    value: 'aquarius',
    color: '#581078',
  },
  {
    id: 12,
    name: 'Song Ngư',
    icon: <IconZodiacPisces size={iconSize()} />,
    value: 'pisces',
    color: '#ffa74e',
  },
]
