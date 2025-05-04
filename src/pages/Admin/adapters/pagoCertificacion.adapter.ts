import { InputAdapter, OutputAdapter } from '@/adapters/config'
import { PagoCertificacionModel } from '../models'

export const getAll: {
  output: OutputAdapter<
    PagoCertificacionModel.RawEntity[],
    PagoCertificacionModel.Entity[]
  >
} = {
  output: response => response,
}

export const getRefs: {
  output: OutputAdapter<
    PagoCertificacionModel.RawRef[],
    PagoCertificacionModel.Ref[]
  >
} = {
  output: response => response,
}

export const getOne: {
  output: OutputAdapter<
    PagoCertificacionModel.RawEntity,
    PagoCertificacionModel.Entity
  >
} = {
  output: response => response,
}

export const create: {
  input: InputAdapter<
    PagoCertificacionModel.CreateEntity,
    PagoCertificacionModel.CreateBody
  >
} = {
  input: data => data,
}

export const updateOne: {
  input: InputAdapter<
    PagoCertificacionModel.UpdateEntity,
    PagoCertificacionModel.UpdateBody
  >
} = {
  input: data => data,
}
