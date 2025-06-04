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
  output: OutputAdapter<TipoProfesionModel.Entity, TipoProfesionModel.Entity>
} = {
  input: data => data,
  output: response => response,
}

const updateOne: {
  input: InputAdapter<
    TipoProfesionModel.UpdateEntity,
    TipoProfesionModel.UpdateEntity
  >
  output: OutputAdapter<TipoProfesionModel.Entity, TipoProfesionModel.Entity>
} = {
  input: data => data,
  output: response => response,
}

export const TipoProfesionAdapter = {
  getAll,
  getRefs,
  getOne,
  create,
  updateOne,
}
