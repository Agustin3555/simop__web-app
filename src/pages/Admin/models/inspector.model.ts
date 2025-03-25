import { TipoProfesionModel } from '.'
import { NumberProp, RefListProp, Scheme, TextProp } from '../services/config'
import { InspectorService } from '../services'
import { COMMON_PROPS } from '../constants/commonProps.const'

export interface RawEntity {
  id: number

  cuil: number
  apellido: string
  nombre?: string

  profesiones: TipoProfesionModel.RawRef[]

  creado: string
  modificado: string
}

export interface Entity {
  id: number

  cuil: number
  apellido: string
  nombre: string

  profesiones: TipoProfesionModel.Ref[]

  creado: string
  modificado: string
}

export interface RawRef {
  id: number

  cuil: number
  apellido: string
}

export interface Ref {
  id: number

  cuil: number
  apellido: string
}

export interface CreateData {
  cuil: number
  apellido: string
  nombre?: string

  profesiones?: number[]
}

export interface CreateBody {
  cuil: number
  apellido: string
  nombre?: string

  profesiones?: number[]
}

export interface UpdateData {
  cuil?: number
  apellido?: string
  nombre?: string

  profesiones?: number[]
}

export interface UpdateBody {
  cuil?: number
  apellido?: string
  nombre?: string

  profesiones?: number[]
}

export const scheme: Scheme<Entity> = {
  key: 'inspector',
  service: InspectorService,
  refreshRate: 'low',
  title: {
    singular: 'Inspector',
    plural: 'Inspectores',
  },
  anchorField: 'apellido',

  groups: [
    {
      props: {
        cuil: new NumberProp('CUIL', {
          big: true,
          field: {
            required: true,
          },
        }),
        apellido: new TextProp('Apellido', {
          field: {
            required: true,
          },
        }),
        nombre: new TextProp('Nombre'),
        profesiones: new RefListProp({
          getScheme: () => TipoProfesionModel.scheme,
        }),
        ...COMMON_PROPS,
      },
    },
  ],
}
