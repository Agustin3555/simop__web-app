import { TimestampedEntity, EntityRef } from '@/models/config'
import { TipoProfesionModel } from '../tipoProfesion'

export interface OwnFields {
  cuil: number
  apellido: string
  nombre: string
}

interface RelationFields {
  profesiones: TipoProfesionModel.Ref[]
}

export interface Entity extends TimestampedEntity, OwnFields, RelationFields {}

export type CreateEntity = OwnFields & { profesiones: number[] }

export type UpdateEntity = Partial<CreateEntity>

export type Ref = EntityRef<OwnFields, 'cuil' | 'apellido' | 'nombre'>
