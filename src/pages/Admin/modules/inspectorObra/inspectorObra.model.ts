import { TimestampedEntity, EntityRef } from '@/models/config'
import { InspectorModel } from '../inspector'
import { TipoInspectorModel } from '../tipoInspector'
import { TipoProfesionModel } from '../tipoProfesion'
import { ObraModel } from '../obra'

export interface OwnFields {
  vigencia: boolean
  fecha: string
}

export interface RelationFields {
  obra: ObraModel.Ref
  inspector: InspectorModel.Ref
  tipoInspector: TipoInspectorModel.Ref
  tipoProfesion: TipoProfesionModel.Ref
}

export interface Entity extends TimestampedEntity, OwnFields, RelationFields {}

export type CreateEntity = OwnFields &
  Record<
    'obraId' | 'inspectorId' | 'tipoInspectorId' | 'tipoProfesionId',
    number
  >

export type UpdateEntity = Partial<CreateEntity>

export type Ref = EntityRef<OwnFields, 'fecha'>
