import { InputAdapter, OutputAdapter } from '@/adapters/config'
import { TipoParalizacionModel } from '../models'

export const getAll: {
  output: OutputAdapter<
    TipoParalizacionModel.RawEntity[],
    TipoParalizacionModel.Entity[]
  >
} = {
  output: response => response,
}

export const getRefs: {
  output: OutputAdapter<
    TipoParalizacionModel.RawRef[],
    TipoParalizacionModel.Ref[]
  >
} = {
  output: response => response,
}

export const getOne: {
  output: OutputAdapter<
    TipoParalizacionModel.RawEntity,
    TipoParalizacionModel.Entity
  >
} = {
  output: response => response,
}

export const create: {
  input: InputAdapter<
    TipoParalizacionModel.CreateEntity,
    TipoParalizacionModel.CreateBody
  >
} = {
  input: data => data,
}

export const updateOne: {
  input: InputAdapter<
    TipoParalizacionModel.UpdateEntity,
    TipoParalizacionModel.UpdateBody
  >
} = {
  input: data => data,
}
