import { useCallback, useEffect, useRef, useState } from 'react'
import { useHandleAction } from '@/hooks'
import { useRefs } from '@/shared/hooks/useRefs.hook'
import { Button } from '@/components'
import { ComboboxProps, NewCombobox } from '../Combobox/Combobox'
import { ColumnDef, TableDef } from '@/shared/core/types'
import { LooseEntity } from '@/infra/http/entity.types'

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

export const RefsCombobox = (props: RefsComboboxProps) => {
  const {
    name,
    refTableDef: { key, anchorColumnKey },
    multiple,
    required,
  } = props

  const [options, setOptions] = useState<ComboboxProps['options']>([])
  const loadingOptions = useRef<Promise<void> | null>(null)
  const { query, refetch } = useRefs(key)

  const getOption = useCallback(
    (item: Partial<LooseEntity>) => ({
      label: item[anchorColumnKey],
      value: String(item.id),
    }),
    [anchorColumnKey],
  )

  const loadOptions = useCallback(
    async (force = false) => {
      const cachedRows = query.data?.rows

      if (!force && cachedRows) {
        setOptions(cachedRows.map(getOption))
        return
      }

      if (loadingOptions.current) return loadingOptions.current

      const request = (async () => {
        const result = await refetch()
        if (result.error) throw result.error
        if (result.data?.rows) {
          setOptions(result.data.rows.map(getOption))
        }
      })()

      loadingOptions.current = request

      try {
        await request
      } finally {
        if (loadingOptions.current === request) loadingOptions.current = null
      }
    },
    [getOption, query.data, refetch],
  )

  const reloadOptionsAction = useHandleAction(
    async ({ setSuccess, setError }) => {
      try {
        await loadOptions(true)
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

  useEffect(() => {
    if (props.defaultSelected === undefined) return
    void loadOptions()
  }, [props.defaultSelected, loadOptions])

  return (
    <NewCombobox
      onFirstOpen={loadOptions}
      {...{ name, options, multiple, required }}
      {...selectionProps}
    >
      <Button
        title="Actualizar opciones"
        faIcon="fa-solid fa-arrows-rotate"
        size="s"
        type="secondary"
        {...reloadOptionsAction}
      />
    </NewCombobox>
  )
}
