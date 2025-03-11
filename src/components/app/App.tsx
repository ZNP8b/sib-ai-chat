import { Container, Stack } from '@chakra-ui/react'
import { ColorModeButton } from '@/components/ui/color-mode.tsx'
import { Outlet, useLocation } from 'react-router'
import { SettingsIcon } from '@/components/ui/settings-icon.tsx'
import Sidebar from '@/components/layout/sidebar.tsx'

function App() {
  const location = useLocation()

  const isAuth = localStorage.getItem('isAuth')

  const showMenu = isAuth && location.pathname !== '/settings'

  return (
    <>
      <Stack
        h='100vh'
        bg={{ base: '#fafafa', _dark: '#242424' }}
        className='relative'
      >
        <Container
          display='flex'
          alignItems='center'
          justifyContent='end'
          paddingTop='4'
          paddingRight='4'
          paddingLeft='4'
        >
          {showMenu && (
            <Sidebar
              links={[
                { name: 'Главная', path: '/start', role: 'user' },
                { name: 'CAPEC -> Техники', path: '/', role: 'user' },
                { name: 'CAPEC -> CVE', path: '/', role: 'user' },
                { name: 'Чат с SIB AI', path: '/', role: 'user' },
                // { name: 'Датасеты', path: '/datasets', role: 'admin' },
                // { name: 'Чекпоинты', path: '/checkpoints', role: 'admin' },
                // { name: 'Тренировка', path: '/training', role: 'admin' },
                // { name: 'Загрузка модели', path: '/load-model', role: 'admin' },
              ]}
            />
          )}

          {isAuth && <SettingsIcon />}
          <ColorModeButton />
        </Container>

        <Outlet />
      </Stack>
    </>
  )
}

export default App
