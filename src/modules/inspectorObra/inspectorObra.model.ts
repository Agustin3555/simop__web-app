import { EntityRef, TableEntity } from '@/infra/http/entity.types'
import { InspectorModel } from '@/modules/inspector'
import { ObraModel } from '@/modules/obra'
import { TipoInspectorModel } from '@/modules/tipoInspector'
import { TipoProfesionModel } from '@/modules/tipoProfesion'

export interface Entity extends TableEntity {
  fecha: string
  obra: ObraModel.Ref
  inspector: InspectorModel.Ref
  tipoInspector: TipoInspectorModel.Ref
  tipoProfesion: TipoProfesionModel.Ref
}

export type Ref = EntityRef<Entity, 'fecha'>
