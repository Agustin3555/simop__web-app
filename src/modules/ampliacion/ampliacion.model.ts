import { EntityRef, TableEntity } from '@/infra/http/entity.types'
import { AreaModel } from '@/modules/area'
import { ObraModel } from '@/modules/obra'

export interface Entity extends TableEntity {
  numero: number
  numeroResolucion: string
  numeroExpedienteSolicitud: string
  plazoMesesSolicitado: number
  plazoMesesOtorgado: number
  nuevaFechaFinObra: string
  fecha: string
  observaciones: string
  area: AreaModel.Ref
  obra: ObraModel.Ref
}

export type Ref = EntityRef<Entity, 'numero' | 'numeroResolucion'>
