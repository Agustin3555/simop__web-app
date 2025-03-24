import { useEffect, useState } from 'react'
import { useLocation } from 'wouter'

const REDIRECT_IN_SECONDS = 3

const NotFound = () => {
  const [, navigate] = useLocation()
  const [countdown, setCountdown] = useState(REDIRECT_IN_SECONDS)

  useEffect(() => {
    const interval = setInterval(() => setCountdown(prev => prev - 1), 1000)
    const timeout = setTimeout(() => navigate('/'), REDIRECT_IN_SECONDS * 1000)

    return () => {
      clearInterval(interval)
      clearTimeout(timeout)
    }
  }, [navigate])

  return (
    <div>
      <h1>Página no encontrada</h1>
      <p>Error 404</p>
      <p>Redirigiendo en {countdown}...</p>
    </div>
  )
}

export default NotFound
