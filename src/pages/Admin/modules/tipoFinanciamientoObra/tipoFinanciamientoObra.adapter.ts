import { InputAdapter, OutputAdapter } from '@/adapters/config'
import { TipoFinanciamientoObraModel } from '.'

const getAll: {
  output: OutputAdapter<
    TipoFinanciamientoObraModel.Entity[],
    TipoFinanciamientoObraModel.Entity[]
  >
} = {
  output: response => response,
}

const getRefs: {
  output: OutputAdapter<
    TipoFinanciamientoObraModel.Ref[],
    TipoFinanciamientoObraModel.Ref[]
  >
} = {
  output: response => response,
}

const getOne: {
  output: OutputAdapter<
    TipoFinanciamientoObraModel.Entity,
    TipoFinanciamientoObraModel.Entity
  >
} = {
  output: response => response,
}

const create: {
  input: InputAdapter<
    TipoFinanciamientoObraModel.CreateEntity,
    TipoFinanciamientoObraModel.CreateEntity
  >
  output: OutputAdapter<
    TipoFinanciamientoObraModel.Entity,
    TipoFinanciamientoObraModel.Entity
  >
} = {
  input: data => data,
  output: response => response,
}

const updateOne: {
  input: InputAdapter<
    TipoFinanciamientoObraModel.UpdateEntity,
    TipoFinanciamientoObraModel.UpdateEntity
  >
  output: OutputAdapter<
    TipoFinanciamientoObraModel.Entity,
    TipoFinanciamientoObraModel.Entity
  >
} = {
  input: data => data,
  output: response => response,
}

export const TipoFinanciamientoObraAdapter = {
  getAll,
  getRefs,
  getOne,
  create,
  updateOne,
}
