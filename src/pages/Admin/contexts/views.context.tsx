import { createContext, ReactNode, useCallback, useState } from 'react'

interface ViewsContextProps {
  isActive: (viewKey?: string) => boolean
  select: (viewKey: string, i: 0 | 1) => void
}

export const ViewsContext = createContext<ViewsContextProps | undefined>(
  undefined,
)

interface ViewsProviderProps {
  children: ReactNode
}

export const ViewsProvider = ({ children }: ViewsProviderProps) => {
  const [selectedViews, setSelectedViews] = useState<string[]>([])

  const isActive = useCallback<ViewsContextProps['isActive']>(
    viewKey => (viewKey ? selectedViews.includes(viewKey) : false),
    [selectedViews],
  )

  const select = useCallback<ViewsContextProps['select']>(
    (viewKey, i) =>
      setSelectedViews(prev => {
        const newState = [...prev]

        if (newState[i] === viewKey) newState[i] = ''
        else newState[i] = viewKey

        return newState.slice(0, 2)
      }),
    [],
  )

  return (
    <ViewsContext.Provider value={{ isActive, select }}>
      {children}
    </ViewsContext.Provider>
  )
}
