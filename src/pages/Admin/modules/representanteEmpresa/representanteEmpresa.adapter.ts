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
  output: OutputAdapter<
    RepresentanteEmpresaModel.Entity,
    RepresentanteEmpresaModel.Entity
  >
} = {
  input: data => data,
  output: response => response,
}

const updateOne: {
  input: InputAdapter<
    RepresentanteEmpresaModel.UpdateEntity,
    RepresentanteEmpresaModel.UpdateEntity
  >
  output: OutputAdapter<
    RepresentanteEmpresaModel.Entity,
    RepresentanteEmpresaModel.Entity
  >
} = {
  input: data => data,
  output: response => response,
}

export const RepresentanteEmpresaAdapter = {
  getAll,
  getRefs,
  getOne,
  create,
  updateOne,
}
