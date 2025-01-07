import { EmpresaModel, RepresentanteModel, TipoRepresentanteModel } from '.'
import { Ref } from '@/types'
import { RefProp, Scheme } from '../services/config'
import { RepresentanteEmpresaService } from '../services'
import { COMMON_PROPS } from '../constants/commonProps.const'

export interface RawEntity {
  id: number

  empresa: EmpresaModel.RawRef
  representante: RepresentanteModel.RawRef
  tipoRepresentante: TipoRepresentanteModel.RawRef

  creado: string
  modificado: string
}

export interface Entity {
  id: number

  empresa: Ref
  representante: Ref
  tipoRepresentante: Ref

  creado: string
  modificado: string
}

export interface CreateData {
  empresaId: number
  representanteId: number
  tipoRepresentanteId: number
}

export interface CreateBody {
  empresaId: number
  representanteId: number
  tipoRepresentanteId: number
}

export const scheme: Scheme<Entity> = {
  key: 'representanteEmpresa',
  service: RepresentanteEmpresaService,
  title: {
    singular: 'Representante de Empresa',
    plural: 'Representantes de Empresa',
  },

  groups: [
    {
      props: {
        ...COMMON_PROPS,
        empresa: new RefProp('empresa', {
          getScheme: () => EmpresaModel.scheme,
        }),
        representante: new RefProp('representante', {
          getScheme: () => RepresentanteModel.scheme,
        }),
        tipoRepresentante: new RefProp('tipoRepresentante', {
          getScheme: () => TipoRepresentanteModel.scheme,
        }),
      },
    },
  ],
}
