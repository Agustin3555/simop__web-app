import { LooseEntity } from '@/models/config'
import {
  ForView,
  MinSize,
  IRequired,
  PropFactory,
  BaseProp,
  createUniqueMode,
  UNIQUE_MODE,
} from './utils'
import { RefsCombobox, FetchRef, RefFilter } from '../components'
import { MetaModelKey } from '../constants/metaModelKey.const'
import { MetaModel } from './metaModel'
import { StyleSheet, Text } from '@react-pdf/renderer'
import { summarizeArray } from '../helpers'

export const isFieldEnabled = (form: HTMLFormElement, key: string) => {
  const { disabled } =
    form.querySelector<HTMLFieldSetElement>(`fieldset[name="${key}"]`) ?? {}

  return !disabled
}

interface RefProp extends Pick<BaseProp, 'minSize'> {
  metaModelRef: MetaModelKey
  config?: {
    field?: ForView & IRequired
  }
}

export const createRefProp =
  ({ metaModelRef, minSize = MinSize.s, config }: RefProp): PropFactory =>
  (key, getMetaModel) => {
    const metaModel = getMetaModel(metaModelRef) as MetaModel

    if (!metaModel)
      throw new Error(
        `No se ha encontrado un MetaModel con key '${metaModelRef}'`,
      )

    const { field } = config ?? {}
    const { hidden, isRequired } = field ?? {}

    const verboseKey = `${key}Id`
    const title = metaModel.title.singular

    return {
      key,
      verboseKey,
      metaModelRef,
      title,
      minSize,
      isRequired,

      accessorFn: row => row[key]?.[metaModel.anchorField],

      filterFn: (row, columnId, filterValue?: string[]) => {
        if (!filterValue?.length) return true

        const entity = row.original[columnId] as undefined | LooseEntity

        if (entity === undefined) return false

        return filterValue.includes(String(entity.id))
      },

      getFormField: (value, isEditMode = false) => {
        if (hidden === true) return

        return (
          <RefsCombobox
            keyName={verboseKey}
            initOptions={value && [value]}
            {...{ title, isRequired, isEditMode, metaModel }}
          />
        )
      },

      getFormFieldValue: (formData, form, isEditMode = false) => {
        const value = formData.get(verboseKey)

        if (value === null) {
          if (isEditMode && isFieldEnabled(form, verboseKey)) return null
          return
        }

        return Number(value)
      },

      getTableHeader: column => ({
        title,
        metaModel,
        getFilter: ({ options }) =>
          options && (
            <RefFilter keyName={verboseKey} {...{ column, options, title }} />
          ),
      }),

      getTableCell: (item, selectedSearchMode) => {
        const value = item[key] as undefined | LooseEntity

        return (
          value && (
            <FetchRef
              id={value.id}
              title={value[selectedSearchMode ?? metaModel.anchorField]}
              keyScheme={metaModel.key}
              getOne={metaModel.service.getOne}
            />
          )
        )
      },

      getReportTableFilter: (column, data, selectedSearchMode) => {
        const { getFilterValue } = column

        const filterValue = getFilterValue() as undefined | string[]
        if (filterValue === undefined || !filterValue.length) return

        const refs = data
          .map(item => item[key])
          .filter(Boolean)
          .filter(({ id }) => filterValue.includes(String(id)))

        let values = Array.from(
          new Map(refs.map(item => [item.id, item])).values(),
        ).map(item => item[selectedSearchMode ?? metaModel.anchorField])

        values = summarizeArray(values)

        return { title, values }
      },

      getReportTableCell: (item, selectedSearchMode) => {
        const value = item[key] as undefined | LooseEntity

        if (value === undefined) return

        const styles = StyleSheet.create({
          value: {},
        })

        return (
          <Text style={styles.value}>
            {value[selectedSearchMode ?? metaModel.anchorField]}
          </Text>
        )
      },

      getExcelTableCell: (item, selectedSearchMode) => {
        const value = item[key] as undefined | LooseEntity

        if (value === undefined) return

        return value[selectedSearchMode ?? metaModel.anchorField]
      },

      pieSectorConfig: {
        defaultMode: UNIQUE_MODE.key,
        modes: {
          ...createUniqueMode({
            accumulate: (value: LooseEntity, add) => {
              const key = [value.id, value[metaModel.anchorField]].join('-')
              const getTitle = () => String(value[metaModel.anchorField])

              add(key, getTitle)
            },
          }),
        },
      },
    }
  }
