export interface BaseEntity {
  id: number
}

export interface TimestampedEntity extends BaseEntity {
  creado: string
  modificado: string
}

export type LooseEntity = TimestampedEntity & Record<string, any>

export type EntityRef<T, K extends keyof T> = BaseEntity & Pick<T, K>
