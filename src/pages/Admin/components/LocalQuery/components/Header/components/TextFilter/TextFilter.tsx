import { Updater } from '@tanstack/react-table'
import { DebouncedInput } from '..'

interface NumberFilterProps {
  columnFilterValue: unknown
  getFacetedUniqueValues: () => Map<any, number>
  setFilterValue: (updater: Updater<any>) => void
}

const TextFilter = ({
  columnFilterValue,
  getFacetedUniqueValues,
  setFilterValue,
}: NumberFilterProps) => (
  <DebouncedInput
    type="text"
    value={(columnFilterValue ?? '') as string}
    placeholder={`Buscar... (${getFacetedUniqueValues().size})`}
    onChange={value => setFilterValue(value)}
  />
)

export default TextFilter
