import './NotFound.css'
import { useEffect, useState } from 'react'
import { useLocation } from 'wouter'
import { CardPage } from '@/components'

const REDIRECT_IN_SECONDS = 4

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
    <CardPage>
      <article className="cmp-not-found">
        <h1>
          Página no encontrada <small>Error 404</small>
        </h1>
        <p>Redirigiendo al Inicio en {countdown}...</p>
      </article>
    </CardPage>
  )
}

export default NotFound
