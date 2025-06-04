import { InputAdapter, OutputAdapter } from '@/adapters/config'
import { TipoModificacionModel } from '.'

const getAll: {
  output: OutputAdapter<
    TipoModificacionModel.Entity[],
    TipoModificacionModel.Entity[]
  >
} = {
  output: response => response,
}

const getRefs: {
  output: OutputAdapter<
    TipoModificacionModel.Ref[],
    TipoModificacionModel.Ref[]
  >
} = {
  output: response => response,
}

const getOne: {
  output: OutputAdapter<
    TipoModificacionModel.Entity,
    TipoModificacionModel.Entity
  >
} = {
  output: response => response,
}

const create: {
  input: InputAdapter<
    TipoModificacionModel.CreateEntity,
    TipoModificacionModel.CreateEntity
  >
  output: OutputAdapter<
    TipoModificacionModel.Entity,
    TipoModificacionModel.Entity
  >
} = {
  input: data => data,
  output: response => response,
}

const updateOne: {
  input: InputAdapter<
    TipoModificacionModel.UpdateEntity,
    TipoModificacionModel.UpdateEntity
  >
  output: OutputAdapter<
    TipoModificacionModel.Entity,
    TipoModificacionModel.Entity
  >
} = {
  input: data => data,
  output: response => response,
}

export const TipoModificacionAdapter = {
  getAll,
  getRefs,
  getOne,
  create,
  updateOne,
}
