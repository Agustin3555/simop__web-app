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
} = {
  input: data => data,
}

const updateOne: {
  input: InputAdapter<
    RepresentanteObraModel.UpdateEntity,
    RepresentanteObraModel.UpdateEntity
  >
} = {
  input: data => data,
}

export const RepresentanteObraAdapter = {
  getAll,
  getRefs,
  getOne,
  create,
  updateOne,
}
