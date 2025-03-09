import { useNavigate } from 'react-router'
import { useEffect } from 'react'

export function Redirect({ url }: { url: string }) {
  const navigate = useNavigate()

  useEffect(() => {
    navigate(url)
  }, [])

  return null
}
