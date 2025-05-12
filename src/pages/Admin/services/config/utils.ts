import { ReactNode } from 'react'
import {
  AccessorFn,
  BuiltInFilterFn,
  Column,
  FilterFn,
  HeaderContext,
} from '@tanstack/react-table'
import { GeneralEntity } from '@/models/config'
import { ComboboxProps } from '../../components/Combobox/Combobox'
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
  props: Pick<Column<GeneralEntity>, 'getFilterValue'> &
    Partial<Pick<ComboboxProps, 'options'>>,
) => ReactNode

export interface PropScheme<E = GeneralEntity> {
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
  getHeader: (column: Column<E>) => {
    title: string
    metaModel?: MetaModel
    getFilter: GetFilter
  }
  getValueComponent: (item: E, selectedSearchMode?: string) => ReactNode

  getExcelValue: (item: E, selectedSearchMode?: string) => unknown
}
