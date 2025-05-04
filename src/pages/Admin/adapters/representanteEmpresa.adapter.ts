import { InputAdapter, OutputAdapter } from '@/adapters/config'
import { RepresentanteEmpresaModel } from '../models'

export const getAll: {
  output: OutputAdapter<
    RepresentanteEmpresaModel.RawEntity[],
    RepresentanteEmpresaModel.Entity[]
  >
} = {
  output: response => response,
}

export const getRefs: {
  output: OutputAdapter<
    RepresentanteEmpresaModel.RawRef[],
    RepresentanteEmpresaModel.Ref[]
  >
} = {
  output: response => response,
}

export const getOne: {
  output: OutputAdapter<
    RepresentanteEmpresaModel.RawEntity,
    RepresentanteEmpresaModel.Entity
  >
} = {
  output: response => response,
}

export const create: {
  input: InputAdapter<
    RepresentanteEmpresaModel.CreateEntity,
    RepresentanteEmpresaModel.CreateBody
  >
} = {
  input: data => data,
}

export const updateOne: {
  input: InputAdapter<
    RepresentanteEmpresaModel.UpdateEntity,
    RepresentanteEmpresaModel.UpdateBody
  >
} = {
  input: data => data,
}
