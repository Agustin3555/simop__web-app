import './Section.css'
import { useCallback, useState } from 'react'
import { useViewActive, useViewNavigation } from '@/pages/Admin/contexts'
import { SectionNode, VIEW_INFO } from '@/pages/Admin/constants'
import { classList } from '@/helpers'
import { Icon } from '@/components'

const Section = ({ title, sections, viewKey }: SectionNode) => {
  const hasView = viewKey !== undefined

  const [isOpen, setOpen] = useState(false)
  const navigate = useViewNavigation()
  const active = useViewActive(viewKey)

  const handleClick = useCallback(() => {
    hasView ? navigate(viewKey) : setOpen(prev => !prev)
  }, [])

  return (
    <div className={classList('cmp-section', { open: isOpen })}>
      <button className={classList({ active })} onClick={handleClick}>
        {sections && <Icon faIcon="fa-solid fa-angle-right" />}
        {hasView ? VIEW_INFO[viewKey].title : title}
      </button>
      {sections && (
        <div className="sections">
          {sections.map(section => (
            <Section
              key={section.title || String(section.viewKey)}
              {...section}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default Section
