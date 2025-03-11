import { Container, Float, Text } from '@chakra-ui/react'
import { NavLink } from 'react-router'
import { Popover } from '@/components/popover/popover.tsx'
import { ReactNode } from 'react'

interface MenuLinkProps {
  name: string
  path: string
  disabled: boolean
  description?: ReactNode
}

export function MenuLink({ name, path, disabled, description }: MenuLinkProps) {
  if (disabled) {
    return (
      <Popover description={description}>
        <Container
          px='20'
          py='4'
          fontSize='2xl'
          display='flex'
          justifyContent='center'
          cursor='help'
        >
          <div className='relative w-fit text-center'>
            <span className='opacity-50'>{name}</span>
            <Float
              placement='top-end'
              paddingLeft='2'
              paddingTop='3'
              fontSize='2xl'
              color='red.500'
            >
              *
            </Float>
          </div>
        </Container>
      </Popover>
    )
  }

  return (
    <NavLink
      to={path}
      className={({ isActive }) =>
        (isActive ? 'underline!' : '') + ' text-center'
      }
    >
      <Container
        px='20'
        py='4'
        _hover={{ bg: 'purple.200' }}
        _dark={{ _hover: { bg: 'purple.700' } }}
      >
        <Text fontSize='2xl'>{name}</Text>
      </Container>
    </NavLink>
  )
}
