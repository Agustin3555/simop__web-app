import { EmpresaModel, RepresentanteModel, TipoRepresentanteModel } from '.'
import { BooleanProp, RefProp, Scheme, DateProp } from '../services/config'
import { RepresentanteEmpresaService } from '../services'
import { COMMON_PROPS } from '../constants/commonProps.const'
import { BaseEntity, BaseRef } from '@/models/config'

export interface OwnFields {
  vigencia: boolean
  fecha: string
}

export interface RelationFields {
  empresa: EmpresaModel.Ref
  representante: RepresentanteModel.Ref
  tipoRepresentante: TipoRepresentanteModel.Ref
}

export interface Entity extends BaseEntity, OwnFields, RelationFields {}

export type CreateEntity = OwnFields &
  Record<'empresaId' | 'representanteId' | 'tipoRepresentanteId', number>

export type UpdateEntity = Partial<CreateEntity>

export type Ref = BaseRef<OwnFields, 'fecha'>

export const scheme: Scheme<Entity> = {
  key: 'representanteEmpresa',
  service: RepresentanteEmpresaService,
  refreshRate: 'low',
  title: {
    singular: 'Representante de Empresa',
    plural: 'Representantes de Empresa',
  },
  anchorField: 'id',

  groups: [
    {
      props: {
        empresa: new RefProp({
          getScheme: () => EmpresaModel.scheme,
        }),
        representante: new RefProp({
          getScheme: () => RepresentanteModel.scheme,
        }),
        tipoRepresentante: new RefProp({
          getScheme: () => TipoRepresentanteModel.scheme,
        }),
        vigencia: new BooleanProp('Vigencia', {
          falseText: 'No Vigente',
          trueText: 'Vigente',
        }),
        fecha: new DateProp('Fecha'),
        ...COMMON_PROPS,
      },
    },
  ],
}
