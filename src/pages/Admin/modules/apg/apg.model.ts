import { BaseEntity, BaseRef } from '@/models/config'

export interface OwnFields {
  numero: number
  color: string
}

export interface RelationFields {}

export interface Entity extends BaseEntity, OwnFields, RelationFields {}

export type CreateEntity = OwnFields

export type UpdateEntity = Partial<CreateEntity>

export type Ref = BaseRef<OwnFields, 'numero'>
