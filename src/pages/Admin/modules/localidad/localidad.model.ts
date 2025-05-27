import { BaseEntity, BaseRef } from '@/models/config'
import { ProvinciaModel } from '../provincia'

export interface OwnFields {
  nombre: string
}

export interface RelationFields {
  provincia: ProvinciaModel.Ref
}

export interface Entity extends BaseEntity, OwnFields, RelationFields {}

export type CreateEntity = OwnFields & Record<'provinciaId', number>

export type UpdateEntity = Partial<CreateEntity>

export type Ref = BaseRef<OwnFields, 'nombre'>
