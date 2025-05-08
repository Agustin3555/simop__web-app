import { InputAdapter, OutputAdapter } from '@/adapters/config'
import { TipoRecepcionModel } from '../models'

export const getAll: {
  output: OutputAdapter<
    TipoRecepcionModel.Entity[],
    TipoRecepcionModel.Entity[]
  >
} = {
  output: response => response,
}

export const getRefs: {
  output: OutputAdapter<TipoRecepcionModel.Ref[], TipoRecepcionModel.Ref[]>
} = {
  output: response => response,
}

export const getOne: {
  output: OutputAdapter<TipoRecepcionModel.Entity, TipoRecepcionModel.Entity>
} = {
  output: response => response,
}

export const create: {
  input: InputAdapter<
    TipoRecepcionModel.CreateEntity,
    TipoRecepcionModel.CreateEntity
  >
} = {
  input: data => data,
}

export const updateOne: {
  input: InputAdapter<
    TipoRecepcionModel.UpdateEntity,
    TipoRecepcionModel.UpdateEntity
  >
} = {
  input: data => data,
}
