import { useContext } from 'react'
import { MetaModelsContext } from '../contexts'

export const useMetaModels = () => {
  const ctx = useContext(MetaModelsContext)
  if (!ctx) throw new Error()
  return ctx
}
