import { useEffect, useState } from 'react'
import { useHandleAction } from '@/hooks'
import { Button } from '@/components'
import { ComboboxProps, NewCombobox } from '../Combobox/Combobox'
import { ColumnDef, TableDef } from '@/shared/core/types'

interface RefsComboboxBaseProps {
  name: string
  refTableDef: TableDef<readonly ColumnDef[]>
  multiple?: ComboboxProps['multiple']
  required?: ComboboxProps['required']
}

export type RefsComboboxProps = RefsComboboxBaseProps &
  (
    | {
        selected: string[]
        defaultSelected?: never
        onChange: (selected: string[]) => void
      }
    | {
        selected?: never
        defaultSelected?: string[]
        onChange?: never
      }
  )

// getRefs: (ids?: number[]) => Promise<{ fields: string[]; rows: T[] }>
// getOption: (item: T) => ComboboxProps['options'][number]

export const RefsCombobox = (props: RefsComboboxProps) => {
  const {
    name,
    refTableDef: {
      anchorColumnKey,
      services: { getRefs },
    },
    multiple,
    required,
  } = props

  const [options, setOptions] = useState<ComboboxProps['options']>([])

  const getOption = item => ({
    label: item[anchorColumnKey],
    value: String(item.id),
  })

  const handleLoadOptions = async () => {
    const { rows } = await getRefs()
    setOptions(rows.map(getOption))
  }

  const loadOptionsAction = useHandleAction(
    async ({ setSuccess, setError }) => {
      try {
        await handleLoadOptions()
        await setSuccess()
      } catch {
        await setError()
      }
    },
  )

  const selectionProps =
    props.selected !== undefined
      ? { selected: props.selected, onChange: props.onChange }
      : { defaultSelected: props.defaultSelected }

  // FIXME: habilitarlo cuando que getRefs admita los ids como parámetro en la API
  // useEffect(() => {
  //   if (!props.selected?.length) return

  //   getRefs(props.selected.map(Number)).then(({ rows }) =>
  //     setOptions(rows.map(getOption)),
  //   )
  // }, [])

  return (
    <NewCombobox
      onFirstOpen={handleLoadOptions}
      {...{ name, options, multiple, required }}
      {...selectionProps}
    >
      <Button
        title="Actualizar opciones"
        faIcon="fa-solid fa-arrows-rotate"
        size="s"
        type="secondary"
        {...loadOptionsAction}
      />
    </NewCombobox>
  )
}
