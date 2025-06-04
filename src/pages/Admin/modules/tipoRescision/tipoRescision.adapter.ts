import { InputAdapter, OutputAdapter } from '@/adapters/config'
import { TipoRescisionModel } from '.'

const getAll: {
  output: OutputAdapter<
    TipoRescisionModel.Entity[],
    TipoRescisionModel.Entity[]
  >
} = {
  output: response => response,
}

const getRefs: {
  output: OutputAdapter<TipoRescisionModel.Ref[], TipoRescisionModel.Ref[]>
} = {
  output: response => response,
}

const getOne: {
  output: OutputAdapter<TipoRescisionModel.Entity, TipoRescisionModel.Entity>
} = {
  output: response => response,
}

const create: {
  input: InputAdapter<
    TipoRescisionModel.CreateEntity,
    TipoRescisionModel.CreateEntity
  >
  output: OutputAdapter<TipoRescisionModel.Entity, TipoRescisionModel.Entity>
} = {
  input: data => data,
  output: response => response,
}

const updateOne: {
  input: InputAdapter<
    TipoRescisionModel.UpdateEntity,
    TipoRescisionModel.UpdateEntity
  >
  output: OutputAdapter<TipoRescisionModel.Entity, TipoRescisionModel.Entity>
} = {
  input: data => data,
  output: response => response,
}

export const TipoRescisionAdapter = {
  getAll,
  getRefs,
  getOne,
  create,
  updateOne,
}
