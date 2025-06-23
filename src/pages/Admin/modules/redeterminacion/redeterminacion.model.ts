import { BaseEntity, BaseRef } from '@/models/config'
import { AreaModel } from '../area'
import { TipoRedeterminacionModel } from '../tipoRedeterminacion'
import { ObraModel } from '../obra'

export interface OwnFields {
  numeroExpedienteSolicitud: string
  numeroExpediente: string
  numeroResolucion: string
  montoTotal: number
  nuevoMontoObra: number
  fechaRedeterminacion: string
  observaciones: string
  fechaCertificacion: string
  tieneHijas: boolean
}

export interface RelationFields {
  redeterminacionesHijas: Ref[]
  area: AreaModel.Ref
  obra: ObraModel.Ref
  tipoRedeterminacion: TipoRedeterminacionModel.Ref
}

export interface Entity extends BaseEntity, OwnFields, RelationFields {}

export type CreateEntity = OwnFields & {
  redeterminacionesHijas: number[]
} & Record<'areaId' | 'obraId' | 'tipoRedeterminacionId', number>

export type UpdateEntity = Partial<CreateEntity>

export type Ref = BaseRef<OwnFields, 'numeroExpediente'>
