import { createContext, ReactNode, useCallback, useState } from 'react'

interface NavStateContextProps {
  isOpen: boolean
  openNav: () => void
  closeNav: () => void
  toggleNav: () => void
}

export const NavStateContext = createContext<NavStateContextProps | undefined>(
  undefined,
)

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
