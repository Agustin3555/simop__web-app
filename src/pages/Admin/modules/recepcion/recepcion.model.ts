import { TimestampedEntity, EntityRef } from '@/models/config'
import { AreaModel } from '../area'
import { TipoRecepcionModel } from '../tipoRecepcion'
import { ObraModel } from '../obra'

export interface OwnFields {
  numeroActa: number
  fecha: string
  observaciones: string
}

export interface RelationFields {
  area: AreaModel.Ref
  obra: ObraModel.Ref
  tipoRecepcion: TipoRecepcionModel.Ref
}

export interface Entity extends TimestampedEntity, OwnFields, RelationFields {}

export type CreateEntity = OwnFields &
  Record<'areaId' | 'obraId' | ' tipoRecepcionId', number>

export type UpdateEntity = Partial<CreateEntity>

export type Ref = EntityRef<OwnFields, 'numeroActa'>
