import './ComboboxLayout.css'
import { ReactNode } from 'react'
import { BasicProps } from '../../hooks'
import { Icon } from '@/components'
import { classList } from '@/helpers'

interface ComboboxLayoutProps extends BasicProps {
  selection: ReactNode
  fieldset: ReactNode
}

const ComboboxLayout = ({
  basicProps,
  selection,
  fieldset,
}: ComboboxLayoutProps) => {
  const {
    comboboxLayoutRef,
    open,
    content,
    controlTitle,
    handleToggleClick,
    search,
    handleSearchChange,
  } = basicProps

  return (
    <div
      ref={comboboxLayoutRef}
      className={classList('cmp-combobox-layout', 'control', { open })}
    >
      <small className="label">{content}</small>
      <header className="box" title={controlTitle} onClick={handleToggleClick}>
        {selection}
        <div className="arrow">
          <Icon faIcon="fa-solid fa-angle-down" />
        </div>
      </header>
      <div className="drop-down">
        <input
          className="box input"
          value={search}
          placeholder="Buscar ..."
          onChange={handleSearchChange}
        />
        {fieldset}
      </div>
    </div>
  )
}

export default ComboboxLayout
