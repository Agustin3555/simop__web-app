import { BaseEntity, BaseRef } from '@/models/config'
import { DireccionModel } from '../direccion'
import { DepartamentoModel } from '../departamento'
import { TipoRecepcionModel } from '../tipoRecepcion'
import { ObraModel } from '../obra'

export interface OwnFields {
  numeroActa: number
  fecha: string
  observaciones: string
}

export interface RelationFields {
  direccion: DireccionModel.Ref
  departamento: DepartamentoModel.Ref
  obra: ObraModel.Ref
  tipoRecepcion: TipoRecepcionModel.Ref
}

export interface Entity extends BaseEntity, OwnFields, RelationFields {}

export type CreateEntity = OwnFields &
  Record<
    'direccionId' | 'departamentoId' | 'obraId' | ' tipoRecepcionId',
    number
  >

export type UpdateEntity = Partial<CreateEntity>

export type Ref = BaseRef<OwnFields, 'numeroActa'>
