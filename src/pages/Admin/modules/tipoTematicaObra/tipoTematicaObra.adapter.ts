import { InputAdapter, OutputAdapter } from '@/adapters/config'
import { TipoTematicaObraModel } from '.'

const getAll: {
  output: OutputAdapter<
    TipoTematicaObraModel.Entity[],
    TipoTematicaObraModel.Entity[]
  >
} = {
  output: response => response,
}

const getRefs: {
  output: OutputAdapter<
    TipoTematicaObraModel.Ref[],
    TipoTematicaObraModel.Ref[]
  >
} = {
  output: response => response,
}

const getOne: {
  output: OutputAdapter<
    TipoTematicaObraModel.Entity,
    TipoTematicaObraModel.Entity
  >
} = {
  output: response => response,
}

const create: {
  input: InputAdapter<
    TipoTematicaObraModel.CreateEntity,
    TipoTematicaObraModel.CreateEntity
  >
} = {
  input: data => data,
}

const updateOne: {
  input: InputAdapter<
    TipoTematicaObraModel.UpdateEntity,
    TipoTematicaObraModel.UpdateEntity
  >
} = {
  input: data => data,
}

export const TipoTematicaObraAdapter = {
  getAll,
  getRefs,
  getOne,
  create,
  updateOne,
}
