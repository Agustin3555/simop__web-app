import './FilterMenu.css'
import { useTable } from '@/shared/components/Table/contexts/Table/useTable.hook'
import { Button } from '@/components'
import { Dropdown } from '@/shared/components'
import { ColumnBehavior } from '@/shared/core/types'
import { classList } from '@/helpers'

interface FilterMenuProps {
  propBuilders: ColumnBehavior
}

export const FilterMenu = ({
  propBuilders: {
    usefulDef: { key },
    getTableFilter,
  },
}: FilterMenuProps) => {
  const columnFilters = useTable(s => s.columnFilters)
  const setColumnFilter = useTable(s => s.setColumnFilter)

  const filterValue = columnFilters.find(f => f.columnKey === key)?.filters

  const setFilterValue = (value: unknown) => {
    setColumnFilter(key, { custom: value })
  }

  return (
    <Dropdown
      handlingClass="cmp-filter-menu"
      opener={attrs => (
        <Button
          handlingClass={classList({ isFiltering: !!filterValue })}
          title="Filtrar"
          faIcon="fa-solid fa-filter"
          size="s"
          type="secondary"
          inverted
          buttonHTMLAttrs={attrs}
        />
      )}
    >
      <fieldset className="value-state-filter">
        <legend>Valores</legend>
        <label>
          <input
            type="radio"
            name={`${key}-value-state`}
            checked={filterValue?.valueState === undefined}
            onChange={() => setColumnFilter(key, { valueState: undefined })}
          />
          Todos
        </label>
        <label>
          <input
            type="radio"
            name={`${key}-value-state`}
            checked={filterValue?.valueState === 'value'}
            onChange={() => setColumnFilter(key, { valueState: 'value' })}
          />
          Con valor
        </label>
        <label>
          <input
            type="radio"
            name={`${key}-value-state`}
            checked={filterValue?.valueState === 'null'}
            onChange={() => setColumnFilter(key, { valueState: 'null' })}
          />
          Sin valor
        </label>
      </fieldset>
      {getTableFilter(filterValue?.custom, setFilterValue)}
    </Dropdown>
  )
}
