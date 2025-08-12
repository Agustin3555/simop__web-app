import { createContext } from 'react'

export interface ViewInfo {
  title: string
  faIcon?: string
}

export type ViewsInfo = Record<string, Required<ViewInfo>>

export interface ViewsInfoContextProps {
  getViewInfo: (key: string) => undefined | Required<ViewInfo>
}

export const ViewsInfoContext = createContext<
  ViewsInfoContextProps | undefined
>(undefined)
