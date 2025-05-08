import { InputAdapter, OutputAdapter } from '@/adapters/config'
import { TipoTematicaObraModel } from '../models'

export const getAll: {
  output: OutputAdapter<
    TipoTematicaObraModel.Entity[],
    TipoTematicaObraModel.Entity[]
  >
} = {
  output: response => response,
}

export const getRefs: {
  output: OutputAdapter<
    TipoTematicaObraModel.Ref[],
    TipoTematicaObraModel.Ref[]
  >
} = {
  output: response => response,
}

export const getOne: {
  output: OutputAdapter<
    TipoTematicaObraModel.Entity,
    TipoTematicaObraModel.Entity
  >
} = {
  output: response => response,
}

export const create: {
  input: InputAdapter<
    TipoTematicaObraModel.CreateEntity,
    TipoTematicaObraModel.CreateEntity
  >
} = {
  input: data => data,
}

export const updateOne: {
  input: InputAdapter<
    TipoTematicaObraModel.UpdateEntity,
    TipoTematicaObraModel.UpdateEntity
  >
} = {
  input: data => data,
}
