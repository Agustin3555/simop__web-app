import { useContext } from 'react'
import { MetaModelContext } from '../contexts'

export const useMetaModel = () => {
  const { metaModel } = useContext(MetaModelContext)!

  return metaModel
}
