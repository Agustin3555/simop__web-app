import './Header.css'
import {
  Dispatch,
  DragEventHandler,
  SetStateAction,
  useCallback,
  useMemo,
  useState,
} from 'react'
import { useScheme } from '@/pages/Admin/hooks'
import { Icon } from '@/components'
import {
  ColumnOrderState,
  SortDirection,
  SortingState,
  Header as TsHeader,
} from '@tanstack/react-table'
import { Entity } from '@/services/config'
import { classList } from '@/helpers'
import { steppedSizes } from '../../helpers'

const sortIconMatcher: Record<SortDirection, string> = {
  asc: 'fa-solid fa-arrow-up-wide-short',
  desc: 'fa-solid fa-arrow-down-short-wide',
}

interface Props {
  flatProps: ReturnType<typeof useScheme>['flatProps']
  header: TsHeader<Entity, unknown>
  sorting: SortingState
  setSorting: Dispatch<SetStateAction<SortingState>>
  columnOrder: ColumnOrderState
  setColumnOrder: Dispatch<SetStateAction<ColumnOrderState>>
}

const Header = ({
  flatProps,
  header,
  sorting,
  setSorting,
  columnOrder,
  setColumnOrder,
}: Props) => {
  const { column, getContext, getResizeHandler, getSize } = header
  const { getIsSorted, getSortIndex, resetSize, getIsResizing } = column
  const { getHeader } = flatProps[column.id] ?? {}

  const [dragging, setDragging] = useState(false)

  if (!getHeader) return null

  // TODO: contener en un useMemo
  const { title, subtitle, filter } = getHeader(column) ?? {}

  const sortValue = getIsSorted() || null

  const sortIcon = useMemo(() => {
    if (sortValue === null) return null //chequeamos que no sea null
    return sortIconMatcher[sortValue]
  }, [sortValue])

  const handleSortingClick = () => {
    const isAlreadySorted = sorting.find(sort => sort.id === column.id)

    setSorting(prev => {
      if (isAlreadySorted) {
        if (isAlreadySorted.desc) {
          // Si está en descendente, lo elimina (sin pasar a ascendente)
          return prev.filter(sort => sort.id !== column.id)
        } else {
          // Alterna de ascendente a descendente
          return prev.map(sort =>
            sort.id === column.id ? { ...sort, desc: true } : sort,
          )
        }
      } else {
        // Agrega la columna al ordenamiento
        return [...prev, { id: column.id, desc: false }]
      }
    })
  }

  const handleDragStart = useCallback<DragEventHandler<HTMLDivElement>>(
    e => {
      setDragging(true)

      e.dataTransfer.setData('text/plain', column.id)
      e.dataTransfer.effectAllowed = 'move'

      const headerElement = e.currentTarget.closest('.cmp-header')

      if (headerElement) e.dataTransfer.setDragImage(headerElement, 0, 0)
    },
    [column.id],
  )

  const handleDragOver = useCallback<DragEventHandler<HTMLTableCellElement>>(
    e => e.preventDefault(),
    [],
  )

  const handleDragEnd = useCallback(() => setDragging(false), [])

  const handleDrop = useCallback<DragEventHandler<HTMLTableCellElement>>(
    e => {
      const draggedColumnId = e.dataTransfer.getData('text/plain')

      if (draggedColumnId && draggedColumnId !== column.id) {
        const newColumnOrder = [...columnOrder]
        const draggedIndex = newColumnOrder.indexOf(draggedColumnId)
        const targetIndex = newColumnOrder.indexOf(column.id)

        if (draggedIndex > -1 && targetIndex > -1) {
          newColumnOrder.splice(draggedIndex, 1)
          newColumnOrder.splice(targetIndex, 0, draggedColumnId)
          setColumnOrder(newColumnOrder)
        }
      }
    },
    [columnOrder],
  )

  const width = steppedSizes(column.columnDef.minSize!, getSize())

  const calculateTranslate = useCallback(() => {
    if (!getIsResizing()) return

    const { deltaOffset = 0 } = getContext().table.getState().columnSizingInfo

    return steppedSizes(column.columnDef.minSize!, deltaOffset ?? 0) + 'px'
  }, [])

  return (
    <div className={classList('cmp-header', { dragging })} style={{ width }}>
      <div className="content">
        <div className="management">
          <div
            className="grip-area"
            draggable
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDragEnd={handleDragEnd}
            onDrop={handleDrop}
          >
            <span />
          </div>
          <button onClick={handleSortingClick}>
            <div className="title-group">
              <p className="title text">{title}</p>
              {subtitle && <small>{subtitle}</small>}
            </div>
            {sortIcon && (
              <div className="sort">
                <Icon faIcon={sortIcon} />
                <small>{getSortIndex() + 1}</small>
              </div>
            )}
          </button>
        </div>
        {filter && <div className="filters">{filter}</div>}
      </div>
      <div
        className={classList('resizer', { resizing: getIsResizing() })}
        style={{ translate: calculateTranslate() }}
        onDoubleClick={() => resetSize()}
        onMouseDown={getResizeHandler()}
        onTouchStart={getResizeHandler()}
      />
      <div className="ruler" />
    </div>
  )
}

export default Header
