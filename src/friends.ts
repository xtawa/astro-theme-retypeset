import type { Language } from '@/i18n/config'

export interface Friend {
  name: string
  url: string
  avatar: string
  description: string
}

const friendsEn: Friend[] = [
  {
    name: 'Retypeset',
    url: 'https://github.com/radishzzz/astro-theme-retypeset',
    avatar: 'https://avatars.githubusercontent.com/u/135000000?v=4',
    description: 'Another simple blog theme for Astro.',
  },
]

const friendsZh: Friend[] = [
  {
    name: 'Retypeset',
    url: 'https://github.com/radishzzz/astro-theme-retypeset',
    avatar: 'https://avatars.githubusercontent.com/u/135000000?v=4',
    description: '又一个简单的 Astro 博客主题。',
  },
]

export const friendsData: Record<Language, Friend[]> = {
  'en': friendsEn,
  'zh': friendsZh,
}
