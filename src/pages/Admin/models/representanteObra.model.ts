import { ObraModel, RepresentanteModel, TipoRepresentanteModel } from '.'
import { Ref } from '@/types'
import { RefProp, Scheme } from '../services/config'
import { RepresentanteObraService } from '../services'
import { COMMON_PROPS } from '../constants/commonProps.const'

export interface RawEntity {
  id: number

  obra: ObraModel.RawRef
  representante: RepresentanteModel.RawRef
  tipoRepresentante: TipoRepresentanteModel.RawRef

  creado: string
  modificado: string
}

export interface Entity {
  id: number

  obra: Ref
  representante: Ref
  tipoRepresentante: Ref

  creado: string
  modificado: string
}

export interface CreateData {
  obraId: number
  representanteId: number
  tipoRepresentanteId: number
}

export interface CreateBody {
  obraId: number
  representanteId: number
  tipoRepresentanteId: number
}

export const scheme: Scheme<Entity> = {
  key: 'representanteObra',
  service: RepresentanteObraService,
  title: {
    singular: 'Representante de Obra',
    plural: 'Representantes de Obra',
  },

  groups: [
    {
      props: {
        ...COMMON_PROPS,
        obra: new RefProp('obra', {
          getScheme: () => ObraModel.scheme,
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
