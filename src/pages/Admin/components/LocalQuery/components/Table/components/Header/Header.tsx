import './Header.css'
import { Dispatch, SetStateAction, useMemo } from 'react'
import { useScheme } from '@/pages/Admin/hooks'
import { Icon } from '@/components'
import {
  SortDirection,
  SortingState,
  Header as TanstackHeader,
} from '@tanstack/react-table'
import { Entity } from '@/services/config'

const sortIconMatcher: Record<SortDirection, string> = {
  asc: 'fa-solid fa-arrow-up-wide-short',
  desc: 'fa-solid fa-arrow-down-short-wide',
}

interface Props {
  flatProps: ReturnType<typeof useScheme>['flatProps']
  header: TanstackHeader<Entity, unknown>
  sorting: SortingState
  setSorting: Dispatch<SetStateAction<SortingState>>
  draggable?: boolean
  onDragStart?: (e: React.DragEvent) => void
  onDragOver?: (e: React.DragEvent) => void
  onDrop?: (e: React.DragEvent) => void
  onDragEnd?: (e: React.DragEvent) => void // Agregado el evento onDragEnd
}

const Header = ({
  flatProps,
  header,
  sorting,
  setSorting,
  draggable = false,
  onDragStart,
  onDragOver,
  onDrop,
  onDragEnd,
}: Props) => {
  const { column } = header
  const { getIsSorted, getSortIndex } = column

  const { getHeader } = flatProps[column.id]

  if (!getHeader) return null

  // TODO: contener en un useMemo
  const { title, subtitle, filter } = getHeader(column) ?? {}

  const sortValue = getIsSorted() || null

  const sortIcon = useMemo(() => {
    //si isSorted cambios, los deja,sino, default
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

  return (
    <th
      className="cmp-header"
      draggable={draggable}
      onDragStart={onDragStart}
      onDragOver={onDragOver}
      onDrop={onDrop}
      onDragEnd={onDragEnd} //  manejo de onDragEnd
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
