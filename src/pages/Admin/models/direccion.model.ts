//estas interfaces son contratos para los datos que manejo en la app,
//transformo los datos crudos en una entidad para usar referencias simples(ref)
//con crateData/Body puedo crear nuevas entidades por medeio de slicitudes http
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

export interface CreateData {
  nombre: string
  subSecretariaId: number
}

export interface CreateBody {
  nombre: string
  subSecretariaId: number
}
