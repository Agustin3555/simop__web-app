import './FavoriteViews.css'
import { MouseEventHandler, useCallback } from 'react'
import { useFavoriteViews, useViews, useViewsInfo } from '../../hooks'
import { Button, Icon } from '@/components'
import { classList } from '@/helpers'

const FavoriteViews = () => {
  const { getViewInfo } = useViewsInfo()
  const { isActive, select } = useViews()
  const { views, remove } = useFavoriteViews()

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
    <div className="cmp-favorite-views">
      {views.map(viewKey => {
        const viewInfo = getViewInfo(viewKey)

        return (
          viewInfo && (
            <div
              key={viewKey}
              className={classList('item', 'ui-l', {
                active: isActive(viewKey),
              })}
              title={viewInfo.title}
              onClick={handleClick(viewKey)}
            >
              <Button
                faIcon="fa-solid fa-minus"
                size="s"
                onAction={handleDeleteButtonClick(viewKey)}
              />
              <Icon faIcon={viewInfo.faIcon} />
              <p className="text">{viewInfo.title}</p>
            </div>
          )
        )
      })}
    </div>
  )
}

export default FavoriteViews
