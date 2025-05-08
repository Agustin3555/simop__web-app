import { InputAdapter, OutputAdapter } from '@/adapters/config'
import { TipoModificacionModel } from '../models'

export const getAll: {
  output: OutputAdapter<
    TipoModificacionModel.Entity[],
    TipoModificacionModel.Entity[]
  >
} = {
  output: response => response,
}

export const getRefs: {
  output: OutputAdapter<
    TipoModificacionModel.Ref[],
    TipoModificacionModel.Ref[]
  >
} = {
  output: response => response,
}

export const getOne: {
  output: OutputAdapter<
    TipoModificacionModel.Entity,
    TipoModificacionModel.Entity
  >
} = {
  output: response => response,
}

export const create: {
  input: InputAdapter<
    TipoModificacionModel.CreateEntity,
    TipoModificacionModel.CreateEntity
  >
} = {
  input: data => data,
}

export const updateOne: {
  input: InputAdapter<
    TipoModificacionModel.UpdateEntity,
    TipoModificacionModel.UpdateEntity
  >
} = {
  input: data => data,
}
