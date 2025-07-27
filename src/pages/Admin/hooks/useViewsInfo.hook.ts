import { useContext } from 'react'
import { ViewsInfoContext } from '../contexts/viewsInfo.context'

export const useViewsInfo = () => {
  const ctx = useContext(ViewsInfoContext)
  if (!ctx) throw new Error()
  return ctx
}
