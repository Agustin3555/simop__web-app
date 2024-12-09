import { DatosModel } from '.'
import { Ref } from '../types'

export interface RawEntity {
  cuit: any
  id: number
  cuitEmpresa: number
  nombreEmpresa: string
  direccionDeclarada: string
  pais?: { id: number; nombre: string }
  numeroContacto: number
  email: string
  creado: string
  modificado: string
}

export interface Entity {
  id: number
  cuit: any
  nombreEmpresa: string
  direccionDeclarada: string
  pais?: Ref
  numeroContacto: number
  email: string
  creado: string
  modificado: string
}

export interface RawRef {
  id: number
  nombreEmpresa: string
}

export interface CreateData {
  cuit: number
  nombreEmpresa: string
  direccionDeclarada: string
  numeroContacto: number
  email: string
}

export interface CreateBody {
  cuit: number
  nombreEmpresa: string
  direccionDeclarada: string
  numeroContacto: number
  email: string
}
export interface CreateData {
  paisId: number
}

export interface CreateBody {
  paisId: number
}

