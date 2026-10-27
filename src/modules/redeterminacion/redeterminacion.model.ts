import { EntityRef, TableEntity } from '@/infra/http/entity.types'
import { AreaModel } from '@/modules/area'
import { ObraModel } from '@/modules/obra'
import { TipoRedeterminacionModel } from '@/modules/tipoRedeterminacion'

export interface Entity extends TableEntity {
  numeroExpedienteSolicitud: string
  numeroExpediente: string
  numeroResolucion: string
  montoTotal: number
  nuevoMontoObra: number
  fechaRedeterminacion: string
  observaciones: string
  fechaCertificacion: string
  tieneHijas: boolean
  redeterminacionesHijas: Ref[]
  area: AreaModel.Ref
  obra: ObraModel.Ref
  tipoRedeterminacion: TipoRedeterminacionModel.Ref
}

export type Ref = EntityRef<Entity, 'numeroExpediente'>
