export type TypeMeta = 'text' | 'number' | 'date' | 'dateTime' | 'option'

export interface Meta {
  type: TypeMeta
  ref?: {
    field: string
    provider: (id: number) => Promise<unknown>
  }
}
