import { InputAdapter, OutputAdapter } from '@/adapters/config'
import { TipoParalizacionModel } from '.'

const getAll: {
  output: OutputAdapter<
    TipoParalizacionModel.Entity[],
    TipoParalizacionModel.Entity[]
  >
} = {
  output: response => response,
}

const getRefs: {
  output: OutputAdapter<
    TipoParalizacionModel.Ref[],
    TipoParalizacionModel.Ref[]
  >
} = {
  output: response => response,
}

const getOne: {
  output: OutputAdapter<
    TipoParalizacionModel.Entity,
    TipoParalizacionModel.Entity
  >
} = {
  output: response => response,
}

const create: {
  input: InputAdapter<
    TipoParalizacionModel.CreateEntity,
    TipoParalizacionModel.CreateEntity
  >
  output: OutputAdapter<
    TipoParalizacionModel.Entity,
    TipoParalizacionModel.Entity
  >
} = {
  input: data => data,
  output: response => response,
}

const updateOne: {
  input: InputAdapter<
    TipoParalizacionModel.UpdateEntity,
    TipoParalizacionModel.UpdateEntity
  >
  output: OutputAdapter<
    TipoParalizacionModel.Entity,
    TipoParalizacionModel.Entity
  >
} = {
  input: data => data,
  output: response => response,
}

export const TipoParalizacionAdapter = {
  getAll,
  getRefs,
  getOne,
  create,
  updateOne,
}
