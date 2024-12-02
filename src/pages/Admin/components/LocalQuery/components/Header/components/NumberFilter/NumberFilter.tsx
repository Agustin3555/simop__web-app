import { Updater } from '@tanstack/react-table'
import { DebouncedInput } from '..'

interface NumberFilterProps {
  columnFilterValue: unknown
  getFacetedMinMaxValues: () => undefined | [number, number]
  setFilterValue: (updater: Updater<any>) => void
}

const NumberFilter = ({
  columnFilterValue,
  getFacetedMinMaxValues,
  setFilterValue,
}: NumberFilterProps) => (
  <>
    <DebouncedInput
      type="number"
      value={(columnFilterValue as [number, number])?.[1] ?? ''}
      min={Number(getFacetedMinMaxValues()?.[0] ?? '')}
      max={Number(getFacetedMinMaxValues()?.[1] ?? '')}
      placeholder={`Max ${
        getFacetedMinMaxValues()?.[1]
          ? `(${getFacetedMinMaxValues()?.[1]})`
          : ''
      }`}
      onChange={value =>
        setFilterValue((prev: [number, number]) => [prev?.[0], value])
      }
    />
    <DebouncedInput
      type="number"
      value={(columnFilterValue as [number, number])?.[0] ?? ''}
      min={Number(getFacetedMinMaxValues()?.[0] ?? '')}
      max={Number(getFacetedMinMaxValues()?.[1] ?? '')}
      placeholder={`Min ${
        getFacetedMinMaxValues()?.[0] !== undefined
          ? `(${getFacetedMinMaxValues()?.[0]})`
          : ''
      }`}
      onChange={value =>
        setFilterValue((prev: [number, number]) => [value, prev?.[1]])
      }
    />
  </>
)

export default NumberFilter
