import { FormValues } from '@/hooks'
import { ReactNode } from 'react'
import { Scheme } from './scheme'
import { AccessorFn, Column, FilterFn, Row } from '@tanstack/react-table'
import { Entity, EntityKey } from '@/services/config'

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

export interface PropScheme<T = EntityKey, E = Entity> {
  key: T
  title?: string
  config?: unknown

  getFieldComponent: () => ReactNode
  getFieldValue: (formValues: FormValues) => undefined | unknown

  accessorFn?: AccessorFn<E>
  filterFn?: FilterFn<E>
  getHeader?: (column: Column<E>) => {
    title: string
    subtitle?: string
    filter: ReactNode
  }
  getCellComponent: (row: Row<E>) => ReactNode
}
