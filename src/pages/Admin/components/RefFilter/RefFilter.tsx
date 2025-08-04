import { ColumnFiltersColumn } from '@tanstack/react-table'
import { LooseEntity } from '@/models/config'
import Combobox, { ComboboxProps } from '../Combobox/Combobox'

interface RefFilterProps
  extends Pick<ComboboxProps, 'keyName' | 'title' | 'options'> {
  column: ColumnFiltersColumn<LooseEntity>
}

const RefFilter = ({ column, keyName, title, options }: RefFilterProps) => {
  const { getFilterValue, setFilterValue } = column

  const selected = (getFilterValue() as string[]) ?? []

  return (
    <Combobox
      hideLabel
      reduceHeader
      multiple
      setSelected={setFilterValue}
      {...{ keyName, title, options, selected }}
    />
  )
}

export default RefFilter
