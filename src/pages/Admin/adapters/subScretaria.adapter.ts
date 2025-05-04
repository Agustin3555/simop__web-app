import { InputAdapter, OutputAdapter } from '@/adapters/config'
import { SubSecretariaModel } from '../models'

export const getAll: {
  output: OutputAdapter<
    SubSecretariaModel.RawEntity[],
    SubSecretariaModel.Entity[]
  >
} = {
  output: response => response,
}

export const getRefs: {
  output: OutputAdapter<SubSecretariaModel.RawRef[], SubSecretariaModel.Ref[]>
} = {
  output: response => response,
}

export const getOne: {
  output: OutputAdapter<SubSecretariaModel.RawEntity, SubSecretariaModel.Entity>
} = {
  output: response => response,
}

export const create: {
  input: InputAdapter<
    SubSecretariaModel.CreateEntity,
    SubSecretariaModel.CreateBody
  >
} = {
  input: data => data,
}

export const updateOne: {
  input: InputAdapter<
    SubSecretariaModel.UpdateEntity,
    SubSecretariaModel.UpdateBody
  >
} = {
  input: data => data,
}
