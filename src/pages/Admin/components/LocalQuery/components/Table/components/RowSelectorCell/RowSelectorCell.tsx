import './RowSelectorCell.css'
import { InputHTMLAttributes, useEffect, useRef } from 'react'
import { Icon } from '@/components'
import { classList } from '@/helpers'

interface RowSelectorCellProps extends InputHTMLAttributes<HTMLInputElement> {
  indeterminate?: boolean
  asHeader?: boolean
  selectionCounter?: number
}

const RowSelectorCell = ({
  indeterminate,
  asHeader = false,
  selectionCounter,
  ...rest
}: RowSelectorCellProps) => {
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (typeof indeterminate === 'boolean')
      inputRef.current.indeterminate = !rest.checked && indeterminate
  }, [inputRef, indeterminate])

  // TODO: mostrar algo por el estado indeterminate (:indeterminate)

  return (
    <td className={classList('cmp-row-selector-cell', { header: asHeader })}>
      <div className="content">
        <label title="Alternar selección">
          <input type="checkbox" ref={inputRef} {...rest} />
          <Icon faIcon="fa-solid fa-check" />
        </label>
        {asHeader && <small>{selectionCounter}</small>}
      </div>
    </td>
  )
}

export default RowSelectorCell
