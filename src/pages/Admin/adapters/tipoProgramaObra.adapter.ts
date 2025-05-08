import { InputAdapter, OutputAdapter } from '@/adapters/config'
import { TipoProgramaObraModel } from '../models'

export const getAll: {
  output: OutputAdapter<
    TipoProgramaObraModel.Entity[],
    TipoProgramaObraModel.Entity[]
  >
} = {
  output: response => response,
}

export const getRefs: {
  output: OutputAdapter<
    TipoProgramaObraModel.Ref[],
    TipoProgramaObraModel.Ref[]
  >
} = {
  output: response => response,
}

export const getOne: {
  output: OutputAdapter<
    TipoProgramaObraModel.Entity,
    TipoProgramaObraModel.Entity
  >
} = {
  output: response => response,
}

export const create: {
  input: InputAdapter<
    TipoProgramaObraModel.CreateEntity,
    TipoProgramaObraModel.CreateEntity
  >
} = {
  input: data => data,
}

export const updateOne: {
  input: InputAdapter<
    TipoProgramaObraModel.UpdateEntity,
    TipoProgramaObraModel.UpdateEntity
  >
} = {
  input: data => data,
}
