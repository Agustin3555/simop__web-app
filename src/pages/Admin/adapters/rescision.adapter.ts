import { InputAdapter, OutputAdapter } from '@/adapters/config'
import { RescisionModel } from '../models'

export const getAll: {
  output: OutputAdapter<RescisionModel.RawEntity[], RescisionModel.Entity[]>
} = {
  output: response => response,
}

export const getForConnect: {
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
  input: InputAdapter<RescisionModel.CreateData, RescisionModel.CreateBody>
} = {
  input: data => data,
}
