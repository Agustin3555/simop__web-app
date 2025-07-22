import { ReactNode } from 'react'
import {
  AccessorFn,
  BuiltInFilterFn,
  Column,
  FilterFn,
  HeaderContext,
} from '@tanstack/react-table'
import { LooseEntity } from '@/models/config'
import { ComboboxProps } from '../components/Combobox/Combobox'
import { MetaModel } from '.'

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
export interface GetMetaModel {
  getMetaModel: () => MetaModel
}

export type GetFilter = (
  props: Pick<Column<LooseEntity>, 'getFilterValue'> &
    Partial<Pick<ComboboxProps, 'options'>>,
) => ReactNode

export interface PropScheme<E = LooseEntity> {
  key: string
  verboseKey?: string
  title: string
  // title: {
  //   long: string
  //   short?: string
  // }
  minSize: MinSize | number
  config?: unknown

  // Para @tanstack/react-table
  accessorFn?: AccessorFn<E>
  filterFn?: FilterFn<E> | BuiltInFilterFn
  footer?: (info: HeaderContext<E, unknown>) => ReactNode

  getFormField: (value?: any, editMode?: boolean) => ReactNode
  getFormFieldValue: (
    formData: FormData,
    form: HTMLFormElement,
    editMode?: boolean,
  ) => undefined | unknown

  getTableHeader: (column: Column<E>) => {
    title: string
    metaModel?: MetaModel
    getFilter: GetFilter
  }
  getTableCell: (item: E, selectedSearchMode?: string) => ReactNode

  // getReportTableHeader:
  // getReportTableCell:

  getExcelTableCell: (item: E, selectedSearchMode?: string) => unknown
}
