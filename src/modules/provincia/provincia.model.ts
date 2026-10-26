import { EntityRef, TableEntity } from '@/infra/http/entity.types'
import { PaisModel } from '../pais'

export interface Entity extends TableEntity {
  nombre: string
  pais: PaisModel.Ref
}

export type Ref = EntityRef<Entity, 'nombre'>
