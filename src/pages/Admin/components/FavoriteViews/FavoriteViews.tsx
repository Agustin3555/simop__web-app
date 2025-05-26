import './FavoriteViews.css'
import { useCallback } from 'react'
import { useFavoriteViews, useInputHandler } from '../../hooks'
import { Button, Icon } from '@/components'
import { VIEWS_INFO } from '../../constants/views.const'

const FavoriteViews = () => {
  const { views, remove } = useFavoriteViews()

  const handleChange = useInputHandler(value => console.log(value))

  const handleDeleteButtonClick = useCallback(
    (viewKey: string) => () => remove(viewKey),
    [],
  )

  return (
    <fieldset className="cmp-favorite-views">
      {views.map(viewKey => {
        const { title, faIcon } = VIEWS_INFO[viewKey]

        return (
          <label key={viewKey} className="favorites ui-l" {...{ title }}>
            <input
              name="favorite-views"
              type="checkbox"
              value={viewKey}
              onChange={handleChange}
            />
            <Button
              faIcon="fa-solid fa-minus"
              size="s"
              onAction={handleDeleteButtonClick(viewKey)}
            />
            <Icon {...{ faIcon }} />
            <p className="text">{title}</p>
          </label>
        )
      })}
    </fieldset>
  )
}

export default FavoriteViews
