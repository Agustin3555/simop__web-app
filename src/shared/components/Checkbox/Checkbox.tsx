import './Checkbox.css'
import { InputHTMLAttributes } from 'react'
import { Checker } from '../Checker/Checker'
import { clsx } from '@/helpers'

interface CheckboxProps {
  minimal?: boolean
  falseText?: string
  trueText?: string
  htmlAttrs?: InputHTMLAttributes<HTMLInputElement>
}

export const Checkbox = ({
  minimal = false,
  falseText = 'No',
  trueText = 'Si',
  htmlAttrs,
}: CheckboxProps) => {
  return (
    <div className={clsx('cmp-checkbox', 'ui-l', { minimal })}>
      <input type="checkbox" hidden {...htmlAttrs} />
      <Checker />
      <span className="false">{falseText}</span>
      <span className="true">{trueText}</span>
    </div>
  )
}
