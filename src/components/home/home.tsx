import { Redirect } from '@/components/Redirect/redirect.tsx'
import { StarterPasswordForm } from '@/components/starter-password-form/starter-password-form.tsx'

export function Home() {
  const isAuth = localStorage.getItem('isAuth')
  const apiUrl = localStorage.getItem('apiUrl')

  return (
    <>
      {isAuth ? (
        <Redirect url={apiUrl ? '/' : '/settings'} />
      ) : (
        <StarterPasswordForm />
      )}
    </>
  )
}
