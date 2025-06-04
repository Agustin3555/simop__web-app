import { InputAdapter, OutputAdapter } from '@/adapters/config'
import { TipoRecepcionModel } from '.'

const getAll: {
  output: OutputAdapter<
    TipoRecepcionModel.Entity[],
    TipoRecepcionModel.Entity[]
  >
} = {
  output: response => response,
}

const getRefs: {
  output: OutputAdapter<TipoRecepcionModel.Ref[], TipoRecepcionModel.Ref[]>
} = {
  output: response => response,
}

const getOne: {
  output: OutputAdapter<TipoRecepcionModel.Entity, TipoRecepcionModel.Entity>
} = {
  output: response => response,
}

const create: {
  input: InputAdapter<
    TipoRecepcionModel.CreateEntity,
    TipoRecepcionModel.CreateEntity
  >
  output: OutputAdapter<TipoRecepcionModel.Entity, TipoRecepcionModel.Entity>
} = {
  input: data => data,
  output: response => response,
}

const updateOne: {
  input: InputAdapter<
    TipoRecepcionModel.UpdateEntity,
    TipoRecepcionModel.UpdateEntity
  >
  output: OutputAdapter<TipoRecepcionModel.Entity, TipoRecepcionModel.Entity>
} = {
  input: data => data,
  output: response => response,
}

export const TipoRecepcionAdapter = {
  getAll,
  getRefs,
  getOne,
  create,
  updateOne,
}
