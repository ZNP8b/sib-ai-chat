import { Container } from '@chakra-ui/react'
import { MenuLink } from '@/components/menu-link/menu-link.tsx'

const links = [
  { name: 'Главная', path: '/start', disabled: false },
  { name: 'CAPEC -> Техники', path: '/', disabled: false },
  { name: 'CAPEC -> CVE', path: '/', disabled: false },
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

export function StartingPage() {
  return (
    <Container
      paddingBottom='52px'
      h='100%'
      display='flex'
      flexDirection='column'
      justifyContent='center'
    >
      <Container
        padding='0'
        borderRadius='2xl'
        overflow='hidden'
        bg='gray.100'
        maxWidth='fit-content'
        _dark={{ bg: 'gray.700' }}
      >
        {links.map(link => (
          <MenuLink
            key={link.name + link.path}
            name={link.name}
            path={link.path}
            disabled={link.disabled}
            description={link.description}
          />
        ))}
      </Container>
    </Container>
  )
}
