import { useContext } from 'react'
import { MetaModelContext } from '../contexts/metaModel.context'

export const useMetaModel = () => {
  const ctx = useContext(MetaModelContext)
  if (!ctx) throw new Error()
  return ctx
}
