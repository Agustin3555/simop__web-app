import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useHandleAction } from '@/hooks'
import { useRefs } from '@/shared/hooks/useRefs.hook'
import { ComboboxProps, NewCombobox } from '../Combobox/Combobox'
import { ColumnDef, TableDef } from '@/shared/core/types'
import { LooseEntity } from '@/infra/http/entity.types'
import { NewButton } from '../Button/Button'
import { createColumnBehaviors } from '@/shared/core/column.helper'

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

  const columnBehaviors = useMemo(
    () => createColumnBehaviors([...props.refTableDef.columnDefs]),
    [props.refTableDef.columnDefs],
  )

  const searchFields = useMemo(() => {
    const availableFields = new Set(query.data?.fields ?? [])

    return columnBehaviors
      .filter(({ usefulDef }) => availableFields.has(usefulDef.key))
      .map(({ usefulDef }) => ({
        value: usefulDef.key,
        label: usefulDef.title,
      }))
  }, [columnBehaviors, query.data?.fields])

  const getOption = useCallback(
    (item: Partial<LooseEntity>, fields: string[]) => {
      const searchValues: Record<string, string> = {}

      fields.forEach(field => {
        const value = item[field]
        if (
          typeof value === 'string' ||
          typeof value === 'number' ||
          typeof value === 'boolean'
        ) {
          searchValues[field] = String(value)
        }
      })

      return {
        label: item[anchorColumnKey],
        value: String(item.id),
        searchValues,
      }
    },
    [anchorColumnKey],
  )

  const loadOptions = useCallback(
    async (force = false) => {
      const cachedResult = query.data

      if (!force && cachedResult) {
        setOptions(
          cachedResult.rows.map(item => getOption(item, cachedResult.fields)),
        )
        return
      }

      if (loadingOptions.current) return loadingOptions.current

      const request = (async () => {
        const result = await refetch()
        if (result.error) throw result.error
        const data = result.data
        if (data?.rows) {
          setOptions(data.rows.map(item => getOption(item, data.fields)))
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
      searchFields={searchFields}
      defaultSearchField={
        searchFields.some(({ value }) => value === anchorColumnKey)
          ? anchorColumnKey
          : searchFields[0]?.value
      }
      {...selectionProps}
    >
      <NewButton
        title="Actualizar opciones"
        iconClass="fa-solid fa-arrows-rotate"
        size="s"
        border
        {...reloadOptionsAction}
      />
    </NewCombobox>
  )
}
