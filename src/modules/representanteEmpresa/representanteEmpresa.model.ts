import { EntityRef, TableEntity } from '@/infra/http/entity.types'
import { EmpresaModel } from '@/modules/empresa'
import { RepresentanteModel } from '@/modules/representante'
import { TipoRepresentanteModel } from '@/modules/tipoRepresentante'

export interface Entity extends TableEntity {
  fecha: string
  empresa: EmpresaModel.Ref
  representante: RepresentanteModel.Ref
  tipoRepresentante: TipoRepresentanteModel.Ref
}

export type Ref = EntityRef<Entity, 'fecha'>
