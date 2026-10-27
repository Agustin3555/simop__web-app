import { EntityRef, TableEntity } from '@/infra/http/entity.types'
import { DepartamentoModel } from '@/modules/departamento'

export interface Entity extends TableEntity {
  nombre: string
  osmId: string
  departamento: DepartamentoModel.Ref
}

export type Ref = EntityRef<Entity, 'nombre'>
