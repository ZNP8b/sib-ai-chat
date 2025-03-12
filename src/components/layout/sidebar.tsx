import { MenuDrawer } from '@/components/menu-drawer/menu-drawer.tsx'
import { FC } from 'react'
import { Link } from '@/components/links/links.ts'
import { DrawerLink } from '@/components/drawer-link/drawer-link.tsx'

type SidebarProps = {
  links: Link[]
}

const Sidebar: FC<SidebarProps> = ({ links }) => {
  return (
    <MenuDrawer>
      {links.map(link => (
        <DrawerLink
          key={link.name}
          name={link.name}
          path={link.path}
          disabled={link.disabled}
          description={link.description}
        />
      ))}
    </MenuDrawer>
  )
}

export default Sidebar
