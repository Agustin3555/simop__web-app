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
import { MetaModel } from './metaModel'
import { MetaModelsContextProps } from '../contexts/metaModels.context'
import { MetaModelKey } from '../constants/metaModelKey.const'
import { FilterProp } from '../components/ReportInTable/ReportInTable'

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

export type AddFn = (key: string, getTitle: () => string) => void

interface SimplePieSectorMode {
  accumulate: (value: any, add: AddFn) => void
}

export type PieSectorModes = Record<
  string,
  SimplePieSectorMode & { title: string }
>

export interface Prop<E = LooseEntity> {
  key: string
  verboseKey?: string
  metaModelRef?: MetaModelKey
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

  getReportTableFilter: (
    column: Column<E>,
    data: E[],
    selectedSearchMode?: string,
  ) => undefined | FilterProp

  getReportTableCell: (item: E, selectedSearchMode?: string) => ReactNode

  getExcelTableCell: (item: E, selectedSearchMode?: string) => unknown

  pieSectorConfig: {
    defaultMode: string
    modes: {
      unique?: SimplePieSectorMode
      customs?: PieSectorModes
    }
  }
}

export type PropFactory = (
  key: string,
  getMetaModel: MetaModelsContextProps['getMetaModel'],
) => Prop
