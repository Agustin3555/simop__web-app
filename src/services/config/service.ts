import { Ref } from '@/types'

export interface Service {
  getAll: () => Promise<any[]>
  getForConnect: () => Promise<Ref[]>
  getOne: (id: number) => Promise<any>
  create?: (data: any) => Promise<void>
}
