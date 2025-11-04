import { ReactNode } from 'react'
import {
  AccessorFn,
  BuiltInFilterFn,
  Column,
  FilterFn,
  HeaderContext,
  SortingFn,
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
  isRequired?: boolean
}

export interface BaseProp {
  title: string
  minSize?: MinSize | number
}

export type AddFn = (key: string, getTitle: () => string) => void

interface SimplePieSectorMode {
  accumulate: (value: any, add: AddFn) => void
}

type PieSectorModes = Record<string, SimplePieSectorMode & { title: string }>

export interface Prop<E = LooseEntity> {
  key: string
  verboseKey?: string
  metaModelRef?: MetaModelKey
  title: string
  isRequired?: boolean

  // Para inicializar las columnas de @tanstack/react-table
  minSize: MinSize | number
  accessorFn?: AccessorFn<E>
  filterFn?: FilterFn<E> | BuiltInFilterFn
  sortingFn?: SortingFn<E>
  footer?: (info: HeaderContext<E, unknown>) => ReactNode

  getFormField: (value?: any, isEditMode?: boolean) => ReactNode

  getFormFieldValue: (
    formData: FormData,
    form: HTMLFormElement,
    isEditMode?: boolean,
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
    modes: PieSectorModes
  }
}

export type PropFactory = (
  key: string,
  getMetaModel: MetaModelsContextProps['getMetaModel'],
) => Prop

export const WDND_MODE = {
  key: 'with-data-no-data',
  title: 'Presencia del dato',
}

export const UNIQUE_MODE = {
  key: 'unique',
  title: 'Valor absoluto',
}

export const createUniqueMode = ({
  accumulate,
}: SimplePieSectorMode): PieSectorModes => ({
  [UNIQUE_MODE.key]: { title: UNIQUE_MODE.title, accumulate },
})
