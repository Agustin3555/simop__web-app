import { Ref } from '@/types'

export type EntityKey = string
export type EntityValue = undefined | string | number | boolean | Ref | Ref[]

export type Entity = Record<EntityKey, EntityValue> & { id: number }

export interface Service<T = unknown> {
  getAll: () => Promise<T[]>
  getForConnect?: () => Promise<Ref[]>
  getOne: (id: number) => Promise<T>
  create?: (data: any) => Promise<void>
}

export type GetAllProvider = Pick<Service, 'getAll'>
export type GetForConnectProvider = Pick<Service, 'getForConnect'>
export type GetOneProvider = Pick<Service, 'getOne'>