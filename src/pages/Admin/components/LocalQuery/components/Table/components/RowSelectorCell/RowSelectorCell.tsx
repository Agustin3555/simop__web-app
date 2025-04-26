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
  const inputRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    if (!inputRef.current) return

    if (typeof indeterminate === 'boolean')
      inputRef.current.indeterminate = !rest.checked && indeterminate
  }, [inputRef, indeterminate])

  // TODO: diferenciar el estado indeterminate (en CSS -> :indeterminate)

  return (
    <div className={classList('cmp-row-selector-cell', { header: asHeader })}>
      <div className="content">
        {asHeader && <small>{selectionCounter}</small>}
        <label title="Alternar selección">
          <input type="checkbox" ref={inputRef} {...rest} />
          <Icon faIcon="fa-solid fa-check" />
        </label>
      </div>
    </div>
  )
}

export default RowSelectorCell
