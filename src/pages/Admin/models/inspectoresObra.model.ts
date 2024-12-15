import { Ref } from '@/types'
import { InspectorModel, TipoInspectorModel, TipoProfesionModel } from '.'
export interface RawEntity {
  id: number
  numeroObra: number
  creado: string
  modificado: string
  cuil?: InspectorModel.RawRef
  tipoInspector?: TipoInspectorModel.RawRef
  tipoProfesion?: TipoProfesionModel.RawRef
}

export interface Entity {
  id: number
  numeroObra: number
  creado: string
  modificado: string
  cuil?: Ref
  tipoInspector?: Ref
  tipoProfesion?: Ref
}

export interface RawRef {
  id: number
  numeroObra: number
}

export interface CreateData {
  numeroObra: number
  cuil?: number
  tipoInspector?: string
  tipoProfesion?: string
}

export interface CreateBody {
  numeroObra: number
  cuil?: number
  tipoInspector?: string
  tipoProfesion?: string
}
