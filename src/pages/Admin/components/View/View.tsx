import './View.css'
import { ReactNode, useMemo, useState } from 'react'
import { useChangeHandler } from '../../hooks'
import { useViewActive } from '../../contexts'
import { Icon, Separator } from '@/components'
import { VIEW_INFO, ViewKey } from '../../constants'
import { addIfExist, classList } from '@/helpers'

type LocalViewKey = 'query' | 'add' | 'update'

interface Props {
  viewKey: ViewKey
  query?: ReactNode
  add?: ReactNode
  update?: ReactNode
}

const View = ({ viewKey, query, add, update }: Props) => {
  const active = useViewActive(viewKey)

  const localViews = useMemo(
    () =>
      addIfExist<{
        title: string
        faIcon: string
        localViewKey: LocalViewKey
        component: ReactNode
      }>([
        query && {
          title: 'Consultar',
          faIcon: 'fa-solid fa-search',
          localViewKey: 'query',
          component: query,
        },
        add && {
          title: 'Agregar',
          faIcon: 'fa-solid fa-plus',
          localViewKey: 'add',
          component: add,
        },
        update && {
          title: 'Modificar',
          faIcon: 'fa-solid fa-pen-to-square',
          localViewKey: 'update',
          component: update,
        },
      ]),
    [query, add, update]
  )

  const [localView, setLocalView] = useState(localViews[0].localViewKey)

  const handleChange = useChangeHandler(newLocalView =>
    setLocalView(newLocalView as LocalViewKey)
  )

  return (
    <div className={classList('cmp-view', viewKey, { active })}>
      <header>
        <fieldset>
          {localViews.map(({ title, faIcon, localViewKey }) => (
            <label key={title}>
              {faIcon && <Icon {...{ faIcon }} />}
              <div className="text">{title}</div>
              <input
                type="radio"
                id={localViewKey}
                name={['tabbed', viewKey].join('-')}
                checked={localViewKey === localView}
                onChange={handleChange}
              />
            </label>
          ))}
        </fieldset>
        <h1>{VIEW_INFO[viewKey].title}</h1>
      </header>
      <Separator />
      <div className="local-views">
        {localViews.map(({ localViewKey, component }) => (
          <div
            key={localViewKey}
            className={classList({ active: localViewKey === localView })}
          >
            {component}
          </div>
        ))}
      </div>
    </div>
  )
}

export default View
