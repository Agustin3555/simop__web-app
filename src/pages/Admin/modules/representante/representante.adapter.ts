import { InputAdapter, OutputAdapter } from '@/adapters/config'
import { RepresentanteModel } from '.'

const getAll: {
  output: OutputAdapter<
    RepresentanteModel.Entity[],
    RepresentanteModel.Entity[]
  >
} = {
  output: response => response,
}

const getRefs: {
  output: OutputAdapter<RepresentanteModel.Ref[], RepresentanteModel.Ref[]>
} = {
  output: response => response,
}

const getOne: {
  output: OutputAdapter<RepresentanteModel.Entity, RepresentanteModel.Entity>
} = {
  output: response => response,
}

const create: {
  input: InputAdapter<
    RepresentanteModel.CreateEntity,
    RepresentanteModel.CreateEntity
  >
} = {
  input: data => data,
}

const updateOne: {
  input: InputAdapter<
    RepresentanteModel.UpdateEntity,
    RepresentanteModel.UpdateEntity
  >
} = {
  input: data => data,
}

export const RepresentanteAdapter = {
  getAll,
  getRefs,
  getOne,
  create,
  updateOne,
}
