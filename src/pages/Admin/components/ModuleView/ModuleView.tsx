import { useMemo } from 'react'
import { useMetaModels } from '../../hooks'
import { addIf } from '@/helpers'
import { LocalAdd, LocalEdit, LocalQuery, View } from '..'
import { LocalView, ViewProps } from '../View/View'
import { LocalQueryProps } from '../LocalQuery/LocalQuery'
import { MetaModelKey } from '../../constants/metaModelKey.const'
import { MetaModelContext } from '../../contexts/metaModel.context'
import { MetaModel } from '../../meta/metaModel'
import { TableProvider } from '../../contexts/table.context'

interface ModuleViewProps {
  view?: Partial<ViewProps>
  metaModelKey: MetaModelKey
  query?: boolean | LocalQueryProps
  add?: boolean
  edit?: boolean
}

const ModuleView = ({
  view,
  metaModelKey,
  query = true,
  add = true,
  edit = true,
}: ModuleViewProps) => {
  const { getMetaModelEntry } = useMetaModels()
  const { ready, metaModel } = getMetaModelEntry(metaModelKey)

  const localViews = useMemo(
    () => [
      ...addIf<LocalView>([
        query && {
          title: 'Consultar',
          faIcon: 'fa-solid fa-search',
          localViewKey: 'query',
          component: <LocalQuery {...(query !== true && { ...query })} />,
        },
        add && {
          title: 'Agregar',
          faIcon: 'fa-solid fa-plus',
          localViewKey: 'add',
          component: <LocalAdd />,
        },
        edit && {
          title: 'Editar',
          faIcon: 'fa-solid fa-pen',
          localViewKey: 'edit',
          component: <LocalEdit />,
        },
      ]),
      ...(view?.localViews ?? []),
    ],
    [],
  )

  return (
    ready &&
    metaModel && (
      <MetaModelContext.Provider value={metaModel as MetaModel}>
        <TableProvider>
          <View
            viewKey={view?.viewKey ?? metaModel.key}
            title={view?.title ?? metaModel.title.plural}
            {...{ localViews }}
          />
        </TableProvider>
      </MetaModelContext.Provider>
    )
  )
}

export default ModuleView
