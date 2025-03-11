import { Stack } from '@chakra-ui/react'
import { ColorModeButton } from '@/components/ui/color-mode.tsx'
import { Outlet, useLocation } from 'react-router'
import { SettingsIcon } from '@/components/ui/settings-icon.tsx'
import { MenuDrawer } from '@/components/menu-drawer/menu-drawer.tsx'

function App() {
  const location = useLocation()
  const isAuth = localStorage.getItem('isAuth')

  return (
    <>
      <Stack
        h='100vh'
        bg={{ base: '#fafafa', _dark: '#242424' }}
        className='relative'
      >
        <div className='flex items-center justify-end pt-4! px-4!'>
          {location.pathname === '/' && isAuth && <MenuDrawer />}

          {isAuth && <SettingsIcon />}
          <ColorModeButton />
        </div>

        <Outlet />
      </Stack>
    </>
  )
}

export default App
