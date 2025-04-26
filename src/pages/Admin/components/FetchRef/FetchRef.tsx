import './FetchRef.css'
import { Button } from '@/components'
import { GetOneProvider, Ref } from '@/services/config'
import { useState, useRef } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useQueryActionState } from '@/hooks'
import {
  useFloating,
  autoUpdate,
  offset,
  flip,
  shift,
  arrow,
  useClick,
  useDismiss,
  useInteractions,
  FloatingArrow,
} from '@floating-ui/react'

interface FetchRefProps extends GetOneProvider, Ref {
  title: string
  key: string
}

const ARROW_HEIGHT = 10
const GAP = 8

const FetchRef = ({ id, title, getOne, key }: FetchRefProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const arrowRef = useRef(null)

  const {
    data: responseData,
    status,
    isFetching,
  } = useQuery({
    queryKey: [key, id],
    queryFn: () => getOne(id),
    enabled: isOpen,
  })

  const actionState = useQueryActionState({ status, isFetching })

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    placement: 'right',
    middleware: [
      offset({
        mainAxis: ARROW_HEIGHT + GAP,
        crossAxis: -10,
      }),
      flip({
        fallbackAxisSideDirection: 'start',
        padding: 10,
      }),
      shift({ padding: 10 }),
      arrow({
        element: arrowRef,
        padding: 5,
      }),
    ],
    whileElementsMounted: autoUpdate,
  })

  const click = useClick(context)
  const dismiss = useDismiss(context)

  const { getReferenceProps, getFloatingProps } = useInteractions([
    click,
    dismiss,
  ])

  const renderSimpleList = (data: any) => {
    if (!data) return null
    const dataObject =
      typeof data === 'object' && !Array.isArray(data) ? data : { data }

    return (
      <div className="data-container">
        {Object.entries(dataObject)
          .filter(([key]) => key.toLowerCase() !== 'id')
          .map(([key, value]) => (
            <div key={key} className="data-row">
              <span className="data-label">{key}:</span>
              <div className="data-content">
                {value === null ? (
                  <span className="null-value">null</span>
                ) : typeof value === 'object' ? (
                  JSON.stringify(value)
                ) : (
                  <span className="data-value">{String(value)}</span>
                )}
              </div>
            </div>
          ))}
      </div>
    )
  }

  return (
    <div className="cmp-fetch-ref">
      <Button
        ref={refs.setReference}
        text={title}
        title={`Ver más de '${title}'`}
        faIcon="fa-solid fa-cube"
        _type="secondary"
        inverted
        {...getReferenceProps()}
      />

      {isOpen && (
        <div
          ref={refs.setFloating}
          style={floatingStyles}
          className="tooltip-container"
          {...getFloatingProps()}
        >
          <FloatingArrow
            ref={arrowRef}
            context={context}
            fill="#ffffff"
            stroke="#d1d5db"
            strokeWidth={1}
            height={ARROW_HEIGHT}
            width={ARROW_HEIGHT * 2}
          />
          <div className="tooltip-content">
            <div className="tooltip-header">
              <h3>{title}</h3>
            </div>
            <div className="tooltip-body">
              {actionState === 'loading' ? (
                <div className="loading-state">
                  <i className="fas fa-spinner fa-spin"></i> Cargando
                  información...
                </div>
              ) : actionState === 'error' ? (
                <div className="no-data">
                  <i className="fas fa-exclamation-circle"></i> Error al cargar
                  los datos
                </div>
              ) : responseData ? (
                renderSimpleList(responseData)
              ) : (
                <div className="no-data">
                  <i className="fas fa-info-circle"></i> No se encontraron datos
                  disponibles
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default FetchRef
