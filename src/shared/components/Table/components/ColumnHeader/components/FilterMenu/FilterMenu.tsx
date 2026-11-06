import './FilterMenu.css'
import { useTable } from '@/shared/components/Table/contexts/Table/useTable.hook'
import { Dropdown } from '@/shared/components'
import { Field } from '@/shared/components/Field/Field'
import {
  Option,
  OptionGroup,
} from '@/shared/components/OptionGroup/OptionGroup'
import { ColumnBehavior } from '@/shared/core/types'
import { clsx } from '@/helpers'
import { NewButton } from '@/shared/components/Button/Button'

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

  const { filters } = columnFilters.find(f => f.columnKey === key) ?? {}
  const { valueState } = filters ?? {}

  const options: Option[] = [
    {
      label: 'Todos',
      inputHtmlAttrs: {
        checked: valueState === undefined,
        onChange: () => setColumnFilter(key, { valueState: undefined }),
      },
    },
    {
      label: 'Con valor',
      inputHtmlAttrs: {
        checked: valueState === 'value',
        onChange: () => setColumnFilter(key, { valueState: 'value' }),
      },
    },
    {
      label: 'Sin valor',
      inputHtmlAttrs: {
        checked: valueState === 'null',
        onChange: () => setColumnFilter(key, { valueState: 'null' }),
      },
    },
  ]

  const customFilter = getTableFilter(filters?.custom, value =>
    setColumnFilter(key, { custom: value }),
  )

  return (
    <Dropdown
      handlingClass="cmp-filter-menu"
      opener={attrs => (
        <NewButton
          handlingClass={clsx({ isActive: !!filters })}
          title="Filtrar"
          iconClass="fa-solid fa-filter"
          size="s"
          border={!filters}
          htmlAttrs={attrs}
        />
      )}
    >
      <Field title="Valores" render="fieldset" hideTitle>
        <OptionGroup inputType="radio" size="s" {...{ options }} />
      </Field>
      {customFilter}
    </Dropdown>
  )
}
