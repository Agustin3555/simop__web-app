import { LooseEntity } from '@/models/config'

export enum Method {
  GetAll,
  GetOne,
  Create,
  UpdateOne,
}

export type Service<E = LooseEntity> = {
  getAll: () => Promise<E[]>
  getRefs?: () => Promise<Partial<E>[]>
  getOne: (id: number) => Promise<E>
  create?: (data: any) => Promise<E>
  updateOne?: (id: number, data: any) => Promise<E>
  updateMany?: (ids: number[], data: any) => Promise<E>
  deleteMany: (ids: number[]) => Promise<void>
  [key: string]: any
}

export type GetOneProvider = Pick<Service, 'getOne'>
