import { InputAdapter, OutputAdapter } from '@/adapters/config'
import { TipoRedeterminacionModel } from '.'

const getAll: {
  output: OutputAdapter<
    TipoRedeterminacionModel.Entity[],
    TipoRedeterminacionModel.Entity[]
  >
} = {
  output: response => response,
}

const getRefs: {
  output: OutputAdapter<
    TipoRedeterminacionModel.Ref[],
    TipoRedeterminacionModel.Ref[]
  >
} = {
  output: response => response,
}

const getOne: {
  output: OutputAdapter<
    TipoRedeterminacionModel.Entity,
    TipoRedeterminacionModel.Entity
  >
} = {
  output: response => response,
}

const create: {
  input: InputAdapter<
    TipoRedeterminacionModel.CreateEntity,
    TipoRedeterminacionModel.CreateEntity
  >
} = {
  input: data => data,
}

const updateOne: {
  input: InputAdapter<
    TipoRedeterminacionModel.UpdateEntity,
    TipoRedeterminacionModel.UpdateEntity
  >
} = {
  input: data => data,
}

export const TipoRedeterminacionAdapter = {
  getAll,
  getRefs,
  getOne,
  create,
  updateOne,
}
