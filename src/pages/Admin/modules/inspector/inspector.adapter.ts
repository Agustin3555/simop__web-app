import { InputAdapter, OutputAdapter } from '@/adapters/config'
import { InspectorModel } from '.'

export const getAll: {
  output: OutputAdapter<InspectorModel.Entity[], InspectorModel.Entity[]>
} = {
  output: response => response,
}

export const getRefs: {
  output: OutputAdapter<InspectorModel.Ref[], InspectorModel.Ref[]>
} = {
  output: response => response,
}

export const getOne: {
  output: OutputAdapter<InspectorModel.Entity, InspectorModel.Entity>
} = {
  output: response => response,
}

export const create: {
  input: InputAdapter<InspectorModel.CreateEntity, InspectorModel.CreateEntity>
} = {
  input: data => data,
}

export const updateOne: {
  input: InputAdapter<InspectorModel.UpdateEntity, InspectorModel.UpdateEntity>
} = {
  input: data => data,
}
