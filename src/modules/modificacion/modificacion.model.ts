import { EntityRef, TableEntity } from '@/infra/http/entity.types'
import { AreaModel } from '@/modules/area'
import { ObraModel } from '@/modules/obra'
import { TipoModificacionModel } from '@/modules/tipoModificacion'

export interface Entity extends TableEntity {
  numeroExpediente: string
  numeroResolucion: string
  monto: number
  nuevoMontoObra: number
  fecha: string
  observaciones: string
  area: AreaModel.Ref
  obra: ObraModel.Ref
  tipoModificacion: TipoModificacionModel.Ref
}

export type Ref = EntityRef<Entity, 'numeroExpediente'>
