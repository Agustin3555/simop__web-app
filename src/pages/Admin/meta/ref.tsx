import { LooseEntity } from '@/models/config'
import { ForView, MinSize, IRequired, PropFactory, BaseProp } from './utils'
import { AutoCombobox, FetchRef, RefFilter } from '../components'
import { MetaModelKey } from '../constants/metaModelKey.const'

export const isFieldEnabled = (form: HTMLFormElement, key: string) => {
  const inputOption = form.querySelector<HTMLInputElement>(`[name="${key}"]`)

  // Verifica si 'inputOption' está dentro de un 'fieldset' habilitado
  return inputOption && !inputOption.closest('fieldset')?.disabled
}

interface RefProp extends Pick<BaseProp, 'minSize'> {
  metaModelKey: MetaModelKey
  config?: {
    field?: ForView & IRequired
  }
}

export const createRefProp =
  ({ metaModelKey, minSize = MinSize.s, config }: RefProp): PropFactory =>
  (key, getMetaModel) => {
    const metaModel = getMetaModel(metaModelKey)

    if (!metaModel)
      throw new Error(
        `No se ha encontrado un MetaModel con key '${metaModelKey}'`,
      )

    const { field } = config ?? {}
    const { hidden, required } = field ?? {}

    const verboseKey = `${key}Id`
    const title = metaModel.title.singular

    return {
      key,
      verboseKey,
      title,
      minSize,

      getFormField: (value, editMode = false) => {
        if (hidden === true) return

        return (
          <AutoCombobox
            keyName={verboseKey}
            initOptions={value && [value]}
            {...{ title, required, editMode, metaModel }}
          />
        )
      },

      getFormFieldValue: (formData, form, editMode = false) => {
        const value = formData.get(verboseKey)

        if (value === null) {
          if (editMode && isFieldEnabled(form, verboseKey)) return null
          return
        }

        return Number(value)
      },

      accessorFn: row => row[key]?.[metaModel.anchorField],
      filterFn: (row, columnId, filterValue?: string[]) => {
        if (!filterValue?.length) return true

        const entity = row.original[columnId] as undefined | LooseEntity

        if (entity === undefined) return false

        return filterValue.includes(String(entity.id))
      },

      getTableHeader: column => {
        const { setFilterValue } = column

        return {
          title,
          metaModel,
          getFilter: ({ options, ...rest }) =>
            options && (
              <RefFilter
                keyName={verboseKey}
                options={options}
                {...{ title, setFilterValue, ...rest }}
              />
            ),
        }
      },

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

      getExcelTableCell: item => {
        const value = item[key] as undefined | LooseEntity

        if (value === undefined) return

        return value[metaModel.anchorField]
      },
    }
  }
