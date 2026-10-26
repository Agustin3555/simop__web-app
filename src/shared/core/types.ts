import { ReactNode } from 'react'
import { TextColumn } from './columns/text'
import { NumberColumn } from './columns/number'
import { BooleanColumn } from './columns/boolean'
import { DatetimeColumn } from './columns/datetime'
import { RefColumn } from './columns/ref'
import { TableKey } from '@/pages/Admin/constants/metaModelKey.const'
import { FormValues } from '@/hooks'
import { Service } from '@/infra/http/service.type'
import { LooseEntity } from '@/infra/http/entity.types'

export interface PartialTableDef<C extends readonly ColumnDef[]> {
  key: TableKey
  title: {
    singular: string
    plural: string
  }
  classIcon?: string

  columnDefs: C
  anchorColumnKey: C[number]['key']
  mutationColumns?: C[number]['key'][]
  mutationColumnGroups?: {
    title?: string
    columnKeys: C[number]['key'][]
  }[]

  services: Service
}

export type TableDef<C extends readonly ColumnDef[]> = Required<
  PartialTableDef<C>
>

export enum Size {
  xs = 5,
  s = 8,
  m = 10,
  l = 12,
  xl = 16,
}

export interface ColumnConfig {
  overrideTitle?: string
  size?: number
}

export interface InputConfig {
  isHidden?: boolean
  isRequired?: boolean
}

export interface Column {
  key: string
}

export type ColumnDef =
  BooleanColumn | TextColumn | NumberColumn | DatetimeColumn | RefColumn

export type ColumnBehavior = {
  usefulDef: {
    key: string
    title: string
    input: { isHidden: boolean }
    column: { size: number }
  }

  getFormField: (value?: unknown, isEditMode?: boolean) => ReactNode

  writeFormValue: (
    formValues: FormValues,
    accData: Record<string, unknown>,
  ) => void

  compareTableValues: (a: unknown, b: unknown) => number

  applyTableFilter: (value: unknown, filterValue: unknown) => boolean

  getTableFilter: (
    filterValue: unknown,
    setFilterValue: (filterValue: unknown) => void,
  ) => ReactNode

  getTableCell: (value: unknown) => ReactNode

  getTableFooterCalcs?: () => Record<
    string,
    { label: string; getResult: (values: unknown[]) => unknown }
  >

  getReportTableFilter: (
    filterValue: unknown,
    refs?: LooseEntity[],
  ) => { label: string; values: (number | string)[] } | undefined

  getReportTableCell: (value: unknown) => ReactNode

  // getExcelTableCell: (item: E, selectedSearchMode?: string) => unknown

  // pieSectorConfig: {
  //   defaultMode: string
  //   modes: PieSectorModes
  // }
}
