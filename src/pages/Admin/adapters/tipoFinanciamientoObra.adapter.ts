import { InputAdapter, OutputAdapter } from '@/adapters/config'
import { TipoFinanciamientoObraModel } from '../models'

export const getAll: {
  output: OutputAdapter<
    TipoFinanciamientoObraModel.RawEntity[],
    TipoFinanciamientoObraModel.Entity[]
  >
} = {
  output: response => response,
}

export const getForConnect: {
  output: OutputAdapter<
    TipoFinanciamientoObraModel.RawRef[],
    TipoFinanciamientoObraModel.Ref[]
  >
} = {
  output: response => response,
}

export const getOne: {
  output: OutputAdapter<
    TipoFinanciamientoObraModel.RawEntity,
    TipoFinanciamientoObraModel.Entity
  >
} = {
  output: response => response,
}

export const create: {
  input: InputAdapter<
    TipoFinanciamientoObraModel.CreateData,
    TipoFinanciamientoObraModel.CreateBody
  >
} = {
  input: data => data,
}
export const updateOne: {
  input: InputAdapter<
    TipoFinanciamientoObraModel.UpdateData,
    TipoFinanciamientoObraModel.UpdateBody
  >
} = {
  input: data => data,
}
