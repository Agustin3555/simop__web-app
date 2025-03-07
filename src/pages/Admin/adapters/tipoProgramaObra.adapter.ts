import { InputAdapter, OutputAdapter } from '@/adapters/config'
import { TipoProgramaObraModel } from '../models'

export const getAll: {
  output: OutputAdapter<
    TipoProgramaObraModel.RawEntity[],
    TipoProgramaObraModel.Entity[]
  >
} = {
  output: response => response,
}

export const getForConnect: {
  output: OutputAdapter<
    TipoProgramaObraModel.RawRef[],
    TipoProgramaObraModel.Ref[]
  >
} = {
  output: response => response,
}

export const getOne: {
  output: OutputAdapter<
    TipoProgramaObraModel.RawEntity,
    TipoProgramaObraModel.Entity
  >
} = {
  output: response => response,
}

export const create: {
  input: InputAdapter<
    TipoProgramaObraModel.CreateData,
    TipoProgramaObraModel.CreateBody
  >
} = {
  input: data => data,
}
export const updateOne: {
  input: InputAdapter<
    TipoProgramaObraModel.UpdateData,
    TipoProgramaObraModel.UpdateBody
  >
} = {
  input: data => data,
}
