import { InputAdapter, OutputAdapter } from '@/adapters/config'
import { TipoRepresentanteModel } from '.'

export const getAll: {
  output: OutputAdapter<
    TipoRepresentanteModel.Entity[],
    TipoRepresentanteModel.Entity[]
  >
} = {
  output: response => response,
}

export const getRefs: {
  output: OutputAdapter<
    TipoRepresentanteModel.Ref[],
    TipoRepresentanteModel.Ref[]
  >
} = {
  output: response => response,
}

export const getOne: {
  output: OutputAdapter<
    TipoRepresentanteModel.Entity,
    TipoRepresentanteModel.Entity
  >
} = {
  output: response => response,
}

export const create: {
  input: InputAdapter<
    TipoRepresentanteModel.CreateEntity,
    TipoRepresentanteModel.CreateEntity
  >
} = {
  input: data => data,
}

export const updateOne: {
  input: InputAdapter<
    TipoRepresentanteModel.UpdateEntity,
    TipoRepresentanteModel.UpdateEntity
  >
} = {
  input: data => data,
}
