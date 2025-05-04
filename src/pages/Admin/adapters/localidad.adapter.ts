import { InputAdapter, OutputAdapter } from '@/adapters/config'
import { LocalidadModel } from '../models'

export const getAll: {
  output: OutputAdapter<LocalidadModel.RawEntity[], LocalidadModel.Entity[]>
} = {
  output: response => response,
}

export const getRefs: {
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
  input: InputAdapter<LocalidadModel.CreateEntity, LocalidadModel.CreateBody>
} = {
  input: data => data,
}

export const updateOne: {
  input: InputAdapter<LocalidadModel.UpdateEntity, LocalidadModel.UpdateBody>
} = {
  input: data => data,
}
