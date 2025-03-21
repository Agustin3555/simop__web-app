import { useLocation } from 'wouter'
import { useEffect, useState } from 'react'

export default function NotFoundPage() {
  const [, navigate] = useLocation()
  const [countdown, setCountdown] = useState(3)

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown(prev => prev - 1)
    }, 1000)

    const timeout = setTimeout(() => {
      navigate('/') // Redirigir al home
    }, 3000)

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
