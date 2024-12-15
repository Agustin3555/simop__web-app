import {
  EstadoObraModel,
  FinanciamientoModel,
  LocalidadModel,
  EmpresaModel,
  PaisModel,
  ProvinciaModel,
} from '.'
import { Ref } from '@/types'

export interface RawEntity {
  id: number
  nombre: String
  numeroResolucion: number
  anioResolucion: number
  empresaId?: EmpresaModel.RawRef
  pais?: PaisModel.RawRef
  provincia?: ProvinciaModel.RawRef
  localidad?: LocalidadModel.RawRef
  financiamiento?: FinanciamientoModel.RawRef
  numeroContratacion: number
  anioContratacion: number
  montoContratacion: number
  numeroExpediente: number
  nomenclaturaCatastral: String
  estadoObra?: EstadoObraModel.RawRef
  plazoMeses: number
  plazoDias: number
  fechaInicio: string
  fechaFin: string
  observaciones: String
  creado: string
  modificado: string
}

export interface Entity {
  id: number
  nombre: String
  numeroResolucion: number
  anioResolucion: number
  empresaId?: Ref
  pais?: Ref
  provincia?: Ref
  localidad?: Ref
  financiamiento?: Ref
  numeroContratacion: number
  anioContratacion: number
  montoContratacion: number
  numeroExpediente: number
  nomenclaturaCatastral: String
  estadoObra?: Ref
  plazoMeses: number
  plazoDias: number
  fechaInicio: string
  fechaFin: string
  observaciones: String
  creado: string
  modificado: string
}

export interface RawRef {
  id: number
  nombre: string
}

export interface CreateData {
  id: number
  nombre: String
  numeroResolucion: number
  anioResolucion: number
  numeroContratacion: number
  anioContratacion: number
  montoContratacion: number
  numeroExpediente: number
  nomenclaturaCatastral: String
  plazoMeses: number
  plazoDias: number
  fechaInicio: string
  fechaFin: string
  observaciones: String
  creado: string
  modificado: string
  empresaId: number
  estadoObraId: number
  financiamientoId: number
  paisId: number
  provinciaId: number
  localidadId: number
}

export interface CreateBody {
  id: number
  nombre: String
  numeroResolucion: number
  anioResolucion: number
  numeroContratacion: number
  anioContratacion: number
  montoContratacion: number
  numeroExpediente: number
  nomenclaturaCatastral: String
  fechaInicio: string
  fechaFin: string
  plazoMeses: number
  plazoDias: number
  observaciones: String
  creado: string
  modificado: string
  empresaId: number
  estadoObraId: number
  financiamientoId: number
  paisId: number
  provinciaId: number
  localidadId: number
}
