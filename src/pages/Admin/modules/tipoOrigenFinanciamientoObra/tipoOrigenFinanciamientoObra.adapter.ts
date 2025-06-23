import { InputAdapter, OutputAdapter } from '@/adapters/config'
import { TipoOrigenFinanciamientoObraModel } from '.'

const getAll: {
  output: OutputAdapter<
    TipoOrigenFinanciamientoObraModel.Entity[],
    TipoOrigenFinanciamientoObraModel.Entity[]
  >
} = {
  output: response => response,
}

const getRefs: {
  output: OutputAdapter<
    TipoOrigenFinanciamientoObraModel.Ref[],
    TipoOrigenFinanciamientoObraModel.Ref[]
  >
} = {
  output: response => response,
}

const getOne: {
  output: OutputAdapter<
    TipoOrigenFinanciamientoObraModel.Entity,
    TipoOrigenFinanciamientoObraModel.Entity
  >
} = {
  output: response => response,
}

const create: {
  input: InputAdapter<
    TipoOrigenFinanciamientoObraModel.CreateEntity,
    TipoOrigenFinanciamientoObraModel.CreateEntity
  >
  output: OutputAdapter<
    TipoOrigenFinanciamientoObraModel.Entity,
    TipoOrigenFinanciamientoObraModel.Entity
  >
} = {
  input: data => data,
  output: response => response,
}

const updateOne: {
  input: InputAdapter<
    TipoOrigenFinanciamientoObraModel.UpdateEntity,
    TipoOrigenFinanciamientoObraModel.UpdateEntity
  >
  output: OutputAdapter<
    TipoOrigenFinanciamientoObraModel.Entity,
    TipoOrigenFinanciamientoObraModel.Entity
  >
} = {
  input: data => data,
  output: response => response,
}

export const TipoOrigenFinanciamientoObraAdapter = {
  getAll,
  getRefs,
  getOne,
  create,
  updateOne,
}
