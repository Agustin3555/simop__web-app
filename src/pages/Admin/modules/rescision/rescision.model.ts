import { BaseEntity, BaseRef } from '@/models/config'
import { TipoRescisionModel } from '../tipoRescision'
import { AreaModel } from '../area'
import { ObraModel } from '../obra'

export interface OwnFields {
  numeroExpediente: string
  numeroResolucion: string
  fecha: string
  observaciones: string
}

export interface RelationFields {
  area: AreaModel.Ref
  obra: ObraModel.Ref
  tipoRescision: TipoRescisionModel.Ref
}

export interface Entity extends BaseEntity, OwnFields, RelationFields {}

export type CreateEntity = OwnFields &
  Record<'areaId' | 'obraId' | ' tipoRescisionId', number>

export type UpdateEntity = Partial<CreateEntity>

export type Ref = BaseRef<OwnFields, 'numeroExpediente'>
