import { EntityRef, TableEntity } from '@/infra/http/entity.types'
import { TipoNivelAreaModel } from '@/modules/tipoNivelArea'

export interface Entity extends TableEntity {
  nombre: string
  tipoNivelArea: TipoNivelAreaModel.Ref
  area: Ref
}

export type Ref = EntityRef<Entity, 'nombre'>
