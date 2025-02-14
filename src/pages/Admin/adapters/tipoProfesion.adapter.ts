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

export const getForConnect: {
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
    TipoProfesionModel.CreateData,
    TipoProfesionModel.CreateBody
  >
} = {
  input: data => data,
}
