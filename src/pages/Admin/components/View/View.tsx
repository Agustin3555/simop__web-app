import './View.css'
import { ReactNode, useMemo, useState } from 'react'
import { useChangeHandler, useViewActive } from '../../hooks'
import { Icon, Separator } from '@/components'
import { SchemeContext } from '../../contexts'
import { Scheme } from '@/models/config'
import { LocalAdd, LocalQuery } from '..'
import { addIf, classList } from '@/helpers'

type LocalViewKey = 'query' | 'add'

// TODO: admitir vistas locales custom

interface Props {
  scheme: Scheme<unknown>
  notQuery?: boolean
  notAdd?: boolean
  notUpdate?: boolean
}

const View = ({ scheme, notQuery = false, notAdd = false }: Props) => {
  const { accessorKey } = scheme

  const localViews = useMemo(
    () =>
      addIf<{
        title: string
        faIcon: string
        localViewKey: LocalViewKey
        component: ReactNode
      }>([
        !notQuery && {
          title: 'Consultar',
          faIcon: 'fa-solid fa-search',
          localViewKey: 'query',
          // component: <LocalQuery />,
          component: <h1>LocalQuery</h1>,
        },
        !notAdd && {
          title: 'Agregar',
          faIcon: 'fa-solid fa-plus',
          localViewKey: 'add',
          // component: <LocalAdd />,
          component: <h1>LocalAdd</h1>,
        },
      ]),
    [],
  )

  const isActive = useViewActive(accessorKey)
  const [localView, setLocalView] = useState(localViews[0].localViewKey)

  const handleChange = useChangeHandler(newLocalView =>
    setLocalView(newLocalView as LocalViewKey),
  )

  return (
    <div className={classList('cmp-view', accessorKey, { active: isActive })}>
      <header>
        <fieldset>
          {localViews.map(({ title, faIcon, localViewKey }) => (
            <label key={title}>
              {faIcon && <Icon {...{ faIcon }} />}
              <div className="text">{title}</div>
              <input
                type="radio"
                id={localViewKey}
                name={['tabbed', accessorKey].join('-')}
                checked={localViewKey === localView}
                onChange={handleChange}
              />
            </label>
          ))}
        </fieldset>
        <h1>{scheme.title.plural}</h1>
      </header>
      <Separator />
      <div className="local-views">
        <SchemeContext.Provider value={{ scheme }}>
          {localViews.map(({ localViewKey, component }) => (
            <div
              key={localViewKey}
              className={classList({ active: localViewKey === localView })}
            >
              {component}
            </div>
          ))}
        </SchemeContext.Provider>
      </div>
    </div>
  )
}

export default View
