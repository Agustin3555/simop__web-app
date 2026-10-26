import { createContext } from 'react'
import { ColumnBehavior, ColumnDef, TableDef } from '@/shared/core/types'

export const TableDefContext = createContext<
  | { tableDef: TableDef<readonly ColumnDef[]>; columns: ColumnBehavior[] }
  | undefined
>(undefined)
