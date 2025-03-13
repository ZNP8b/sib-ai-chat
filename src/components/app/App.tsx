import { Container, Stack } from '@chakra-ui/react'
import { ColorModeButton } from '@/components/ui/color-mode.tsx'
import { Outlet } from 'react-router'
import { SettingsIcon } from '@/components/ui/settings-icon.tsx'
import Sidebar from '@/components/layout/sidebar.tsx'
import { links } from '@/components/links/links.ts'

function App() {
  const apiUrl = localStorage.getItem('apiUrl')

  return (
    <>
      <Stack
        h='full'
        minHeight='100vh'
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
          h='full'
        >
          {apiUrl && <Sidebar links={links} />}

          <SettingsIcon />
          <ColorModeButton />
        </Container>

        <Outlet />
      </Stack>
    </>
  )
}

export default App
