import { InputAdapter, OutputAdapter } from '@/adapters/config'
import { LocalidadModel } from '.'

const getAll: {
  output: OutputAdapter<LocalidadModel.Entity[], LocalidadModel.Entity[]>
} = {
  output: response => response,
}

const getRefs: {
  output: OutputAdapter<LocalidadModel.Ref[], LocalidadModel.Ref[]>
} = {
  output: response => response,
}

const getOne: {
  output: OutputAdapter<LocalidadModel.Entity, LocalidadModel.Entity>
} = {
  output: response => response,
}

const create: {
  input: InputAdapter<LocalidadModel.CreateEntity, LocalidadModel.CreateEntity>
} = {
  input: data => data,
}

const updateOne: {
  input: InputAdapter<LocalidadModel.UpdateEntity, LocalidadModel.UpdateEntity>
} = {
  input: data => data,
}

export const LocalidadAdapter = {
  getAll,
  getRefs,
  getOne,
  create,
  updateOne,
}
