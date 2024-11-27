import { Ref } from '../types'

export interface RawEntity {
  id: number
  nombre: string
  direccion?: { id: number; nombre: string }
  creado: string
  modificado: string
}

export interface Entity {
  id: number
  nombre: string
  direccion?: Ref
  creado: string
  modificado: string
}

export interface RawRef {
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
