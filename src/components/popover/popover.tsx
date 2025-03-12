import { Box, HoverCard, Portal } from '@chakra-ui/react'
import { ReactNode, useState } from 'react'

interface PopoverProps {
  children: ReactNode
  description: ReactNode
}

export function Popover({ children, description }: PopoverProps) {
  const [open, setOpen] = useState(false)

  return (
    <HoverCard.Root
      size='sm'
      open={open}
      onOpenChange={e => !!description && setOpen(e.open)}
      openDelay={200}
      positioning={{ offset: { mainAxis: -5 } }}
    >
      <HoverCard.Trigger asChild>{children}</HoverCard.Trigger>
      <Portal>
        <HoverCard.Positioner>
          <HoverCard.Content maxWidth='240px'>
            <HoverCard.Arrow />
            <Box fontSize='md'>{description}</Box>
          </HoverCard.Content>
        </HoverCard.Positioner>
      </Portal>
    </HoverCard.Root>
  )
}
