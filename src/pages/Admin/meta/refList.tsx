import { LooseEntity } from '@/models/config'
import { ForView, MinSize, PropFactory, IRequired, BaseProp } from './utils'
import { AutoCombobox, FetchRef, RefFilter } from '../components'
import { MetaModelKey } from '../constants/metaModelKey.const'
import { isFieldEnabled } from './ref'
import { MetaModel } from './metaModel'
import { StyleSheet, Text } from '@react-pdf/renderer'

interface RefListProp extends Pick<BaseProp, 'minSize'> {
  metaModelRef: MetaModelKey
  config?: {
    field?: ForView & IRequired
  }
}

export const createRefListProp =
  ({ metaModelRef, minSize = MinSize.s, config }: RefListProp): PropFactory =>
  (key, getMetaModel) => {
    const metaModel = getMetaModel(metaModelRef) as MetaModel

    if (!metaModel)
      throw new Error(
        `No se ha encontrado un MetaModel con key '${metaModelRef}'`,
      )

    const { field } = config ?? {}
    const { hidden, required } = field ?? {}

    const title = metaModel.title.plural

    return {
      key,
      metaModelRef,
      title,
      minSize,

      accessorFn: row => row[key]?.[metaModel.anchorField],

      filterFn: (row, columnId, filterValue?: string[]) => {
        if (!filterValue?.length) return true

        const entities = row.original[columnId] as undefined | LooseEntity[]

        if (!entities?.length) return false

        return entities.some(entity => filterValue.includes(String(entity.id)))
      },

      getFormField: (value: LooseEntity[], editMode = false) => {
        if (hidden === true) return

        return (
          <AutoCombobox
            keyName={key}
            multiple
            initOptions={value}
            {...{ title, required, editMode, metaModel }}
          />
        )
      },

      getFormFieldValue: (formData, form, editMode = false) => {
        const value = formData.getAll(key)

        if (value.length === 0) {
          if (editMode && isFieldEnabled(form, key)) return []
          return
        }

        return value.map(Number)
      },

      getTableHeader: column => ({
        title,
        metaModel,
        getFilter: ({ options }) =>
          options && (
            <RefFilter keyName={key} {...{ column, options, title }} />
          ),
      }),

      getTableCell: (item, selectedSearchMode) => {
        const value = item[key] as undefined | LooseEntity[]

        return value?.map(item => (
          <FetchRef
            key={item.id}
            id={item.id}
            title={item[selectedSearchMode ?? metaModel.anchorField]}
            keyScheme={metaModel.key}
            getOne={metaModel.service.getOne}
          />
        ))
      },

      getReportTableFilter: (column, data, selectedSearchMode) => {
        const { getFilterValue } = column

        const filterValue = getFilterValue() as undefined | string[]
        if (filterValue === undefined || !filterValue.length) return

        const refs = data
          .map(item => item[key])
          .flat()
          .filter(Boolean)
          .filter(({ id }) => filterValue.includes(String(id)))

        const values = Array.from(
          new Map(refs.map(item => [item.id, item])).values(),
        ).map(item => item[selectedSearchMode ?? metaModel.anchorField])

        return { title, values }
      },

      getReportTableCell: (item, selectedSearchMode) => {
        const values = item[key] as undefined | LooseEntity[]

        if (!values || values.length === 0) return

        const styles = StyleSheet.create({
          value: {},
        })

        return (
          <Text style={styles.value}>
            {values
              .map(value => value[selectedSearchMode ?? metaModel.anchorField])
              .join(', ')}
          </Text>
        )
      },

      getExcelTableCell: (item, selectedSearchMode) => {
        const values = item[key] as undefined | LooseEntity[]

        if (!values || values.length === 0) return

        return values
          .map(value => value[selectedSearchMode ?? metaModel.anchorField])
          .join(', ')
      },
    }
  }
