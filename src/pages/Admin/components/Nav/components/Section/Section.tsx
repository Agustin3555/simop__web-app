import './Section.css'
import { useCallback, useState } from 'react'
import { useViewActive, useViewNavigation } from '@/pages/Admin/contexts'
import { SectionNode } from '@/pages/Admin/constants'
import { classList } from '@/helpers'
import { Icon } from '@/components'

const Section = ({ title, sections, viewKey }: SectionNode) => {
  const [isOpen, setOpen] = useState(true)
  const navigate = useViewNavigation()
  const active = useViewActive(viewKey!)

  const handleClick = useCallback(() => {
    viewKey ? navigate(viewKey) : setOpen(prev => !prev)
  }, [])

  return (
    <div className={classList('cmp-section', { open: isOpen })}>
      <button className={classList({ active })} onClick={handleClick}>
        {sections && <Icon faIcon="fa-solid fa-angle-down" />}
        {title}
      </button>
      {sections && (
        <div className="sections">
          {sections.map(section => (
            <Section key={section.viewKey || section.title} {...section} />
          ))}
        </div>
      )}
    </div>
  )
}

export default Section
