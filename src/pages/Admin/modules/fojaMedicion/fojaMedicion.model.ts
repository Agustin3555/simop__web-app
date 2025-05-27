import { BaseEntity, BaseRef } from '@/models/config'
import { DireccionModel } from '../direccion'
import { DepartamentoModel } from '../departamento'
import { InspectorModel } from '../inspector'
import { ObraModel } from '../obra'

export interface OwnFields {
  numero: number
  numeroExpediente: string
  avance: number
  fechaFoja: string
  observaciones: string
  fechaCertificacion: string
  montoTotal: number
}

export interface RelationFields {
  direccion: DireccionModel.Ref
  departamento: DepartamentoModel.Ref
  obra: ObraModel.Ref
  inspector: InspectorModel.Ref
}

export interface Entity extends BaseEntity, OwnFields, RelationFields {}

export type CreateEntity = OwnFields &
  Record<'direccionId' | 'departamentoId' | 'obraId' | 'inspectorId', number>

export type UpdateEntity = Partial<CreateEntity>

export type Ref = BaseRef<OwnFields, 'numero' | 'numeroExpediente'>
