import { Scheme } from '../services/config'
import { TipoFinanciamientoObraService } from '../services'
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

export interface CreateData {
  nombre: string
}

export interface CreateBody {
  nombre: string
}

export const scheme: Scheme<Entity> = {
  key: 'tipoFinanciamientoObra',
  service: TipoFinanciamientoObraService,
  title: {
    singular: 'Tipo de Financiamiento de Obra',
    plural: 'Tipos de Financiamientos de Obra',
  },

  groups: [
    {
      props: {
        ...TIPO_PROPS,
      },
    },
  ],
}
