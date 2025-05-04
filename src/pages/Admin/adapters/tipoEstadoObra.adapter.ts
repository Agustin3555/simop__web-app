import { InputAdapter, OutputAdapter } from '@/adapters/config'
import { TipoEstadoObraModel } from '../models'

export const getAll: {
  output: OutputAdapter<
    TipoEstadoObraModel.RawEntity[],
    TipoEstadoObraModel.Entity[]
  >
} = {
  output: response => response,
}

export const getRefs: {
  output: OutputAdapter<TipoEstadoObraModel.RawRef[], TipoEstadoObraModel.Ref[]>
} = {
  output: response => response,
}

export const getOne: {
  output: OutputAdapter<
    TipoEstadoObraModel.RawEntity,
    TipoEstadoObraModel.Entity
  >
} = {
  output: response => response,
}

export const create: {
  input: InputAdapter<
    TipoEstadoObraModel.CreateEntity,
    TipoEstadoObraModel.CreateBody
  >
} = {
  input: data => data,
}

export const updateOne: {
  input: InputAdapter<
    TipoEstadoObraModel.UpdateEntity,
    TipoEstadoObraModel.UpdateBody
  >
} = {
  input: data => data,
}
