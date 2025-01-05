import { Updater } from '@tanstack/react-table'
import { DebouncedInput } from '..'
import { DebouncedInputProps } from '../DebouncedInput/DebouncedInput'

interface Props {
  filterValue: unknown
  getFacetedMinMaxValues: () => undefined | [number, number]
  setFilterValue: (updater: Updater<any>) => void
}

const NumberFilter = ({
  filterValue,
  getFacetedMinMaxValues,
  setFilterValue,
}: Props) => {
  const inputs: DebouncedInputProps[] = [
    {
      value: (filterValue as [number, number])?.[0] ?? '',
      min: Number(getFacetedMinMaxValues()?.[0] ?? ''),
      max: Number(getFacetedMinMaxValues()?.[1] ?? ''),
      placeholder: `Min ${
        getFacetedMinMaxValues()?.[0] !== undefined
          ? `(${getFacetedMinMaxValues()?.[0]})`
          : ''
      }`,
      onChange: value =>
        setFilterValue((prev: [number, number]) => [value, prev?.[1]]),
    },
    {
      value: (filterValue as [number, number])?.[1] ?? '',
      min: Number(getFacetedMinMaxValues()?.[0] ?? ''),
      max: Number(getFacetedMinMaxValues()?.[1] ?? ''),
      placeholder: `Max ${
        getFacetedMinMaxValues()?.[1]
          ? `(${getFacetedMinMaxValues()?.[1]})`
          : ''
      }`,
      onChange: value =>
        setFilterValue((prev: [number, number]) => [prev?.[0], value]),
    },
  ]

  return inputs.map((input, index) => <DebouncedInput key={index} {...input} />)
}

export default NumberFilter
