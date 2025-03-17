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
    path: '/capec2cve',
    disabled: false,
  },
  {
    name: 'Меры обнаружения, смягчения',
    path: '/mitigations-detections',
    disabled: false,
  },
  {
    name: 'Чат с SIB AI',
    path: '/chat',
    disabled: false,
  },
]
