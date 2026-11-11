import './Node.css'
import { MouseEventHandler, useCallback, useState } from 'react'
import { Icon } from '@/components'
import { SectionNode } from '@/pages/Admin/constants/navTree.const'
import { clsx } from '@/helpers'
import { useViews } from '@/pages/Admin/hooks/useViews.hook'
import { TABLE_DEFS } from '@/pages/Admin/constants/metaModelDefinitions.const'
import { TableKey } from '@/pages/Admin/constants/metaModelKey.const'
import { useFavoriteTables } from '@/pages/Admin/store/favoriteTables.store'
import { Button } from '@/shared/components/Button/Button'

interface LeafNodeProps {
  tableKey: TableKey
}

const LeafNode = ({ tableKey }: LeafNodeProps) => {
  const { isActive, select } = useViews()
  const { isFavorite, toggle } = useFavoriteTables()

  const { title, classIcon } = TABLE_DEFS[tableKey]

  const handleClick = useCallback(() => select(tableKey), [tableKey, select])

  const handleToggleFavoriteClick = useCallback<MouseEventHandler>(
    e => {
      e.stopPropagation()
      toggle(tableKey)
    },
    [toggle, tableKey],
  )

  return (
    <div className="cmp-node ui-m">
      <div
        className={clsx('content', {
          active: isActive(tableKey),
        })}
        title={title.plural}
        onClick={handleClick}
      >
        <Icon iconClass={classIcon} />
        <p>{title.plural}</p>
        <div
          className={clsx('actions', {
            'show-favorite': isFavorite(tableKey),
          })}
        >
          <Button
            title={
              isFavorite(tableKey)
                ? 'Eliminar de favoritos'
                : 'Agregar a favoritos'
            }
            iconClass={`fa-${isFavorite(tableKey) ? 'solid' : 'regular'} fa-star`}
            size="s"
            onAction={handleToggleFavoriteClick}
          />
        </div>
      </div>
    </div>
  )
}

const BranchingNode = ({ title, sections }: SectionNode) => {
  const [isOpen, setOpen] = useState(false)

  const handleClick = useCallback(() => setOpen(prev => !prev), [])

  return (
    <div className={clsx('cmp-node ui-m', { open: isOpen })}>
      <div className="content" onClick={handleClick} {...{ title }}>
        <Icon iconClass="fa-solid fa-angle-right" />
        <p>{title}</p>
      </div>
      {sections && (
        <div className="items">
          <span className="bar" />
          <div className="sections">
            {sections.map(section =>
              section.tableKey ? (
                <LeafNode key={section.tableKey} tableKey={section.tableKey} />
              ) : (
                <BranchingNode key={section.title} {...section} />
              ),
            )}
          </div>
        </div>
      )}
    </div>
  )
}

const Node = (props: SectionNode) =>
  props.tableKey ? (
    <LeafNode tableKey={props.tableKey} />
  ) : (
    <BranchingNode {...props} />
  )

export default Node
