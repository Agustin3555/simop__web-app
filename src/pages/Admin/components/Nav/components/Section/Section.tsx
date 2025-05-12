import './Section.css'
import { useCallback, useState } from 'react'
import { useViewActive, useViewNavigation } from '@/pages/Admin/hooks'
import { SectionNode } from '@/pages/Admin/constants/navTree.const'
import { classList } from '@/helpers'
import { Icon } from '@/components'

interface Props extends SectionNode {
  closeNav: () => void
}

const Section = ({ viewKey, title, sections, closeNav }: Props) => {
  const [isOpen, setOpen] = useState(false)
  const viewNavigate = useViewNavigation()
  const isActive = useViewActive(viewKey)

  const handleClick = useCallback(() => {
    if (viewKey) {
      viewNavigate(viewKey)
      closeNav()
      return
    }

    setOpen(prev => !prev)
  }, [])

  return (
    <div className={classList('cmp-section', { open: isOpen })}>
      <button className={classList({ active: isActive })} onClick={handleClick}>
        {sections && <Icon faIcon="fa-solid fa-angle-right" />}
        {title}
      </button>
      {sections && (
        <div className="items">
          <span className="bar" />
          <div className="sections">
            {sections.map(section => (
              <Section
                key={section.viewKey ?? section.title}
                {...{ closeNav, ...section }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default Section
