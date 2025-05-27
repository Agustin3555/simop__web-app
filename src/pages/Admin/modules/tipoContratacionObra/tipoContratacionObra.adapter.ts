import { InputAdapter, OutputAdapter } from '@/adapters/config'
import { TipoContratacionObraModel } from '.'

export const getAll: {
  output: OutputAdapter<
    TipoContratacionObraModel.Entity[],
    TipoContratacionObraModel.Entity[]
  >
} = {
  output: response => response,
}

export const getRefs: {
  output: OutputAdapter<
    TipoContratacionObraModel.Ref[],
    TipoContratacionObraModel.Ref[]
  >
} = {
  output: response => response,
}

export const getOne: {
  output: OutputAdapter<
    TipoContratacionObraModel.Entity,
    TipoContratacionObraModel.Entity
  >
} = {
  output: response => response,
}

export const create: {
  input: InputAdapter<
    TipoContratacionObraModel.CreateEntity,
    TipoContratacionObraModel.CreateEntity
  >
} = {
  input: data => data,
}

export const updateOne: {
  input: InputAdapter<
    TipoContratacionObraModel.UpdateEntity,
    TipoContratacionObraModel.UpdateEntity
  >
} = {
  input: data => data,
}
