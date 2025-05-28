import { InputAdapter, OutputAdapter } from '@/adapters/config'
import { ModificacionModel } from '.'

const getAll: {
  output: OutputAdapter<ModificacionModel.Entity[], ModificacionModel.Entity[]>
} = {
  output: response => response,
}

const getRefs: {
  output: OutputAdapter<ModificacionModel.Ref[], ModificacionModel.Ref[]>
} = {
  output: response => response,
}

const getOne: {
  output: OutputAdapter<ModificacionModel.Entity, ModificacionModel.Entity>
} = {
  output: response => response,
}

const create: {
  input: InputAdapter<
    ModificacionModel.CreateEntity,
    ModificacionModel.CreateEntity
  >
} = {
  input: data => data,
}

const updateOne: {
  input: InputAdapter<
    ModificacionModel.UpdateEntity,
    ModificacionModel.UpdateEntity
  >
} = {
  input: data => data,
}

export const ModificacionAdapter = {
  getAll,
  getRefs,
  getOne,
  create,
  updateOne,
}
