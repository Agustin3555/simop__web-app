import { InputAdapter, OutputAdapter } from '@/adapters/config'
import { TipoEstadoObraModel } from '.'

const getAll: {
  output: OutputAdapter<
    TipoEstadoObraModel.Entity[],
    TipoEstadoObraModel.Entity[]
  >
} = {
  output: response => response,
}

const getRefs: {
  output: OutputAdapter<TipoEstadoObraModel.Ref[], TipoEstadoObraModel.Ref[]>
} = {
  output: response => response,
}

const getOne: {
  output: OutputAdapter<TipoEstadoObraModel.Entity, TipoEstadoObraModel.Entity>
} = {
  output: response => response,
}

const create: {
  input: InputAdapter<
    TipoEstadoObraModel.CreateEntity,
    TipoEstadoObraModel.CreateEntity
  >
} = {
  input: data => data,
}

const updateOne: {
  input: InputAdapter<
    TipoEstadoObraModel.UpdateEntity,
    TipoEstadoObraModel.UpdateEntity
  >
} = {
  input: data => data,
}

export const TipoEstadoObraAdapter = {
  getAll,
  getRefs,
  getOne,
  create,
  updateOne,
}
