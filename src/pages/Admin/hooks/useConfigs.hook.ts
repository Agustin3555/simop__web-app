import { useContext } from 'react'
import { ConfigsContext } from '../contexts/configs.context'

export const useConfigs = () => {
  const ctx = useContext(ConfigsContext)
  if (!ctx) throw new Error()
  return ctx
}
