import { ReactNode, useCallback, useEffect } from 'react'
import { useLocation, useSearch } from 'wouter'
import { ViewsContextProps, ViewsContext } from '../contexts/views.context'
import { TABLE_DEFS } from '../constants/metaModelDefinitions.const'

interface ViewsProviderProps {
  children: ReactNode
}

const VALID_MODULE_KEYS = new Set([
  ...Object.keys(TABLE_DEFS),
  'assistant',
  'config',
])

export const ViewsProvider = ({ children }: ViewsProviderProps) => {
  const [location, navigate] = useLocation()
  const search = useSearch()

  const isActive = useCallback<ViewsContextProps['isActive']>(
    viewKey => {
      if (!viewKey || !VALID_MODULE_KEYS.has(viewKey)) return false

      const params = new URLSearchParams(search)
      return params.get('module') === viewKey
    },
    [search],
  )

  const select = useCallback<ViewsContextProps['select']>(
    viewKey => {
      if (!VALID_MODULE_KEYS.has(viewKey)) return

      const params = new URLSearchParams(search)

      if (params.get('module') === viewKey) params.delete('module')
      else params.set('module', viewKey)

      const query = params.toString()
      navigate(
        `${location}${query ? `?${query}` : ''}${window.location.hash}`,
      )
    },
    [location, navigate, search],
  )

  useEffect(() => {
    const params = new URLSearchParams(search)
    const moduleKeys = params.getAll('module')
    let hasInvalidModule = false
    if (
      moduleKeys.length > 1 ||
      (moduleKeys.length === 1 && !VALID_MODULE_KEYS.has(moduleKeys[0]))
    ) {
      if (moduleKeys.length > 1 && VALID_MODULE_KEYS.has(moduleKeys[0])) {
        params.set('module', moduleKeys[0])
      } else {
        params.delete('module')
      }
      hasInvalidModule = true
    }

    if (!hasInvalidModule) return

    const query = params.toString()
    navigate(
      `${location}${query ? `?${query}` : ''}${window.location.hash}`,
      { replace: true },
    )
  }, [location, navigate, search])

  return (
    <ViewsContext.Provider value={{ isActive, select }}>
      {children}
    </ViewsContext.Provider>
  )
}
