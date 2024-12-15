import { Ref } from '@/types'

export interface RawEntity {
  id: number
  nombre: string
  provincia?: { id: number; nombre: string }
  creado: string
  modificado: string
}

export interface Entity {
  id: number
  nombre: string
  provincia?: Ref
  creado: string
  modificado: string
}

export interface RawRef {
  id: number
  nombre: string
}

export interface CreateData {
  nombre: string
  provinciaId: number
}

export interface CreateBody {
  nombre: string
  provinciaId: number
}
