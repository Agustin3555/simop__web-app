import { useCallback, useMemo, useState } from 'react'
import { RowSelectionContext, SchemeContext } from '../../contexts'
import { MetaModel } from '../../services/config'
import { addIf } from '@/helpers'
import { RowSelectionState } from '@tanstack/react-table'
import { LocalAdd, LocalEdit, LocalQuery, View } from '..'
import { LocalView, ViewProps } from '../View/View'

interface SchemeViewProps extends Pick<ViewProps, 'localViews'> {
  scheme: MetaModel
  query?: boolean
  add?: boolean
  edit?: boolean
}

const SchemeView = ({
  scheme,
  query = true,
  add = true,
  edit = true,
  localViews: customLocalViews = [],
}: SchemeViewProps) => {
  const { key, title } = scheme

  const localViews = useMemo(
    () => [
      ...addIf<LocalView>([
        query && {
          title: 'Consultar',
          faIcon: 'fa-solid fa-search',
          localViewKey: 'query',
          component: <LocalQuery />,
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
      ...customLocalViews,
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
    <SchemeContext.Provider value={{ scheme }}>
      <RowSelectionContext.Provider
        value={{ rowSelection, setRowSelection, selectedRowIds, deselectRows }}
      >
        <View viewKey={key} title={title.plural} {...{ localViews }} />
      </RowSelectionContext.Provider>
    </SchemeContext.Provider>
  )
}

export default SchemeView
