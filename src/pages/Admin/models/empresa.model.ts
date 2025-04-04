import { LocalidadModel, PaisModel, ProvinciaModel } from '.'
import { NumberProp, RefProp, Scheme, TextProp } from '../services/config'
import { EmpresaService } from '../services'
import { COMMON_PROPS } from '../constants/commonProps.const'

export interface RawEntity {
  id: number
  cuit: number
  nombre: string
  direccion?: string
  numeroContacto?: number
  email?: string

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
  direccion?: string
  numeroContacto?: number
  email?: string

  pais?: PaisModel.Ref
  provincia?: ProvinciaModel.Ref
  localidad?: LocalidadModel.Ref

  creado: string
  modificado: string
}

export interface RawRef {
  id: number

  cuit: number
  nombre: string
}

export interface Ref {
  id: number

  cuit: number
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

export interface UpdateData {
  cuit?: number
  nombre?: string
  direccion?: string
  numeroContacto?: number
  email?: string

  paisId?: number
  provinciaId?: number
  localidadId?: number
}

export interface UpdateBody {
  cuit?: number
  nombre?: string
  direccion?: string
  numeroContacto?: number
  email?: string

  paisId?: number
  provinciaId?: number
  localidadId?: number
}

export const scheme: Scheme<Entity> = {
  key: 'empresa',
  service: EmpresaService,
  refreshRate: 'low',
  title: {
    singular: 'Empresa',
    plural: 'Empresas',
  },
  anchorField: 'nombre',

  groups: [
    {
      props: {
        cuit: new NumberProp('CUIT', {
          big: true,
          field: {
            required: true,
          },
        }),
        nombre: new TextProp('Nombre', {
          field: {
            required: true,
          },
        }),
        direccion: new TextProp('Dirección declarada'),
        numeroContacto: new NumberProp('Número de contacto', {
          big: true,
        }),
        email: new TextProp('Email'),
        pais: new RefProp({
          getScheme: () => PaisModel.scheme,
        }),
        provincia: new RefProp({
          getScheme: () => ProvinciaModel.scheme,
        }),
        localidad: new RefProp({
          getScheme: () => LocalidadModel.scheme,
        }),
        ...COMMON_PROPS,
      },
    },
  ],
}
