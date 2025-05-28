import { InputAdapter, OutputAdapter } from '@/adapters/config'
import { RepresentanteEmpresaModel } from '.'

const getAll: {
  output: OutputAdapter<
    RepresentanteEmpresaModel.Entity[],
    RepresentanteEmpresaModel.Entity[]
  >
} = {
  output: response => response,
}

const getRefs: {
  output: OutputAdapter<
    RepresentanteEmpresaModel.Ref[],
    RepresentanteEmpresaModel.Ref[]
  >
} = {
  output: response => response,
}

const getOne: {
  output: OutputAdapter<
    RepresentanteEmpresaModel.Entity,
    RepresentanteEmpresaModel.Entity
  >
} = {
  output: response => response,
}

const create: {
  input: InputAdapter<
    RepresentanteEmpresaModel.CreateEntity,
    RepresentanteEmpresaModel.CreateEntity
  >
} = {
  input: data => data,
}

const updateOne: {
  input: InputAdapter<
    RepresentanteEmpresaModel.UpdateEntity,
    RepresentanteEmpresaModel.UpdateEntity
  >
} = {
  input: data => data,
}

export const RepresentanteEmpresaAdapter = {
  getAll,
  getRefs,
  getOne,
  create,
  updateOne,
}
