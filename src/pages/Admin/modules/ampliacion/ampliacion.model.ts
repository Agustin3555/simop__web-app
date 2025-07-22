import { TimestampedEntity, EntityRef } from '@/models/config'
import { AreaModel } from '../area'
import { ObraModel } from '../obra'

export interface OwnFields {
  numero: number
  numeroResolucion: string
  numeroExpedienteSolicitud: string
  plazoMesesSolicitado: number
  plazoMesesOtorgado: number
  nuevaFechaFinObra: string
  fecha: string
  observaciones: string
}

interface RelationFields {
  area: AreaModel.Ref
  obra: ObraModel.Ref
}

export interface Entity extends TimestampedEntity, OwnFields, RelationFields {}

export type CreateEntity = OwnFields & Record<'areaId' | 'obraId', number>

export type UpdateEntity = Partial<CreateEntity>

export type Ref = EntityRef<OwnFields, 'numero' | 'numeroResolucion'>
