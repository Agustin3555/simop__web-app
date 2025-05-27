import { InputAdapter, OutputAdapter } from '@/adapters/config'
import { TipoRedeterminacionModel } from '.'

export const getAll: {
  output: OutputAdapter<
    TipoRedeterminacionModel.Entity[],
    TipoRedeterminacionModel.Entity[]
  >
} = {
  output: response => response,
}

export const getRefs: {
  output: OutputAdapter<
    TipoRedeterminacionModel.Ref[],
    TipoRedeterminacionModel.Ref[]
  >
} = {
  output: response => response,
}

export const getOne: {
  output: OutputAdapter<
    TipoRedeterminacionModel.Entity,
    TipoRedeterminacionModel.Entity
  >
} = {
  output: response => response,
}

export const create: {
  input: InputAdapter<
    TipoRedeterminacionModel.CreateEntity,
    TipoRedeterminacionModel.CreateEntity
  >
} = {
  input: data => data,
}

export const updateOne: {
  input: InputAdapter<
    TipoRedeterminacionModel.UpdateEntity,
    TipoRedeterminacionModel.UpdateEntity
  >
} = {
  input: data => data,
}
