import { InputAdapter, OutputAdapter } from '@/adapters/config'
import { TipoTematicaObraModel } from '../models'

export const getAll: {
  output: OutputAdapter<
    TipoTematicaObraModel.RawEntity[],
    TipoTematicaObraModel.Entity[]
  >
} = {
  output: response => response,
}

export const getRefs: {
  output: OutputAdapter<
    TipoTematicaObraModel.RawRef[],
    TipoTematicaObraModel.Ref[]
  >
} = {
  output: response => response,
}

export const getOne: {
  output: OutputAdapter<
    TipoTematicaObraModel.RawEntity,
    TipoTematicaObraModel.Entity
  >
} = {
  output: response => response,
}

export const create: {
  input: InputAdapter<
    TipoTematicaObraModel.CreateEntity,
    TipoTematicaObraModel.CreateBody
  >
} = {
  input: data => data,
}

export const updateOne: {
  input: InputAdapter<
    TipoTematicaObraModel.UpdateEntity,
    TipoTematicaObraModel.UpdateBody
  >
} = {
  input: data => data,
}
