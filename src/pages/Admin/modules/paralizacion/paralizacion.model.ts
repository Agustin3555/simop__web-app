import { TimestampedEntity, EntityRef } from '@/models/config'
import { TipoParalizacionModel } from '../tipoParalizacion'
import { AreaModel } from '../area'
import { ObraModel } from '../obra'

export interface OwnFields {
  numero: number
  numeroExpediente: string
  fechaReinicio: string
  nuevaFechaFinObra: string
  fecha: string
  observaciones: string
}

export interface RelationFields {
  area: AreaModel.Ref
  obra: ObraModel.Ref
  tipoParalizacion: TipoParalizacionModel.Ref
}

export interface Entity extends TimestampedEntity, OwnFields, RelationFields {}

export type CreateEntity = OwnFields &
  Record<'areaId' | 'obraId' | 'tipoParalizacionId ', number>

export type UpdateEntity = Partial<CreateEntity>

export type Ref = EntityRef<OwnFields, 'numero' | 'numeroExpediente'>
