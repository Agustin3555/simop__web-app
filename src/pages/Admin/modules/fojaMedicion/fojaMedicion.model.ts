import { TimestampedEntity, EntityRef } from '@/models/config'
import { AreaModel } from '../area'
import { InspectorModel } from '../inspector'
import { ObraModel } from '../obra'

export interface OwnFields {
  numero: number
  numeroExpediente: string
  avance: number
  fechaFoja: string
  observaciones: string
  fechaCertificacion: string
  montoTotal: number
}

export interface RelationFields {
  area: AreaModel.Ref
  obra: ObraModel.Ref
  inspector: InspectorModel.Ref
}

export interface Entity extends TimestampedEntity, OwnFields, RelationFields {}

export type CreateEntity = OwnFields &
  Record<'areaId' | 'obraId' | 'inspectorId', number>

export type UpdateEntity = Partial<CreateEntity>

export type Ref = EntityRef<OwnFields, 'numero' | 'numeroExpediente'>
