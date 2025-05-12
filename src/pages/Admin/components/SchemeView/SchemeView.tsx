import { useCallback, useMemo, useState } from 'react'
import { RowSelectionContext, MetaModelContext } from '../../contexts'
import { MetaModel } from '../../services/config'
import { addIf } from '@/helpers'
import { RowSelectionState } from '@tanstack/react-table'
import { LocalAdd, LocalEdit, LocalQuery, View } from '..'
import { LocalView, ViewProps } from '../View/View'
import { LocalQueryProps } from '../LocalQuery/LocalQuery'

interface SchemeViewProps {
  view?: Partial<ViewProps>
  metaModel: MetaModel
  query?: boolean | LocalQueryProps
  add?: boolean
  edit?: boolean
}

const SchemeView = ({
  view,
  metaModel,
  query = true,
  add = true,
  edit = true,
}: SchemeViewProps) => {
  const { key, title } = metaModel

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

  const [rowSelection, setRowSelection] = useState<RowSelectionState>({})

  const selectedRowIds = useMemo(
    () =>
      Object.keys(rowSelection)
        .filter(id => rowSelection[id])
        .map(Number),
    [rowSelection],
  )

  const deselectRows = useCallback(() => setRowSelection({}), [])

  return (
    <MetaModelContext.Provider value={{ metaModel }}>
      <RowSelectionContext.Provider
        value={{ rowSelection, setRowSelection, selectedRowIds, deselectRows }}
      >
        <View
          viewKey={view?.viewKey ?? key}
          title={view?.title ?? title.plural}
          {...{ localViews }}
        />
      </RowSelectionContext.Provider>
    </MetaModelContext.Provider>
  )
}

export default SchemeView
