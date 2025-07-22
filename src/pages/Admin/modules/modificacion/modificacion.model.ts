import { TimestampedEntity, EntityRef } from '@/models/config'
import { TipoModificacionModel } from '../tipoModificacion'
import { AreaModel } from '../area'
import { ObraModel } from '../obra'

export interface OwnFields {
  numeroExpediente: string
  numeroResolucion: string
  monto: number
  nuevoMontoObra: number
  fecha: string
  observaciones: string
}

export interface RelationFields {
  area: AreaModel.Ref
  obra: ObraModel.Ref
  tipoModificacion: TipoModificacionModel.Ref
}

export interface Entity extends TimestampedEntity, OwnFields, RelationFields {}

export type CreateEntity = OwnFields &
  Record<'areaId' | 'obraId' | 'tipoModificacionId', number>

export type UpdateEntity = Partial<CreateEntity>

export type Ref = EntityRef<OwnFields, 'numeroExpediente'>
