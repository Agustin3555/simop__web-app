import { EntityRef, TableEntity } from '@/infra/http/entity.types'
import { LocalidadModel } from '@/modules/localidad'
import { PaisModel } from '@/modules/pais'
import { ProvinciaModel } from '@/modules/provincia'

export interface Entity extends TableEntity {
  cuil: number
  nombre: string
  direccion: string
  numeroMatricula: string
  pais: PaisModel.Ref
  provincia: ProvinciaModel.Ref
  localidad: LocalidadModel.Ref
}

export type Ref = EntityRef<Entity, 'cuil' | 'nombre'>
