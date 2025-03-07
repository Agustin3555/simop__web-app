import { InputAdapter, OutputAdapter } from '@/adapters/config'
import { TipoModificacionModel } from '../models'

export const getAll: {
  output: OutputAdapter<
    TipoModificacionModel.RawEntity[],
    TipoModificacionModel.Entity[]
  >
} = {
  output: response => response,
}

export const getForConnect: {
  output: OutputAdapter<
    TipoModificacionModel.RawRef[],
    TipoModificacionModel.Ref[]
  >
} = {
  output: response => response,
}

export const getOne: {
  output: OutputAdapter<
    TipoModificacionModel.RawEntity,
    TipoModificacionModel.Entity
  >
} = {
  output: response => response,
}

export const create: {
  input: InputAdapter<
    TipoModificacionModel.CreateData,
    TipoModificacionModel.CreateBody
  >
} = {
  input: data => data,
}

export const updateOne: {
  input: InputAdapter<
    TipoModificacionModel.UpdateData,
    TipoModificacionModel.UpdateBody
  >
} = {
  input: data => data,
}
