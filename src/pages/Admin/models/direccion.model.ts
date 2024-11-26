import { Ref } from '../types'

export interface RawEntity {
  id: number
  nombre: string
  subSecretaria?: { id: number; nombre: string }
  creado: string
  modificado: string
}

export interface Entity {
  id: number
  nombre: string
  subSecretaria?: Ref
  creado: string
  modificado: string
}

export interface RawRef {
  id: number
  nombre: string
}

export interface CreateUpdateData {
  nombre: string
  subSecretariaId: number
}

export interface CreateUpdateBody {
  nombre: string
  subSecretariaId: number
}
