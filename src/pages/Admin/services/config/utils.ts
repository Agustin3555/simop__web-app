import { FormValues } from '@/hooks'
import { ReactNode } from 'react'
import { Scheme } from './scheme'

// text     string        Input
// textArea string        InputArea           cellStyle
// number   number        Input
// date     string        Input     transform
// dateTime string        Input     transform
// boolean  boolean       Checkbox  transform cellStyle
// ref      {id, title}   Combobox  transform cellStyle
// refList  {id, title}[] Combobox  transform cellStyle

/*
  TODO: Solamente para visualizar los vínculos de uno a muchos que no tengan
  atributos de vinculo y que no sean relaciones ternarias, si lo es, se debe
  convertir en un modulo aparte.
*/

export type Color = 'blue' | 'green' | 'yellow' | 'red' | 'grey'

export interface ForView {
  hidden?: boolean
  title?: string
}

export interface Required {
  required?: boolean
}

/*
  El scheme se debe obtener desde un método para evitar el problema de
  referencias circulares.
*/
export interface GetScheme {
  getScheme: () => Scheme
}

export interface PropScheme<T> {
  key: T
  title: string
  config?: unknown

  getFieldComponent: () => ReactNode
  getFieldValue: (formValues: FormValues) => undefined | unknown
}
