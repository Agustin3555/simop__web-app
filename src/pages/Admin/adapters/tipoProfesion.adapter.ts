import { InputAdapter, OutputAdapter } from '@/adapters/config'
import { TipoProfesionModel } from '../models'

export const getAll: {
  output: OutputAdapter<
    TipoProfesionModel.Entity[],
    TipoProfesionModel.Entity[]
  >
} = {
  output: response => response,
}

export const getRefs: {
  output: OutputAdapter<TipoProfesionModel.Ref[], TipoProfesionModel.Ref[]>
} = {
  output: response => response,
}

export const getOne: {
  output: OutputAdapter<TipoProfesionModel.Entity, TipoProfesionModel.Entity>
} = {
  output: response => response,
}

export const create: {
  input: InputAdapter<
    TipoProfesionModel.CreateEntity,
    TipoProfesionModel.CreateEntity
  >
} = {
  input: data => data,
}

export const updateOne: {
  input: InputAdapter<
    TipoProfesionModel.UpdateEntity,
    TipoProfesionModel.UpdateEntity
  >
} = {
  input: data => data,
}
