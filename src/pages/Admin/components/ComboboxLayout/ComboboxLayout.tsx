import './ComboboxLayout.css'
import { ReactNode } from 'react'
import { BasicProps } from '../../hooks'
import { Icon, Loader } from '@/components'
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
    long = 'm',
    open,
    handleEnter,
    content,
    controlTitle,
    handleToggleClick,
    search,
    handleSearchChange,
    loading,
  } = basicProps

  // TODO: long debería ser 'l' si es multiple

  return (
    <div
      ref={comboboxLayoutRef}
      className={classList('cmp-combobox-layout', 'control', long, { open })}
      onMouseEnter={handleEnter}
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
        {loading ? (
          <div className="loader-container">
            <Loader />
          </div>
        ) : (
          fieldset
        )}
      </div>
    </div>
  )
}

export default ComboboxLayout
