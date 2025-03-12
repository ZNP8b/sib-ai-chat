import { Container, Float, Text } from '@chakra-ui/react'
import { NavLink } from 'react-router'
import { Link } from '@/components/links/links.ts'
import { Popover } from '@/components/popover/popover.tsx'

export function DrawerLink({ name, path, disabled, description }: Link) {
  if (disabled) {
    return (
      <Popover description={description}>
        <Container display='block' px='4' py='2' cursor='help' fontSize='md'>
          <div className='relative w-fit'>
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
      key={name + path}
      to={path}
      className={({ isActive }) => (isActive ? 'underline!' : '')}
    >
      <Container
        display='block'
        px='4'
        py='2'
        _hover={{ bg: 'purple.100' }}
        _dark={{ _hover: { bg: 'purple.900' } }}
      >
        <Text fontSize='md'>{name}</Text>
      </Container>
    </NavLink>
  )
}
