import { ClientOnly, IconButton, Skeleton } from '@chakra-ui/react'
import { FiSettings } from 'react-icons/fi'
import { useNavigate } from 'react-router'

export function SettingsIcon() {
  const navigate = useNavigate()

  return (
    <ClientOnly fallback={<Skeleton boxSize='8' />}>
      <IconButton
        onClick={() => navigate('/settings')}
        variant='ghost'
        aria-label='Toggle color mode'
        size='sm'
        css={{
          _icon: {
            width: '5',
            height: '5',
          },
        }}
      >
        <FiSettings />
      </IconButton>
    </ClientOnly>
  )
}
