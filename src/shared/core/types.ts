import { ReactNode } from 'react'
import { TextColumn } from './columns/text'
import { NumberColumn } from './columns/number'
import { BooleanColumn } from './columns/boolean'
import { DatetimeColumn } from './columns/datetime'
import { RefColumn } from './columns/ref'
import { Service } from '@/services/config'

export interface TableDef<C extends readonly ColumnDef[]> {
  key: string
  title: {
    singular: string
    plural: string
  }
  classIcon?: string

  columns: C
  anchorColumnKey: C[number]['key']
  mutationColumnGroups: {
    title?: string
    columnKeys: C[number]['key'][]
  }[]

  services: Service
}

export const createTableDef = <const C extends readonly ColumnDef[]>(
  table: TableDef<C>,
): TableDef<C> => table

// USO SOLO CON LA INTERFAZ:
// const columns = [
//   { type: 'number', key: 'id', title: 'ID' },
//   { type: 'text', key: 'name', title: 'Nombre' },
// ] as const satisfies readonly ColumnDef[]
// const table: TableDef<typeof columns> = {
//   columns,
//   anchorColumnKey: 'id', // Solo acepta 'id' o 'name'
// }

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
  isRequired?: boolean
}

export interface Column {
  key: string
  title: string
}

export type ColumnDef =
  | BooleanColumn
  | TextColumn
  | NumberColumn
  | DatetimeColumn
  | RefColumn

export type ColumnBehavior = {
  def: Required<ColumnDef>

  compareTableValues: (a: unknown, b: unknown) => number

  applyTableFilter: (value: unknown, filterValue: unknown) => boolean

  getTableFilter: (
    filterValue: unknown,
    setFilterValue: (filterValue: unknown) => void,
  ) => ReactNode

  getTableCell: (value: unknown) => ReactNode

  getTableColumnCalcs?: (
    values: unknown[],
  ) => { value: string; label: string; result: () => unknown }[]

  // getFormFieldValue: (
  //   formData: FormData,
  //   form: HTMLFormElement,
  //   isEditMode?: boolean,
  // ) => undefined | unknown

  // getTableCell: (item: E, selectedSearchMode?: string) => ReactNode

  // getReportTableFilter: (
  //   column: Column<E>,
  //   data: E[],
  //   selectedSearchMode?: string,
  // ) => undefined | FilterProp

  // getReportTableCell: (item: E, selectedSearchMode?: string) => ReactNode

  // getExcelTableCell: (item: E, selectedSearchMode?: string) => unknown

  // pieSectorConfig: {
  //   defaultMode: string
  //   modes: PieSectorModes
  // }
}
