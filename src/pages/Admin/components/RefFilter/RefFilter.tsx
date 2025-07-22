import { Column } from '@tanstack/react-table'
import { LooseEntity } from '@/models/config'
import Combobox, { ComboboxProps } from '../Combobox/Combobox'

interface RefFilterProps
  extends Pick<ComboboxProps, 'keyName' | 'title' | 'options'>,
    Pick<Column<LooseEntity>, 'getFilterValue' | 'setFilterValue'> {}

const RefFilter = ({
  keyName,
  title,
  options,
  getFilterValue,
  setFilterValue,
}: RefFilterProps) => {
  const selected = (getFilterValue() as string[]) ?? []
  const setSelected = setFilterValue

  return (
    <Combobox
      hideLabel
      reduceHeader
      multiple
      {...{ keyName, title, options, selected, setSelected }}
    />
  )
}

export default RefFilter
