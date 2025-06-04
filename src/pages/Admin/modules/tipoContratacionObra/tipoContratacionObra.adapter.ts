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
  output: OutputAdapter<
    TipoContratacionObraModel.Entity,
    TipoContratacionObraModel.Entity
  >
} = {
  input: data => data,
  output: response => response,
}

const updateOne: {
  input: InputAdapter<
    TipoContratacionObraModel.UpdateEntity,
    TipoContratacionObraModel.UpdateEntity
  >
  output: OutputAdapter<
    TipoContratacionObraModel.Entity,
    TipoContratacionObraModel.Entity
  >
} = {
  input: data => data,
  output: response => response,
}

export const TipoContratacionObraAdapter = {
  getAll,
  getRefs,
  getOne,
  create,
  updateOne,
}
