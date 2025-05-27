import { BaseEntity, BaseRef } from '@/models/config'
import { TipoRescisionModel } from '../tipoRescision'
import { DepartamentoModel } from '../departamento'
import { DireccionModel } from '../direccion'
import { ObraModel } from '../obra'

export interface OwnFields {
  numeroExpediente: string
  numeroResolucion: string
  fecha: string
  observaciones: string
}

export interface RelationFields {
  direccion: DireccionModel.Ref
  departamento: DepartamentoModel.Ref
  obra: ObraModel.Ref
  tipoRescision: TipoRescisionModel.Ref
}

export interface Entity extends BaseEntity, OwnFields, RelationFields {}

export type CreateEntity = OwnFields &
  Record<
    'direccionId' | 'departamentoId' | 'obraId' | ' tipoRescisionId',
    number
  >

export type UpdateEntity = Partial<CreateEntity>

export type Ref = BaseRef<OwnFields, 'numeroExpediente'>
