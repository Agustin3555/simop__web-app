import { InputAdapter, OutputAdapter } from '@/adapters/config'
import { RepresentanteObraModel } from '../models'

export const getAll: {
  output: OutputAdapter<
    RepresentanteObraModel.RawEntity[],
    RepresentanteObraModel.Entity[]
  >
} = {
  output: response => response,
}

export const getRefs: {
  output: OutputAdapter<
    RepresentanteObraModel.RawRef[],
    RepresentanteObraModel.Ref[]
  >
} = {
  output: response => response,
}

export const getOne: {
  output: OutputAdapter<
    RepresentanteObraModel.RawEntity,
    RepresentanteObraModel.Entity
  >
} = {
  output: response => response,
}

export const create: {
  input: InputAdapter<
    RepresentanteObraModel.CreateEntity,
    RepresentanteObraModel.CreateBody
  >
} = {
  input: data => data,
}

export const updateOne: {
  input: InputAdapter<
    RepresentanteObraModel.UpdateEntity,
    RepresentanteObraModel.UpdateBody
  >
} = {
  input: data => data,
}
