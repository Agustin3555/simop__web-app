import {
  PaisModel,
  TipoRepresentanteEmpresaModel,
  ProvinciaModel,
  LocalidadModel,
} from '.'
import { Ref } from '@/types'

export interface RawEntity {
  id: number
  cuit: number
  apellido: string
  nombre: string
  direccion: string
  numeroMatricula: string
  vigencia: boolean

  pais?: PaisModel.RawRef
  provincia?: ProvinciaModel.RawRef
  localidad?: LocalidadModel.RawRef
  tipoRepresentanteEmpresa?: TipoRepresentanteEmpresaModel.RawRef

  creado: string
  modificado: string
}

export interface Entity {
  id: number
  cuit: number
  apellido: string
  nombre: string
  direccion: string
  numeroMatricula: string
  vigencia: boolean

  pais?: Ref
  provincia?: Ref
  localidad?: Ref
  tipoRepresentanteEmpresa?: Ref

  creado: string
  modificado: string
}

export interface RawRef {
  id: number
  nombre: string
}

export interface CreateData {
  cuit: number
  apellido: string
  nombre: string
  direccion: string
  numeroMatricula: string
  vigencia: boolean

  paisId: number
  provinciaId: number
  localidadId: number
  tipoRepresentanteId?: number
}

export interface CreateBody {
  cuit: number
  apellido: string
  nombre: string
  direccion: string
  numeroMatricula: string
  vigencia: boolean

  paisId: number
  provinciaId: number
  localidadId: number
  tipoRepresentanteId?: number
}
