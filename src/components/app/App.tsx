import { Stack } from '@chakra-ui/react'
import { ColorModeButton } from '@/components/ui/color-mode.tsx'
import { Outlet } from 'react-router'
import { SettingsIcon } from '@/components/ui/settings-icon.tsx'

function App() {
  return (
    <>
      <Stack
        h='100vh'
        bg={{ base: '#fafafa', _dark: '#242424' }}
        className='relative'
      >
        <div className='absolute flex top-4 right-4'>
          <SettingsIcon />
          <ColorModeButton />
        </div>

        <Outlet />
      </Stack>
    </>
  )
}

export default App
