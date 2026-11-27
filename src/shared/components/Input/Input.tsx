import './Input.css'
import { InputHTMLAttributes } from 'react'
import { clsx } from '@/helpers'

export interface InputProps {
  minimal?: boolean
  htmlAttrs?: InputHTMLAttributes<HTMLInputElement>
}

export const Input = ({ htmlAttrs, minimal = false }: InputProps) => {
  return (
    <input
      className={clsx('cmp-input', 'ui-l', { minimal })}
      autoComplete="off"
      {...htmlAttrs}
    />
  )
}
