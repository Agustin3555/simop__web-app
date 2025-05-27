import { BaseEntity, BaseRef } from '@/models/config'
import { DireccionModel } from '../direccion'
import { DepartamentoModel } from '../departamento'
import { ObraModel } from '../obra'

export interface OwnFields {
  numero: number
  numeroResolucion: string
  numeroExpedienteSolicitud: string
  plazoMesesSolicitado: number
  plazoMesesOtorgado: number
  nuevaFechaFinObra: string
  fecha: string
  observaciones: string
}

interface RelationFields {
  direccion: DireccionModel.Ref
  departamento: DepartamentoModel.Ref
  obra: ObraModel.Ref
}

export interface Entity extends BaseEntity, OwnFields, RelationFields {}

export type CreateEntity = OwnFields &
  Record<'direccionId' | 'departamentoId' | 'obraId', number>

export type UpdateEntity = Partial<CreateEntity>

export type Ref = BaseRef<OwnFields, 'numero' | 'numeroResolucion'>
