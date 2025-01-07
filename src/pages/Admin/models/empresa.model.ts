import { LocalidadModel, PaisModel, ProvinciaModel } from '.'
import { Ref } from '@/types'
import { NumberProp, RefProp, Scheme, TextProp } from '../services/config'
import { EmpresaService } from '../services'
import { COMMON_PROPS } from '../constants/commonProps.const'

export interface RawEntity {
  id: number
  cuit: number
  nombre: string
  direccion: string
  numeroContacto: number
  email: string

  pais?: PaisModel.RawRef
  provincia?: ProvinciaModel.RawRef
  localidad?: LocalidadModel.RawRef

  creado: string
  modificado: string
}

export interface Entity {
  id: number
  cuit: number
  nombre: string
  direccion: string
  numeroContacto: number
  email: string

  pais?: Ref
  provincia?: Ref
  localidad?: Ref

  creado: string
  modificado: string
}

export interface RawRef {
  id: number
  nombre: string
}

export interface CreateData {
  cuit: number
  nombre: string
  direccion: string
  numeroContacto: number
  email: string

  paisId?: number
  provinciaId?: number
  localidadId?: number
}

export interface CreateBody {
  cuit: number
  nombre: string
  direccion: string
  numeroContacto: number
  email: string

  paisId?: number
  provinciaId?: number
  localidadId?: number
}

export const scheme: Scheme<Entity> = {
  key: 'empresa',
  service: EmpresaService,
  title: {
    singular: 'Empresa',
    plural: 'Empresas',
  },

  groups: [
    {
      props: {
        ...COMMON_PROPS,
        cuit: new NumberProp('cuit', 'CUIT', {
          field: {
            required: true,
          },
        }),
        nombre: new TextProp('nombre', 'Nombre', {
          field: {
            required: true,
          },
        }),
        direccion: new TextProp('direccion', 'Dirección declarada', {
          field: {
            required: true,
          },
        }),
        numeroContacto: new NumberProp('numeroContacto', 'Número de contacto', {
          field: {
            required: true,
          },
        }),
        email: new TextProp('email', 'Email', {
          field: {
            required: true,
          },
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
