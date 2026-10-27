import { EntityRef, TableEntity } from '@/infra/http/entity.types'
import { AreaModel } from '@/modules/area'
import { ObraModel } from '@/modules/obra'
import { TipoRecepcionModel } from '@/modules/tipoRecepcion'

export interface Entity extends TableEntity {
  numeroActa: number
  fecha: string
  observaciones: string
  area: AreaModel.Ref
  obra: ObraModel.Ref
  tipoRecepcion: TipoRecepcionModel.Ref
}

export type Ref = EntityRef<Entity, 'numeroActa'>
