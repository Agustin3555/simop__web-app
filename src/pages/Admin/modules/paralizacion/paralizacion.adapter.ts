import { InputAdapter, OutputAdapter } from '@/adapters/config'
import { ParalizacionModel } from '.'

const getAll: {
  output: OutputAdapter<ParalizacionModel.Entity[], ParalizacionModel.Entity[]>
} = {
  output: response => response,
}

const getRefs: {
  output: OutputAdapter<ParalizacionModel.Ref[], ParalizacionModel.Ref[]>
} = {
  output: response => response,
}

const getOne: {
  output: OutputAdapter<ParalizacionModel.Entity, ParalizacionModel.Entity>
} = {
  output: response => response,
}

const create: {
  input: InputAdapter<
    ParalizacionModel.CreateEntity,
    ParalizacionModel.CreateEntity
  >
} = {
  input: data => data,
}

const updateOne: {
  input: InputAdapter<
    ParalizacionModel.UpdateEntity,
    ParalizacionModel.UpdateEntity
  >
} = {
  input: data => data,
}

export const ParalizacionAdapter = {
  getAll,
  getRefs,
  getOne,
  create,
  updateOne,
}
