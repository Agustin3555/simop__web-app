import { useContext } from 'react'
import { GraphScreenshotsContext } from '../contexts/graphScreenshots.context'

export const useGraphScreenshots = () => {
  const ctx = useContext(GraphScreenshotsContext)
  if (!ctx) throw new Error()
  return ctx
}
