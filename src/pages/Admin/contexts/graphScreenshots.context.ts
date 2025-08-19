import { createContext, RefObject } from 'react'
import { GraphInfo } from '../components/ReportInTable/ReportInTable'

export interface GraphScreenshotsContextProps {
  captures: string[]
  captureInfoRef: RefObject<Record<string, GraphInfo>>
  graphListRef: RefObject<HTMLDivElement | null>
  isCaptured: (key: string) => boolean
  toggleCapture: (key: string) => void
  removeCapture: (key: string) => void
  takeCapture: () => Promise<string[]>
}

export const GraphScreenshotsContext = createContext<
  GraphScreenshotsContextProps | undefined
>(undefined)
