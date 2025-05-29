import './FavoriteViews.css'
import { MouseEventHandler, useCallback } from 'react'
import { useFavoriteViews, useViews } from '../../hooks'
import { Button, Icon } from '@/components'
import { VIEWS_INFO } from '../../constants/views.const'
import { classList } from '@/helpers'

const FavoriteViews = () => {
  const { views, remove } = useFavoriteViews()
  const { isActive, select } = useViews()

  const handleClick = useCallback(
    (viewKey: string) => () => select(viewKey, 0),
    [],
  )

  const handleDeleteButtonClick = useCallback<
    (viewKey: string) => MouseEventHandler<HTMLButtonElement>
  >(
    viewKey => e => {
      e.stopPropagation()
      remove(viewKey)
    },
    [],
  )

  return (
    <fieldset className="cmp-favorite-views">
      {views.map(viewKey => {
        const { title, faIcon } = VIEWS_INFO[viewKey]

        return (
          <div
            key={viewKey}
            className={classList('item', 'ui-l', {
              active: isActive(viewKey),
            })}
            {...{ title }}
            onClick={handleClick(viewKey)}
          >
            <Button
              faIcon="fa-solid fa-minus"
              size="s"
              onAction={handleDeleteButtonClick(viewKey)}
            />
            <Icon {...{ faIcon }} />
            <p className="text">{title}</p>
          </div>
        )
      })}
    </fieldset>
  )
}

export default FavoriteViews
