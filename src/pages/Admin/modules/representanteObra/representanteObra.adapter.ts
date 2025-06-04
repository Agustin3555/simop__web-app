import { InputAdapter, OutputAdapter } from '@/adapters/config'
import { RepresentanteObraModel } from '.'

const getAll: {
  output: OutputAdapter<
    RepresentanteObraModel.Entity[],
    RepresentanteObraModel.Entity[]
  >
} = {
  output: response => response,
}

const getRefs: {
  output: OutputAdapter<
    RepresentanteObraModel.Ref[],
    RepresentanteObraModel.Ref[]
  >
} = {
  output: response => response,
}

const getOne: {
  output: OutputAdapter<
    RepresentanteObraModel.Entity,
    RepresentanteObraModel.Entity
  >
} = {
  output: response => response,
}

const create: {
  input: InputAdapter<
    RepresentanteObraModel.CreateEntity,
    RepresentanteObraModel.CreateEntity
  >
  output: OutputAdapter<
    RepresentanteObraModel.Entity,
    RepresentanteObraModel.Entity
  >
} = {
  input: data => data,
  output: response => response,
}

const updateOne: {
  input: InputAdapter<
    RepresentanteObraModel.UpdateEntity,
    RepresentanteObraModel.UpdateEntity
  >
  output: OutputAdapter<
    RepresentanteObraModel.Entity,
    RepresentanteObraModel.Entity
  >
} = {
  input: data => data,
  output: response => response,
}

export const RepresentanteObraAdapter = {
  getAll,
  getRefs,
  getOne,
  create,
  updateOne,
}
