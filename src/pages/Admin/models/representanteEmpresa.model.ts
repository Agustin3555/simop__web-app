import { EmpresaModel, RepresentanteModel, TipoRepresentanteModel } from '.'
import { BooleanProp, RefProp, Scheme, DateProp } from '../services/config'
import { RepresentanteEmpresaService } from '../services'
import { COMMON_PROPS } from '../constants/commonProps.const'

export interface RawEntity {
  id: number
  vigencia: boolean
  fecha?: string

  empresa?: EmpresaModel.RawRef
  representante?: RepresentanteModel.RawRef
  tipoRepresentante?: TipoRepresentanteModel.RawRef

  creado: string
  modificado: string
}

export interface Entity {
  id: number
  vigencia: boolean
  fecha?: string

  empresa?: EmpresaModel.Ref
  representante?: RepresentanteModel.Ref
  tipoRepresentante?: TipoRepresentanteModel.Ref

  creado: string
  modificado: string
}

export interface RawRef {
  id: number
}

export interface Ref {
  id: number
}

export interface CreateData {
  vigencia: boolean
  fecha: string

  empresaId: number
  representanteId: number
  tipoRepresentanteId: number
}

export interface CreateBody {
  vigencia: boolean
  fecha: string

  empresaId: number
  representanteId: number
  tipoRepresentanteId: number
}

export type UpdateData = Partial<CreateData>

export type UpdateBody = Partial<CreateBody>

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
