import './Node.css'
import { MouseEventHandler, useCallback, useState } from 'react'
import { useFavoriteViews, useViews, useViewsInfo } from '@/pages/Admin/hooks'
import { Button, Icon } from '@/components'
import { SectionNode } from '@/pages/Admin/constants/navTree.const'
import { classList } from '@/helpers'

const LeafNode = ({ viewKey }: Required<Pick<SectionNode, 'viewKey'>>) => {
  const { getViewInfo } = useViewsInfo()
  const { isActive, select } = useViews()
  const { isFavorite, toggle } = useFavoriteViews()

  const info = getViewInfo(viewKey)

  const handleClick = useCallback(() => select(viewKey, 0), [viewKey, select])

  const handleToggleFavoriteClick = useCallback<MouseEventHandler>(
    e => {
      e.stopPropagation()
      toggle(viewKey)
    },
    [toggle, viewKey],
  )

  return (
    info && (
      <div className="cmp-node ui-m">
        <div
          className={classList('content', {
            active: isActive(viewKey),
          })}
          title={info.title}
          onClick={handleClick}
        >
          <Icon faIcon={info.faIcon} />
          <p>{info.title}</p>
          <div
            className={classList('actions', {
              'show-favorite': isFavorite(viewKey),
            })}
          >
            <Button
              title={
                isFavorite(viewKey)
                  ? 'Eliminar de favoritos'
                  : 'Agregar a favoritos'
              }
              faIcon={`fa-${isFavorite(viewKey) ? 'solid' : 'regular'} fa-star`}
              size="s"
              onAction={handleToggleFavoriteClick}
            />
          </div>
        </div>
      </div>
    )
  )
}

const BranchingNode = ({
  title,
  sections,
}: Pick<SectionNode, 'title' | 'sections'>) => {
  const [isOpen, setOpen] = useState(false)

  const handleClick = useCallback(() => setOpen(prev => !prev), [])

  return (
    <div className={classList('cmp-node ui-m', { open: isOpen })}>
      <div className="content" onClick={handleClick} {...{ title }}>
        <Icon faIcon="fa-solid fa-angle-right" />
        <p>{title}</p>
      </div>
      {sections && (
        <div className="items">
          <span className="bar" />
          <div className="sections">
            {sections.map(({ viewKey, title, sections }) =>
              viewKey ? (
                <LeafNode key={viewKey} {...{ viewKey }} />
              ) : (
                <BranchingNode key={title} {...{ title, sections }} />
              ),
            )}
          </div>
        </div>
      )}
    </div>
  )
}

const Node = (props: SectionNode) =>
  props.viewKey ? (
    <LeafNode viewKey={props.viewKey} />
  ) : (
    <BranchingNode {...props} />
  )

export default Node
