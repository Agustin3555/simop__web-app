import { InputAdapter, OutputAdapter } from '@/adapters/config'
import { DireccionModel } from '.'

const getAll: {
  output: OutputAdapter<DireccionModel.Entity[], DireccionModel.Entity[]>
} = {
  output: response => response,
}

const getRefs: {
  output: OutputAdapter<DireccionModel.Ref[], DireccionModel.Ref[]>
} = {
  output: response => response,
}

const getOne: {
  output: OutputAdapter<DireccionModel.Entity, DireccionModel.Entity>
} = {
  output: response => response,
}

const create: {
  input: InputAdapter<DireccionModel.CreateEntity, DireccionModel.CreateEntity>
} = {
  input: data => data,
}

const updateOne: {
  input: InputAdapter<DireccionModel.UpdateEntity, DireccionModel.UpdateEntity>
} = {
  input: data => data,
}

export const DireccionAdapter = {
  getAll,
  getRefs,
  getOne,
  create,
  updateOne,
}
