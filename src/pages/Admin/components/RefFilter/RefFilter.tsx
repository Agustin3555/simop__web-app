import { Column } from '@tanstack/react-table'
import { GeneralEntity } from '@/models/config'
import Combobox, { ComboboxProps } from '../Combobox/Combobox'

interface RefFilterProps
  extends Pick<ComboboxProps, 'keyName' | 'title' | 'options'>,
    Pick<Column<GeneralEntity>, 'getFilterValue' | 'setFilterValue'> {}

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
      {...{ keyName, title, options, selected, setSelected }}
    />
  )
}

export default RefFilter
