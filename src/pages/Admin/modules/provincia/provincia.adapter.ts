import { InputAdapter, OutputAdapter } from '@/adapters/config'
import { ProvinciaModel } from '.'

const getAll: {
  output: OutputAdapter<ProvinciaModel.Entity[], ProvinciaModel.Entity[]>
} = {
  output: response => response,
}

const getRefs: {
  output: OutputAdapter<ProvinciaModel.Ref[], ProvinciaModel.Ref[]>
} = {
  output: response => response,
}

const getOne: {
  output: OutputAdapter<ProvinciaModel.Entity, ProvinciaModel.Entity>
} = {
  output: response => response,
}

const create: {
  input: InputAdapter<ProvinciaModel.CreateEntity, ProvinciaModel.CreateEntity>
} = {
  input: data => data,
}

const updateOne: {
  input: InputAdapter<ProvinciaModel.UpdateEntity, ProvinciaModel.UpdateEntity>
} = {
  input: data => data,
}

export const ProvinciaAdapter = {
  getAll,
  getRefs,
  getOne,
  create,
  updateOne,
}
