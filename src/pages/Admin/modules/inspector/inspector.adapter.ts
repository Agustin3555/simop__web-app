import { InputAdapter, OutputAdapter } from '@/adapters/config'
import { InspectorModel } from '.'

const getAll: {
  output: OutputAdapter<InspectorModel.Entity[], InspectorModel.Entity[]>
} = {
  output: response => response,
}

const getRefs: {
  output: OutputAdapter<InspectorModel.Ref[], InspectorModel.Ref[]>
} = {
  output: response => response,
}

const getOne: {
  output: OutputAdapter<InspectorModel.Entity, InspectorModel.Entity>
} = {
  output: response => response,
}

const create: {
  input: InputAdapter<InspectorModel.CreateEntity, InspectorModel.CreateEntity>
  output: OutputAdapter<InspectorModel.Entity, InspectorModel.Entity>
} = {
  input: data => data,
  output: response => response,
}

const updateOne: {
  input: InputAdapter<InspectorModel.UpdateEntity, InspectorModel.UpdateEntity>
  output: OutputAdapter<InspectorModel.Entity, InspectorModel.Entity>
} = {
  input: data => data,
  output: response => response,
}

export const InspectorAdapter = {
  getAll,
  getRefs,
  getOne,
  create,
  updateOne,
}
