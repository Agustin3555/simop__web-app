import './FavoriteViews.css'
import { Button, Icon } from '@/components'
import { useViews } from '../../hooks/useViews.hook'
import { useFavoriteTables } from '../../store/favoriteTables.store'
import { TABLE_DEFS } from '../../constants/metaModelDefinitions.const'
import { classList } from '@/helpers'

const FavoriteViews = () => {
  const { isActive, select } = useViews()
  const { tables, remove } = useFavoriteTables()

  return (
    <div className="cmp-favorite-views">
      {tables.map(tableKey => {
        const { title, classIcon } = TABLE_DEFS[tableKey]

        return (
          <div
            key={tableKey}
            className={classList('item', 'ui-l', {
              active: isActive(tableKey),
            })}
            title={title.plural}
            onClick={() => select(tableKey)}
          >
            <Button
              faIcon="fa-solid fa-minus"
              size="s"
              onAction={e => {
                e.stopPropagation()
                remove(tableKey)
              }}
            />
            <Icon faIcon={classIcon} />
            <p className="text">{title.plural}</p>
          </div>
        )
      })}
    </div>
  )
}

export default FavoriteViews
