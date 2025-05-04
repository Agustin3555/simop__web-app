import { InputAdapter, OutputAdapter } from '@/adapters/config'
import { TipoContratacionObraModel } from '../models'

export const getAll: {
  output: OutputAdapter<
    TipoContratacionObraModel.RawEntity[],
    TipoContratacionObraModel.Entity[]
  >
} = {
  output: response => response,
}

export const getRefs: {
  output: OutputAdapter<
    TipoContratacionObraModel.RawRef[],
    TipoContratacionObraModel.Ref[]
  >
} = {
  output: response => response,
}

export const getOne: {
  output: OutputAdapter<
    TipoContratacionObraModel.RawEntity,
    TipoContratacionObraModel.Entity
  >
} = {
  output: response => response,
}

export const create: {
  input: InputAdapter<
    TipoContratacionObraModel.CreateEntity,
    TipoContratacionObraModel.CreateBody
  >
} = {
  input: data => data,
}

export const updateOne: {
  input: InputAdapter<
    TipoContratacionObraModel.UpdateEntity,
    TipoContratacionObraModel.UpdateBody
  >
} = {
  input: data => data,
}
