import { TimestampedEntity, EntityRef } from '@/models/config'
import { EmpresaModel } from '../empresa'
import { TipoContratacionObraModel } from '../tipoContratacionObra'
import { AmpliacionModel } from '../ampliacion'
import { FojaMedicionModel } from '../fojaMedicion'
import { InspectorModel } from '../inspector'
import { LocalidadModel } from '../localidad'
import { ModificacionModel } from '../modificacion'
import { ParalizacionModel } from '../paralizacion'
import { RecepcionModel } from '../recepcion'
import { RedeterminacionModel } from '../redeterminacion'
import { RepresentanteModel } from '../representante'
import { RescisionModel } from '../rescision'
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
  gestion2023: boolean
  montoContratacion: string
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
  inaugurable: boolean
  inaugurada: boolean
  totalPendientePago: string

  avanceTotal: number
  balanceEconomico: string
  nuevoMonto: string

  totalCertificadoFojaMedicion: string
  totalOrdenPagoFojaMedicion: string
  totalPagadoFojaMedicion: string
  totalPendientePagoFojaMedicion: string

  totalCertificadoRedeterminacion: string
  totalOrdenPagoRedeterminacion: string
  totalPagadoRedeterminacion: string
  totalPendientePagoRedeterminacion: string

  porcentajePendienteCertificar: number
  montoPendienteCertificar: string
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
  representantes: RepresentanteModel.Ref[]
  inspectores: InspectorModel.Ref[]
  fojasMedicion: FojaMedicionModel.Ref[]
  redeterminaciones: RedeterminacionModel.Ref[]
  ampliaciones: AmpliacionModel.Ref[]
  modificaciones: ModificacionModel.Ref[]
  paralizaciones: ParalizacionModel.Ref[]
  rescisiones: RescisionModel.Ref[]
  recepciones: RecepcionModel.Ref[]
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
