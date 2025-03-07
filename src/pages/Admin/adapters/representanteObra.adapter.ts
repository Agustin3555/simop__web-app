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

export const getForConnect: {
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
    RepresentanteObraModel.CreateData,
    RepresentanteObraModel.CreateBody
  >
} = {
  input: data => data,
}
export const updateOne: {
  input: InputAdapter<
    RepresentanteObraModel.UpdateData,
    RepresentanteObraModel.UpdateBody
  >
} = {
  input: data => data,
}
