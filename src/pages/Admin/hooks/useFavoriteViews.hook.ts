import { useContext } from 'react'
import { FavoriteViewsContext } from '../contexts/favoriteViews.context'

export const useFavoriteViews = () => {
  const ctx = useContext(FavoriteViewsContext)
  if (!ctx) throw new Error()
  return ctx
}
