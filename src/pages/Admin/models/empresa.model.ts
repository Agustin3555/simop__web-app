import { LocalidadModel, PaisModel, ProvinciaModel } from '.'
import { Ref } from '@/types'
import { Scheme } from '@/models/config'
import { EmpresaService } from '../services'
import { COMMON_PROPS } from '@/constants'

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
  accessorKey: 'empresa',
  service: EmpresaService,
  title: {
    singular: 'Empresa',
    plural: 'Empresas',
  },

  groups: [
    {
      props: {
        ...COMMON_PROPS,
        cuit: {
          accessorKey: 'cuit',
          title: 'CUIT',
          type: 'number',
        },
        nombre: {
          accessorKey: 'nombre',
          title: 'Nombre',
          type: 'text',
        },
        direccion: {
          accessorKey: 'direccion',
          title: 'Dirección declarada',
          type: 'text',
        },
        numeroContacto: {
          accessorKey: 'numeroContacto',
          title: 'Número de contacto',
          type: 'number',
        },
        email: {
          accessorKey: 'email',
          title: 'Email',
          type: 'text',
        },
        // pais: {
        //   accessorKey: 'pais',
        //   title: 'País',
        //   type: 'ref',
        //   refConfig: {
        //     getScheme: () => PaisModel.scheme,
        //   },
        // },
        // provincia: {
        //   accessorKey: 'provincia',
        //   title: 'Provincia',
        //   type: 'ref',
        //   refConfig: {
        //     getScheme: () => ProvinciaModel.scheme,
        //   },
        // },
        // localidad: {
        //   accessorKey: 'localidad',
        //   title: 'Localidad',
        //   type: 'ref',
        //   refConfig: {
        //     getScheme: () => LocalidadModel.scheme,
        //   },
        // },
      },
    },
  ],
}
