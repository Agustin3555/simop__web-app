import { InputAdapter, OutputAdapter } from '@/adapters/config'
import { RepresentanteEmpresaModel } from '../models'

export const getAll: {
  output: OutputAdapter<
    RepresentanteEmpresaModel.Entity[],
    RepresentanteEmpresaModel.Entity[]
  >
} = {
  output: response => response,
}

export const getRefs: {
  output: OutputAdapter<
    RepresentanteEmpresaModel.Ref[],
    RepresentanteEmpresaModel.Ref[]
  >
} = {
  output: response => response,
}

export const getOne: {
  output: OutputAdapter<
    RepresentanteEmpresaModel.Entity,
    RepresentanteEmpresaModel.Entity
  >
} = {
  output: response => response,
}

export const create: {
  input: InputAdapter<
    RepresentanteEmpresaModel.CreateEntity,
    RepresentanteEmpresaModel.CreateEntity
  >
} = {
  input: data => data,
}

export const updateOne: {
  input: InputAdapter<
    RepresentanteEmpresaModel.UpdateEntity,
    RepresentanteEmpresaModel.UpdateEntity
  >
} = {
  input: data => data,
}
