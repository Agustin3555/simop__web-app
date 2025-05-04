import { InputAdapter, OutputAdapter } from '@/adapters/config'
import { TipoProfesionModel } from '../models'

export const getAll: {
  output: OutputAdapter<
    TipoProfesionModel.RawEntity[],
    TipoProfesionModel.Entity[]
  >
} = {
  output: response => response,
}

export const getRefs: {
  output: OutputAdapter<TipoProfesionModel.RawRef[], TipoProfesionModel.Ref[]>
} = {
  output: response => response,
}

export const getOne: {
  output: OutputAdapter<TipoProfesionModel.RawEntity, TipoProfesionModel.Entity>
} = {
  output: response => response,
}

export const create: {
  input: InputAdapter<
    TipoProfesionModel.CreateEntity,
    TipoProfesionModel.CreateBody
  >
} = {
  input: data => data,
}

export const updateOne: {
  input: InputAdapter<
    TipoProfesionModel.UpdateEntity,
    TipoProfesionModel.UpdateBody
  >
} = {
  input: data => data,
}
