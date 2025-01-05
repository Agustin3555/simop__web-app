import { Updater } from '@tanstack/react-table'
import { DebouncedInput } from '..'

interface Props {
  filterValue: unknown
  getFacetedUniqueValues: () => Map<any, number>
  setFilterValue: (updater: Updater<any>) => void
}

const TextFilter = ({
  filterValue,
  getFacetedUniqueValues,
  setFilterValue,
}: Props) => (
  <DebouncedInput
    type="text"
    value={(filterValue ?? '') as string}
    placeholder={`Buscar... (${getFacetedUniqueValues().size})`}
    onChange={value => setFilterValue(value)}
  />
)

export default TextFilter
