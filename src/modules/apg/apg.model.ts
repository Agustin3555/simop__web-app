import { EntityRef, TableEntity } from '@/infra/http/entity.types'

export interface Entity extends TableEntity {
  numero: number
  color: string
}

export type Ref = EntityRef<Entity, 'numero'>
