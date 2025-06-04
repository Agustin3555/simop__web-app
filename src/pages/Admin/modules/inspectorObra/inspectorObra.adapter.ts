import { InputAdapter, OutputAdapter } from '@/adapters/config'
import { InspectorObraModel } from '.'

const getAll: {
  output: OutputAdapter<
    InspectorObraModel.Entity[],
    InspectorObraModel.Entity[]
  >
} = {
  output: response => response,
}

const getRefs: {
  output: OutputAdapter<InspectorObraModel.Ref[], InspectorObraModel.Ref[]>
} = {
  output: response => response,
}

const getOne: {
  output: OutputAdapter<InspectorObraModel.Entity, InspectorObraModel.Entity>
} = {
  output: response => response,
}

const create: {
  input: InputAdapter<
    InspectorObraModel.CreateEntity,
    InspectorObraModel.CreateEntity
  >
  output: OutputAdapter<InspectorObraModel.Entity, InspectorObraModel.Entity>
} = {
  input: data => data,
  output: response => response,
}

const updateOne: {
  input: InputAdapter<
    InspectorObraModel.UpdateEntity,
    InspectorObraModel.UpdateEntity
  >
  output: OutputAdapter<InspectorObraModel.Entity, InspectorObraModel.Entity>
} = {
  input: data => data,
  output: response => response,
}

export const InspectorObraAdapter = {
  getAll,
  getRefs,
  getOne,
  create,
  updateOne,
}
