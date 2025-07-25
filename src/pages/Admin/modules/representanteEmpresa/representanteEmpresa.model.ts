import { TimestampedEntity, EntityRef } from '@/models/config'
import { EmpresaModel } from '../empresa'
import { RepresentanteModel } from '../representante'
import { TipoRepresentanteModel } from '../tipoRepresentante'

export interface OwnFields {
  vigencia: boolean
  fecha: string
}

export interface RelationFields {
  empresa: EmpresaModel.Ref
  representante: RepresentanteModel.Ref
  tipoRepresentante: TipoRepresentanteModel.Ref
}

export interface Entity extends TimestampedEntity, OwnFields, RelationFields {}

export type CreateEntity = OwnFields &
  Record<'empresaId' | 'representanteId' | 'tipoRepresentanteId', number>

export type UpdateEntity = Partial<CreateEntity>

export type Ref = EntityRef<OwnFields, 'fecha'>
