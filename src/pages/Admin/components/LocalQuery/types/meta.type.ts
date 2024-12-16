import { GetOneProvider } from '@/types'

export type TypeMeta =
  | 'text'
  | 'number'
  | 'date'
  | 'dateTime'
  | 'boolean'
  | 'option'

export interface Meta {
  type: TypeMeta
  ref?: { field: string } & GetOneProvider<any>
}
