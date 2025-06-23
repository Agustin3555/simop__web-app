import { InputAdapter, OutputAdapter } from '@/adapters/config'
import { TipoNivelAreaModel } from '.'

const getAll: {
  output: OutputAdapter<
    TipoNivelAreaModel.Entity[],
    TipoNivelAreaModel.Entity[]
  >
} = {
  output: response => response,
}

const getRefs: {
  output: OutputAdapter<TipoNivelAreaModel.Ref[], TipoNivelAreaModel.Ref[]>
} = {
  output: response => response,
}

const getOne: {
  output: OutputAdapter<TipoNivelAreaModel.Entity, TipoNivelAreaModel.Entity>
} = {
  output: response => response,
}

const create: {
  input: InputAdapter<
    TipoNivelAreaModel.CreateEntity,
    TipoNivelAreaModel.CreateEntity
  >
  output: OutputAdapter<TipoNivelAreaModel.Entity, TipoNivelAreaModel.Entity>
} = {
  input: data => data,
  output: response => response,
}

const updateOne: {
  input: InputAdapter<
    TipoNivelAreaModel.UpdateEntity,
    TipoNivelAreaModel.UpdateEntity
  >
  output: OutputAdapter<TipoNivelAreaModel.Entity, TipoNivelAreaModel.Entity>
} = {
  input: data => data,
  output: response => response,
}

export const TipoNivelAreaAdapter = {
  getAll,
  getRefs,
  getOne,
  create,
  updateOne,
}
