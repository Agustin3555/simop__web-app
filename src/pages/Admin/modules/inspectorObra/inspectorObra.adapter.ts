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
} = {
  input: data => data,
}

const updateOne: {
  input: InputAdapter<
    InspectorObraModel.UpdateEntity,
    InspectorObraModel.UpdateEntity
  >
} = {
  input: data => data,
}

export const InspectorObraAdapter = {
  getAll,
  getRefs,
  getOne,
  create,
  updateOne,
}
