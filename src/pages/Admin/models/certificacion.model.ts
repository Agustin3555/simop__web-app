import { FojaMedicionModel } from '.'
import { Ref } from '@/types'

export interface RawEntity {
  id: number
  numeroExpediente: string
  fecha: string
  observaciones: string

  fojaMedicionId?: FojaMedicionModel.RawRef

  creado: string
  modificado: string
}

export interface Entity {
  id: number
  numeroExpediente: string
  fecha: string
  observaciones: string

  fojaMedicionId?: Ref

  creado: string
  modificado: string
}

export interface RawRef {
  id: number
  numeroExpediente: string
}

export interface CreateData {
  id: number
  numeroExpediente: string
  fecha: string
  observaciones: string

  fojaMedicionId: number
}

export interface CreateBody {
  id: number
  numeroExpediente: string
  fecha: string
  observaciones: string

  fojaMedicionId: number
}
