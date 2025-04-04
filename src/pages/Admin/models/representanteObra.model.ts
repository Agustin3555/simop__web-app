import { ObraModel, RepresentanteModel, TipoRepresentanteModel } from '.'
import { BooleanProp, RefProp, Scheme, DateProp } from '../services/config'
import { RepresentanteObraService } from '../services'
import { COMMON_PROPS } from '../constants/commonProps.const'

export interface RawEntity {
  id: number
  vigencia: boolean
  fecha?: string

  obra?: ObraModel.RawRef
  representante?: RepresentanteModel.RawRef
  tipoRepresentante?: TipoRepresentanteModel.RawRef

  creado: string
  modificado: string
}

export interface Entity {
  id: number
  vigencia: boolean
  fecha?: string

  obra?: ObraModel.Ref
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
  fecha?: string

  obraId: number
  representanteId: number
  tipoRepresentanteId: number
}

export interface CreateBody {
  vigencia: boolean
  fecha?: string

  obraId: number
  representanteId: number
  tipoRepresentanteId: number
}

export interface UpdateData {
  vigencia?: boolean
  fecha?: string

  obraId?: number
  representanteId?: number
  tipoRepresentanteId?: number
}

export interface UpdateBody {
  vigencia?: boolean
  fecha?: string

  obraId?: number
  representanteId?: number
  tipoRepresentanteId?: number
}

export const scheme: Scheme<Entity> = {
  key: 'representanteObra',
  service: RepresentanteObraService,
  refreshRate: 'low',
  title: {
    singular: 'Representante de Obra',
    plural: 'Representantes de Obra',
  },
  anchorField: 'id',

  groups: [
    {
      props: {
        obra: new RefProp({
          getScheme: () => ObraModel.scheme,
          field: {
            required: true,
          },
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
