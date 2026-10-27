import { EntityRef, TableEntity } from '@/infra/http/entity.types'
import { APGModel } from '@/modules/apg'
import { ProvinciaModel } from '@/modules/provincia'

export interface Entity extends TableEntity {
  nombre: string
  osmId: string
  provincia: ProvinciaModel.Ref
  apg: APGModel.Ref
}

export type Ref = EntityRef<Entity, 'nombre'>
