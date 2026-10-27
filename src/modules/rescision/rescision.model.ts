import { EntityRef, TableEntity } from '@/infra/http/entity.types'
import { AreaModel } from '@/modules/area'
import { ObraModel } from '@/modules/obra'
import { TipoRescisionModel } from '@/modules/tipoRescision'

export interface Entity extends TableEntity {
  numeroExpediente: string
  numeroResolucion: string
  fecha: string
  observaciones: string
  area: AreaModel.Ref
  obra: ObraModel.Ref
  tipoRescision: TipoRescisionModel.Ref
}

export type Ref = EntityRef<Entity, 'numeroExpediente'>
