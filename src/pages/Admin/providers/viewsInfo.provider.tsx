import { ReactNode, useCallback, useEffect, useState } from 'react'
import { useMetaModels } from '../hooks'
import { AUX_VIEWS } from '../constants/auxViews.const'
import {
  ViewInfo,
  ViewsInfo,
  ViewsInfoContext,
  ViewsInfoContextProps,
} from '../contexts/viewsInfo.context'

const DEFAULT_FA_ICON = 'fa-solid fa-cube'

interface ViewsInfoProviderProps {
  children: ReactNode
}

export const ViewsInfoProvider = ({ children }: ViewsInfoProviderProps) => {
  const [viewsInfo, setViewsInfo] = useState(() => {
    const initViews = {} as ViewsInfo

    Object.entries<ViewInfo>(AUX_VIEWS).forEach(([key, { title, faIcon }]) => {
      initViews[key] = { title, faIcon: faIcon ?? DEFAULT_FA_ICON }
    })

    return initViews
  })

  const { metaModels } = useMetaModels()

  const getViewInfo = useCallback<ViewsInfoContextProps['getViewInfo']>(
    key => viewsInfo[key] ?? undefined,
    [viewsInfo],
  )

  useEffect(() => {
    setViewsInfo(prev => {
      const metaModelViews = {} as ViewsInfo

      Object.entries(metaModels).forEach(([key, { title, faIcon }]) => {
        metaModelViews[key] = {
          title: title.plural,
          faIcon: faIcon ?? DEFAULT_FA_ICON,
        }
      })

      return { ...prev, ...metaModelViews }
    })
  }, [metaModels])

  return (
    <ViewsInfoContext.Provider value={{ getViewInfo }}>
      {children}
    </ViewsInfoContext.Provider>
  )
}
