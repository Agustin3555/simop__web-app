import { GeneralEntity } from '@/models/config'

export type Service<E = GeneralEntity> = Record<string, any> & {
  getAll: () => Promise<E[]>
  getRefs?: () => Promise<Partial<E>[]>
  getOne: (id: number) => Promise<E>
  create?: (data: any) => Promise<void>
  updateOne?: (id: number, data: any) => Promise<void>
  deleteMany: (ids: number[]) => Promise<void>
}

export type GetOneProvider = Pick<Service, 'getOne'>
