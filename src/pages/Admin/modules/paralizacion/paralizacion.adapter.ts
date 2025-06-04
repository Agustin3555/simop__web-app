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
  output: OutputAdapter<ParalizacionModel.Entity, ParalizacionModel.Entity>
} = {
  input: data => data,
  output: response => response,
}

const updateOne: {
  input: InputAdapter<
    ParalizacionModel.UpdateEntity,
    ParalizacionModel.UpdateEntity
  >
  output: OutputAdapter<ParalizacionModel.Entity, ParalizacionModel.Entity>
} = {
  input: data => data,
  output: response => response,
}

export const ParalizacionAdapter = {
  getAll,
  getRefs,
  getOne,
  create,
  updateOne,
}
