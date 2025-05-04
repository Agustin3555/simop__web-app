import { InputAdapter, OutputAdapter } from '@/adapters/config'
import { TipoRedeterminacionModel } from '../models'

export const getAll: {
  output: OutputAdapter<
    TipoRedeterminacionModel.RawEntity[],
    TipoRedeterminacionModel.Entity[]
  >
} = {
  output: response => response,
}

export const getRefs: {
  output: OutputAdapter<
    TipoRedeterminacionModel.RawRef[],
    TipoRedeterminacionModel.Ref[]
  >
} = {
  output: response => response,
}

export const getOne: {
  output: OutputAdapter<
    TipoRedeterminacionModel.RawEntity,
    TipoRedeterminacionModel.Entity
  >
} = {
  output: response => response,
}

export const create: {
  input: InputAdapter<
    TipoRedeterminacionModel.CreateEntity,
    TipoRedeterminacionModel.CreateBody
  >
} = {
  input: data => data,
}

export const updateOne: {
  input: InputAdapter<
    TipoRedeterminacionModel.UpdateEntity,
    TipoRedeterminacionModel.UpdateBody
  >
} = {
  input: data => data,
}
