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
  Header as TanstackHeader,
} from '@tanstack/react-table'
import { Entity } from '@/services/config'
import { classList } from '@/helpers'

const sortIconMatcher: Record<SortDirection, string> = {
  asc: 'fa-solid fa-arrow-up-wide-short',
  desc: 'fa-solid fa-arrow-down-short-wide',
}

interface Props {
  flatProps: ReturnType<typeof useScheme>['flatProps']
  header: TanstackHeader<Entity, unknown>
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
  const { column } = header
  const { getIsSorted, getSortIndex } = column
  const { getHeader } = flatProps[column.id]

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

  const handleDragStart = useCallback<DragEventHandler<HTMLTableCellElement>>(
    e => {
      setDragging(true)
      e.dataTransfer.setData('columnId', column.id)
    },
    [],
  )

  const handleDragOver = useCallback<DragEventHandler<HTMLTableCellElement>>(
    e => e.preventDefault(),
    [],
  )

  const handleDragEnd = useCallback(() => setDragging(false), [])

  const handleDrop = useCallback<DragEventHandler<HTMLTableCellElement>>(
    e => {
      const draggedColumnId = e.dataTransfer.getData('columnId')

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

  return (
    <th
      className={classList('cmp-header', { dragging })}
      draggable
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
      onDrop={handleDrop}
    >
      <div className="content">
        <button onClick={handleSortingClick}>
          <div className="title">
            {title}
            {subtitle && <small>{subtitle}</small>}
          </div>
          {sortIcon && (
            <div className="sort">
              <Icon faIcon={sortIcon} />
              <small>{getSortIndex() + 1}</small>
            </div>
          )}
        </button>
        {filter && <div className="filters">{filter}</div>}
      </div>
    </th>
  )
}

export default Header
