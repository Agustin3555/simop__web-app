import { InputAdapter, OutputAdapter } from '@/adapters/config'
import { TipoInspectorModel } from '.'

const getAll: {
  output: OutputAdapter<
    TipoInspectorModel.Entity[],
    TipoInspectorModel.Entity[]
  >
} = {
  output: response => response,
}

const getRefs: {
  output: OutputAdapter<TipoInspectorModel.Ref[], TipoInspectorModel.Ref[]>
} = {
  output: response => response,
}

const getOne: {
  output: OutputAdapter<TipoInspectorModel.Entity, TipoInspectorModel.Entity>
} = {
  output: response => response,
}

const create: {
  input: InputAdapter<
    TipoInspectorModel.CreateEntity,
    TipoInspectorModel.CreateEntity
  >
  output: OutputAdapter<TipoInspectorModel.Entity, TipoInspectorModel.Entity>
} = {
  input: data => data,
  output: response => response,
}

const updateOne: {
  input: InputAdapter<
    TipoInspectorModel.UpdateEntity,
    TipoInspectorModel.UpdateEntity
  >
  output: OutputAdapter<TipoInspectorModel.Entity, TipoInspectorModel.Entity>
} = {
  input: data => data,
  output: response => response,
}

export const TipoInspectorAdapter = {
  getAll,
  getRefs,
  getOne,
  create,
  updateOne,
}
