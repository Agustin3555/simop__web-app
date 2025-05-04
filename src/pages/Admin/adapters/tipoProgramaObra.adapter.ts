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

export const getRefs: {
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
    TipoProgramaObraModel.CreateEntity,
    TipoProgramaObraModel.CreateBody
  >
} = {
  input: data => data,
}

export const updateOne: {
  input: InputAdapter<
    TipoProgramaObraModel.UpdateEntity,
    TipoProgramaObraModel.UpdateBody
  >
} = {
  input: data => data,
}
