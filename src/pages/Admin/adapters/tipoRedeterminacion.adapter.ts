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

export const getForConnect: {
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
    TipoRedeterminacionModel.CreateData,
    TipoRedeterminacionModel.CreateBody
  >
} = {
  input: data => data,
}

export const updateOne: {
  input: InputAdapter<
    TipoRedeterminacionModel.UpdateData,
    TipoRedeterminacionModel.UpdateBody
  >
} = {
  input: data => data,
}
