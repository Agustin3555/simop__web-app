import './Section.css'
import { useCallback, useState } from 'react'
import { useViews } from '@/pages/Admin/hooks'
import { Icon } from '@/components'
import { SectionNode } from '@/pages/Admin/constants/navTree.const'
import { VIEWS_INFO } from '@/pages/Admin/constants/views.const'
import { classList } from '@/helpers'

const Section = ({ viewKey, title, sections }: SectionNode) => {
  const [isOpen, setOpen] = useState(false)
  const { isActive, selectView } = useViews()

  const handleClick = useCallback(() => {
    if (viewKey) {
      selectView(viewKey, 0)
      return
    }

    setOpen(prev => !prev)
  }, [])

  return (
    <div className={classList('cmp-section', 'ui-m', { open: isOpen })}>
      <button
        className={classList({ active: isActive(viewKey) })}
        onClick={handleClick}
      >
        {viewKey ? (
          <>
            <Icon faIcon={VIEWS_INFO[viewKey].faIcon} />
            <p>{VIEWS_INFO[viewKey].title}</p>
          </>
        ) : (
          <>
            <Icon faIcon="fa-solid fa-angle-right" />
            <p>{title}</p>
          </>
        )}
      </button>
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
