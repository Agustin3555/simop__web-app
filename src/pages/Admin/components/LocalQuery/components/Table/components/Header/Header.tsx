import './Header.css'
import { Dispatch, ReactNode, SetStateAction, useMemo } from 'react'
import {
  flexRender,
  SortDirection,
  Header as TanstackHeader,
} from '@tanstack/react-table'
import { Icon } from '@/components'
import { NumberFilter, TextFilter, DateTimeFilter } from './components'

const sortIconMatcher: Record<SortDirection, string> = {
  asc: 'fa-solid fa-arrow-up-wide-short',
  desc: 'fa-solid fa-arrow-down-short-wide',
}

interface HeaderProps extends TanstackHeader<any, unknown> {
  sortState: any[]
  setSortState: Dispatch<SetStateAction<any[]>>
}

const Header = ({
  column,
  getContext,
  sortState,
  setSortState,
}: HeaderProps) => {
  const {
    columnDef,
    getFilterValue,
    getFacetedMinMaxValues,
    getFacetedUniqueValues,
    setFilterValue,
    getIsSorted,
    getSortIndex,
  } = column

  // const { type, ref } = columnDef.meta

  // const sortValue = getIsSorted() || null

  // const sortIcon = useMemo(
  //   () => sortIconMatcher[sortValue] ?? null,
  //   [sortValue],
  // )

  // const filterMatcher = useMemo<Partial<Record<TypeMeta, ReactNode>>>(() => {
  //   const columnFilterValue = getFilterValue()
  //   const filterProps = { columnFilterValue, setFilterValue }

  //   return {
  //     text: <TextFilter {...{ getFacetedUniqueValues, ...filterProps }} />,
  //     number: <NumberFilter {...{ getFacetedMinMaxValues, ...filterProps }} />,
  //     date: <DateTimeFilter {...{ type, ...filterProps }} />,
  //     dateTime: <DateTimeFilter {...{ type, ...filterProps }} />,
  //   }
  // }, [
  //   getFacetedUniqueValues,
  //   getFacetedMinMaxValues,
  //   getFilterValue,
  //   setFilterValue,
  //   type,
  // ])

  // const filterComponent = filterMatcher[type]

  // const handleSortingClick = () => {
  //   const isAlreadySorted = sortState.find(sort => sort.id === column.id)

  //   setSortState(prev => {
  //     if (isAlreadySorted) {
  //       if (isAlreadySorted.desc) {
  //         // Si está en descendente, lo elimina (sin pasar a ascendente)
  //         return prev.filter(sort => sort.id !== column.id)
  //       } else {
  //         // Alterna de ascendente a descendente
  //         return prev.map(sort =>
  //           sort.id === column.id ? { ...sort, desc: true } : sort,
  //         )
  //       }
  //     } else {
  //       // Agrega la columna al ordenamiento
  //       return [...prev, { id: column.id, desc: false }]
  //     }
  //   })
  // }

  return (
    <th className="cmp-header">
      <div className="content">
        <button
        // onClick={handleSortingClick}
        >
          <div className="title">
            {flexRender(columnDef.header, getContext())}
            {/* {ref && <small>{ref.field}</small>} */}
          </div>
          {/* {sortIcon && (
            <div className="sort">
              <Icon faIcon={sortIcon} />
              <small>{getSortIndex() + 1}</small>
            </div>
          )} */}
        </button>
        {/* {filterComponent && <div className="filter">{filterComponent}</div>} */}
      </div>
    </th>
  )
}

export default Header
