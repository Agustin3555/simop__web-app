import { PaisModel, ProvinciaModel, LocalidadModel } from '.'
import { Ref } from '@/types'
import {
  BooleanProp,
  NumberProp,
  RefProp,
  Scheme,
  TextProp,
} from '../services/config'
import { RepresentanteService } from '../services'
import { COMMON_PROPS } from '../constants'

export interface RawEntity {
  id: number
  cuil: number
  apellido: string
  nombre: string
  direccion: string
  numeroMatricula: string
  vigencia: boolean

  pais?: PaisModel.RawRef
  provincia?: ProvinciaModel.RawRef
  localidad?: LocalidadModel.RawRef

  creado: string
  modificado: string
}

export interface Entity {
  id: number
  cuil: number
  apellido: string
  nombre: string
  direccion: string
  numeroMatricula: string
  vigencia: boolean

  pais?: Ref
  provincia?: Ref
  localidad?: Ref

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
  direccion: string
  numeroMatricula: string
  vigencia: boolean

  paisId: number
  provinciaId: number
  localidadId: number
}

export interface CreateBody {
  cuil: number
  apellido: string
  nombre: string
  direccion: string
  numeroMatricula: string
  vigencia: boolean

  paisId: number
  provinciaId: number
  localidadId: number
}

export const scheme: Scheme<Entity> = {
  key: 'representante',
  service: RepresentanteService,
  title: {
    singular: 'Representante',
    plural: 'Representantes',
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
        apellido: new TextProp('apellido', 'Apellido', {
          field: {
            required: true,
          },
        }),
        nombre: new TextProp('nombre', 'Nombre', {
          field: {
            required: true,
          },
        }),
        direccion: new TextProp('direccion', 'Apellido', {
          field: {
            required: true,
          },
        }),
        numeroMatricula: new NumberProp(
          'numeroMatricula',
          'Número de Matricula',
          {
            field: {
              required: true,
            },
          },
        ),
        vigencia: new BooleanProp('vigencia', 'Vigencia', {
          falseText: 'No Vigente',
          trueText: 'Vigente',
        }),
        pais: new RefProp('pais', {
          getScheme: () => PaisModel.scheme,
        }),
        provincia: new RefProp('provincia', {
          getScheme: () => ProvinciaModel.scheme,
        }),
        localidad: new RefProp('localidad', {
          getScheme: () => LocalidadModel.scheme,
        }),
      },
    },
  ],
}
