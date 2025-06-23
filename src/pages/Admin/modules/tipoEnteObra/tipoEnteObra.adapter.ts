import { InputAdapter, OutputAdapter } from '@/adapters/config'
import { TipoEnteObraModel } from '.'

const getAll: {
  output: OutputAdapter<TipoEnteObraModel.Entity[], TipoEnteObraModel.Entity[]>
} = {
  output: response => response,
}

const getRefs: {
  output: OutputAdapter<TipoEnteObraModel.Ref[], TipoEnteObraModel.Ref[]>
} = {
  output: response => response,
}

const getOne: {
  output: OutputAdapter<TipoEnteObraModel.Entity, TipoEnteObraModel.Entity>
} = {
  output: response => response,
}

const create: {
  input: InputAdapter<
    TipoEnteObraModel.CreateEntity,
    TipoEnteObraModel.CreateEntity
  >
  output: OutputAdapter<TipoEnteObraModel.Entity, TipoEnteObraModel.Entity>
} = {
  input: data => data,
  output: response => response,
}

const updateOne: {
  input: InputAdapter<
    TipoEnteObraModel.UpdateEntity,
    TipoEnteObraModel.UpdateEntity
  >
  output: OutputAdapter<TipoEnteObraModel.Entity, TipoEnteObraModel.Entity>
} = {
  input: data => data,
  output: response => response,
}

export const TipoEnteObraAdapter = {
  getAll,
  getRefs,
  getOne,
  create,
  updateOne,
}
