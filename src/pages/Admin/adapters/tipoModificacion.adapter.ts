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

export const getRefs: {
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
    TipoModificacionModel.CreateEntity,
    TipoModificacionModel.CreateBody
  >
} = {
  input: data => data,
}

export const updateOne: {
  input: InputAdapter<
    TipoModificacionModel.UpdateEntity,
    TipoModificacionModel.UpdateBody
  >
} = {
  input: data => data,
}
