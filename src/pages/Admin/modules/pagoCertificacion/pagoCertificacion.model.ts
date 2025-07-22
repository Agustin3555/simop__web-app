import { TimestampedEntity, EntityRef } from '@/models/config'
import { AreaModel } from '../area'
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
  area: AreaModel.Ref
  redeterminacion: RedeterminacionModel.Ref
  fojaMedicion: FojaMedicionModel.Ref
}

export interface Entity extends TimestampedEntity, OwnFields, RelationFields {}

export type CreateEntity = OwnFields &
  Record<'areaId' | 'redeterminacionId' | 'fojaMedicionId', number>

export type UpdateEntity = Partial<CreateEntity>

export type Ref = EntityRef<OwnFields, 'numero'>
