import { InputAdapter, OutputAdapter } from '@/adapters/config'
import { TipoEstadoObraModel } from '.'

export const getAll: {
  output: OutputAdapter<
    TipoEstadoObraModel.Entity[],
    TipoEstadoObraModel.Entity[]
  >
} = {
  output: response => response,
}

export const getRefs: {
  output: OutputAdapter<TipoEstadoObraModel.Ref[], TipoEstadoObraModel.Ref[]>
} = {
  output: response => response,
}

export const getOne: {
  output: OutputAdapter<TipoEstadoObraModel.Entity, TipoEstadoObraModel.Entity>
} = {
  output: response => response,
}

export const create: {
  input: InputAdapter<
    TipoEstadoObraModel.CreateEntity,
    TipoEstadoObraModel.CreateEntity
  >
} = {
  input: data => data,
}

export const updateOne: {
  input: InputAdapter<
    TipoEstadoObraModel.UpdateEntity,
    TipoEstadoObraModel.UpdateEntity
  >
} = {
  input: data => data,
}
