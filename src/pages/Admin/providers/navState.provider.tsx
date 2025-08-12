import { ReactNode, useCallback, useState } from 'react'
import { NavStateContext } from '../contexts/navState.context'

interface NavStateProviderProps {
  children: ReactNode
}

export const NavStateProvider = ({ children }: NavStateProviderProps) => {
  const [isOpen, setIsOpen] = useState(true)

  const openNav = useCallback(() => setIsOpen(true), [])
  const closeNav = useCallback(() => setIsOpen(false), [])
  const toggleNav = useCallback(() => setIsOpen(prev => !prev), [])

  return (
    <NavStateContext.Provider value={{ isOpen, openNav, closeNav, toggleNav }}>
      {children}
    </NavStateContext.Provider>
  )
}
