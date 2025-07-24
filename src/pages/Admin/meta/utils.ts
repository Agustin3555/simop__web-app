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

export interface IRequired {
  required?: boolean
}

export interface BaseProp {
  title: string
  minSize?: MinSize | number
}

export interface Prop<E = LooseEntity> {
  key: string
  verboseKey?: string
  title: string

  // Para inicializar las columnas de @tanstack/react-table
  minSize: MinSize | number
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
    getFilter: (
      props: Pick<Column<LooseEntity>, 'getFilterValue'> &
        Partial<Pick<ComboboxProps, 'options'>>,
    ) => ReactNode
  }
  getTableCell: (item: E, selectedSearchMode?: string) => ReactNode

  // getReportTableHeader:
  // getReportTableCell:

  getExcelTableCell: (item: E, selectedSearchMode?: string) => unknown
}

export type PropFactory = (key: string) => Prop
