import { ObraModel, InspectorModel } from '.'
import { Ref } from '@/types'

export interface RawEntity {
  id: number
  numero: number
  numeroExpediente: string
  avance: number
  fecha: string
  observaciones: string

  obraNumero?: ObraModel.RawRef
  inspectorId?: InspectorModel.RawRef

  creado: string
  modificado: string
}

export interface Entity {
  id: number
  numero: number
  numeroExpediente: string
  avance: number
  fecha: string
  observaciones: string

  obraNumero?: Ref
  inspectorId?: Ref

  creado: string
  modificado: string
}

export interface RawRef {
  id: number
  numeroExpediente: string
}

export interface CreateData {
  numero: number
  numeroExpediente: string
  avance: number
  fecha: string
  observaciones: string

  obraNumero?: number
  inspectorId?: number

  creado: string
  modificado: string
}

export interface CreateBody {
  numero: number
  numeroExpediente: string
  avance: number
  fecha: string
  observaciones: string

  obraNumero?: number
  inspectorId?: number
  creado: string
  modificado: string
}
