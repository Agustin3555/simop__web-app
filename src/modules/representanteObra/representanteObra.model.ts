import { EntityRef, TableEntity } from '@/infra/http/entity.types'
import { ObraModel } from '@/modules/obra'
import { RepresentanteModel } from '@/modules/representante'
import { TipoRepresentanteModel } from '@/modules/tipoRepresentante'

export interface Entity extends TableEntity {
  fecha: string
  obra: ObraModel.Ref
  representante: RepresentanteModel.Ref
  tipoRepresentante: TipoRepresentanteModel.Ref
}

export type Ref = EntityRef<Entity, 'fecha'>
