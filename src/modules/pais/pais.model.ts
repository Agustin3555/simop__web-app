import { EntityRef, TableEntity } from '@/infra/http/entity.types'

export interface Entity extends TableEntity {
  nombre: string
}

export type Ref = EntityRef<Entity, 'nombre'>
