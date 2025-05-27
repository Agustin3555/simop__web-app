import { BaseEntity, BaseRef } from '@/models/config'
import { DireccionModel } from '../direccion'

export interface OwnFields {
  nombre: string
}

export interface RelationFields {
  direccion: DireccionModel.Ref
}

export interface RawRef {
  nombre: string
}

export interface Entity extends BaseEntity, OwnFields, RelationFields {}

export type CreateEntity = OwnFields & Record<'direccionId', number>

export type UpdateEntity = Partial<CreateEntity>

export type Ref = BaseRef<OwnFields, 'nombre'>
