import './ComboboxLayout.css'
import { ReactNode } from 'react'
import { useCombobox } from '../../hooks'
import { Icon, StateButton } from '@/components'
import { classList } from '@/helpers'
import { useHandleAction } from '@/hooks'

interface ComboboxLayoutProps
  extends Pick<ReturnType<typeof useCombobox>, 'basicProps'> {
  selection: ReactNode
  fieldset: ReactNode
}

const ComboboxLayout = ({
  basicProps,
  selection,
  fieldset,
}: ComboboxLayoutProps) => {
  const {
    refetch,
    comboboxLayoutRef,
    long = 'm',
    open,
    handleEnter,
    content,
    controlTitle,
    handleToggleClick,
    search,
    handleSearchChange,
    isVoid,
  } = basicProps

  // TODO: long debería ser 'l' si es multiple

  const handleActionResult = useHandleAction(
    async ({ setError, setSuccess }) => {
      try {
        await refetch()

        await setSuccess()
      } catch (error) {
        await setError()
      }
    },
  )

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
        <header>
          <input
            className="box input"
            value={search}
            placeholder="Buscar ..."
            onChange={handleSearchChange}
          />
          <StateButton
            text="Actualizar opciones"
            hiddenText
            faIcon="fa-solid fa-rotate"
            {...handleActionResult}
          />
        </header>
        {isVoid ? (
          <div className="void">
            <Icon faIcon="fa-solid fa-frog" />
          </div>
        ) : (
          fieldset
        )}
      </div>
    </div>
  )
}

export default ComboboxLayout
