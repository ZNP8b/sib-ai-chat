import { Container } from '@chakra-ui/react'
import { MenuLink } from '@/components/menu-link/menu-link.tsx'
import { links } from '@/components/links/links.ts'

export function StartingPage() {
  return (
    <Container
      paddingBottom='52px'
      h='100%'
      display='flex'
      flexDirection='column'
      justifyContent='center'
      my="auto"
    >
      <Container
        padding='0'
        borderRadius='2xl'
        overflow='hidden'
        bg='gray.100'
        maxWidth='fit-content'
        _dark={{ bg: 'gray.700' }}
      >
        {links.map(link => (
          <MenuLink
            key={link.name + link.path}
            name={link.name}
            path={link.path}
            disabled={link.disabled}
            description={link.description}
          />
        ))}
      </Container>
    </Container>
  )
}
