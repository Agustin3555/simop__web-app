import { Scheme } from '../services/config'
import { TipoTematicaObraService } from '../services'
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

export const scheme: Scheme<Entity> = {
  key: 'tipoTematicaObra',
  service: TipoTematicaObraService,
  title: {
    singular: 'Tipo de Temática de Obra',
    plural: 'Tipos de Temáticas de Obra',
  },
  refAnchorField: 'Nombre',

  groups: [
    {
      props: {
        ...TIPO_PROPS,
      },
    },
  ],
}
