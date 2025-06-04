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
  output: OutputAdapter<
    TipoRedeterminacionModel.Entity,
    TipoRedeterminacionModel.Entity
  >
} = {
  input: data => data,
  output: response => response,
}

const updateOne: {
  input: InputAdapter<
    TipoRedeterminacionModel.UpdateEntity,
    TipoRedeterminacionModel.UpdateEntity
  >
  output: OutputAdapter<
    TipoRedeterminacionModel.Entity,
    TipoRedeterminacionModel.Entity
  >
} = {
  input: data => data,
  output: response => response,
}

export const TipoRedeterminacionAdapter = {
  getAll,
  getRefs,
  getOne,
  create,
  updateOne,
}
