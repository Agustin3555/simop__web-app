import { EntityRef, TableEntity } from '@/infra/http/entity.types'
import { AreaModel } from '@/modules/area'
import { ObraModel } from '@/modules/obra'
import { TipoParalizacionModel } from '@/modules/tipoParalizacion'

export interface Entity extends TableEntity {
  numero: number
  numeroExpediente: string
  fechaReinicio: string
  nuevaFechaFinObra: string
  fecha: string
  observaciones: string
  area: AreaModel.Ref
  obra: ObraModel.Ref
  tipoParalizacion: TipoParalizacionModel.Ref
}

export type Ref = EntityRef<Entity, 'numero' | 'numeroExpediente'>
