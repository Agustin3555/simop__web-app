import { InputAdapter, OutputAdapter } from '@/adapters/config'
import { AreaModel } from '.'

const getAll: {
  output: OutputAdapter<AreaModel.Entity[], AreaModel.Entity[]>
} = {
  output: response => response,
}

const getRefs: {
  output: OutputAdapter<AreaModel.Ref[], AreaModel.Ref[]>
} = {
  output: response => response,
}

const getOne: {
  output: OutputAdapter<AreaModel.Entity, AreaModel.Entity>
} = {
  output: response => response,
}

const create: {
  input: InputAdapter<AreaModel.CreateEntity, AreaModel.CreateEntity>
  output: OutputAdapter<AreaModel.Entity, AreaModel.Entity>
} = {
  input: data => data,
  output: response => response,
}

const updateOne: {
  input: InputAdapter<AreaModel.UpdateEntity, AreaModel.UpdateEntity>
  output: OutputAdapter<AreaModel.Entity, AreaModel.Entity>
} = {
  input: data => data,
  output: response => response,
}

export const AreaAdapter = {
  getAll,
  getRefs,
  getOne,
  create,
  updateOne,
}
