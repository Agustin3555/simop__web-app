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

export const getForConnect: {
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
    TipoRepresentanteModel.CreateData,
    TipoRepresentanteModel.CreateBody
  >
} = {
  input: data => data,
}
export const updateOne: {
  input: InputAdapter<
    TipoRepresentanteModel.UpdateData,
    TipoRepresentanteModel.UpdateBody
  >
} = {
  input: data => data,
}
