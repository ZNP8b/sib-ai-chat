import { Container } from '@chakra-ui/react'
import { MenuDrawer } from '@/components/menu-drawer/menu-drawer.tsx'
import { NavLink } from 'react-router'
import { FC } from 'react'
import { Text } from '@chakra-ui/react'

type SidebarProps = {
  links: { name: string; path: string; role: string }[]
}

const Sidebar: FC<SidebarProps> = ({ links }) => {
  return (
    <MenuDrawer>
      {links.map(link => (
        <NavLink
          key={link.name + link.path}
          to={link.path}
          className={({ isActive }) => (isActive ? 'underline!' : '')}
        >
          <Container
            display='block'
            px='4'
            py='2'
            _hover={{ bg: 'gray.100' }}
            _dark={{ _hover: { bg: 'gray.700' } }}
          >
            <Text fontSize='md'>{link.name}</Text>
          </Container>
        </NavLink>
      ))}
    </MenuDrawer>
  )
}

export default Sidebar
