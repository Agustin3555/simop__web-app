import { InputAdapter, OutputAdapter } from '@/adapters/config'
import { InspectorObraModel } from '../models'

export const getAll: {
  output: OutputAdapter<
    InspectorObraModel.RawEntity[],
    InspectorObraModel.Entity[]
  >
} = {
  output: response => response,
}

export const getForConnect: {
  output: OutputAdapter<InspectorObraModel.RawRef[], InspectorObraModel.Ref[]>
} = {
  output: response => response,
}

export const getOne: {
  output: OutputAdapter<InspectorObraModel.RawEntity, InspectorObraModel.Entity>
} = {
  output: response => response,
}

export const create: {
  input: InputAdapter<
    InspectorObraModel.CreateData,
    InspectorObraModel.CreateBody
  >
} = {
  input: data => data,
}

export const updateOne: {
  input: InputAdapter<
    InspectorObraModel.UpdateData,
    InspectorObraModel.UpdateBody
  >
} = {
  input: data => data,
}
