import './Section.css'
import { useCallback, useState } from 'react'
import { useViewActive, useViewNavigation } from '@/pages/Admin/hooks'
import { SectionNode } from '@/pages/Admin/constants/navTree.const'
import { classList } from '@/helpers'
import { Icon } from '@/components'

interface Props extends SectionNode {
  closeNav: () => void
}

const Section = ({ title, sections, scheme, closeNav }: Props) => {
  const hasView = scheme !== undefined

  const [isOpen, setOpen] = useState(false)
  const viewNavigate = useViewNavigation()
  const isActive = useViewActive(scheme?.key ?? '')

  const handleClick = useCallback(() => {
    if (hasView) {
      viewNavigate(scheme.key)
      closeNav()
    } else setOpen(prev => !prev)
  }, [])

  return (
    <div className={classList('cmp-section', { open: isOpen })}>
      <button className={classList({ active: isActive })} onClick={handleClick}>
        {sections && <Icon faIcon="fa-solid fa-angle-right" />}
        {hasView ? scheme.title.plural : title}
      </button>
      {sections && (
        <div className="sections">
          {sections.map(section => (
            <Section
              key={section.title || section.scheme?.title.plural}
              {...section}
              {...{ closeNav }}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default Section
