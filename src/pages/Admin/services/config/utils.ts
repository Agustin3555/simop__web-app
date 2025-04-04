import { ReactNode } from 'react'
import { Scheme } from './scheme'
import {
  AccessorFn,
  BuiltInFilterFn,
  Column,
  FilterFn,
  HeaderContext,
  Row,
} from '@tanstack/react-table'
import { Entity } from '@/services/config'

export type Color = 'blue' | 'green' | 'yellow' | 'red' | 'grey'

export enum MinSize {
  xs = 5,
  s = 8,
  m = 10,
  l = 12,
  xl = 16,
}

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
  title: string
  minSize: MinSize
  config?: unknown

  getFieldComponent: (value?: any, editMode?: boolean) => ReactNode
  getFieldValue: (
    formData: FormData,
    form: HTMLFormElement,
    editMode?: boolean,
  ) => undefined | unknown

  accessorFn?: AccessorFn<E>
  filterFn?: FilterFn<E> | BuiltInFilterFn
  footer?: (info: HeaderContext<E, unknown>) => ReactNode
  getHeader?: (column: Column<E>) => {
    title: string
    subtitle?: string
    filter: ReactNode
  }
  getCellComponent: (row: Row<E>) => ReactNode

  getExcelValue: (item: E) => unknown
}
