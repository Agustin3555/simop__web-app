import { useEffect, useState } from 'react'

export const useScreen = () => {
  const [screenWidth, setScreenWidth] = useState(1024)

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth)
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return screenWidth
}
