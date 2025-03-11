import { Redirect } from '@/components/redirect/redirect.tsx'
import { StarterPasswordForm } from '@/components/starter-password-form/starter-password-form.tsx'
import { useEffect, useState } from 'react'

export function Home() {
  const [isAuth] = useState(() => localStorage.getItem('isAuth'))
  const [apiUrl] = useState(() => localStorage.getItem('apiUrl'))

  useEffect(() => {
    getPing().then(json => json)
  }, [])

  const getPing = async () => {
    const response = await fetch(apiUrl + '/api/ping', {
      method: 'GET',
      headers: {
        'ngrok-skip-browser-warning': '69420',
      },
    })
    return await response.json()
  }

  return (
    <>
      {isAuth ? (
        <Redirect url={apiUrl ? '/start' : '/settings'} />
      ) : (
        <StarterPasswordForm />
      )}
    </>
  )
}
