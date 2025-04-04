import './View.css'
import { ReactNode, useCallback, useMemo, useState } from 'react'
import { useChangeHandler, useScheme, useViewActive } from '../../hooks'
import { Icon, Separator } from '@/components'
import {
  RowSelectionContext,
  SchemeContext,
  LocalViewContext,
} from '../../contexts'
import { Scheme } from '../../services/config'
import { LocalAdd, LocalEdit, LocalQuery } from '..'
import { addIf, classList } from '@/helpers'
import { RowSelectionState } from '@tanstack/react-table'

interface CustomLocalView {
  title: string
  faIcon: string
  localViewKey: string
  component: ReactNode
}

interface Props {
  query?: boolean
  add?: boolean
  edit?: boolean
  custom?: CustomLocalView[]
}

const HydratedView = ({
  query = true,
  add = true,
  edit = true,
  custom = [],
}: Props) => {
  const { scheme } = useScheme()
  const { key, title } = scheme

  const localViews = useMemo(() => {
    return [
      ...addIf<CustomLocalView>([
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
      ...custom,
    ]
  }, [])

  const isActive = useViewActive(key)

  const [localView, setLocalView] = useState<string>(localViews[0].localViewKey)
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({})

  const selectedRowIds = useMemo(
    () =>
      Object.keys(rowSelection)
        .filter(id => rowSelection[id])
        .map(Number),
    [rowSelection],
  )

  const deselectRows = useCallback(() => setRowSelection({}), [])

  const handleChange = useChangeHandler(newLocalView =>
    setLocalView(newLocalView as string),
  )

  return (
    <LocalViewContext.Provider value={{ setLocalView }}>
      <div className={classList('cmp-view', key, { active: isActive })}>
        <header>
          <fieldset>
            {localViews.map(({ title, faIcon, localViewKey }) => (
              <label key={localViewKey}>
                {faIcon && <Icon {...{ faIcon }} />}
                <div className="text">{title}</div>
                <input
                  type="radio"
                  id={localViewKey}
                  name={['tabbed', key].join('-')}
                  checked={localViewKey === localView}
                  onChange={handleChange}
                />
              </label>
            ))}
          </fieldset>
          <h1>{title.plural}</h1>
        </header>
        <Separator />
        <div className="local-views">
          <RowSelectionContext.Provider
            value={{
              rowSelection,
              setRowSelection,
              selectedRowIds,
              deselectRows,
            }}
          >
            {localViews.map(({ localViewKey, component }) => (
              <div
                key={localViewKey}
                className={classList({ active: localViewKey === localView })}
              >
                {component}
              </div>
            ))}
          </RowSelectionContext.Provider>
        </div>
      </div>
    </LocalViewContext.Provider>
  )
}

const View = ({ scheme, ...rest }: Props & { scheme: Scheme }) => (
  <SchemeContext.Provider value={{ scheme }}>
    <HydratedView {...rest} />
  </SchemeContext.Provider>
)

export default View
