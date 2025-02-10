import { TipoProfesionModel } from '.'
import { Ref } from '@/types'
import { NumberProp, RefListProp, Scheme, TextProp } from '../services/config'
import { InspectorService } from '../services'
import { COMMON_PROPS } from '../constants/commonProps.const'

export interface RawEntity {
  id: number
  cuil: number
  apellido: string
  nombre: string

  profesiones: TipoProfesionModel.RawRef[]

  creado: string
  modificado: string
}

export interface Entity {
  id: number
  cuil: number
  apellido: string
  nombre: string

  profesiones: Ref[]

  creado: string
  modificado: string
}

export interface RawRef {
  id: number
  apellido: string
}

export interface CreateData {
  cuil: number
  apellido: string
  nombre: string

  profesiones?: number[]
}

export interface CreateBody {
  cuil: number
  apellido: string
  nombre: string

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
  refAnchorField: 'Apellido',

  groups: [
    {
      props: {
        cuil: new NumberProp('cuil', 'CUIL', {
          big: true,
        }),
        apellido: new TextProp('apellido', 'Apellido', {
          field: {
            required: true,
          },
        }),
        nombre: new TextProp('nombre', 'Nombre'),
        profesiones: new RefListProp('profesiones', {
          getScheme: () => TipoProfesionModel.scheme,
        }),
        ...COMMON_PROPS,
      },
    },
  ],
}
