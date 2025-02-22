import { InputAdapter, OutputAdapter } from '@/adapters/config'
import { LocalidadModel } from '../models'

export const getAll: {
  output: OutputAdapter<LocalidadModel.RawEntity[], LocalidadModel.Entity[]>
} = {
  output: response => response,
}

export const getForConnect: {
  output: OutputAdapter<LocalidadModel.RawRef[], LocalidadModel.Ref[]>
} = {
  output: response => response,
}

export const getOne: {
  output: OutputAdapter<LocalidadModel.RawEntity, LocalidadModel.Entity>
} = {
  output: response => response,
}

export const create: {
  input: InputAdapter<LocalidadModel.CreateData, LocalidadModel.CreateBody>
} = {
  input: data => data,
}
