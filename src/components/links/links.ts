export interface Link {
  name: string
  path: string
  disabled: boolean
  description?: string
}

export const links: Link[] = [
  { name: 'Главная', path: '/start', disabled: false },
  {
    name: 'CAPEC -> CVE',
    path: '/',
    disabled: true,
    description: 'В разработке',
  },
  {
    name: 'Меры обнаружения, смягчения',
    path: '/',
    disabled: true,
    description: 'В разработке',
  },
  {
    name: 'Чат с SIB AI',
    path: '/',
    disabled: true,
    description: 'В разработке',
  },
  // { name: 'Датасеты', path: '/datasets', role: 'admin' },
  // { name: 'Чекпоинты', path: '/checkpoints', role: 'admin' },
  // { name: 'Тренировка', path: '/training', role: 'admin' },
  // { name: 'Загрузка модели', path: '/load-model', role: 'admin' },
]
