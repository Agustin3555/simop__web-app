import {
  EstadoObraModel,
  FinanciamientoModel,
  LocalidadModel,
  EmpresaModel,
  ProgramaObraModel,
  TipoTematicaObraModel,
} from '.'
import { Ref } from '@/types'

export interface RawEntity {
  numero: number
  nombre: string
  numeroExpediente?: number
  numeroResolucion?: number
  anioResolucion?: string
  numeroContratacion?: number
  anioContratacion?: number
  montoContratacion?: number
  fechaInicio?: string
  fechaFin?: string
  plazoMeses?: number
  plazoDias?: number
  direccion?: string
  lugar?: string
  nomenclaturaCatastral?: string
  observaciones?: string
  obraNueva: boolean
  porcentajeObraNueva?: number
  metrosCuadradosObraNueva?: number
  metrosLinealesObraNueva?: number
  observacionesObraNueva?: string
  obraRefaccionada: boolean
  porcentajeObraRefaccionada?: number
  metrosCuadradosObraRefaccionada?: number
  metrosLinealesObraRefaccionada?: number
  observacionesObraRefaccionada?: string

  empresa?: EmpresaModel.RawRef
  tipoContratacionObra?: TipoTematicaObraModel.RawRef
  tipoFinanciamientoObra?: FinanciamientoModel.RawRef
  tipoProgramaObra?: ProgramaObraModel.RawRef
  tipoTematicaObra?: TipoTematicaObraModel.RawRef
  tipoEstadoObra?: EstadoObraModel.RawRef
  localidad?: LocalidadModel.RawRef

  creado: string
  modificado: string
}

export interface Entity {
  id: number
  nombre: string
  numeroExpediente?: number
  numeroResolucion?: number
  anioResolucion?: string
  numeroContratacion?: number
  anioContratacion?: number
  montoContratacion?: number
  fechaInicio?: string
  fechaFin?: string
  plazoMeses?: number
  plazoDias?: number
  direccion?: string
  lugar?: string
  nomenclaturaCatastral?: string
  observaciones?: string
  obraNueva: boolean
  porcentajeObraNueva?: number
  metrosCuadradosObraNueva?: number
  metrosLinealesObraNueva?: number
  observacionesObraNueva?: string
  obraRefaccionada: boolean
  porcentajeObraRefaccionada?: number
  metrosCuadradosObraRefaccionada?: number
  metrosLinealesObraRefaccionada?: number
  observacionesObraRefaccionada?: string

  empresa?: Ref
  tipoContratacionObra?: Ref
  tipoFinanciamientoObra?: Ref
  tipoProgramaObra?: Ref
  tipoTematicaObra?: Ref
  tipoEstadoObra?: Ref
  localidad?: Ref

  creado: string
  modificado: string
}

export interface RawRef {
  numero: number
  nombre: string
}

export interface CreateData {
  numero: number
  nombre: string
  numeroExpediente?: number
  numeroResolucion?: number
  anioResolucion?: string
  numeroContratacion?: number
  anioContratacion?: number
  montoContratacion?: number
  fechaInicio?: string
  fechaFin?: string
  plazoMeses?: number
  plazoDias?: number
  direccion?: string
  lugar?: string
  nomenclaturaCatastral?: string
  observaciones?: string
  obraNueva: boolean
  porcentajeObraNueva?: number
  metrosCuadradosObraNueva?: number
  metrosLinealesObraNueva?: number
  observacionesObraNueva?: string
  obraRefaccionada: boolean
  porcentajeObraRefaccionada?: number
  metrosCuadradosObraRefaccionada?: number
  metrosLinealesObraRefaccionada?: number
  observacionesObraRefaccionada?: string

  empresaId?: number
  tipoContratacionObraId?: number
  tipoFinanciamientoObraId?: number
  tipoProgramaObraId?: number
  tipoTematicaObraId?: number
  tipoEstadoObraId?: number
  localidadId?: number
}

export interface CreateBody {
  numero: number
  nombre: string
  numeroExpediente?: number
  numeroResolucion?: number
  anioResolucion?: string
  numeroContratacion?: number
  anioContratacion?: number
  montoContratacion?: number
  fechaInicio?: string
  fechaFin?: string
  plazoMeses?: number
  plazoDias?: number
  direccion?: string
  lugar?: string
  nomenclaturaCatastral?: string
  observaciones?: string
  obraNueva: boolean
  porcentajeObraNueva?: number
  metrosCuadradosObraNueva?: number
  metrosLinealesObraNueva?: number
  observacionesObraNueva?: string
  obraRefaccionada: boolean
  porcentajeObraRefaccionada?: number
  metrosCuadradosObraRefaccionada?: number
  metrosLinealesObraRefaccionada?: number
  observacionesObraRefaccionada?: string

  empresaId?: number
  tipoContratacionObraId?: number
  tipoFinanciamientoObraId?: number
  tipoProgramaObraId?: number
  tipoTematicaObraId?: number
  tipoEstadoObraId?: number
  localidadId?: number
}
