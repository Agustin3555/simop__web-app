import { EntityRef, TableEntity } from '@/infra/http/entity.types'
import { APGModel } from '@/modules/apg'
import { EmpresaModel } from '@/modules/empresa'
import { InspectorModel } from '@/modules/inspector'
import { LocalidadModel } from '@/modules/localidad'
import { TipoContratacionObraModel } from '@/modules/tipoContratacionObra'
import { TipoEnteObraModel } from '@/modules/tipoEnteObra'
import { TipoEstadoObraModel } from '@/modules/tipoEstadoObra'
import { TipoFinanciamientoObraModel } from '@/modules/tipoFinanciamientoObra'
import { TipoOrigenFinanciamientoObraModel } from '@/modules/tipoOrigenFinanciamientoObra'
import { TipoProgramaObraModel } from '@/modules/tipoProgramaObra'
import { TipoTematicaObraModel } from '@/modules/tipoTematicaObra'

export interface Entity extends TableEntity {
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
  // visitable: boolean
  inaugurable: boolean
  inaugurada: boolean
  totalPendientePago: string
  gestion2023: boolean
  porcentajePendienteCertificar: number
  montoPendienteCertificarActualizado: string
  presupuestoProximoAnio: string

  empresa: EmpresaModel.Ref
  tipoEnteObra: TipoEnteObraModel.Ref
  tipoContratacionObra: TipoContratacionObraModel.Ref
  tipoOrigenFinanciamientoObra: TipoOrigenFinanciamientoObraModel.Ref
  tipoFinanciamientoObra: TipoFinanciamientoObraModel.Ref
  tipoProgramaObra: TipoProgramaObraModel.Ref
  tipoTematicaObra: TipoTematicaObraModel.Ref
  tipoEstadoObra: TipoEstadoObraModel.Ref
  inspectorTitular: InspectorModel.Ref

  localidades: LocalidadModel.Ref[]
  apgs: APGModel.Ref[]
}

export type Ref = EntityRef<Entity, 'nombre'>

export interface MontosActualizadosObra {
  id: number
  periodoNombre: string
  actualizados: number
  createdAt: string
}
