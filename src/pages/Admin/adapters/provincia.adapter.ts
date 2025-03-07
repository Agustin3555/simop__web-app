import { InputAdapter, OutputAdapter } from '@/adapters/config'
import { ProvinciaModel } from '../models'

export const getAll: {
  output: OutputAdapter<ProvinciaModel.RawEntity[], ProvinciaModel.Entity[]>
} = {
  output: response => response,
}

export const getForConnect: {
  output: OutputAdapter<ProvinciaModel.RawRef[], ProvinciaModel.Ref[]>
} = {
  output: response => response,
}

export const getOne: {
  output: OutputAdapter<ProvinciaModel.RawEntity, ProvinciaModel.Entity>
} = {
  output: response => response,
}

export const create: {
  input: InputAdapter<ProvinciaModel.CreateData, ProvinciaModel.CreateBody>
} = {
  input: data => data,
}
export const updateOne: {
  input: InputAdapter<ProvinciaModel.UpdateData, ProvinciaModel.UpdateBody>
} = {
  input: data => data,
}
