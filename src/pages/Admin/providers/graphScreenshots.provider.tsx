import { ReactNode, useCallback, useRef, useState } from 'react'
import {
  GraphScreenshotsContext,
  GraphScreenshotsContextProps,
} from '../contexts/graphScreenshots.context'
import { GraphInfo } from '../components/ReportInTable/ReportInTable'
import { captureElementImage } from '../helpers'

interface GraphScreenshotsProviderProps {
  children: ReactNode
}

export const GraphScreenshotsProvider = ({
  children,
}: GraphScreenshotsProviderProps) => {
  const [captures, setCaptures] = useState<string[]>([])
  const captureInfoRef = useRef<Record<string, GraphInfo>>({})
  const graphListRef = useRef<HTMLDivElement>(null)

  const isCaptured = useCallback<GraphScreenshotsContextProps['isCaptured']>(
    key => captures.includes(key),
    [captures],
  )

  const toggleCapture = useCallback<
    GraphScreenshotsContextProps['toggleCapture']
  >(
    key =>
      setCaptures(prev => {
        const exist = prev.includes(key)

        return exist ? prev.filter(v => v !== key) : [...prev, key]
      }),
    [],
  )

  const removeCapture = useCallback<
    GraphScreenshotsContextProps['removeCapture']
  >(key => setCaptures(prev => prev.filter(v => v !== key)), [])

  const takeCapture = useCallback<
    GraphScreenshotsContextProps['takeCapture']
  >(() => {
    const graphListElement = graphListRef.current

    if (!graphListElement) throw new Error()

    const childsToCapture = Array.from(
      graphListElement.querySelectorAll('& > .captured'),
    )

    const generators = childsToCapture.map(async graph => {
      const clonedGraph = graph.cloneNode(true) as HTMLElement

      const container = document.createElement('div')
      container.classList.add('capture-container')

      container.appendChild(clonedGraph)

      document.body.appendChild(container)

      const imageUrl = await captureElementImage(clonedGraph)

      document.body.removeChild(container)

      return imageUrl
    })

    return Promise.all(generators)
  }, [])

  return (
    <GraphScreenshotsContext.Provider
      value={{
        captures,
        captureInfoRef,
        graphListRef,
        isCaptured,
        toggleCapture,
        removeCapture,
        takeCapture,
      }}
    >
      {children}
    </GraphScreenshotsContext.Provider>
  )
}
