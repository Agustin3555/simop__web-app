import { TimestampedEntity, EntityRef } from '@/models/config'
import { PaisModel } from '../pais'

export interface OwnFields {
  nombre: string
}

export interface RelationFields {
  pais: PaisModel.Ref
}

export interface Entity extends TimestampedEntity, OwnFields, RelationFields {}

export type CreateEntity = OwnFields & Record<'paisId', number>

export type UpdateEntity = Partial<CreateEntity>

export type Ref = EntityRef<OwnFields, 'nombre'>
