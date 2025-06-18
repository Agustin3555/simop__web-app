import { useContext } from 'react'
import { FavoriteViewsContext } from '../contexts'

export const useFavoriteViews = () => {
  const ctx = useContext(FavoriteViewsContext)
  if (!ctx) throw new Error()
  return ctx
}
