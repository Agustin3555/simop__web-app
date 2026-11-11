import './FavoriteViews.css'
import { Icon } from '@/components'
import { useViews } from '../../hooks/useViews.hook'
import { useFavoriteTables } from '../../store/favoriteTables.store'
import { TABLE_DEFS } from '../../constants/metaModelDefinitions.const'
import { clsx } from '@/helpers'
import { Button } from '@/shared/components/Button/Button'

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
            className={clsx('item', 'ui-l', {
              active: isActive(tableKey),
            })}
            title={title.plural}
            onClick={() => select(tableKey)}
          >
            <Button
              iconClass="fa-solid fa-minus"
              size="s"
              onAction={e => {
                e.stopPropagation()
                remove(tableKey)
              }}
            />
            <Icon iconClass={classIcon} />
            <p className="text">{title.plural}</p>
          </div>
        )
      })}
    </div>
  )
}

export default FavoriteViews
