import { InputAdapter, OutputAdapter } from '@/adapters/config'
import { TipoContratacionObraModel } from '.'

const getAll: {
  output: OutputAdapter<
    TipoContratacionObraModel.Entity[],
    TipoContratacionObraModel.Entity[]
  >
} = {
  output: response => response,
}

const getRefs: {
  output: OutputAdapter<
    TipoContratacionObraModel.Ref[],
    TipoContratacionObraModel.Ref[]
  >
} = {
  output: response => response,
}

const getOne: {
  output: OutputAdapter<
    TipoContratacionObraModel.Entity,
    TipoContratacionObraModel.Entity
  >
} = {
  output: response => response,
}

const create: {
  input: InputAdapter<
    TipoContratacionObraModel.CreateEntity,
    TipoContratacionObraModel.CreateEntity
  >
} = {
  input: data => data,
}

const updateOne: {
  input: InputAdapter<
    TipoContratacionObraModel.UpdateEntity,
    TipoContratacionObraModel.UpdateEntity
  >
} = {
  input: data => data,
}

export const TipoContratacionObraAdapter = {
  getAll,
  getRefs,
  getOne,
  create,
  updateOne,
}
