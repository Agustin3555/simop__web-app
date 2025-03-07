import { Updater } from '@tanstack/react-table'
import { DebouncedInput } from '..'

interface Props {
  filterValue: unknown
  getFacetedUniqueValues: () => Map<any, number>
  setFilterValue: (updater: Updater<any>) => void
}

// BUG

const TextFilter = ({
  filterValue,
  getFacetedUniqueValues,
  setFilterValue,
}: Props) => (
  <DebouncedInput
    value={(filterValue ?? '') as string}
    hideLabel
    handleChange={value => setFilterValue(value)}
    inputHTMLAttrs={{
      placeholder: `Buscar... (${getFacetedUniqueValues().size})`,
    }}
  />
)

export default TextFilter
