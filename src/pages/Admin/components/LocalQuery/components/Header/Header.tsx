import './Header.css'
import { ReactNode, useMemo } from 'react'
import { flexRender, Header as TanstackHeader } from '@tanstack/react-table'
import { NumberFilter, TextFilter, DateTimeFilter } from './components'

const Header = ({ column, getContext }: TanstackHeader<any, unknown>) => {
  const {
    columnDef,
    getFilterValue,
    getFacetedMinMaxValues,
    getFacetedUniqueValues,
    setFilterValue,
  } = column

  const { type, ref } = columnDef.meta

  const filterMatcher = useMemo<Partial<Record<typeof type, ReactNode>>>(() => {
    const columnFilterValue = getFilterValue()
    const filterProps = { columnFilterValue, setFilterValue }

    return {
      text: <TextFilter {...{ getFacetedUniqueValues, ...filterProps }} />,
      number: <NumberFilter {...{ getFacetedMinMaxValues, ...filterProps }} />,
      date: <DateTimeFilter {...{ type, ...filterProps }} />,
      dateTime: <DateTimeFilter {...{ type, ...filterProps }} />,
    }
  }, [
    getFacetedUniqueValues,
    getFacetedMinMaxValues,
    getFilterValue,
    setFilterValue,
    type,
  ])

  const filterComponent = filterMatcher[type]

  return (
    <th className="cmp-header">
      <div className="content">
        <header>
          <div className="title">
            {flexRender(columnDef.header, getContext())}
          </div>
          {ref && <small>{ref.field}</small>}
        </header>
        {filterComponent && <div className="filter">{filterComponent}</div>}
      </div>
    </th>
  )
}

export default Header
