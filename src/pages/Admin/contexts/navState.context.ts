import { createContext } from 'react'

export interface NavStateContextProps {
  isOpen: boolean
  openNav: () => void
  closeNav: () => void
  toggleNav: () => void
}

export const NavStateContext = createContext<NavStateContextProps | undefined>(
  undefined,
)
