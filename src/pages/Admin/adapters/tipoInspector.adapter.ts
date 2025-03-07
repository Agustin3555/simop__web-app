import { InputAdapter, OutputAdapter } from '@/adapters/config'
import { TipoInspectorModel } from '../models'

export const getAll: {
  output: OutputAdapter<
    TipoInspectorModel.RawEntity[],
    TipoInspectorModel.Entity[]
  >
} = {
  output: response => response,
}

export const getForConnect: {
  output: OutputAdapter<TipoInspectorModel.RawRef[], TipoInspectorModel.Ref[]>
} = {
  output: response => response,
}

export const getOne: {
  output: OutputAdapter<TipoInspectorModel.RawEntity, TipoInspectorModel.Entity>
} = {
  output: response => response,
}

export const create: {
  input: InputAdapter<
    TipoInspectorModel.CreateData,
    TipoInspectorModel.CreateBody
  >
} = {
  input: data => data,
}

export const updateOne: {
  input: InputAdapter<
    TipoInspectorModel.UpdateData,
    TipoInspectorModel.UpdateBody
  >
} = {
  input: data => data,
}
