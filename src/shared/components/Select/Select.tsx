import './Select.css'
import type { SelectHTMLAttributes } from 'react'
import Icon from '@/components/Icon/Icon'
import { clsx } from '@/helpers'

export interface SelectProps {
  options?: { value: string; label: string }[]
  size?: 's' | 'm' | 'l'
  includeEmptyOption?: boolean
  htmlAttrs?: SelectHTMLAttributes<HTMLSelectElement>
}

export const Select = ({
  options,
  size = 'l',
  includeEmptyOption = false,
  htmlAttrs,
}: SelectProps) => {
  return (
    <select className={clsx('cmp-select', `ui-${size}`)} {...htmlAttrs}>
      <button>
        <selectedcontent></selectedcontent>
        <Icon iconClass="fa-solid fa-chevron-down" />
      </button>
      {includeEmptyOption && (
        <option className="ui-m" value="">
          -
        </option>
      )}
      {options?.map(({ value, label }) => (
        <option key={value} className="ui-m" {...{ value }}>
          {label}
        </option>
      ))}
    </select>
  )
}
