import './Section.css'
import { MouseEventHandler, useCallback, useState } from 'react'
import { useFavoriteViews, useViews } from '@/pages/Admin/hooks'
import { Button, Icon } from '@/components'
import { SectionNode } from '@/pages/Admin/constants/navTree.const'
import { VIEWS_INFO } from '@/pages/Admin/constants/views.const'
import { classList } from '@/helpers'

const Section = ({ viewKey, title, sections }: SectionNode) => {
  const [isOpen, setOpen] = useState(false)
  const { isActive, select } = useViews()
  const { isFavorite, toggle } = useFavoriteViews()

  const handleClick = useCallback(() => {
    if (viewKey) {
      select(viewKey, 0)
      return
    }

    setOpen(prev => !prev)
  }, [])

  const handleToggleFavoriteClick = useCallback<
    (viewKey: string) => MouseEventHandler<HTMLButtonElement>
  >(
    viewKey => e => {
      e.stopPropagation()
      toggle(viewKey)
    },
    [toggle],
  )

  return (
    <div className={classList('cmp-section', 'ui-m', { open: isOpen })}>
      <div
        className={classList('node', { active: isActive(viewKey) })}
        onClick={handleClick}
      >
        {viewKey ? (
          <>
            <Icon faIcon={VIEWS_INFO[viewKey].faIcon} />
            <p>{VIEWS_INFO[viewKey].title}</p>
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
                faIcon={`fa-${
                  isFavorite(viewKey) ? 'solid' : 'regular'
                } fa-star`}
                size="s"
                onAction={handleToggleFavoriteClick(viewKey)}
              />
            </div>
          </>
        ) : (
          <>
            <Icon faIcon="fa-solid fa-angle-right" />
            <p>{title}</p>
          </>
        )}
      </div>
      {sections && (
        <div className="items">
          <span className="bar" />
          <div className="sections">
            {sections.map(section => (
              <Section key={section.viewKey ?? section.title} {...section} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default Section
