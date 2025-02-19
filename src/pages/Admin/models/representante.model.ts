import { PaisModel, ProvinciaModel, LocalidadModel } from '.'
import { NumberProp, RefProp, Scheme, TextProp } from '../services/config'
import { RepresentanteService } from '../services'
import { COMMON_PROPS } from '../constants/commonProps.const'

export interface RawEntity {
  id: number
  cuil: number
  apellido: string
  nombre: string
  direccion: string
  numeroMatricula: string

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

  pais?: PaisModel.Ref
  provincia?: ProvinciaModel.Ref
  localidad?: LocalidadModel.Ref

  creado: string
  modificado: string
}

export interface RawRef {
  id: number
  apellido: string
}

export interface Ref {
  id: number
  apellido: string
}

export interface CreateData {
  cuil: number
  apellido: string
  nombre: string
  direccion: string
  numeroMatricula: string

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

  paisId: number
  provinciaId: number
  localidadId: number
}

export const scheme: Scheme<Entity> = {
  key: 'representante',
  service: RepresentanteService,
  refreshRate: 'low',
  title: {
    singular: 'Representante',
    plural: 'Representantes',
  },

  groups: [
    {
      props: {
        cuil: new NumberProp('cuil', 'CUIL', {
          big: true,
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
        direccion: new TextProp('direccion', 'Dirección', {
          field: {
            required: true,
          },
        }),
        numeroMatricula: new TextProp(
          'numeroMatricula',
          'Número de Matricula',
          {
            field: {
              required: true,
            },
          },
        ),
        pais: new RefProp('pais', {
          getScheme: () => PaisModel.scheme,
        }),
        provincia: new RefProp('provincia', {
          getScheme: () => ProvinciaModel.scheme,
        }),
        localidad: new RefProp('localidad', {
          getScheme: () => LocalidadModel.scheme,
        }),
        ...COMMON_PROPS,
      },
    },
  ],
}
