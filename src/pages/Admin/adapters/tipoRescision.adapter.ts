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

export const getForConnect: {
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
    TipoRescisionModel.CreateData,
    TipoRescisionModel.CreateBody
  >
} = {
  input: data => data,
}
