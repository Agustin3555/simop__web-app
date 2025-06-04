import { InputAdapter, OutputAdapter } from '@/adapters/config'
import { RescisionModel } from '.'

const getAll: {
  output: OutputAdapter<RescisionModel.Entity[], RescisionModel.Entity[]>
} = {
  output: response => response,
}

const getRefs: {
  output: OutputAdapter<RescisionModel.Ref[], RescisionModel.Ref[]>
} = {
  output: response => response,
}

const getOne: {
  output: OutputAdapter<RescisionModel.Entity, RescisionModel.Entity>
} = {
  output: response => response,
}

const create: {
  input: InputAdapter<RescisionModel.CreateEntity, RescisionModel.CreateEntity>
  output: OutputAdapter<RescisionModel.Entity, RescisionModel.Entity>
} = {
  input: data => data,
  output: response => response,
}

const updateOne: {
  input: InputAdapter<RescisionModel.UpdateEntity, RescisionModel.UpdateEntity>
  output: OutputAdapter<RescisionModel.Entity, RescisionModel.Entity>
} = {
  input: data => data,
  output: response => response,
}

export const RescisionAdapter = {
  getAll,
  getRefs,
  getOne,
  create,
  updateOne,
}
