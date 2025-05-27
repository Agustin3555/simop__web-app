import { InputAdapter, OutputAdapter } from '@/adapters/config'
import { TipoRescisionModel } from '.'

export const getAll: {
  output: OutputAdapter<
    TipoRescisionModel.Entity[],
    TipoRescisionModel.Entity[]
  >
} = {
  output: response => response,
}

export const getRefs: {
  output: OutputAdapter<TipoRescisionModel.Ref[], TipoRescisionModel.Ref[]>
} = {
  output: response => response,
}

export const getOne: {
  output: OutputAdapter<TipoRescisionModel.Entity, TipoRescisionModel.Entity>
} = {
  output: response => response,
}

export const create: {
  input: InputAdapter<
    TipoRescisionModel.CreateEntity,
    TipoRescisionModel.CreateEntity
  >
} = {
  input: data => data,
}

export const updateOne: {
  input: InputAdapter<
    TipoRescisionModel.UpdateEntity,
    TipoRescisionModel.UpdateEntity
  >
} = {
  input: data => data,
}
