import { useContext, useMemo } from 'react'
import { SchemeContext } from '../contexts'
import { getFlatProps } from '../services/config'

export const useScheme = () => {
  const { scheme } = useContext(SchemeContext)!

  const flatProps = useMemo(() => {
    const props = getFlatProps(scheme)

    // Inicializa la clave de las propiedades
    Object.entries(props).forEach(([key, prop]) => (prop.key = key))

    return props
  }, [])

  return { scheme, flatProps }
}
