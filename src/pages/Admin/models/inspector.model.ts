import { TipoProfesionModel } from '.'
import { Ref } from '../types'

export interface RawEntity {
  id: number
  cuil: number
  apellido: string
  nombre: string
  tiposProfesiones: TipoProfesionModel.RawRef[]
  creado: string
  modificado: string
}

export interface Entity {
  id: number
  cuil: number
  apellido: string
  nombre: string
  tiposProfesiones: Ref[]
  creado: string
  modificado: string
}

export interface RawRef {
  id: number
  apellido: string
}

export interface CreateData {
  cuil: number
  apellido: string
  nombre: string
  tiposProfesiones?: number[]
}

export interface CreateBody {
  cuil: number
  apellido: string
  nombre: string
  tiposProfesiones?: number[]
}
