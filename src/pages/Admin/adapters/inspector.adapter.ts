import { InputAdapter, OutputAdapter } from '@/adapters/config'
import { InspectorModel } from '../models'

export const getAll: {
  output: OutputAdapter<InspectorModel.RawEntity[], InspectorModel.Entity[]>
} = {
  output: response => response,
}

export const getForConnect: {
  output: OutputAdapter<InspectorModel.RawRef[], InspectorModel.Ref[]>
} = {
  output: response => response,
}

export const getOne: {
  output: OutputAdapter<InspectorModel.RawEntity, InspectorModel.Entity>
} = {
  output: response => response,
}

export const create: {
  input: InputAdapter<InspectorModel.CreateData, InspectorModel.CreateBody>
} = {
  input: data => data,
}

export const updateOne: {
  input: InputAdapter<InspectorModel.UpdateData, InspectorModel.UpdateBody>
} = {
  input: data => data,
}
