import { Ref } from '@/types'

export interface Service<Entity = any, CreateData = any> {
  getAll: () => Promise<Entity[]>
  getForConnect: () => Promise<Ref[]>
  getOne: (id: number) => Promise<Entity>
  create?: (data: CreateData) => Promise<void>
}

export type GetAllProvider = Pick<Service, 'getAll'>
export type GetForConnectProvider = Pick<Service, 'getForConnect'>
export type GetOneProvider = Pick<Service, 'getOne'>
