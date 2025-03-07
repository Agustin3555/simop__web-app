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

export const getForConnect: {
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
    PagoCertificacionModel.CreateData,
    PagoCertificacionModel.CreateBody
  >
} = {
  input: data => data,
}

export const updateOne: {
  input: InputAdapter<
    PagoCertificacionModel.UpdateData,
    PagoCertificacionModel.UpdateBody
  >
} = {
  input: data => data,
}
