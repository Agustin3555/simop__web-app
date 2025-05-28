import { InputAdapter, OutputAdapter } from '@/adapters/config'
import { TipoProgramaObraModel } from '.'

const getAll: {
  output: OutputAdapter<
    TipoProgramaObraModel.Entity[],
    TipoProgramaObraModel.Entity[]
  >
} = {
  output: response => response,
}

const getRefs: {
  output: OutputAdapter<
    TipoProgramaObraModel.Ref[],
    TipoProgramaObraModel.Ref[]
  >
} = {
  output: response => response,
}

const getOne: {
  output: OutputAdapter<
    TipoProgramaObraModel.Entity,
    TipoProgramaObraModel.Entity
  >
} = {
  output: response => response,
}

const create: {
  input: InputAdapter<
    TipoProgramaObraModel.CreateEntity,
    TipoProgramaObraModel.CreateEntity
  >
} = {
  input: data => data,
}

const updateOne: {
  input: InputAdapter<
    TipoProgramaObraModel.UpdateEntity,
    TipoProgramaObraModel.UpdateEntity
  >
} = {
  input: data => data,
}

export const TipoProgramaObraAdapter = {
  getAll,
  getRefs,
  getOne,
  create,
  updateOne,
}
