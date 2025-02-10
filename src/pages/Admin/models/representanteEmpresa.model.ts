import { EmpresaModel, RepresentanteModel, TipoRepresentanteModel } from '.'
import { Ref } from '@/types'
import { BooleanProp, RefProp, Scheme } from '../services/config'
import { RepresentanteEmpresaService } from '../services'
import { COMMON_PROPS } from '../constants/commonProps.const'

export interface RawEntity {
  id: number
  vigencia: boolean

  empresa: EmpresaModel.RawRef
  representante: RepresentanteModel.RawRef
  tipoRepresentante: TipoRepresentanteModel.RawRef

  creado: string
  modificado: string
}

export interface Entity {
  id: number
  vigencia: boolean

  empresa: Ref
  representante: Ref
  tipoRepresentante: Ref

  creado: string
  modificado: string
}

export interface CreateData {
  vigencia: boolean

  empresaId: number
  representanteId: number
  tipoRepresentanteId: number
}

export interface CreateBody {
  vigencia: boolean

  empresaId: number
  representanteId: number
  tipoRepresentanteId: number
}

export const scheme: Scheme<Entity> = {
  key: 'representanteEmpresa',
  service: RepresentanteEmpresaService,
  refreshRate: 'low',
  title: {
    singular: 'Representante de Empresa',
    plural: 'Representantes de Empresa',
  },

  groups: [
    {
      props: {
        empresa: new RefProp('empresa', {
          getScheme: () => EmpresaModel.scheme,
        }),
        representante: new RefProp('representante', {
          getScheme: () => RepresentanteModel.scheme,
        }),
        tipoRepresentante: new RefProp('tipoRepresentante', {
          getScheme: () => TipoRepresentanteModel.scheme,
        }),
        vigencia: new BooleanProp('vigencia', 'Vigencia', {
          falseText: 'No Vigente',
          trueText: 'Vigente',
        }),
        ...COMMON_PROPS,
      },
    },
  ],
}
