import { useContext } from 'react'
import { SchemeContext } from '../contexts'
import { EntityKey } from '@/services/config'
import { PropScheme } from '../services/config'

export const useScheme = () => {
  const { scheme } = useContext(SchemeContext)!

  const flatProps = scheme.groups.reduce((acc, { props }) => {
    Object.values(props).forEach(prop => (acc[prop.key] = prop))

    return acc
  }, {} as Record<EntityKey, PropScheme>)

  return { scheme, flatProps }
}
