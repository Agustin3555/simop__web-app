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

export const getForConnect: {
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
    RepresentanteEmpresaModel.CreateData,
    RepresentanteEmpresaModel.CreateBody
  >
} = {
  input: data => data,
}

export const updateOne: {
  input: InputAdapter<
    RepresentanteEmpresaModel.UpdateData,
    RepresentanteEmpresaModel.UpdateBody
  >
} = {
  input: data => data,
}
