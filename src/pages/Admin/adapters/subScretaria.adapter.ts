import { InputAdapter, OutputAdapter } from '@/adapters/config'
import { SubSecretariaModel } from '../models'

export const getAll: {
  output: OutputAdapter<
    SubSecretariaModel.Entity[],
    SubSecretariaModel.Entity[]
  >
} = {
  output: response => response,
}

export const getRefs: {
  output: OutputAdapter<SubSecretariaModel.Ref[], SubSecretariaModel.Ref[]>
} = {
  output: response => response,
}

export const getOne: {
  output: OutputAdapter<SubSecretariaModel.Entity, SubSecretariaModel.Entity>
} = {
  output: response => response,
}

export const create: {
  input: InputAdapter<
    SubSecretariaModel.CreateEntity,
    SubSecretariaModel.CreateEntity
  >
} = {
  input: data => data,
}

export const updateOne: {
  input: InputAdapter<
    SubSecretariaModel.UpdateEntity,
    SubSecretariaModel.UpdateEntity
  >
} = {
  input: data => data,
}
