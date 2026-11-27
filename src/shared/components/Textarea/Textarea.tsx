import './Textarea.css'
import { TextareaHTMLAttributes } from 'react'
import { clsx } from '@/helpers'

interface TextareaProps {
  minimal?: boolean
  htmlAttrs?: TextareaHTMLAttributes<HTMLTextAreaElement>
}

export const Textarea = ({ minimal = false, htmlAttrs }: TextareaProps) => {
  return (
    <textarea
      className={clsx('cmp-textarea', 'ui-l', { minimal })}
      {...htmlAttrs}
    />
  )
}
