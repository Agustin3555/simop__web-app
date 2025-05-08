import { InputAdapter, OutputAdapter } from '@/adapters/config'
import { ProvinciaModel } from '../models'

export const getAll: {
  output: OutputAdapter<ProvinciaModel.Entity[], ProvinciaModel.Entity[]>
} = {
  output: response => response,
}

export const getRefs: {
  output: OutputAdapter<ProvinciaModel.Ref[], ProvinciaModel.Ref[]>
} = {
  output: response => response,
}

export const getOne: {
  output: OutputAdapter<ProvinciaModel.Entity, ProvinciaModel.Entity>
} = {
  output: response => response,
}

export const create: {
  input: InputAdapter<ProvinciaModel.CreateEntity, ProvinciaModel.CreateEntity>
} = {
  input: data => data,
}

export const updateOne: {
  input: InputAdapter<ProvinciaModel.UpdateEntity, ProvinciaModel.UpdateEntity>
} = {
  input: data => data,
}
