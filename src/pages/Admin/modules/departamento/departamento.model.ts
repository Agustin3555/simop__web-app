import { TimestampedEntity, EntityRef } from '@/models/config'
import { ProvinciaModel } from '../provincia'
import { APGModel } from '../apg'

export interface OwnFields {
  nombre: string
  osmId: string
}

export interface RelationFields {
  provincia: ProvinciaModel.Ref
  apg: APGModel.Ref
}

export interface Entity extends TimestampedEntity, OwnFields, RelationFields {}

export type CreateEntity = OwnFields & Record<'provinciaId' | 'apgId', number>

export type UpdateEntity = Partial<CreateEntity>

export type Ref = EntityRef<OwnFields, 'nombre'>
