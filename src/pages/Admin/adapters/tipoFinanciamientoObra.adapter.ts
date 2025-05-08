import { InputAdapter, OutputAdapter } from '@/adapters/config'
import { TipoFinanciamientoObraModel } from '../models'

export const getAll: {
  output: OutputAdapter<
    TipoFinanciamientoObraModel.Entity[],
    TipoFinanciamientoObraModel.Entity[]
  >
} = {
  output: response => response,
}

export const getRefs: {
  output: OutputAdapter<
    TipoFinanciamientoObraModel.Ref[],
    TipoFinanciamientoObraModel.Ref[]
  >
} = {
  output: response => response,
}

export const getOne: {
  output: OutputAdapter<
    TipoFinanciamientoObraModel.Entity,
    TipoFinanciamientoObraModel.Entity
  >
} = {
  output: response => response,
}

export const create: {
  input: InputAdapter<
    TipoFinanciamientoObraModel.CreateEntity,
    TipoFinanciamientoObraModel.CreateEntity
  >
} = {
  input: data => data,
}

export const updateOne: {
  input: InputAdapter<
    TipoFinanciamientoObraModel.UpdateEntity,
    TipoFinanciamientoObraModel.UpdateEntity
  >
} = {
  input: data => data,
}
