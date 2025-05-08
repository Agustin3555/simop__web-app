import { InputAdapter, OutputAdapter } from '@/adapters/config'
import { RepresentanteObraModel } from '../models'

export const getAll: {
  output: OutputAdapter<
    RepresentanteObraModel.Entity[],
    RepresentanteObraModel.Entity[]
  >
} = {
  output: response => response,
}

export const getRefs: {
  output: OutputAdapter<
    RepresentanteObraModel.Ref[],
    RepresentanteObraModel.Ref[]
  >
} = {
  output: response => response,
}

export const getOne: {
  output: OutputAdapter<
    RepresentanteObraModel.Entity,
    RepresentanteObraModel.Entity
  >
} = {
  output: response => response,
}

export const create: {
  input: InputAdapter<
    RepresentanteObraModel.CreateEntity,
    RepresentanteObraModel.CreateEntity
  >
} = {
  input: data => data,
}

export const updateOne: {
  input: InputAdapter<
    RepresentanteObraModel.UpdateEntity,
    RepresentanteObraModel.UpdateEntity
  >
} = {
  input: data => data,
}
