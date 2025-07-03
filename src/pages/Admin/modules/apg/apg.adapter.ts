import { InputAdapter, OutputAdapter } from '@/adapters/config'
import { APGModel } from '.'

const getAll: {
  output: OutputAdapter<APGModel.Entity[], APGModel.Entity[]>
} = {
  output: response => response,
}

const getRefs: {
  output: OutputAdapter<APGModel.Ref[], APGModel.Ref[]>
} = {
  output: response => response,
}

const getOne: {
  output: OutputAdapter<APGModel.Entity, APGModel.Entity>
} = {
  output: response => response,
}

const create: {
  input: InputAdapter<APGModel.CreateEntity, APGModel.CreateEntity>
  output: OutputAdapter<APGModel.Entity, APGModel.Entity>
} = {
  input: data => data,
  output: response => response,
}

const updateOne: {
  input: InputAdapter<APGModel.UpdateEntity, APGModel.UpdateEntity>
  output: OutputAdapter<APGModel.Entity, APGModel.Entity>
} = {
  input: data => data,
  output: response => response,
}

export const APGAdapter = {
  getAll,
  getRefs,
  getOne,
  create,
  updateOne,
}
