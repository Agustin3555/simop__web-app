import { BaseEntity, BaseRef } from '@/models/config'
import { SubsecretariaModel } from '../subsecretaria'

export interface OwnFields {
  nombre: string
}

export interface RelationFields {
  subSecretaria: SubsecretariaModel.Ref
}

export interface Entity extends BaseEntity, OwnFields, RelationFields {}

export type CreateEntity = OwnFields & Record<'subsecretariaId', number>

export type UpdateEntity = Partial<CreateEntity>

export type Ref = BaseRef<OwnFields, 'nombre'>
