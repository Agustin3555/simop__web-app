import { TipoProfesionModel } from '.'
import { Ref } from '@/types'
import { NumberProp, Scheme, TextProp } from '../services/config'
import { InspectorService } from '../services'
import { COMMON_PROPS } from '../constants/commonProps.const'

export interface RawEntity {
  id: number
  cuil: number
  apellido: string
  nombre: string

  tiposProfesiones: TipoProfesionModel.RawRef[]

  creado: string
  modificado: string
}

export interface Entity {
  id: number
  cuil: number
  apellido: string
  nombre: string

  tiposProfesiones: Ref[]

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

  tiposProfesiones?: number[]
}

export interface CreateBody {
  cuil: number
  apellido: string
  nombre: string

  tiposProfesiones?: number[]
}

export const scheme: Scheme<Entity> = {
  key: 'inspector',
  service: InspectorService,
  title: {
    singular: 'Inspector',
    plural: 'Inspectores',
  },

  groups: [
    {
      props: {
        ...COMMON_PROPS,
        cuil: new NumberProp('cuil', 'CUIL', {
          field: {
            required: true,
          },
        }),
        nombre: new TextProp('nombre', 'Nombre', {
          field: {
            required: true,
          },
        }),
        apellido: new TextProp('apellido', 'Apellido', {
          field: {
            required: true,
          },
        }),
      },
    },
  ],
}
