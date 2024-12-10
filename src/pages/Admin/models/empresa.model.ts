import { LocalidadModel, PaisModel, ProvinciaModel } from '.'
import { Ref } from '../types'

export interface RawEntity {
  id: number
  cuitEmpresa: number
  nombreEmpresa: string
  direccionDeclarada: string
  pais?: PaisModel.RawRef
  provincia?: ProvinciaModel.RawRef
  localidad?: LocalidadModel.RawRef
  numeroContacto: number
  email: string
  creado: string
  modificado: string
}

export interface Entity {
  id: number
  cuitEmpresa: number
  nombreEmpresa: string
  direccionDeclarada: string
  pais?: Ref
  provincia?: Ref
  localidad?: Ref
  numeroContacto: number
  email: string
  creado: string
  modificado: string
}

export interface RawRef {
  id: number
  nombreEmpresa: string
  cuitEmpresa: number
}

export interface CreateData {
  cuitEmpresa: number
  nombreEmpresa: string
  direccionDeclarada: string
  numeroContacto: number
  email: string
  paisId: number
  provinciaId: number
  localidadId: number
}

export interface CreateBody {
  cuitEmpresa: number
  nombreEmpresa: string
  direccionDeclarada: string
  numeroContacto: number
  email: string
  paisId: number
  provinciaId: number
  localidadId: number
}
