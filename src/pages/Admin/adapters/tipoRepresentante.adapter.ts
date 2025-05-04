import { InputAdapter, OutputAdapter } from '@/adapters/config'
import { TipoRepresentanteModel } from '../models'

export const getAll: {
  output: OutputAdapter<
    TipoRepresentanteModel.RawEntity[],
    TipoRepresentanteModel.Entity[]
  >
} = {
  output: response => response,
}

export const getRefs: {
  output: OutputAdapter<
    TipoRepresentanteModel.RawRef[],
    TipoRepresentanteModel.Ref[]
  >
} = {
  output: response => response,
}

export const getOne: {
  output: OutputAdapter<
    TipoRepresentanteModel.RawEntity,
    TipoRepresentanteModel.Entity
  >
} = {
  output: response => response,
}

export const create: {
  input: InputAdapter<
    TipoRepresentanteModel.CreateEntity,
    TipoRepresentanteModel.CreateBody
  >
} = {
  input: data => data,
}

export const updateOne: {
  input: InputAdapter<
    TipoRepresentanteModel.UpdateEntity,
    TipoRepresentanteModel.UpdateBody
  >
} = {
  input: data => data,
}
