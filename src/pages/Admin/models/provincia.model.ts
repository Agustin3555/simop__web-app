import { Ref } from '../types'

export interface RawEntity {
  id: number
  nombre: string
  pais?: { id: number; nombre: string }
  creado: string
  modificado: string
}

export interface Entity {
  id: number
  nombre: string
  pais?: Ref
  creado: string
  modificado: string
}

export interface RawRef {
  id: number
  nombre: string
}

export interface CreateData {
  nombre: string
  paisId: number
}

export interface CreateBody {
  nombre: string
  paisId: number
}