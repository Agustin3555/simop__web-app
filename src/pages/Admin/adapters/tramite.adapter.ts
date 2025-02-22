import { InputAdapter, OutputAdapter } from '@/adapters/config'
import { TramiteModel } from '../models'

export const getAll: {
  output: OutputAdapter<TramiteModel.RawEntity[], TramiteModel.Entity[]>
} = {
  output: response => response,
}

export const getForConnect: {
  output: OutputAdapter<TramiteModel.RawRef[], TramiteModel.Ref[]>
} = {
  output: response => response,
}

export const getOne: {
  output: OutputAdapter<TramiteModel.RawEntity, TramiteModel.Entity>
} = {
  output: response => response,
}

export const create: {
  input: InputAdapter<TramiteModel.CreateData, TramiteModel.CreateBody>
} = {
  input: data => data,
}
