import './FilterMenu.css'
import { useTable } from '@/shared/components/Table/contexts/Table/useTable.hook'
import { Button, Toggle } from '@/components'
import { Dropdown } from '@/shared/components'
import { ColumnBehavior } from '@/shared/core/types'

interface FilterMenuProps {
  propBuilders: ColumnBehavior
}

export const FilterMenu = ({
  propBuilders: {
    def: { key },
    getTableFilter,
  },
}: FilterMenuProps) => {
  const columnFilters = useTable(s => s.columnFilters)
  const setColumnFilter = useTable(s => s.setColumnFilter)

  const filterValue = columnFilters.find(f => f.column === key)?.filters

  const setFilterValue = (value: unknown) => {
    setColumnFilter(key, { custom: value })
  }

  return (
    <Dropdown
      handlingClass="cmp-filter-menu"
      opener={attrs => (
        <Button
          title="Filtrar"
          faIcon="fa-solid fa-filter"
          size="s"
          type="secondary"
          inverted
          buttonHTMLAttrs={attrs}
        />
      )}
    >
      <Toggle
        title="Vacío"
        value={filterValue?.blank ?? false}
        onChange={() => {
          setColumnFilter(key, { blank: !filterValue?.blank })
        }}
      />
      {getTableFilter(filterValue?.custom, setFilterValue)}
    </Dropdown>
  )
}
