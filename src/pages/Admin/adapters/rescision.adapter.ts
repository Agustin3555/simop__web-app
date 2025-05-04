import { InputAdapter, OutputAdapter } from '@/adapters/config'
import { RescisionModel } from '../models'

export const getAll: {
  output: OutputAdapter<RescisionModel.RawEntity[], RescisionModel.Entity[]>
} = {
  output: response => response,
}

export const getRefs: {
  output: OutputAdapter<RescisionModel.RawRef[], RescisionModel.Ref[]>
} = {
  output: response => response,
}

export const getOne: {
  output: OutputAdapter<RescisionModel.RawEntity, RescisionModel.Entity>
} = {
  output: response => response,
}

export const create: {
  input: InputAdapter<RescisionModel.CreateEntity, RescisionModel.CreateBody>
} = {
  input: data => data,
}

export const updateOne: {
  input: InputAdapter<RescisionModel.UpdateEntity, RescisionModel.UpdateBody>
} = {
  input: data => data,
}
