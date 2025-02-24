import { ReactNode } from 'react'
import { Scheme } from './scheme'
import {
  AccessorFn,
  BuiltInFilterFn,
  Column,
  FilterFn,
  Row,
} from '@tanstack/react-table'
import { Entity } from '@/services/config'

export type Color = 'blue' | 'green' | 'yellow' | 'red' | 'grey'

export interface ForView {
  hidden?: boolean
  title?: string
}

export interface Required {
  required?: boolean
}

/*
  El scheme se debe obtener desde un método para evitar el problema de referencias
  circulares.
*/
export interface GetScheme {
  getScheme: () => Scheme
}

export interface PropScheme<E = Entity> {
  key: string
  verboseKey?: string
  title?: string
  config?: unknown

  getFieldComponent: () => ReactNode
  getFieldValue: (
    formData: FormData,
    form: HTMLFormElement,
  ) => undefined | unknown

  accessorFn?: AccessorFn<E>
  filterFn?: FilterFn<E> | BuiltInFilterFn
  getHeader?: (column: Column<E>) => {
    title: string
    subtitle?: string
    filter: ReactNode
  }
  getCellComponent: (row: Row<E>) => ReactNode
}
