import { createContext, ReactNode, useCallback, useState } from 'react'
import { favoriteViewsEntity } from '../services/localStorage/entities/favoriteViews'

interface FavoriteViewsContextProps {
  views: string[]
  isFavorite: (viewKey: string) => boolean
  add: (viewKey: string) => void
  remove: (viewKey: string) => void
  toggle: (viewKey: string) => void
}

export const FavoriteViewsContext = createContext<
  FavoriteViewsContextProps | undefined
>(undefined)

interface FavoriteViewsProviderProps {
  children: ReactNode
}

export const FavoriteViewsProvider = ({
  children,
}: FavoriteViewsProviderProps) => {
  const [views, setViews] = useState(() => {
    try {
      return favoriteViewsEntity.state
    } catch (error) {
      const defaultValue: string[] = [
        'empresa',
        'obra',
        'fojaMedicion',
        'obraTotales',
        'obraDetalle',
      ]

      favoriteViewsEntity.state = defaultValue
      return defaultValue
    }
  })

  const isFavorite = useCallback<FavoriteViewsContextProps['isFavorite']>(
    viewKey => views.includes(viewKey),
    [views],
  )

  const add = useCallback<FavoriteViewsContextProps['add']>(
    viewKey =>
      setViews(prev => {
        if (prev.includes(viewKey)) return prev

        const newState = [...prev, viewKey]

        favoriteViewsEntity.state = newState
        return newState
      }),
    [],
  )

  const remove = useCallback<FavoriteViewsContextProps['remove']>(
    viewKey =>
      setViews(prev => {
        const newState = prev.filter(v => v !== viewKey)

        favoriteViewsEntity.state = newState
        return newState
      }),
    [],
  )

  const toggle = useCallback<FavoriteViewsContextProps['toggle']>(
    viewKey => (views.includes(viewKey) ? remove(viewKey) : add(viewKey)),
    [views, add, remove],
  )

  return (
    <FavoriteViewsContext.Provider
      value={{ views, isFavorite, add, remove, toggle }}
    >
      {children}
    </FavoriteViewsContext.Provider>
  )
}
