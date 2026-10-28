import { buildPath } from '@/helpers'
import { LooseEntity } from './entity.types'

export type ServiceData = Record<string, unknown>

export type Service<E = LooseEntity> = {
  coll: ReturnType<typeof buildPath>

  getAll: (fields?: string[]) => Promise<E[]>

  getRefs: (ids?: number[]) => Promise<{ fields: string[]; rows: Partial<E>[] }>

  create: (data: ServiceData, fields?: string[]) => Promise<E>

  updateOne: (id: number, data: ServiceData, fields?: string[]) => Promise<E>

  updateMany?: (
    ids: number[],
    data: ServiceData,
    fields?: string[],
  ) => Promise<E>

  deleteMany: (ids: number[]) => Promise<void>
}
