import { InputAdapter, OutputAdapter } from '@/adapters/config'
import { InspectorObraModel } from '.'

export const getAll: {
  output: OutputAdapter<
    InspectorObraModel.Entity[],
    InspectorObraModel.Entity[]
  >
} = {
  output: response => response,
}

export const getRefs: {
  output: OutputAdapter<InspectorObraModel.Ref[], InspectorObraModel.Ref[]>
} = {
  output: response => response,
}

export const getOne: {
  output: OutputAdapter<InspectorObraModel.Entity, InspectorObraModel.Entity>
} = {
  output: response => response,
}

export const create: {
  input: InputAdapter<
    InspectorObraModel.CreateEntity,
    InspectorObraModel.CreateEntity
  >
} = {
  input: data => data,
}

export const updateOne: {
  input: InputAdapter<
    InspectorObraModel.UpdateEntity,
    InspectorObraModel.UpdateEntity
  >
} = {
  input: data => data,
}
