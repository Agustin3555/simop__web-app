import { InputAdapter, OutputAdapter } from '@/adapters/config'
import { TipoRescisionModel } from '../models'

export const getAll: {
  output: OutputAdapter<
    TipoRescisionModel.RawEntity[],
    TipoRescisionModel.Entity[]
  >
} = {
  output: response => response,
}

export const getRefs: {
  output: OutputAdapter<TipoRescisionModel.RawRef[], TipoRescisionModel.Ref[]>
} = {
  output: response => response,
}

export const getOne: {
  output: OutputAdapter<TipoRescisionModel.RawEntity, TipoRescisionModel.Entity>
} = {
  output: response => response,
}

export const create: {
  input: InputAdapter<
    TipoRescisionModel.CreateEntity,
    TipoRescisionModel.CreateBody
  >
} = {
  input: data => data,
}

export const updateOne: {
  input: InputAdapter<
    TipoRescisionModel.UpdateEntity,
    TipoRescisionModel.UpdateBody
  >
} = {
  input: data => data,
}
