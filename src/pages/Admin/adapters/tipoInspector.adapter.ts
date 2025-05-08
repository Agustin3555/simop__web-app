import { InputAdapter, OutputAdapter } from '@/adapters/config'
import { TipoInspectorModel } from '../models'

export const getAll: {
  output: OutputAdapter<
    TipoInspectorModel.Entity[],
    TipoInspectorModel.Entity[]
  >
} = {
  output: response => response,
}

export const getRefs: {
  output: OutputAdapter<TipoInspectorModel.Ref[], TipoInspectorModel.Ref[]>
} = {
  output: response => response,
}

export const getOne: {
  output: OutputAdapter<TipoInspectorModel.Entity, TipoInspectorModel.Entity>
} = {
  output: response => response,
}

export const create: {
  input: InputAdapter<
    TipoInspectorModel.CreateEntity,
    TipoInspectorModel.CreateEntity
  >
} = {
  input: data => data,
}

export const updateOne: {
  input: InputAdapter<
    TipoInspectorModel.UpdateEntity,
    TipoInspectorModel.UpdateEntity
  >
} = {
  input: data => data,
}
