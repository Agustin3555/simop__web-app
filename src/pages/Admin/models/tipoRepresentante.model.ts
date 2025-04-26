import { Scheme } from '../services/config'
import { TipoRepresentanteService } from '../services'
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

export type UpdateData = Partial<CreateData>

export type UpdateBody = Partial<CreateBody>

export const scheme: Scheme<Entity> = {
  key: 'tipoRepresentante',
  service: TipoRepresentanteService,
  title: {
    singular: 'Tipo de Representante',
    plural: 'Tipos de Representantes',
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
