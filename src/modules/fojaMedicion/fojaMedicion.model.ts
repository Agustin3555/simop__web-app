import { EntityRef, TableEntity } from '@/infra/http/entity.types'
import { AreaModel } from '@/modules/area'
import { InspectorModel } from '@/modules/inspector'
import { ObraModel } from '@/modules/obra'

export interface Entity extends TableEntity {
  numero: number
  numeroExpediente: string
  avance: number
  fechaFoja: string
  observaciones: string
  fechaCertificacion: string
  montoTotal: number
  area: AreaModel.Ref
  obra: ObraModel.Ref
  inspector: InspectorModel.Ref
}

export type Ref = EntityRef<Entity, 'numero' | 'numeroExpediente'>
