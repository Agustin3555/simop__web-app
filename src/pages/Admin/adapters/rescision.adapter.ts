import { InputAdapter, OutputAdapter } from '@/adapters/config'
import { RescisionModel } from '../models'

export const getAll: {
  output: OutputAdapter<RescisionModel.Entity[], RescisionModel.Entity[]>
} = {
  output: response => response,
}

export const getRefs: {
  output: OutputAdapter<RescisionModel.Ref[], RescisionModel.Ref[]>
} = {
  output: response => response,
}

export const getOne: {
  output: OutputAdapter<RescisionModel.Entity, RescisionModel.Entity>
} = {
  output: response => response,
}

export const create: {
  input: InputAdapter<RescisionModel.CreateEntity, RescisionModel.CreateEntity>
} = {
  input: data => data,
}

export const updateOne: {
  input: InputAdapter<RescisionModel.UpdateEntity, RescisionModel.UpdateEntity>
} = {
  input: data => data,
}
