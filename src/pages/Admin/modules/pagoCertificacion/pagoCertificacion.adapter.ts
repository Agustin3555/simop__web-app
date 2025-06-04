import { InputAdapter, OutputAdapter } from '@/adapters/config'
import { PagoCertificacionModel } from '.'

const getAll: {
  output: OutputAdapter<
    PagoCertificacionModel.Entity[],
    PagoCertificacionModel.Entity[]
  >
} = {
  output: response => response,
}

const getRefs: {
  output: OutputAdapter<
    PagoCertificacionModel.Ref[],
    PagoCertificacionModel.Ref[]
  >
} = {
  output: response => response,
}

const getOne: {
  output: OutputAdapter<
    PagoCertificacionModel.Entity,
    PagoCertificacionModel.Entity
  >
} = {
  output: response => response,
}

const create: {
  input: InputAdapter<
    PagoCertificacionModel.CreateEntity,
    PagoCertificacionModel.CreateEntity
  >
  output: OutputAdapter<
    PagoCertificacionModel.Entity,
    PagoCertificacionModel.Entity
  >
} = {
  input: data => data,
  output: response => response,
}

const updateOne: {
  input: InputAdapter<
    PagoCertificacionModel.UpdateEntity,
    PagoCertificacionModel.UpdateEntity
  >
  output: OutputAdapter<
    PagoCertificacionModel.Entity,
    PagoCertificacionModel.Entity
  >
} = {
  input: data => data,
  output: response => response,
}

export const PagoCertificacionAdapter = {
  getAll,
  getRefs,
  getOne,
  create,
  updateOne,
}
