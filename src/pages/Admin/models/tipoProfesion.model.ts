import { Scheme } from '../services/config'
import { TipoProfesionService } from '../services'
import { TIPO_PROPS } from '../constants/commonProps.const'

export interface RawEntity {
  id: number

  nombre: string

  creado: string
  modificado: string
}

export interface Entity {
  id: number

  nombre: string

  creado: string
  modificado: string
}

export interface RawRef {
  id: number

  nombre: string
}

export interface Ref {
  id: number

  nombre: string
}

export interface CreateData {
  nombre: string
}

export interface CreateBody {
  nombre: string
}

export interface UpdateData {
  nombre?: string
}

export interface UpdateBody {
  nombre?: string
}

export const scheme: Scheme<Entity> = {
  key: 'tipoProfesion',
  service: TipoProfesionService,
  title: {
    singular: 'Tipo de Profesión',
    plural: 'Tipos de Profesiones',
  },
  anchorField: 'nombre',

  groups: [
    {
      props: {
        ...TIPO_PROPS,
      },
    },
  ],
}
