import { TimestampedEntity, EntityRef } from '@/models/config'
import { DepartamentoModel } from '../departamento'

export interface OwnFields {
  nombre: string
  osmId: string
}

export interface RelationFields {
  departamento: DepartamentoModel.Ref
}

export interface Entity extends TimestampedEntity, OwnFields, RelationFields {}

export type CreateEntity = OwnFields & Record<'departamentoId', number>

export type UpdateEntity = Partial<CreateEntity>

export type Ref = EntityRef<OwnFields, 'nombre'>
