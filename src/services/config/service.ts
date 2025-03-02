export type EntityKey = string

export interface Ref {
  id: number
}

interface BaseEntity extends Ref {
  creado: string
  modificado: string
}

export type Entity = BaseEntity & Record<EntityKey, any>

export interface Service<T = Entity> {
  getAll: () => Promise<T[]>
  getForConnect?: () => Promise<Partial<T>[]>
  getOne: (id: number) => Promise<T>
  create?: (data: any) => Promise<void>
  updateOne?: (id: number, data: any) => Promise<void>
  deleteMany: (ids: number[]) => Promise<void>
}

export type GetOneProvider = Pick<Service, 'getOne'>
