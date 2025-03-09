import { ClientOnly, IconButton, Skeleton } from '@chakra-ui/react'
import { useNavigate } from 'react-router'
import { IoMdArrowRoundBack } from 'react-icons/io'

export function BackArrowIcon({ className }: { className: string }) {
  const navigate = useNavigate()

  return (
    <ClientOnly fallback={<Skeleton boxSize='8' />}>
      <IconButton
        onClick={() => navigate('/')}
        variant='ghost'
        aria-label='Toggle color mode'
        size='sm'
        className={className}
        css={{
          _icon: {
            width: '5',
            height: '5',
          },
        }}
      >
        <IoMdArrowRoundBack />
      </IconButton>
    </ClientOnly>
  )
}
