import { Button, CloseButton, Drawer, Portal } from '@chakra-ui/react'
import { useState } from 'react'

export function MenuDrawer() {
  const [open, setOpen] = useState(false)

  return (
    <Drawer.Root
      open={open}
      onOpenChange={e => setOpen(e.open)}
      placement='start'
    >
      <div className='mr-auto!'>
        <Drawer.Trigger asChild>
          <Button variant='ghost' size='sm'>
            Меню
          </Button>
        </Drawer.Trigger>
      </div>

      <Portal>
        <Drawer.Backdrop />
        <Drawer.Positioner>
          <Drawer.Content>
            <Drawer.Header>
              <Drawer.Title>Меню</Drawer.Title>
            </Drawer.Header>
            <Drawer.Body>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </Drawer.Body>
            <Drawer.CloseTrigger asChild>
              <CloseButton colorPalette='purple' size='sm' />
            </Drawer.CloseTrigger>
          </Drawer.Content>
        </Drawer.Positioner>
      </Portal>
    </Drawer.Root>
  )
}
