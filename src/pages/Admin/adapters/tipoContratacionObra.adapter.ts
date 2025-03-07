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

export const getForConnect: {
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
    TipoContratacionObraModel.CreateData,
    TipoContratacionObraModel.CreateBody
  >
} = {
  input: data => data,
}
export const updateOne: {
  input: InputAdapter<
    TipoContratacionObraModel.UpdateData,
    TipoContratacionObraModel.UpdateBody
  >
} = {
  input: data => data,
}
