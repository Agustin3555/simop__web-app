import { InputAdapter, OutputAdapter } from '@/adapters/config'
import { TipoRepresentanteModel } from '.'

const getAll: {
  output: OutputAdapter<
    TipoRepresentanteModel.Entity[],
    TipoRepresentanteModel.Entity[]
  >
} = {
  output: response => response,
}

const getRefs: {
  output: OutputAdapter<
    TipoRepresentanteModel.Ref[],
    TipoRepresentanteModel.Ref[]
  >
} = {
  output: response => response,
}

const getOne: {
  output: OutputAdapter<
    TipoRepresentanteModel.Entity,
    TipoRepresentanteModel.Entity
  >
} = {
  output: response => response,
}

const create: {
  input: InputAdapter<
    TipoRepresentanteModel.CreateEntity,
    TipoRepresentanteModel.CreateEntity
  >
  output: OutputAdapter<
    TipoRepresentanteModel.Entity,
    TipoRepresentanteModel.Entity
  >
} = {
  input: data => data,
  output: response => response,
}

const updateOne: {
  input: InputAdapter<
    TipoRepresentanteModel.UpdateEntity,
    TipoRepresentanteModel.UpdateEntity
  >
  output: OutputAdapter<
    TipoRepresentanteModel.Entity,
    TipoRepresentanteModel.Entity
  >
} = {
  input: data => data,
  output: response => response,
}

export const TipoRepresentanteAdapter = {
  getAll,
  getRefs,
  getOne,
  create,
  updateOne,
}
