import { BaseEntity, BaseRef } from '@/models/config'
import { DepartamentoModel } from '../departamento'
import { DireccionModel } from '../direccion'
import { FojaMedicionModel } from '../fojaMedicion'
import { RedeterminacionModel } from '../redeterminacion'

export interface OwnFields {
  numero: number
  ordenPago: string
  monto: number
  fecha: string
  observaciones: string
}

export interface RelationFields {
  direccion: DireccionModel.Ref
  departamento: DepartamentoModel.Ref
  redeterminacion: RedeterminacionModel.Ref
  fojaMedicion: FojaMedicionModel.Ref
}

export interface Entity extends BaseEntity, OwnFields, RelationFields {}

export type CreateEntity = OwnFields &
  Record<
    'direccionId' | 'departamentoId' | 'redeterminacionId' | 'ojaMedicionId',
    number
  >

export type UpdateEntity = Partial<CreateEntity>

export type Ref = BaseRef<OwnFields, 'numero'>
