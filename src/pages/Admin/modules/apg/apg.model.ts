import { TimestampedEntity, EntityRef } from '@/models/config'

export interface OwnFields {
  numero: number
  color: string
}

export interface RelationFields {}

export interface Entity extends TimestampedEntity, OwnFields, RelationFields {}

export type CreateEntity = OwnFields

export type UpdateEntity = Partial<CreateEntity>

export type Ref = EntityRef<OwnFields, 'numero'>
