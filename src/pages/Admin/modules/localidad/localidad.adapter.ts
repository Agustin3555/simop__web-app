import { InputAdapter, OutputAdapter } from '@/adapters/config'
import { LocalidadModel } from '.'

export const getAll: {
  output: OutputAdapter<LocalidadModel.Entity[], LocalidadModel.Entity[]>
} = {
  output: response => response,
}

export const getRefs: {
  output: OutputAdapter<LocalidadModel.Ref[], LocalidadModel.Ref[]>
} = {
  output: response => response,
}

export const getOne: {
  output: OutputAdapter<LocalidadModel.Entity, LocalidadModel.Entity>
} = {
  output: response => response,
}

export const create: {
  input: InputAdapter<LocalidadModel.CreateEntity, LocalidadModel.CreateEntity>
} = {
  input: data => data,
}

export const updateOne: {
  input: InputAdapter<LocalidadModel.UpdateEntity, LocalidadModel.UpdateEntity>
} = {
  input: data => data,
}
