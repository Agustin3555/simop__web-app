import { useContext } from 'react'
import { ViewsContext } from '../contexts/views.context'

export const useViews = () => {
  const ctx = useContext(ViewsContext)
  if (!ctx) throw new Error()
  return ctx
}
