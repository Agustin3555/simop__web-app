export type EntityKey = string

export interface Identificable {
  id: number
}

export interface BaseEntity extends Identificable {
  creado: string
  modificado: string
}

export type BaseRef<T, K extends keyof T> = Identificable & Pick<T, K>

export type GeneralEntity = BaseEntity & Record<EntityKey, any>
