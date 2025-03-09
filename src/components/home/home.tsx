import { Redirect } from '@/components/Redirect/redirect.tsx'
import { StarterPasswordForm } from '@/components/starter-password-form/starter-password-form.tsx'
import { Button, CloseButton, Drawer, Portal } from '@chakra-ui/react'
import { useState } from 'react'

export function Home() {
  const isAuth = localStorage.getItem('isAuth')
  const apiUrl = localStorage.getItem('apiUrl')

  const [open, setOpen] = useState(false)

  return (
    <>
      {isAuth ? (
        <Redirect url={apiUrl ? '/' : '/settings'} />
      ) : (
        <StarterPasswordForm />
      )}

      <Drawer.Root
        open={open}
        onOpenChange={e => setOpen(e.open)}
        placement='start'
      >
        <div>
          <Drawer.Trigger asChild>
            <Button variant='outline' size='lg'>
              Menu
            </Button>
          </Drawer.Trigger>
        </div>

        <Portal>
          <Drawer.Backdrop />
          <Drawer.Positioner>
            <Drawer.Content>
              <Drawer.Header>
                <Drawer.Title>Drawer Title</Drawer.Title>
              </Drawer.Header>
              <Drawer.Body>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </Drawer.Body>
              <Drawer.Footer>
                <Button variant='outline'>Cancel</Button>
                <Button>Save</Button>
              </Drawer.Footer>
              <Drawer.CloseTrigger asChild>
                <CloseButton size='sm' />
              </Drawer.CloseTrigger>
            </Drawer.Content>
          </Drawer.Positioner>
        </Portal>
      </Drawer.Root>
    </>
  )
}
