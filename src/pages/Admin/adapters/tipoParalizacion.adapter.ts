import { InputAdapter, OutputAdapter } from '@/adapters/config'
import { TipoParalizacionModel } from '../models'

export const getAll: {
  output: OutputAdapter<
    TipoParalizacionModel.Entity[],
    TipoParalizacionModel.Entity[]
  >
} = {
  output: response => response,
}

export const getRefs: {
  output: OutputAdapter<
    TipoParalizacionModel.Ref[],
    TipoParalizacionModel.Ref[]
  >
} = {
  output: response => response,
}

export const getOne: {
  output: OutputAdapter<
    TipoParalizacionModel.Entity,
    TipoParalizacionModel.Entity
  >
} = {
  output: response => response,
}

export const create: {
  input: InputAdapter<
    TipoParalizacionModel.CreateEntity,
    TipoParalizacionModel.CreateEntity
  >
} = {
  input: data => data,
}

export const updateOne: {
  input: InputAdapter<
    TipoParalizacionModel.UpdateEntity,
    TipoParalizacionModel.UpdateEntity
  >
} = {
  input: data => data,
}
