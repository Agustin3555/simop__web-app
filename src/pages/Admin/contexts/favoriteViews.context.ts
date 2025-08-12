import { createContext } from 'react'

export interface FavoriteViewsContextProps {
  views: string[]
  isFavorite: (viewKey: string) => boolean
  add: (viewKey: string) => void
  remove: (viewKey: string) => void
  toggle: (viewKey: string) => void
}

export const FavoriteViewsContext = createContext<
  FavoriteViewsContextProps | undefined
>(undefined)
