import { TimestampedEntity, EntityRef } from '@/models/config'
import { TipoNivelAreaModel } from '../tipoNivelArea'

export interface OwnFields {
  nombre: string
}

export interface RelationFields {
  tipoNivelArea: TipoNivelAreaModel.Ref
  area: Ref
}

export interface Entity extends TimestampedEntity, OwnFields, RelationFields {}

export type CreateEntity = OwnFields & Record<'areaId', number>

export type UpdateEntity = Partial<CreateEntity>

export type Ref = EntityRef<OwnFields, 'nombre'>
