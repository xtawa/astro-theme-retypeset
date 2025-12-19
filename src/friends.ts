export interface Friend {
  name: string
  url: string
  avatar: string
  description: string
}

export const friends: Friend[] = [
  {
    name: 'Retypeset',
    url: 'https://github.com/radishzzz/astro-theme-retypeset',
    avatar: 'https://avatars.githubusercontent.com/u/135000000?v=4',
    description: 'Another simple blog theme for Astro.',
  },
]
