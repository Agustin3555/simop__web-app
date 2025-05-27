import { BaseEntity, BaseRef } from '@/models/config'
import { TipoModificacionModel } from '../tipoModificacion'
import { DireccionModel } from '../direccion'
import { DepartamentoModel } from '../departamento'
import { ObraModel } from '../obra'

export interface OwnFields {
  numeroExpediente: string
  numeroResolucion: string
  monto: number
  nuevoMontoObra: number
  fecha: string
  observaciones: string
}

export interface RelationFields {
  direccion: DireccionModel.Ref
  departamento: DepartamentoModel.Ref
  obra: ObraModel.Ref
  tipoModificacion: TipoModificacionModel.Ref
}

export interface Entity extends BaseEntity, OwnFields, RelationFields {}

export type CreateEntity = OwnFields &
  Record<
    'direccionId' | 'departamentoId' | 'obraId' | 'tipoModificacionId',
    number
  >

export type UpdateEntity = Partial<CreateEntity>

export type Ref = BaseRef<OwnFields, 'numeroExpediente'>
