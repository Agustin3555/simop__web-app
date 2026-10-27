import { EntityRef, TableEntity } from '@/infra/http/entity.types'
import { AreaModel } from '@/modules/area'
import { FojaMedicionModel } from '@/modules/fojaMedicion'
import { RedeterminacionModel } from '@/modules/redeterminacion'

export interface Entity extends TableEntity {
  numero: number
  ordenPago: string
  monto: number
  fecha: string
  observaciones: string
  area: AreaModel.Ref
  redeterminacion: RedeterminacionModel.Ref
  fojaMedicion: FojaMedicionModel.Ref
}

export type Ref = EntityRef<Entity, 'numero'>
