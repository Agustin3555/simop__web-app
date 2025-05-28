import { InputAdapter, OutputAdapter } from '@/adapters/config'
import { TipoProfesionModel } from '.'

const getAll: {
  output: OutputAdapter<
    TipoProfesionModel.Entity[],
    TipoProfesionModel.Entity[]
  >
} = {
  output: response => response,
}

const getRefs: {
  output: OutputAdapter<TipoProfesionModel.Ref[], TipoProfesionModel.Ref[]>
} = {
  output: response => response,
}

const getOne: {
  output: OutputAdapter<TipoProfesionModel.Entity, TipoProfesionModel.Entity>
} = {
  output: response => response,
}

const create: {
  input: InputAdapter<
    TipoProfesionModel.CreateEntity,
    TipoProfesionModel.CreateEntity
  >
} = {
  input: data => data,
}

const updateOne: {
  input: InputAdapter<
    TipoProfesionModel.UpdateEntity,
    TipoProfesionModel.UpdateEntity
  >
} = {
  input: data => data,
}

export const TipoProfesionAdapter = {
  getAll,
  getRefs,
  getOne,
  create,
  updateOne,
}
