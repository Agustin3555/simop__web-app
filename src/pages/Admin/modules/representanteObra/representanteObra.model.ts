import { TimestampedEntity, EntityRef } from '@/models/config'
import { TipoRepresentanteModel } from '../tipoRepresentante'
import { RepresentanteModel } from '../representante'
import { ObraModel } from '../obra'

export interface OwnFields {
  vigencia: boolean
  fecha: string
}

export interface RelationFields {
  obra: ObraModel.Ref
  representante: RepresentanteModel.Ref
  tipoRepresentante: TipoRepresentanteModel.Ref
}

export interface Entity extends TimestampedEntity, OwnFields, RelationFields {}

export type CreateEntity = OwnFields &
  Record<'obraId' | 'representanteId' | 'tipoRepresentanteId', number>

export type UpdateEntity = Partial<CreateEntity>

export type Ref = EntityRef<OwnFields, 'fecha'>
