import { InputAdapter, OutputAdapter } from '@/adapters/config'
import { TipoRecepcionModel } from '../models'

export const getAll: {
  output: OutputAdapter<
    TipoRecepcionModel.RawEntity[],
    TipoRecepcionModel.Entity[]
  >
} = {
  output: response => response,
}

export const getRefs: {
  output: OutputAdapter<TipoRecepcionModel.RawRef[], TipoRecepcionModel.Ref[]>
} = {
  output: response => response,
}

export const getOne: {
  output: OutputAdapter<TipoRecepcionModel.RawEntity, TipoRecepcionModel.Entity>
} = {
  output: response => response,
}

export const create: {
  input: InputAdapter<
    TipoRecepcionModel.CreateEntity,
    TipoRecepcionModel.CreateBody
  >
} = {
  input: data => data,
}

export const updateOne: {
  input: InputAdapter<
    TipoRecepcionModel.UpdateEntity,
    TipoRecepcionModel.UpdateBody
  >
} = {
  input: data => data,
}
