export interface BaseEntity {
  id: number
}

export interface TableEntity extends BaseEntity {
  creado: string
  modificado: string
}

export type LooseEntity = TableEntity & Record<string, any>

export type EntityRef<T, K extends keyof T> = BaseEntity & Pick<T, K>
