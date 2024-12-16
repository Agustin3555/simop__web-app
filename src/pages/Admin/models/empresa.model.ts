import { LocalidadModel, PaisModel, ProvinciaModel } from '.'
import { Ref } from '@/types'

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
