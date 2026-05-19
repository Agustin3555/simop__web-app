import { TimestampedEntity, EntityRef } from '@/models/config'
import { EmpresaModel } from '../empresa'
import { TipoContratacionObraModel } from '../tipoContratacionObra'
import { LocalidadModel } from '../localidad'
import { TipoEstadoObraModel } from '../tipoEstadoObra'
import { TipoFinanciamientoObraModel } from '../tipoFinanciamientoObra'
import { TipoProgramaObraModel } from '../tipoProgramaObra'
import { TipoTematicaObraModel } from '../tipoTematicaObra'
import { TipoEnteObraModel } from '../tipoEnteObra'
import { TipoOrigenFinanciamientoObraModel } from '../tipoOrigenFinanciamientoObra'
import { APGModel } from '../apg'

export interface OwnFields {
  numero: number
  nombre: string
  solicitante: string
  fechaPedido: string
  numeroExpediente: number
  numeroResolucion: number
  anioResolucion: string
  numeroContratacion: number
  fechaContratacion: string
  montoContratacion: string
  nuevoMonto: string
  fechaInicio: string
  fechaFin: string
  plazoMeses: number
  plazoDias: number
  direccion: string
  lugar: string
  nomenclaturaCatastral: string
  observaciones: string
  obraNueva: boolean
  porcentajeObraNueva: number
  metrosCuadradosObraNueva: number
  metrosLinealesObraNueva: number
  observacionesObraNueva: string
  obraRefaccionada: boolean
  porcentajeObraRefaccionada: number
  metrosCuadradosObraRefaccionada: number
  metrosLinealesObraRefaccionada: number
  observacionesObraRefaccionada: string
  avanceTotal: number
  inaugurable: boolean
  inaugurada: boolean
  totalPendientePago: string

  gestion2023: boolean
  porcentajePendienteCertificar: number
  montoPendienteCertificarActualizado: string
}

export interface RelationFields {
  empresa: EmpresaModel.Ref
  tipoEnteObra: TipoEnteObraModel.Ref
  tipoContratacionObra: TipoContratacionObraModel.Ref
  tipoOrigenFinanciamientoObra: TipoOrigenFinanciamientoObraModel.Ref
  tipoFinanciamientoObra: TipoFinanciamientoObraModel.Ref
  tipoProgramaObra: TipoProgramaObraModel.Ref
  tipoTematicaObra: TipoTematicaObraModel.Ref
  tipoEstadoObra: TipoEstadoObraModel.Ref

  localidades: LocalidadModel.Ref[]
  apgs: APGModel.Ref[]
}

export interface Entity extends TimestampedEntity, OwnFields, RelationFields {}

export type CreateEntity = OwnFields & {
  localidades: number[]
} & Record<
    | 'empresaId'
    | 'tipoEnteObraId'
    | 'tipoContratacionObraId'
    | 'tipoOrigenFinanciamientoObraId'
    | 'tipoFinanciamientoObraId'
    | 'tipoProgramaObraId'
    | 'tipoTematicaObraId'
    | 'tipoEstadoObraId',
    number
  >

export type UpdateEntity = Partial<CreateEntity>

export type Ref = EntityRef<OwnFields, 'numero' | 'nombre'>

export interface MontosActualizadosObra {
  id: number
  periodoNombre: string
  actualizados: number
  createdAt: string
}
