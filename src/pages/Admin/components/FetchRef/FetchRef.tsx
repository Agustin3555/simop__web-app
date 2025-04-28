import './FetchRef.css'
import { useState, useRef } from 'react'
import { useQuery } from '@tanstack/react-query'
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
import { useQueryActionState } from '@/hooks'
import { GetOneProvider, Ref } from '@/services/config'
import { Button } from '@/components'
import { palColorGS, palSize, Size } from '@/styles/palette'

const ARROW_HEIGHT = palSize(Size.XS)

interface FetchRefProps extends GetOneProvider, Ref {
  title: string
  keyScheme: string
}

const FetchRef = ({ keyScheme, id, title, getOne }: FetchRefProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const arrowRef = useRef(null)

  const { data, status, isFetching } = useQuery({
    queryKey: [keyScheme, id],
    queryFn: () => getOne(id),
    retry: false,
    enabled: isOpen,
  })

  const actionState = useQueryActionState({ status, isFetching })

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    placement: 'right',
    whileElementsMounted: autoUpdate,
    middleware: [
      offset({
        mainAxis: ARROW_HEIGHT + palSize(Size.XS2),
      }),
      flip({
        fallbackAxisSideDirection: 'start',
        padding: 10,
      }),
      shift({
        padding: 10,
      }),
      arrow({
        element: arrowRef,
        padding: palSize(Size.XS),
      }),
    ],
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
        title="Ver más"
        type="secondary"
        inverted
        wrap
        buttonHTMLAttrs={getReferenceProps()}
      />
      {isOpen && (
        <div
          ref={refs.setFloating}
          className="tooltip"
          style={floatingStyles}
          {...getFloatingProps()}
        >
          <FloatingArrow
            ref={arrowRef}
            height={ARROW_HEIGHT}
            width={ARROW_HEIGHT * 2}
            fill={palColorGS('white')}
            {...{ context }}
          />
          <div className="content">
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
            ) : data ? (
              renderSimpleList(data)
            ) : (
              <div className="no-data">
                <i className="fas fa-info-circle"></i> No se encontraron datos
                disponibles
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default FetchRef
