import { EntityRef, TableEntity } from '@/infra/http/entity.types'
import { TipoProfesionModel } from '@/modules/tipoProfesion'

export interface Entity extends TableEntity {
  cuil: number
  nombre: string
  profesiones: TipoProfesionModel.Ref[]
}

export type Ref = EntityRef<Entity, 'cuil' | 'nombre'>
