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

export const getForConnect: {
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
    TipoEstadoObraModel.CreateData,
    TipoEstadoObraModel.CreateBody
  >
} = {
  input: data => data,
}
