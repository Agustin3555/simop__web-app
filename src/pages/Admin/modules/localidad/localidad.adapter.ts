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
  output: OutputAdapter<LocalidadModel.Entity, LocalidadModel.Entity>
} = {
  input: data => data,
  output: response => response,
}

const updateOne: {
  input: InputAdapter<LocalidadModel.UpdateEntity, LocalidadModel.UpdateEntity>
  output: OutputAdapter<LocalidadModel.Entity, LocalidadModel.Entity>
} = {
  input: data => data,
  output: response => response,
}

export const LocalidadAdapter = {
  getAll,
  getRefs,
  getOne,
  create,
  updateOne,
}
