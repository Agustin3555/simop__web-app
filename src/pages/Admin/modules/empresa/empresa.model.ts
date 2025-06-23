import { BaseEntity, BaseRef } from '@/models/config'
import { PaisModel } from '../pais'
import { ProvinciaModel } from '../provincia'
import { LocalidadModel } from '../localidad'

interface OwnFields {
  cuit: number
  nombre: string
  direccion: string
  numeroContacto: number
  email: string
}

interface RelationFields {
  pais: PaisModel.Ref
  provincia: ProvinciaModel.Ref
  localidad: LocalidadModel.Ref
}

export interface Entity extends BaseEntity, OwnFields, RelationFields {}

export type CreateEntity = OwnFields &
  Record<'paisId' | 'provinciaId' | 'localidadId', number>

export type UpdateEntity = Partial<CreateEntity>

export type Ref = BaseRef<OwnFields, 'nombre'>
