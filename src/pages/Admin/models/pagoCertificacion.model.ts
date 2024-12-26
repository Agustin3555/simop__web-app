import { FojaMedicionModel } from '.'
import { Ref } from '@/types'

export interface RawEntity {
  id: number
  numeroExpediente: string
  numeroResolucion: string
  monto: number
  fecha: string
  observaciones: string

  certificacionId?: FojaMedicionModel.RawRef

  creado: string
  modificado: string
}

export interface Entity {
  id: number
  numeroExpediente: string
  numeroResolucion: string
  monto: number
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
  numeroExpediente: string
  numeroResolucion: string
  fecha: string
  observaciones: string
  monto: number

  certificacionId?: number
}

export interface CreateBody {
  numeroExpediente: string
  numeroResolucion: string
  fecha: string
  observaciones: string
  monto: number

  certificacionId?: number
}
