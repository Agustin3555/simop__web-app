import {
  PaisModel,
  TipoRepresentanteEmpresaModel,
  ProvinciaModel,
  LocalidadModel,
} from '.'
import { Ref } from '../types'
export interface RawEntity {
  id: number
  cuitRepresentante: number
  cuitEmpresa: number
  apellidos: string
  nombre: string
  direccionDeclarada: string
  pais?: PaisModel.RawRef
  provincia?: ProvinciaModel.RawRef
  localidad?: LocalidadModel.RawRef
  tipoRepresentanteEmpresa?: TipoRepresentanteEmpresaModel.RawRef
  numeroMatricula: number
  creado: string
  modificado: string
}

export interface Entity {
  id: number
  cuitRepresentante: number
  cuitEmpresa: number
  apellidos: string
  nombre: string
  direccionDeclarada: string
  pais?: Ref
  provincia?: Ref
  localidad?: Ref
  tipoRepresentanteEmpresa?: Ref
  numeroMatricula: number
  creado: string
  modificado: string
}

export interface RawRef {
  id: number
  nombre: string
}

export interface CreateData {
  nombre: string
}
export interface CreateData {
  nombre: string
  paisId: number
  tipoRepresentanteEmpresaId: number
  provinciaId: number
  localidadId: number
}
export interface CreateBody {
  nombre: string
  paisId: number
  provinciaId: number
  localidadId: number
  tipoRepresentanteEmpresaId: number
}
