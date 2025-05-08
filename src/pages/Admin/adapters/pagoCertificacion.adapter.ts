import { InputAdapter, OutputAdapter } from '@/adapters/config'
import { PagoCertificacionModel } from '../models'

export const getAll: {
  output: OutputAdapter<
    PagoCertificacionModel.Entity[],
    PagoCertificacionModel.Entity[]
  >
} = {
  output: response => response,
}

export const getRefs: {
  output: OutputAdapter<
    PagoCertificacionModel.Ref[],
    PagoCertificacionModel.Ref[]
  >
} = {
  output: response => response,
}

export const getOne: {
  output: OutputAdapter<
    PagoCertificacionModel.Entity,
    PagoCertificacionModel.Entity
  >
} = {
  output: response => response,
}

export const create: {
  input: InputAdapter<
    PagoCertificacionModel.CreateEntity,
    PagoCertificacionModel.CreateEntity
  >
} = {
  input: data => data,
}

export const updateOne: {
  input: InputAdapter<
    PagoCertificacionModel.UpdateEntity,
    PagoCertificacionModel.UpdateEntity
  >
} = {
  input: data => data,
}
