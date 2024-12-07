import { SubSecretariaModel } from '.'
import { Ref } from '../types'

export interface RawEntity {
  id: number
  nombre: string
  subSecretaria?: SubSecretariaModel.RawRef
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

export interface CreateData {
  nombre: string
  subSecretariaId: number
}

export interface CreateBody {
  nombre: string
  subSecretariaId: number
}
