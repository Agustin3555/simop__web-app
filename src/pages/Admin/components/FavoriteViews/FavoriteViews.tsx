import './FavoriteViews.css'
import { Icon } from '@/components'
import { useViews } from '../../hooks/useViews.hook'
import { useFavoriteTables } from '../../store/favoriteTables.store'
import { Button } from '@/shared/components/Button/Button'
import { clsx } from '@/helpers'
import { TABLE_DEFS } from '../../constants/metaModelDefinitions.const'

interface FavoriteViewsProps {
  small?: boolean
}

const FavoriteViews = ({ small = false }: FavoriteViewsProps) => {
  const { isActive, select } = useViews()
  const { tables, remove } = useFavoriteTables()

  return (
    <div className={clsx('cmp-favorite-views', { small })}>
      {tables.map(tableKey => {
        const { title, classIcon } = TABLE_DEFS[tableKey]

        return (
          <div
            key={tableKey}
            className={clsx('item', 'ui-l', { active: isActive(tableKey) })}
            title={title.plural}
            onClick={() => select(tableKey)}
          >
            {!small && (
              <Button
                iconClass="fa-solid fa-minus"
                size="s"
                onAction={e => {
                  e.stopPropagation()
                  remove(tableKey)
                }}
              />
            )}
            <Icon iconClass={classIcon} />
            <p>{title.plural}</p>
          </div>
        )
      })}
    </div>
  )
}

export default FavoriteViews
