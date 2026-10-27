import { LooseEntity } from '@/models/config'
import { TableKey } from '@/pages/Admin/constants/metaModelKey.const'
import {
  ColumnBehavior,
  Column,
  ColumnConfig,
  InputConfig,
  Size,
} from '../types'
import { TABLE_DEFS } from '@/pages/Admin/constants/metaModelDefinitions.const'
import { RefsCombobox } from '@/shared/components'
import { z } from 'zod'
import { StyleSheet, Text } from '@react-pdf/renderer'

const getEntities = (value: unknown): LooseEntity[] => {
  if (Array.isArray(value)) {
    return value.filter(
      (entity): entity is LooseEntity =>
        typeof entity === 'object' && entity !== null,
    )
  }

  return typeof value === 'object' && value !== null
    ? [value as LooseEntity]
    : []
}

const getEntityLabel = (entity: LooseEntity, anchorColumnKey: string) => {
  const label = entity[anchorColumnKey] ?? entity.nombre ?? entity.title

  return typeof label === 'string' || typeof label === 'number'
    ? String(label)
    : String(entity.id ?? '')
}

const refFilterSchema = z.array(z.string())

const getSelectedRefIds = (filterValue: unknown) =>
  refFilterSchema.parse(filterValue ?? [])

export interface RefColumn extends Column {
  type: 'ref'
  tableRefKey: TableKey
  customKey?: string
  isMultiple?: boolean
  columnConfig?: ColumnConfig
  inputConfig?: InputConfig
}

export const buildRefColumnBehavior = (def: RefColumn): ColumnBehavior => {
  const {
    key,
    tableRefKey,
    customKey,
    isMultiple = false,
    columnConfig,
    inputConfig,
  } = def

  const refTableDef = TABLE_DEFS[tableRefKey]

  const { size = Size.m, overrideTitle } = columnConfig ?? {}
  const { isHidden = false, isRequired = false } = inputConfig ?? {}

  const verboseKey = `${customKey ?? refTableDef.key}Id${isMultiple ? 's' : ''}`

  const title =
    overrideTitle ??
    (isMultiple ? refTableDef.title.plural : refTableDef.title.singular)

  return {
    usefulDef: {
      key,
      title,
      input: { isHidden },
      column: { size },
    },

    getFormField: (value, isEditMode = false) => {
      return (
        <RefsCombobox
          name={verboseKey}
          {...(isEditMode && { defaultSelected: getSelectedRefIds(value) })}
          multiple={isMultiple}
          required={isRequired}
          {...{ refTableDef }}
        />
      )
    },

    writeFormValue: (formValues, accData) => {
      const value = formValues.get.string(verboseKey)
      if (!value || value === '') return

      const ids = (JSON.parse(value) as string[]).map(Number)

      accData[verboseKey] = isMultiple ? ids : ids[0]
    },

    compareTableValues: (a, b) => {
      const labelsA = getEntities(a).map(entity =>
        getEntityLabel(entity, refTableDef.anchorColumnKey),
      )
      const labelsB = getEntities(b).map(entity =>
        getEntityLabel(entity, refTableDef.anchorColumnKey),
      )
      const labelA = labelsA[0]
      const labelB = labelsB[0]

      if (!labelA || !labelB) {
        if (!labelA && !labelB) return 0
        return labelA ? -1 : 1
      }

      return labelA.localeCompare(labelB, undefined, {
        numeric: true,
        sensitivity: 'base',
      })
    },

    applyTableFilter: (value, filterValue) => {
      const selectedIds = new Set(getSelectedRefIds(filterValue))

      if (selectedIds.size === 0) return true

      return getEntities(value).some(
        entity =>
          (typeof entity.id === 'string' || typeof entity.id === 'number') &&
          selectedIds.has(String(entity.id)),
      )
    },

    getTableFilter: (filterValue, setFilterValue) => {
      return (
        <RefsCombobox
          name={key}
          selected={getSelectedRefIds(filterValue)}
          multiple
          onChange={selected =>
            setFilterValue(selected.length > 0 ? selected : undefined)
          }
          {...{ refTableDef }}
        />
      )
    },

    getTableCell: value => {
      const entities = getEntities(value)

      if (!entities.length) return

      return (
        <p className="text">
          {entities
            .map(entity => getEntityLabel(entity, refTableDef.anchorColumnKey))
            .join(', ')}
        </p>
      )
    },

    getReportTableFilter: (filterValue, refs) => {
      if (!refs) return

      const values = getSelectedRefIds(filterValue).map(id => {
        const ref = refs.find(r => String(r.id) === id)
        return ref ? getEntityLabel(ref, refTableDef.anchorColumnKey) : id
      })

      return { label: title, values }
    },

    getReportTableCell: value => {
      const entities = getEntities(value)

      const styles = StyleSheet.create({
        value: {},
      })

      return (
        <Text style={styles.value}>
          {entities
            .map(entity => getEntityLabel(entity, refTableDef.anchorColumnKey))
            .join(', ')}
        </Text>
      )
    },
  }
}
