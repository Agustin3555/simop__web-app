import { DireccionModel } from '.'
import { RefProp, Scheme, TextProp } from '../services/config'
import { DepartamentoService } from '../services'
import { COMMON_PROPS } from '../constants/commonProps.const'

export interface RawEntity {
  id: number
  nombre: string

  direccion?: DireccionModel.RawRef

  creado: string
  modificado: string
}

export interface Entity {
  id: number
  nombre: string

  direccion?: DireccionModel.Ref

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

  direccionId: number
}

export interface CreateBody {
  nombre: string

  direccionId: number
}

export type UpdateData = Partial<CreateData>

export type UpdateBody = Partial<CreateBody>

export const scheme: Scheme<Entity> = {
  key: 'departamento',
  service: DepartamentoService,
  title: {
    singular: 'Departamento',
    plural: 'Departamentos',
  },
  anchorField: 'nombre',

  groups: [
    {
      props: {
        nombre: new TextProp('Nombre', {
          field: {
            required: true,
          },
        }),
        direccion: new RefProp({
          getScheme: () => DireccionModel.scheme,
          field: {
            required: true,
          },
        }),
        ...COMMON_PROPS,
      },
    },
  ],
}
