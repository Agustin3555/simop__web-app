import { LooseEntity } from '@/models/config'
import { ForView, MinSize, PropFactory, IRequired, BaseProp } from './utils'
import { AutoCombobox, FetchRef, RefFilter } from '../components'
import { isFieldEnabled } from '.'
import { META_MODELS, MetaModelKey } from '../constants/metaModels.const'

/*
  Solamente para controlar los vínculos de uno a muchos que no tengan atributos
  de vinculo y que no sean relaciones ternarias, de lo contrario, se debe convertir
  en un modulo específico.
*/

interface RefListProp extends Pick<BaseProp, 'minSize'> {
  metaModelKey: MetaModelKey
  config?: {
    field?: ForView & IRequired
  }
}

export const createRefListProp =
  ({ metaModelKey, minSize = MinSize.s, config }: RefListProp): PropFactory =>
  key => {
    const metaModel = META_MODELS[metaModelKey]

    const { field } = config ?? {}
    const { hidden, required } = field ?? {}

    const title = metaModel.title.plural

    return {
      key,
      title,
      minSize,

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

      accessorFn: row => row[key]?.[metaModel.anchorField],

      filterFn: (row, columnId, filterValue?: string[]) => {
        if (!filterValue?.length) return true

        const entities = row.original[columnId] as undefined | LooseEntity[]

        if (!entities?.length) return false

        return entities.some(entity => filterValue.includes(String(entity.id)))
      },

      getTableHeader: column => {
        const { setFilterValue } = column

        return {
          title,
          metaModel,
          getFilter: ({ options, ...rest }) =>
            options && (
              <RefFilter
                keyName={key}
                options={options}
                {...{ title, setFilterValue, ...rest }}
              />
            ),
        }
      },

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

      getExcelTableCell: (item: LooseEntity) => {
        const values = item[key] as undefined | LooseEntity[]

        if (!values || values.length === 0) return

        return values.map(value => value[metaModel.anchorField]).join(', ')
      },
    }
  }
