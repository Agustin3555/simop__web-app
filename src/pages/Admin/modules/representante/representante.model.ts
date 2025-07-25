import { TimestampedEntity, EntityRef } from '@/models/config'
import { PaisModel } from '../pais'
import { ProvinciaModel } from '../provincia'
import { LocalidadModel } from '../localidad'

export interface OwnFields {
  cuil: number
  apellido: string
  nombre: string
  direccion: string
  numeroMatricula: string
}

export interface RelationFields {
  pais: PaisModel.Ref
  provincia: ProvinciaModel.Ref
  localidad: LocalidadModel.Ref
}

export interface Entity extends TimestampedEntity, OwnFields, RelationFields {}

export type CreateEntity = OwnFields &
  Record<'paisId' | 'provinciaId' | 'localidadId', number>

export type UpdateEntity = Partial<CreateEntity>

export type Ref = EntityRef<OwnFields, 'cuil' | 'nombre' | 'apellido'>
