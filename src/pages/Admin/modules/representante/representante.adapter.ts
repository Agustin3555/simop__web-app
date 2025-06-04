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
  output: OutputAdapter<RepresentanteModel.Entity, RepresentanteModel.Entity>
} = {
  input: data => data,
  output: response => response,
}

const updateOne: {
  input: InputAdapter<
    RepresentanteModel.UpdateEntity,
    RepresentanteModel.UpdateEntity
  >
  output: OutputAdapter<RepresentanteModel.Entity, RepresentanteModel.Entity>
} = {
  input: data => data,
  output: response => response,
}

export const RepresentanteAdapter = {
  getAll,
  getRefs,
  getOne,
  create,
  updateOne,
}
